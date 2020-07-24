const express = require("express");
const axios = require("axios");

const port = Number(process.env.FRAGMENTS_PORT) || 5001;
const bucketUrl = process.env.FRAGMENT_BUCKET_URL

const init = () => {
  const app = express();

  const fragmentBundle = (fragment) => `<${bucketUrl}/${fragment}/bundle.js>; rel="fragment-script"`

  app.get("/:fragment", async (req, res) => {
    const fragment = req.params.fragment

    res.writeHead(200, {
      "Content-Type": "text/html",
      Link: fragmentBundle(fragment),
      "x-amz-meta-link": fragmentBundle(fragment)
    });
    try {
      const html = (await axios.get(`https://less-fragments-eugen.s3.eu-central-1.amazonaws.com/${fragment}/index.html`)).data;
      return res.end(html);
    } catch (e) {
      return res.end("<div>fail</div>");
    }

  });

  // app.use("/static", express.static("/build"));

  app.listen(port, () => {
    console.log("express server running on port:", port);
  });
}

module.exports = { init };
