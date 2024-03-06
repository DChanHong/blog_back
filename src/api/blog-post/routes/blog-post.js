"use strict";

/**
 * blog-post router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::blog-post.blog-post");

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/blog-posts/count",
      handler: "blog-post.count",
    },
    {
      method: "GET",
      path: "/blog-posts",
      handler: "blog-post.find",
    },
    {
      method: "GET",
      path: "/blog-posts/:id",
      handler: "blog-post.findOne",
    },
    {
      method: "GET",
      path: "/blog-posts/:page/:pageSize",
      handler: "blog-post.findMany",
    },
  ],
};
