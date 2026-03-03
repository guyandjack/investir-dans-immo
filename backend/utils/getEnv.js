const getEnv = () => {
  const nodeEnv = process.env.NODE_ENV;

  if (!nodeEnv) {
    return { valid: false, env: null };
  }

  return {
    valid: true,
    env: nodeEnv === "development" ? "dev" : "prod",
  };
};

module.exports = { getEnv };
