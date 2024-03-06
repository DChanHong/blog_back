"use strict";

/**
 * blog-post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController("api::blog-post.blog-post");

module.exports = createCoreController("api::blog-post.blog-post", {
  count(ctx) {
    var { query } = ctx.request;
    return strapi.query("api::blog-post.blog-post").count({ where: query });
  },
  find: async (ctx) => {
    try {
      const data = await strapi.query("api::blog-post.blog-post").findMany();
      return ctx.send({ data });
    } catch (err) {
      return ctx.send(err);
    }
  },
  findOne: async (ctx) => {
    try {
      const { id } = ctx.params;
      const data = await strapi.query("api::blog-post.blog-post").findOne(id);
      return ctx.send({ data });
    } catch (err) {
      return ctx.send(err);
    }
  },
  findMany: async (ctx) => {
    try {
      const { page, pageSize } = ctx.params;
      console.log(page, pageSize);
      const data = await strapi.query("api::blog-post.blog-post").findMany({
        offset: page - 1,
        limit: pageSize,
      });
      return ctx.send({ data });
    } catch (error) {
      return ctx.send(error);
    }
  },
});
