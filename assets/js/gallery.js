(function ($) {
  "use strict";

 var Gallery = function(element, options) {

  this.$element = $(element);
  this.options = options;

  var viewerTemplate = Handlebars.compile($("#viewer-template").html())
    , thumbnailTemplate = Handlebars.compile($("#thumbnail-template").html())
    , that = this;
  $.getJSON(options.url,
    {
      format: 'json'
    },
    function(data) {
      $.each(data.items, function(i, item) {
        var html = viewerTemplate({
          url: item.media.m
        });

        that.$element.find('.viewer').append(html);

        html = thumbnailTemplate({
          url: item.media.m,
          target: '#' + that.$element.attr('id')
        });
    
        that.$element.find('.thumbnails').append(html);

      });

      that.effects();
      that.to(0);
    }
  );

 };

 Gallery.prototype = {
  to: function(position) {
    var activePosition = this.activePosition()
    , type = position > activePosition ? 'next':'previous';
    return this.update(type, position);
  },
  update: function(type, next) {
    if( next == this.activePosition() || this.sliding) return;

    var $viewer = this.$element.find('.viewer')
        , $thumbnails = this.$element.find('.thumbnails')
        , $viewerChildren = $($viewer.children())
        , $thumbnailsChildren = $($thumbnails.children())
        , $next = $($viewerChildren[next])
        , $nextThumbnail = $($thumbnailsChildren[next])
        , $active = $viewer.find('.active')
        , direction = type == 'next' ? 'left' : 'right'
        , that = this;

    this.sliding = true;
    if($next.hasClass('active')) return;

    if( $.support.transition ) {
      $next.addClass(type);
      $next[0].offsetWidth;
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
        $children.removeClass('active');
        $next.addClass('active');
        $next.fadeTo(500, 1);
      });
    }
    return this;
  },
  next: function() {
    var targetPosition = this.activePosition()+1;

    if( targetPosition >= this.numberOfItems() )
      targetPosition = 0;

    // return this.to(targetPosition);
    return this.update('next', targetPosition);
  },
  previous: function() {
    var targetPosition = this.activePosition()-1;

    if( targetPosition <= 0 )
      targetPosition = this.numberOfItems()-1;

    // return this.to(targetPosition);
    return this.update('previous', targetPosition);
  },
  activePosition: function() {
    var $viewer = this.$element.find('.viewer')
        , $active = $viewer.find('.active')
        , children = $viewer.children()
        , activePosition = children.index($active);
    return activePosition;
  },
  numberOfItems: function() {
    return this.$element.find('.viewer').children().length;
  },
  effects: function() {
    // apply effects
    this.$element
      .mouseover(function() {
        $('.btn-navigate').stop().fadeTo(500, 1);
      })
      .mouseout(function() {
        $('.btn-navigate').stop().fadeTo(500, 0);
    });

    this.$element.find('.thumbnail')
      .mouseover(function() {
        !$(this).hasClass('active') && $(this).stop().fadeTo(500, 1);
      })
      .mouseout(function() {
        !$(this).hasClass('active') && $(this).stop().fadeTo(500, 0.5);
      });
  }
 }

 $.fn.gallery = function(option) {
  return this.each(function() {
    /* 
    This snippet will ensure that only one gallery will be instantiated.
    the instantiated gallery object will then be stored on the dom element using the $().data()
    it will also extend the default options with the provided option
    */
    var $this = $(this)
    , data = $this.data('gallery')
    , options = $.extend({}, $.fn.gallery.defaults, typeof option == 'object' && option);
    if(!data) $this.data('gallery', (data = new Gallery(this, options)));
    if (typeof option == 'number') data.to(option);
    else if (typeof option == 'string') data[option]();
  })
 }

 $.fn.gallery.defaults = {

 }

 $.fn.gallery.Constructor = Gallery;

 // binding of events and stuff
 $(function() {



  $('body').on('click.gallery.navigate', '[action]', function ( e ) {
    // this is a bit hacky, simplied it translates into figure out the target gallery
    // and what action to send to the target. if the action is 'to' then figure out which
    // item to navigate to and send it as an option to the gallery
    // default option is navigating to previous or next
    var $this = $(this)
      , target
      , $target = $((target = $this.attr('target')))
      , action = $this.attr('action')
      , option = action;

    if( action == 'to' ) {
      var $active = $(this)
      , children = $active.parent().children()
      , selectedPos = children.index($active);
      option = selectedPos;
    }

    $target.gallery(option);
    e.preventDefault();
  });

 });

})(jQuery);
