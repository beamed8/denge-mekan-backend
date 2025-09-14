export default ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {
          eager: [
            { width: 245, height: 138, crop: "fill" }, // thumbnail
            { width: 500, crop: "scale" }, // small
            { width: 750, crop: "scale" }, // medium
            { width: 1000, crop: "scale" }, // large
          ],
        },
        delete: {},
      },
    },
  },
});
