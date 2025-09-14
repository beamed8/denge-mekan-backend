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
  const oldUpload = plugin.services.upload.upload;

  plugin.services.upload.upload = async function (files) {
    const result = await oldUpload.call(this, files);

    if (Array.isArray(result)) {
      result.forEach((file) => {
        if (file.provider === "cloudinary") {
          file.formats = generateFormats(file.url);
        }
      });
    } else if (result?.provider === "cloudinary") {
      result.formats = generateFormats(result.url);
    }

    return result;
  };

  return plugin;
};
