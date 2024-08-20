const setSameSiteNone = (req, res, next) => {
  const originalCookie = res.cookies;

  res.cookie = (...args) => {
    const [name, value, options = {}] = args;

    // Ensure sameSite is set to 'None' if not already specified
    options.sameSite = options.sameSite || "None";
    options.secure = options.secure !== undefined ? options.secure : true; // Ensure secure attribute

    originalCookie.call(res, name, value, options);
  };

  next();
};

export { setSameSiteNone };
