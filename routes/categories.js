const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categories');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get(
  '/',
  /* #swagger.tags = ['Categories']
     #swagger.summary = 'Get all categories'
     #swagger.description = 'Retrieves a list of all categories in the database.'
  */
  categoriesController.getAll
);

router.get(
  '/:id',
  /* #swagger.tags = ['Categories']
     #swagger.summary = 'Get category by ID'
     #swagger.description = 'Retrieves a single category by its MongoDB ObjectId.'
  */
  categoriesController.getSingle
);

router.post(
  '/',
  /* #swagger.tags = ['Categories']
     #swagger.summary = 'Create a new category (Requires Authentication)'
     #swagger.description = 'Creates a new category document. Must be logged in via OAuth.'
  */
  isAuthenticated,
  validation.saveCategory,
  categoriesController.createCategory
);

router.put(
  '/:id',
  /* #swagger.tags = ['Categories']
     #swagger.summary = 'Update category by ID (Requires Authentication)'
     #swagger.description = 'Updates an existing category by its MongoDB ObjectId. Must be logged in via OAuth.'
  */
  isAuthenticated,
  validation.saveCategory,
  categoriesController.updateCategory
);

router.delete(
  '/:id',
  /* #swagger.tags = ['Categories']
     #swagger.summary = 'Delete category by ID (Requires Authentication)'
     #swagger.description = 'Deletes an existing category by its MongoDB ObjectId. Must be logged in via OAuth.'
  */
  isAuthenticated,
  categoriesController.deleteCategory
);

module.exports = router;
