const ShoeController = require('../controllers/shoe.controller');

module.exports = function(app){
  app.get('/api/shoes', ShoeController.findAllShoes);
  app.post('/api/shoe', ShoeController.createShoe);
  
  app.get('/api/shoe/:id', ShoeController.getShoe);
  app.get('/db/shoe/:name', ShoeController.getShoeByName);

  app.put('/api/shoe/:id', ShoeController.updateShoe);

  app.delete('/api/shoe/:id', ShoeController.deleteShoe);
}