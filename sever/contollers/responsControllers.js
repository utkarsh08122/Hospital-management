const jwt = require("jsonwebtoken");

const success = (statusCode, result, post) => {
  return {
    status: "ok",
    statusCode,
    result,
    post: post,
  };
};

const error = (statusCode, result) => {
  return {
    status: "error",
    statusCode,
    result,
  };
};

const generetAccessToken = (data) => {
  const AccessToken = jwt.sign(data, "123", {
    expiresIn: "1y",
  });
  return AccessToken;
};

const varifierAccessToken = (token) => {
  try {
    const data = jwt.verify(token, "123", function (err, decoded) {
      if (err) {
        return "AccessTokenexpired";
      }

      return decoded;
    });
    return data;
  } catch (e) {
    console.log("this is in access token ", e);
  }
};

module.exports = {
  success,
  error,
  generetAccessToken,
  varifierAccessToken,
};
