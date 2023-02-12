const StripeController = require('../controllers/stripe.controller');



module.exports = function(app){
    //Product Routes
    app.get('/v1/products', StripeController.listAllProducts);
    app.get('/v1/products/:id', StripeController.getOneProduct);
    app.post('/create-payment-intent', StripeController.createPaymentIntent);
    app.post('/v1/products', StripeController.createStripeProduct);
    app.put('/v1/products/:id', StripeController.updateStripeProduct);
    app.put('/v1/archive/:id', StripeController.archiveStripeProduct);
    app.delete('/v1/products/:id', StripeController.deleteOneProduct);
    //Price Routes
    app.post('/v1/prices', StripeController.createPriceObject);
    app.get('/v1/prices', StripeController.getAllPrices);
    app.get('/v1/prices/:id', StripeController.getOnePrice);

}



