const memoryLogger = (config, { strapi }) => {
  return async (ctx, next) => {
    await next();

    const mem = process.memoryUsage();
    const usedMB = (mem.rss / 1024 / 1024).toFixed(2);
    strapi.log.info(`Memory usage (RSS): ${usedMB} MB`);
  };
};

export default memoryLogger;
