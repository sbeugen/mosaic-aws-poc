const express = require("express");
const AWS = require("aws-sdk");

const app = express();

const fragmentBundle = (fragment) => `<https://${process.env.FRAGMENTS_BUCKET_NAME}.s3.${AWS.config.region}.amazonaws.com/${fragment}/bundle.js>; rel="fragment-script"`

app.get("/:fragment", async (req, res) => {
  const fragment = req.params.fragment

  res.writeHead(200, {
    "Content-Type": "text/html",
    Link: fragmentBundle(fragment),
    "x-amz-meta-link": fragmentBundle(fragment)
  });
  try {
    const html = await fetchFragmentHtml(fragment);
    return res.end(html);
  } catch (e) {
    return res.end("<div>fail</div>");
  }

});

const fetchFragmentHtml = async (fragmentName) => {
  const s3 = new AWS.S3({apiVersion: '2006-03-01'});
  const s3BucketName = process.env.FRAGMENTS_BUCKET_NAME;

  return new Promise((resolve, reject) => {
    if (fragmentName === "favicon.ico") resolve();

    s3.getObject({
      Bucket: s3BucketName,
      Key: `${fragmentName}/fragment.html`
    }, (err, data) => {
      if (err) {
        console.error(err);
        // here we could resolve to an default fragment.html
        reject(err);
      }

      const fragment = data.Body.toString();
      resolve(fragment);
    });
  });
}


module.exports = app;
