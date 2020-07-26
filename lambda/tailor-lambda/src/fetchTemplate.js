const AWS = require("aws-sdk");

module.exports = (request, parseTemplate) => {
  const templateName = request.apiGateway.event.pathParameters.template;
  const s3 = new AWS.S3({apiVersion: '2006-03-01'});
  const s3BucketName = process.env.TEMPLATE_BUCKET_NAME;

  return new Promise((resolve, reject) => {
    if (templateName === "favicon.ico") resolve("");
    s3.getObject({
      Bucket: s3BucketName,
      Key: `${templateName}.html`
    }, (err, data) => {
      if (err) {
        console.error(err);
        // here we could resolve to an error page template
        reject(err);
      }

      const template = data.Body.toString();
      resolve(parseTemplate(template));
    })
  });
}
