const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection('categories').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid category id to find a category.');
    }
    const categoryId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('categories').find({ _id: categoryId });
    result.toArray().then((lists) => {
      if (lists.length === 0) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const category = {
      name: req.body.name,
      description: req.body.description,
      isActive: req.body.isActive
    };
    const response = await mongodb.getDb().db().collection('categories').insertOne(category);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the category.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateCategory = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid category id to update a category.');
    }
    const categoryId = new ObjectId(req.params.id);
    const category = {
      name: req.body.name,
      description: req.body.description,
      isActive: req.body.isActive
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('categories')
      .replaceOne({ _id: categoryId }, category);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the category.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteCategory = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid category id to delete a category.');
    }
    const categoryId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('categories').deleteOne({ _id: categoryId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the category.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  createCategory,
  updateCategory,
  deleteCategory
};
