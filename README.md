# catapult

Starting point for new web projects... 

**catapult** comes with a Gruntfile.js, preconfigured to minify images, concat and uglify js, compile scss. It also runs grunticon on svg icons and browser_sync if you're testing on multiple devices.

---

**catapult** consists of:

- [basicss](https://github.com/rnarian/basicss) which includes [normalize.css](https://github.com/necolas/normalize.css)
- [jQuery](https://github.com/jquery/jquery)
- [Modernizr](https://github.com/Modernizr/Modernizr)

## Usage

Install dependencies:

    $ npm install
    $ bower install

Build:

    $ grunt

Develop:

    $ grunt dev // or: grunt dev:sync
