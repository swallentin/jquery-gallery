(function ($) {
  "use strict";

 var Gallery = function(element, options) {

  this.$element = $(element);
  this.options = options;
  this.currentIndex = 0;
  console.log('creating gallery');
  // var url = 'http://api.flickr.com/services/feeds/photoset.gne?set=72157625970180048&nsid=50536211@N00&lang=en-us&jsoncallback=?';
  // var url2 = 'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';
  // $.getJSON(url,
  //   {
  //     format: 'json'
  //   },
  //   function(data){
  //     $.each(data.items, function(i, item){
  //       var $container = $('<div />')
  //         .attr('class', 'container-thumbnail');
  //       $('<img />')
  //         .attr('src', item.media.m)
  //         .attr('class', 'thumbnail')
  //         .appendTo($container);

  //         $container
  //           .appendTo('.gallery');
  //     });
  //   }
  // );

 };

 Gallery.prototype = {
  to: function(position) {
    console.log('triggered gallery.to:', position);
    var $viewer = this.$element.find('.viewer')
        , $children = $($viewer.children())
        , $to = $($children[position]);

    $children.removeClass('selected');
    $to.addClass('selected');
  },
  next: function() {
    var targetPosition = this.selectedPosition()+1;

    if( targetPosition >= this.numberOfItems() )
      targetPosition = 0;

    this.to(targetPosition);
  },
  previous: function() {
    var targetPosition = this.selectedPosition()-1;

    if( targetPosition <= 0 )
      targetPosition = this.numberOfItems()-1;

    this.to(targetPosition);
  },
  selectedPosition: function() {
    var $viewer = this.$element.find('.viewer')
        , $selected = $viewer.find('.selected')
        , children = $viewer.children()
        , selectedPosition = children.index($selected);
    return selectedPosition;
  },
  numberOfItems: function() {
    return this.$element.find('.viewer').children().length;
  }
 }

 $.fn.gallery = function(option) {
  return this.each(function() {
    // this snippet will ensure that only one gallery will be instantiated
    // the instantiated gallery object will then be stored on the dom element using the $().data()
    // it will also extend the default options with the provided option
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

  $('.gallery')
    .mouseover(function() {
      $('.btn.thumbnail-control').stop().fadeTo(500, 1);
    })
    .mouseout(function() {
      $('.btn.thumbnail-control').stop().fadeTo(500, 0.9);
  });

  $('.container-thumbnail')
    .mouseover(function() {
      !$(this).hasClass('selected') && $(this).stop().fadeTo(500, 1);
    })
    .mouseout(function() {
      !$(this).hasClass('selected') && $(this).stop().fadeTo(500, 0.5);
    });

  $('body').on('click.gallery.thumbnail-control', '[action]', function ( e ) {
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
      var $selected = $(this)
      , children = $selected.parent().children()
      , selectedPos = children.index($selected);
      option = selectedPos;
    }

    $target.gallery(option);
    e.preventDefault();
  });


 });

})(jQuery);



