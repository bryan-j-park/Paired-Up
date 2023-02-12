// inside of user.routes.js
const Users = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');
module.exports = function(app) {
    app.post("/api/register", Users.register);
    app.post("/api/login", Users.login);
    app.get("/api/logout", authenticate, Users.logout);
    // this route now has to be authenticated
    // app.get("/api/users",  Users.getAll);
}