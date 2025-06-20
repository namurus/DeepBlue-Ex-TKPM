// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Quản lý học sinh',
        version: '1.0.0',
        description: 'API tài liệu cho hệ thống quản lý học sinh',
    },
    servers: [
        {
            url: 'http://localhost:5134/', 
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['src/docs/*.yml', 'src/routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
