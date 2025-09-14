export default (plugin) => {
  const oldUpload = plugin.services.upload.upload;

  plugin.services.upload.upload = async function (files) {
    const result = await oldUpload.call(this, files);

    const results = Array.isArray(result) ? result : [result];

    for (const file of results) {
      if (file.provider === "cloudinary" && file?.metadata?.eager) {
        const eager = file.metadata.eager;

        const formats: Record<string, { url: string }> = {};
        if (eager[0]) formats.thumbnail = { url: eager[0].secure_url };
        if (eager[1]) formats.small = { url: eager[1].secure_url };
        if (eager[2]) formats.medium = { url: eager[2].secure_url };
        if (eager[3]) formats.large = { url: eager[3].secure_url };

        if (Object.keys(formats).length > 0) {
          await strapi.db.query("plugin::upload.file").update({
            where: { id: file.id },
            data: { formats },
          });
        }
      }
    }

    return result;
  };

  return plugin;
};
