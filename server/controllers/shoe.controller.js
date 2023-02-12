const { Shoe } = require('../models/shoe.model');

module.exports.createShoe = (req, res) => {
  const { name, size, price, description, imgUrls, brand, categories, colors } = req.body;
  Shoe.create({
    name, size, price, description, imgUrls, brand, categories, colors
  })
    .then(shoe => res.json(shoe))
    .catch(err => res.status(400).json(err));
}

module.exports.findAllShoes = (req, res) => {
  Shoe.find()
    .then((allShoes) => {
      res.json({shoes: allShoes})
    })
    .catch(err => res.status(400).json(err));
}

module.exports.getShoe = (req, res) => {
  Shoe.findById({_id: req.params.id})
    .then(shoe => res.json(shoe))
    .catch(err => res.status(400).json(err));
}

module.exports.updateShoe = (req, res) => {
  Shoe.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
    .then(updatedShoe => res.json(updatedShoe))
    .catch(err => res.status(400).json(err));
}

module.exports.deleteShoe = (req, res) => {
  Shoe.deleteOne({_id: req.params.id})
    .then(deletingShoe => res.json(deletingShoe))
    .catch(err => res.status(400).json(err));
}

module.exports.getShoeByName = (req, res) => {
  Shoe.findOne({name: req.params.name})
    .then(shoe => res.json(shoe))
    .catch(err => res.status(400).json(err))
}