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

export default {
  async afterCreate(event: any) {
    const { result } = event;

    if (result.provider !== "cloudinary") return;

    const formats = generateFormats(result.url);

    // Strapi v5 query API kullanarak güncelle
    await strapi.db.query("plugin::upload.file").update({
      where: { id: result.id },
      data: { formats },
    });
  },
};
