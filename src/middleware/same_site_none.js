const setSameSiteNone = (req, res, next) => {
  const originalCookie = res.cookies;

  if (process.env.ENVIRONMENT == PROD) {
    res.cookie = (...args) => {
      const [name, value, options = {}] = args;

      // Ensure sameSite is set to 'None' if not already specified
      options.sameSite = options.sameSite || "None";
      options.secure = options.secure !== undefined ? options.secure : true; // Ensure secure attribute
      options.domain = "achyuthvarmap.com";

      originalCookie.call(res, name, value, options);
    };
  }

  next();
};

export { setSameSiteNone };
