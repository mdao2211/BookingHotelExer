const swaggerUi = require('swagger-ui-express');

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Express API',
    version: '1.0.0',
    description: 'API documentation for Express Template'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server'
    }
  ]
};

module.exports = {
  swaggerUi,
  swaggerDocument
};