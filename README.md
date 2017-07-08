# Gulp Prototype

## Purpose

This is a simple example of using Gulp with some NodeJS-based tools for application prototyping. This is primarily intended for creating a skeleton of the front-end code of an application that would be developed on some other platform (like Java). You could do something similar with static site tools like [Wintersmith](http://wintersmith.io/) or [Metalsmith](http://www.metalsmith.io/). The problem I usually run into with using tools like that is the plugin ecosystem often isn't well maintained, and I end up fighting with it instead of working.

## Using

After cloning and installing dependences, run:

    yarn start
    // or
    npm start

Open a browser and navigate to localhost:8080. It'll live reload as you edit. Edit to your heart's content.

## What to edit

Once cloned, the files you'll want to edit are:

+ gulpfile.js (specifically the fonts task, to copy over the fonts for your project)
+ package.json (to add and remove front end dependencies you want--I added a few I commonly use)
+ stylesheets/app.scss (entry point for the css)
+ javascripts/app.js (entry point for the scripts)
+ views/*.njk (Nunjucks templates that get rendered to actual pages)
+ site-data.json (available when rendering templates)

## Why do this instead of Webpack, Express, or something else?

If you work with developers that aren't using Node, it's nice if you can hand something over that can be reused. Someone could used the "compiled" front-end code to make JSP pages, or they could also pick out the Sass code and re-used it.
