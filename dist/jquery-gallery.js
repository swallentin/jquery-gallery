/*! jQuery Gallery - v0.1.0 - 2012-12-13
* https://github.com/swallentin/jquery-gallery
* Copyright (c) 2012 swallentin; Licensed MIT, GPL */

(function($) {
  "use strict";

  var Gallery = function(element, options) {

      this.$element = $(element);
      this.options = options;

      var that = this;
      var render = function(data) {
          $.each(data.items, function(i, item) {
            item.media.m = item.media.m.replace('_m', '_z');
            if(options.viewerTemplate) {
              var viewerHtml = options.viewerTemplate({
                url: item.media.m,
                heading: item.title,
                description: item.description
              });
              that.$element.find('.viewer').append(viewerHtml);
            }

            if(options.thumbnailTemplate) {
              var thumbnailhtml = options.thumbnailTemplate({
                url: item.media.m,
                target: '#' + that.$element.attr('id')
              });
              that.$element.find('.thumbnails').append(thumbnailhtml);
            }
          });

          that.$element.find('.thumbnails img').parent().addClass('loading');

          // that.$element.find('.viewer').imagesLoaded(function($images, $proper, $broken) {
          //   // callback provides three arguments:
          //   // $images: the jQuery object with all images
          //   // $proper: the jQuery object with properly loaded images
          //   // $broken: the jQuery object with broken images
          //   // `this` is a jQuery object of container
          //   console.log( $images.length + ' images total have been loaded in ' + $(this).attr('class') );
          //   console.log( $proper.length + ' properly loaded images' );
          //   console.log( $broken.length + ' broken images' );
          // });
          that.$element.find('.thumbnails').imagesLoaded().progress(function(isBroken, $images, $proper, $broken) {
            // function scope (this) is a jQuery object with image that has just finished loading
            // callback provides four arguments:
            // isBroken: boolean value of whether the loaded image (this) is broken
            // $images:  jQuery object with all images in set
            // $proper:  jQuery object with properly loaded images so far
            // $broken:  jQuery object with broken images so far
            $(this).parent().removeClass('loading');
            // console.log('Loading progress: ' + ($proper.length + $broken.length) + ' out of ' + $images.length);

          }).fail(function() {
            $(this).parent().removeClass('loading');
            $(this).parent().addClass('fail');
          }).done(function() {
            // console.log('all images has finished loading.');
          });

          options.effects && options.effects(that.$element);
          that.to(0);
        };

      $.getJSON(options.url, {
        format: 'json'
      }, render);

    };

  Gallery.prototype = {
    to: function(position) {
      var activePosition = this.activePosition(),
        type = position > activePosition ? 'next' : 'previous';
      return this.update(type, position);
    },
    update: function(type, next) {
      if(next == this.activePosition() || this.sliding) return;

      var $viewer = this.$element.find('.viewer'),
        $thumbnails = this.$element.find('.thumbnails'),
        $viewerChildren = $($viewer.children()),
        $thumbnailsChildren = $($thumbnails.children()),
        $next = $($viewerChildren[next]),
        $nextThumbnail = $($thumbnailsChildren[next]),
        $active = $viewer.find('.active'),
        direction = type == 'next' ? 'left' : 'right',
        that = this;

      this.sliding = true;
      if($next.hasClass('active')) return;

      if($.support.transition) {
        $next.addClass(type);
        $next[0].offsetWidth; // some weird stuff going on here
        $active.addClass(direction);
        $next.addClass(direction);
        this.$element.one($.support.transition.end, function() {
          $next.removeClass([type, direction].join(' ')).addClass('active');
          $active.removeClass('active');
          $active.removeClass(direction);

          $thumbnailsChildren.removeClass('active').stop().fadeTo(500, 0.5);
          $nextThumbnail.addClass('active').stop().fadeTo(500, 1);

          that.sliding = false;
        });
      } else {
        $('.viewer .item.active').fadeTo(500, 0, function() {
          $viewerChildren.removeClass('active');
          $next.addClass('active').fadeTo(500, 1);

          that.sliding = false;
        });
      }

      return this;
    },
    next: function() {
      // console.log('next()');
      var targetPosition = this.activePosition() + 1;

      if(targetPosition >= this.numberOfItems()) targetPosition = 0;

      return this.update('next', targetPosition);
    },
    previous: function() {
      // console.log('previous()');
      var targetPosition = this.activePosition() - 1;

      if(targetPosition <= 0) targetPosition = this.numberOfItems() - 1;

      return this.update('previous', targetPosition);
    },
    activePosition: function() {
      var $viewer = this.$element.find('.viewer'),
        $active = $viewer.find('.active'),
        children = $viewer.children(),
        activePosition = children.index($active);
      return activePosition;
    },
    numberOfItems: function() {
      return this.$element.find('.viewer').children().length;
    }
  };

  $.fn.gallery = function(option) {
    return this.each(function() {
    /*
    This snippet will ensure that only one gallery will be instantiated.
    the instantiated gallery object will then be stored on the dom element using the $().data()
    it will also extend the default options with the provided option
    */
      var $this = $(this),
        data = $this.data('gallery'),
        options = $.extend({}, $.fn.gallery.defaults, typeof option == 'object' && option);

      if(!data) {
        // Create a new gallery and store it in the element using jQuery key/value data() storage
        $this.data('gallery', (data = new Gallery(this, options)));
      }
      if(typeof option == 'number') {
        data.to(option);
      }
      if(typeof option == 'string') {
        data[option]();
      }
    });
  };

  $.fn.gallery.defaults = {
    viewerTemplate: function(data) {
      return "";
    },
    thumbnailTemplate: function(data) {
      return "";
    }
  };

  $.fn.gallery.Constructor = Gallery;

  // binding of events and stuff
  $(function() {

    $('body').on('click.gallery.navigate', '[data-action]', function(e) {
      // this is a bit hacky, simplied it translates into figure out the target gallery
      // and what action to send to the target. if the action is 'to' then figure out which
      // item to navigate to and send it as an option to the gallery
      // default option is navigating to previous or next
      var $this = $(this),
        target, $targetEl = $((target = $this.attr('data-element'))),
        action = $this.attr('data-action'),
        option = action;

      if(action == 'to') {
        var $active = $(this),
          children = $active.parent().children(),
          selectedPos = children.index($active);
        option = selectedPos;
      }
      $targetEl.gallery(option);
      e.preventDefault();
    });

  });

})(jQuery);