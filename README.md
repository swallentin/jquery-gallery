jquery-gallery

==========

A minimalistic jQuery widget gallery that loads images from flickr.

See live demo @ http://swallentin.github.com/jquery-gallery/

```js
  $('#gallery').gallery({
    url: 'http://api.flickr.com/services/feeds/photoset.gne?set=72157625970180048&nsid=50536211@N00&lang=en-us&jsoncallback=?',
    viewerTemplate: Handlebars.compile($("#viewer-template").html()),
    thumbnailTemplate: Handlebars.compile($("#thumbnail-template").html())
  });
```

## Installation

  $ git clone https://github.com/swallentin/Fi-Gallery.git

## Quick Start

The fastest way to get started using this jQuery widget is to clone this library and open demo/index.html in you favourite browser and editor.

## How to use the gallery jQuery widget

Add the following resources to you project,

 * jQuery >= 1.8 
 * assets/js/lib/transitions.js
 * assets/js/gallery.js

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


