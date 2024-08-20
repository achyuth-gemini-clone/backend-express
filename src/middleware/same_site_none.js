// const setSameSiteNone = (req, res, next) => {
//   const originalCookie = req.cookies;

//   if (process.env.ENVIRONMENT == "PROD") {
//     req.cookie = (...args) => {
//       const [name, value, options = {}] = args;

//       // Ensure sameSite is set to 'None' if not already specified
//       options.sameSite = options.sameSite || "None";
//       options.secure = options.secure !== undefined ? options.secure : true; // Ensure secure attribute
//       options.domain = "achyuthvarmap.com";

//       originalCookie.call(req, name, value, options);
//     };
//   }

//   next();
// };

// export { setSameSiteNone };
