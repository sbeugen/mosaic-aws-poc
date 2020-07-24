const filterRequestHeaders = require("./filterRequestHeaders");

const http = require("http");
const Tailor = require("node-tailor");

const port = process.env.TAILOR_PORT;

const init = () => {
  const tailor = new Tailor({
    /* Options */
    filterRequestHeaders,
    templatesPath: __dirname + "/templates"
  });
  const server = http.createServer(tailor.requestHandler);
  server.listen(port || 8080, () => {
    console.log(`Tailor running on port ${port || 8080}`);
  });
}

module.exports = { init }
