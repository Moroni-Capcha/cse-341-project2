const validator = require('../helpers/validate');

const saveProduct = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    description: 'required|string',
    price: 'required|numeric',
    stock: 'required|integer',
    sku: 'required|string',
    brand: 'required|string',
    imageUrl: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveCategory = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    description: 'required|string',
    isActive: 'required|boolean'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveProduct,
  saveCategory
};
