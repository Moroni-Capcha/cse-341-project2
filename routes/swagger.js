const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', (req, res, next) => {
  swaggerDocument.host = req.get('host');
  swaggerDocument.schemes = [req.protocol];
  next();
}, swaggerUi.serve);

router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
