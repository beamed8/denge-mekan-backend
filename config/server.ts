// config/server.ts
export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    // APP_KEYS, env'de virgülle ayrılmış şekilde verilecek: key1,key2,key3
    keys: env.array("APP_KEYS", ["defaultKey1", "defaultKey2", "defaultKey3"]),
  },
});
