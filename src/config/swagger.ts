import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
   apis: ['../routes/*.ts'],
   definition: {
      openapi: '3.0.0',
      info: {
         title: 'DRAGON TRACK API',
         version: '1.0.0',
      },
   },
};
export const docOption = swaggerJSDoc(options);
