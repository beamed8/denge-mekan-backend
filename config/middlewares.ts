export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",

  {
    name: "strapi::body",
    config: {
      formLimit: "10mb", // multipart/form-data max
      jsonLimit: "5mb", // application/json max
      textLimit: "5mb", // text/plain max
    },
  },

  "strapi::session",
  "strapi::favicon",
  "strapi::public",

  {
    resolve: "./src/middlewares/memory-logger",
  },
];
