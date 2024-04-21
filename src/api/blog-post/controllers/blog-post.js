"use strict";

/**
 * blog-post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController("api::blog-post.blog-post");

module.exports = createCoreController("api::blog-post.blog-post", {
  count(ctx) {
    var { tag, search } = ctx.params;
    if (tag === "blank" && search === "blank") {
      return strapi.query("api::blog-post.blog-post").count({ where: {} });
    } else if (tag !== "blank") {
      return strapi.query("api::blog-post.blog-post").count({
        where: {
          tags: { $contains: [tag] },
        },
      });
    } else if (search !== "blank") {
      return strapi.query("api::blog-post.blog-post").count({
        where: {
          title: { $contains: `%${search}%` },
        },
      });
    }
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
      console.log(id);
      const data = await strapi.query("api::blog-post.blog-post").findOne({
        where: { id: id },
      });
      return ctx.send({ data });
    } catch (err) {
      return ctx.send(err);
    }
  },
  findMany: async (ctx) => {
    try {
      const { page, pageSize, tag, search } = ctx.params;
      let data;
      if (tag === "blank" && search === "blank") {
        data = await strapi.query("api::blog-post.blog-post").findMany({
          offset: page - 1,
          limit: pageSize,
        });
      } else if (tag !== "blank") {
        data = await strapi.query("api::blog-post.blog-post").findMany({
          where: {
            tags: { $contains: [tag] },
          },
          offset: (page - 1) * pageSize,
          limit: pageSize,
        });
      } else if (search !== "blank") {
        data = await strapi.query("api::blog-post.blog-post").findMany({
          where: {
            title: { $contains: `%${search}%` },
          },
          offset: (page - 1) * pageSize,
          limit: pageSize,
        });
      }
      return ctx.send({ data });
    } catch (error) {
      return ctx.send(error);
    }
  },
});
