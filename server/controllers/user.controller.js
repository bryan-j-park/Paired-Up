const { User } = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = {
    register: (req, res) => {
        User.exists({email: req.body.email})
            .then(response => {
                if(response != null){
                    return res.status(400).json({errors: [{message: "Email already exists!"}]});
                } else{
                    User.create(req.body)
                        .then(user => {
                            const userToken = jwt.sign({
                                id: user._id
                            }, process.env.SECOND_SECRET_KEY);
            
                            res
                                .cookie("usertoken", userToken, {
                                    httpOnly: true
                                })
                                .json({ msg: "success!", user: user });
                        })
                        .catch(err => res.status(400).json(err));
                }
            })
            .catch(err => {
                res.status(400).json(err)
            })
    },
    login: async (req, res) => {
        const user = await User.findOne({ email: req.body.email });

        if (user === null) {
            // email not found in users collection
            return res.sendStatus(400);
        } 
        
        // if we made it this far, we found a user with this email address
        // let's compare the supplied password to the hashed password in the database
        const correctPassword = await bcrypt.compare(req.body.password, user.password);

        if (!correctPassword) {
            // password wasn't a match!
            return res.sendStatus(400);

        }


        // if we made it this far, the password was correct
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECOND_SECRET_KEY);

        // note that the response object allows chained calls to cookie and json
        res
            .cookie("usertoken", userToken, {
                httpOnly: true
            })
            .json({ msg: "success!" , user: user});
    },
}

module.exports.logout = (req, res) => {
    res.clearCookie("usertoken");
    res.sendStatus(200);
}


module.exports.getLoggedInUser = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });

        User.findById(decodedJWT.payload._id)
            .then((user) => res.json(user))
            .catch((err) => res.json(err));
}