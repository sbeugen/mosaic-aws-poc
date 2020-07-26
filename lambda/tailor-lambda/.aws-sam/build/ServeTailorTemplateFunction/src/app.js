const express = require("express");
const Tailor = require("node-tailor");
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const filterRequestHeaders = require("./filterRequestHeaders");
const fetchTemplate = require("./fetchTemplate");

const app = express();

const tailor = new Tailor({
  /* Options */
  filterRequestHeaders,
  fetchTemplate
});
app.use(awsServerlessExpressMiddleware.eventContext());
app.use("/*", tailor.requestHandler);

module.exports = app;
