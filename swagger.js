const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'E-Commerce API',
    description: 'API for E-Commerce Products and Categories with GitHub OAuth'
  },
  host: 'localhost:8080',
  schemes: ['http', 'https'],
  tags: [
    {
      name: 'Auth',
      description: 'Authentication endpoints'
    },
    {
      name: 'Products',
      description: 'Operations for products'
    },
    {
      name: 'Categories',
      description: 'Operations for categories'
    }
  ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
