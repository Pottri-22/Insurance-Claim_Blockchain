export const blockIfFirstLogin = (req, res, next) => {
  try {
    if (req.user.isFirstLogin) {
      return res.status(403).json({
        message: "Please complete your profile before accessing this feature",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Access check failed" });
  }
};
