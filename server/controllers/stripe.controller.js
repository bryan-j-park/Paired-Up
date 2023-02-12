const StripeController = require('../controllers/stripe.controller');
require('dotenv').config();
const stripe = require("stripe")(process.env.SECRET_KEY);
const { Shoe } = require('../models/shoe.model');

const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    let subtotal = 0;
    const tax = 1.05;
    const shipping = 500;
    for(let i in items){
        subtotal += items[i].unit_amount;
    }
    const total = (subtotal * tax) + shipping
    return total;
};



module.exports.createPaymentIntent = async (req, res) => {
    const { listOfDBPrices } = req.body;

    // Create a PaymentIntent with the order amount and currency\
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(listOfDBPrices),
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });
    res.send({
        clientSecret: paymentIntent.client_secret,
    });
}


/********************CRUD FOR PRODUCTS**********************************/ 
module.exports.createStripeProduct = async (req, res) => {
    const {name, description, images} = req.body;
    const product = await stripe.products.create({
        name, description, images
    });
    res.send(product);
}

module.exports.listAllProducts = async (req, res) => {
    const product = await stripe.products.list({
        limit: 100
    })

    res.send(product);
}


module.exports.getOneProduct = async (req, res) => {
    const stripeId = req.params.id
    const product = await stripe.products.retrieve(
        stripeId
    );
    res.send(product);
}

module.exports.updateStripeProduct = async (req, res) => {
    const stripeProductId = req.params.id
    const stripePriceId = req.body
    const product = await stripe.products.update(
        stripeProductId,
        stripePriceId
        );
    
    res.send(product)
}


module.exports.deleteOneProduct = async (req, res) => {
    const deletedProduct = await stripe.product.del(
        "prod_NF9rjNXe1gimA6"
    );
    res.send(deletedProduct);
}


module.exports.archiveStripeProduct = async (req, res) => {
    const stripeProductId = req.params.id
    const product = await stripe.products.update(
        stripeProductId,
        {active: false}
        );
    
    res.send(product)
}


/**************************CRUD FOR PRICES*********************************/ 
module.exports.createPriceObject = async (req, res) => {
    const {stripePrice, stripeProductId} = req.body
    const price = await stripe.prices.create({
        unit_amount: stripePrice,
        currency: "usd",
        product: stripeProductId
    })
    
    res.send(price);
}

module.exports.getAllPrices = async (req, res) => {
    const price = await stripe.prices.list({
        limit: 20,
    })
    
    res.send(price);
}

module.exports.getOnePrice = async (req, res) => {
    const priceId = req.params.id
    const price = await stripe.prices.retrieve(
        priceId
    );
    
    res.send(price);
}