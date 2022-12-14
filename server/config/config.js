// This file is to configure the JWT that will be used in conjunction with passport

module.exports = {
  // The field jwtSecret keeps a secret key string that serves as a base to encode and decode the tokens
  jwtSecret: "MyJwtS3cr3tK3Y",
  // jwtSession has the object {session: false} and this item is used to inform Passport that the API won’t manage session
  jwtSession: {
    session: false,
  },
};
