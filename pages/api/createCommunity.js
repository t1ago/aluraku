const { SiteClient } = require('datocms-client');

const TOKEN_FULL = 'faafb08990d5b764903cddca82794f';

export default async (request, response) => {
  const client = new SiteClient(TOKEN_FULL);

  const record = await client.items.create({
    itemType: "968416",
    title: request.body.name,
    image_url: request.body.image,
    link: request.body.link,
    usercreator: request.body.creator || 't1ago'
  });

  response.json(record);
};