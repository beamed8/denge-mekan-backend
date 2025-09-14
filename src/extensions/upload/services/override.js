import { v2 as cloudinary } from "cloudinary";

export default (plugin) => {
  // Upload image override
  const uploadImage = plugin.services.upload.upload;

  plugin.services.upload.upload = async function (files) {
    const result = await uploadImage.call(this, files);

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

function generateFormats(url) {
  return {
    thumbnail: {
      url: transform(url, { width: 245, height: 138, crop: "fill" }),
    },
    small: {
      url: transform(url, { width: 500, crop: "scale" }),
    },
    medium: {
      url: transform(url, { width: 750, crop: "scale" }),
    },
    large: {
      url: transform(url, { width: 1000, crop: "scale" }),
    },
  };
}

function transform(url, options) {
  // URL'yi Cloudinary transform formatına çevir
  // Örn: https://res.cloudinary.com/<cloud_name>/image/upload/...
  const parts = url.split("/upload/");
  return `${parts[0]}/upload/c_${options.crop},w_${options.width}${
    options.height ? ",h_" + options.height : ""
  }/${parts[1]}`;
}
