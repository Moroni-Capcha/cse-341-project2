const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get(
  '/',
  /* #swagger.tags = ['Products']
     #swagger.summary = 'Get all products'
     #swagger.description = 'Retrieves a list of all products in the database.'
  */
  productsController.getAll
);

router.get(
  '/:id',
  /* #swagger.tags = ['Products']
     #swagger.summary = 'Get product by ID'
     #swagger.description = 'Retrieves a single product by its MongoDB ObjectId.'
  */
  productsController.getSingle
);

router.post(
  '/',
  /* #swagger.tags = ['Products']
     #swagger.summary = 'Create a new product (Requires Authentication)'
     #swagger.description = 'Creates a new product document. Must be logged in via OAuth.'
  */
  isAuthenticated,
  validation.saveProduct,
  productsController.createProduct
);

router.put(
  '/:id',
  /* #swagger.tags = ['Products']
     #swagger.summary = 'Update product by ID (Requires Authentication)'
     #swagger.description = 'Updates an existing product by its MongoDB ObjectId. Must be logged in via OAuth.'
  */
  isAuthenticated,
  validation.saveProduct,
  productsController.updateProduct
);

router.delete(
  '/:id',
  /* #swagger.tags = ['Products']
     #swagger.summary = 'Delete product by ID (Requires Authentication)'
     #swagger.description = 'Deletes an existing product by its MongoDB ObjectId. Must be logged in via OAuth.'
  */
  isAuthenticated,
  productsController.deleteProduct
);

module.exports = router;
