import { v2 as cloudinary } from "cloudinary";

const generateFormats = (url: string) => ({
  thumbnail: {
    url: transform(url, { width: 245, height: 138, crop: "fill" }),
  },
  small: { url: transform(url, { width: 500, crop: "scale" }) },
  medium: { url: transform(url, { width: 750, crop: "scale" }) },
  large: { url: transform(url, { width: 1000, crop: "scale" }) },
});

const transform = (url: string, options: any) => {
  const parts = url.split("/upload/");
  return `${parts[0]}/upload/c_${options.crop},w_${options.width}${
    options.height ? ",h_" + options.height : ""
  }/${parts[1]}`;
};

export default (plugin) => {
  const { events } = plugin.services.upload;

  // afterUploadFile event
  events.on("afterUploadFile", async ({ file }) => {
    if (file.provider !== "cloudinary") return;

    // Cloudinary eager sonucu ile formats oluştur
    const formats: Record<string, { url: string }> = {};

    if (file?.metadata?.eager && Array.isArray(file.metadata.eager)) {
      const eager = file.metadata.eager;
      if (eager[0]) formats.thumbnail = { url: eager[0].secure_url };
      if (eager[1]) formats.small = { url: eager[1].secure_url };
      if (eager[2]) formats.medium = { url: eager[2].secure_url };
      if (eager[3]) formats.large = { url: eager[3].secure_url };
    }

    // DB update
    if (Object.keys(formats).length > 0) {
      await strapi.db.query("plugin::upload.file").update({
        where: { id: file.id },
        data: { formats },
      });
    }
  });

  return plugin;
};
