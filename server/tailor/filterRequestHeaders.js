const ACCEPT_HEADERS = [
  "accept-language",
  "referer",
  "user-agent",
  "x-request-uri",
  "x-request-host",
  "x-theme", // custom header for theming,
  "x-feature"
];

module.exports = (attributes, request) => {
  const { public: isPublic } = attributes;
  const { headers = {} } = request;
  // Headers are not forwarded to public fragment for security reasons
  return isPublic
    ? {}
    : ACCEPT_HEADERS.reduce((newHeaders, key) => {
      headers[key] && (newHeaders[key] = headers[key]);
      return newHeaders;
    }, {});
};
