# jQuery Gallery

A simple jQuery gallery plugin that loads images from flickr.

See live demo @ http://swallentin.github.com/jquery-gallery/examples/index.html

## Quick start
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/swallentin/jquery-gallery/master/dist/jquery-gallery.min.js
[max]: https://raw.github.com/swallentin/jquery-gallery/master/dist/jquery-gallery.js

In your web page:

```js
  $('#gallery').gallery({
    url: 'http://api.flickr.com/services/feeds/photoset.gne?set=72157625970180048&nsid=50536211@N00&lang=en-us&jsoncallback=?',
    viewerTemplate: Handlebars.compile($("#viewer-template").html()),
    thumbnailTemplate: Handlebars.compile($("#thumbnail-template").html())
  });
```

## Installation

  $ git clone https://github.com/swallentin/jquery-gallery.git

## How to use the gallery jQuery widget

Add the following resources to you project,

 * jQuery >= 1.8 
 * handlebars ~ 1.0
 * lib/jquery.transitions.js
 * dist/jquery-gallery.js

The demo uses handlebars for templating.

The gallery widget assumes that you at minimum have the following html structure rendered do your DOM. So copy this into your DOM and get started.

```html
  <div id='gallery' class="gallery">
    <div class='viewer'>
    </div>
    <div class='control'>
      <button class='btn btn-previous btn-navigate navigate' target='#gallery' action='previous'>
        &laquo;
      </button>
      <button class='btn btn-next btn-navigate navigate' target='#gallery' action='next'>
        &raquo;
      </button>
    </div>
    <div class='thumbnails'>
     </div>
  </div>
```

When the basic HTML structure is in place you can apply the gallery functionality. This code will loads images from the provided url and then render all the images to the specified DOM-element.

```js
  $('#gallery').gallery({
    url: 'http://api.flickr.com/services/feeds/photoset.gne?set=72157625970180048&nsid=50536211@N00&lang=en-us&jsoncallback=?',
    viewerTemplate: Handlebars.compile($("#viewer-template").html()),
    thumbnailTemplate: Handlebars.compile($("#thumbnail-template").html())
  });
```

Trigger the gallery to navigate to the next item. 

```js
  $('#gallery').gallery('next');
```

Trigger the gallery to navigate to the previous item. 

```js
  $('#gallery').gallery('previous');
```

Trigger the gallery to navigate to specified item.

```js
  $('#gallery').gallery(12);
```


## Dependencies

 * jQuery 1.8.1
 * assets/js/libs/transition.js (Add's transition browser capabilities support)

## Features

  * Built using jQuery
  * Allows you to programmatically navigate between items
  * Configurable
  * Supports custom templating for rendering

## Known issues
 
 * No IE support, need to figure out why events navigation events are not triggered properly on MS browsers
 * Images are not vertically aligned
 * Not working with browsers that doesn't support transitions

## Backlog

 * Add IE support
 * Refactor out all effects code from the gallery.js file to allow customization of effects via the options parameter
 * Make images become vertically aligned
 * Add cycling/automatic toggle of images

## License
Copyright (c) 2012 swallentin  
Licensed under the MIT, GPL licenses.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

### Important notes
Please don't edit files in the `dist` subdirectory as they are generated via grunt. You'll find source code in the `src` subdirectory!

While grunt can run the included unit tests via PhantomJS, this shouldn't be considered a substitute for the real thing. Please be sure to test the `test/*.html` unit test file(s) in _actual_ browsers.

### Installing grunt
_This assumes you have [node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed already._

1. Test that grunt is installed globally by running `grunt --version` at the command-line.
1. If grunt isn't installed globally, run `npm install -g grunt` to install the latest version. _You may need to run `sudo npm install -g grunt`._
1. From the root directory of this project, run `npm install` to install the project's dependencies.


## Other

Tested in the following browsers

 * Chrome (Version 21.0.1180.75/Mac OS X Mountain Lion)
 * Safari (Version 6.0 (8536.25)/Mac OS X Mountain Lion)
 * Firefox (Version 11.0/Mac OS X Mountain Lion)
 * Chrome ( 21.0.1180.79/Windows 7 64-bit)
 * IE 8 (Version 8.0.7600.16385/Windows 7 64-bit) - Not working
 * IE 9 (Version 9.0.8112.16421/Windows 7 64-bit) - Not working
 * Firefox (Version 6.02/Windows 7 64-bit)
 * Safari (Version 5.1.7 (7524.57.2)/Windows 7 64-bit)

[Pivotal Tracker Project](https://www.pivotaltracker.com/projects/621365)
