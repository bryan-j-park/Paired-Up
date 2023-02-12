const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

require('dotenv').config();
const Stripe = require("stripe")(process.env.SECRET_KEY);
const secondSecretKey = process.env.SECOND_SECRET_KEY;

app.use(cookieParser());
app.use(cors({credentials:true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


require('./server/config/mongoose.config');
require('./server/routes/shoe.routes')(app);
require('./server/routes/stripe.routes')(app);
require('./server/routes/user.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));


