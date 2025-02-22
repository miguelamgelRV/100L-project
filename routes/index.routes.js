const express = require('express');
const router = express.Router();
const PropertyController = require('../controllers/property.controller')
const BrickController = require('../controllers/brick.controller')

// properties
router.get('/get-properties', PropertyController.getAllProperties);
router.post('/set-property', PropertyController.addProperty);

// bricks
router.get('/get-bricks', BrickController.getAllBricksByProperty);
router.post('/add-brick', BrickController.getAllBricksByProperty);

// users
router.get('/get-users', UserController.getUsers());

// shopping cart
router.get('/get-shopping-cart-by-user', ShoppingCartController.getShoppingCart());
router.post('/add-brick-in-shopping-cart', ShoppingCartController.addBrick());
router.delete('/remove-brick-in-shopping-cart', ShoppingCartController.deleteBrick());
router.put('/buy-brick', ShoppingCartController.updateBrick());


module.exports = router