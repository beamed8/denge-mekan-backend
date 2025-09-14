export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",

  // Custom middleware for memory usage
  async (ctx, next) => {
    await next();

    const mem = process.memoryUsage();
    const usedMB = (mem.rss / 1024 / 1024).toFixed(2);
    strapi.log.info(`Memory usage (RSS): ${usedMB} MB`);
  },
];
