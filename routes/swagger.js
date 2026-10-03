const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

// Remove host and schemes so Swagger UI can automatically infer them
// This makes it work both locally and on Render without hardcoding URLs.
delete swaggerDocument.host;
delete swaggerDocument.schemes;

router.use('/api-docs', swaggerUi.serve);
router.get(
  '/api-docs',
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      withCredentials: true
    }
  })
);

module.exports = router;
