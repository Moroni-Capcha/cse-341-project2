const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection('products').find();
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
      res.status(400).json('Must use a valid product id to find a product.');
    }
    const productId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('products').find({ _id: productId });
    result.toArray().then((lists) => {
      if (lists.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      sku: req.body.sku,
      brand: req.body.brand,
      imageUrl: req.body.imageUrl
    };
    const response = await mongodb.getDb().db().collection('products').insertOne(product);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the product.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid product id to update a product.');
    }
    const productId = new ObjectId(req.params.id);
    const product = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      sku: req.body.sku,
      brand: req.body.brand,
      imageUrl: req.body.imageUrl
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('products')
      .replaceOne({ _id: productId }, product);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the product.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid product id to delete a product.');
    }
    const productId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('products').deleteOne({ _id: productId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the product.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  createProduct,
  updateProduct,
  deleteProduct
};
