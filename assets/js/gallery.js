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

  },
  next: function() {
    console.log('next');
  },
  previous: function() {
    console.log('previous');
  },
  add: function(item) {
    console.log('adding');
  }
 }

 $.fn.gallery = function(option) {
  return this.each(function() {
    // this snippet will ensure that only one gallery will be instantiated
    // the instantiated gallery object will then be stored on the dom element using the $().data()
    // it will also extend the default options with the provided option
    console.log(option);
    var $this = $(this)
    , data = $this.data('gallery')
    , options = $.extend({}, $.fn.gallery.defaults, typeof option == 'object' && option);
    if(!data) {
      $this.data('gallery', (data = new Gallery(this, options)));
    if (typeof option == 'number') data.to(option)
    else if (typeof option == 'string') data[option]()

    }
  })
 }

 $.fn.gallery.defaults = {

 }

 $.fn.gallery.Constructor = Gallery;

 // binding of events and stuff
 $(function() {

  $('.container-thumbnail').click(function(){

    $('.container-thumbnail').removeClass('selected');

    $(this).addClass('selected');

      // var $active = this.$element.find('.active')
      //   , children = $active.parent().children()
      //   , activePos = children.index($active)
      //   , that = this


    // // $target.gallery(option);

    // e.preventDefault();

    $('.current').attr('src', $(this).attr('src'));
  });

  $('.container-thumbnail')
    .mouseover(function() {
      !$(this).hasClass('selected') && $(this).stop().fadeTo(500, 1);
    })
    .mouseout(function() {
      !$(this).hasClass('selected') && $(this).stop().fadeTo(500, 0.5);
    });

  // $('.container-thumbnail').hover(function() {
  //   $(this.)
  // }), function() {

  // });

  // $('.page').click(function(){
  //   $(this).addClass('active');
  // });

  $('body').on('click.gallery.thumbnail-control', '[action]', function ( e ) {
    // console.log('clicked');
    var $this = $(this)
      , href
      , $target = $((href = $this.attr('href')))
      , option = $this.attr('action');

    $target.gallery(option);

    e.preventDefault();
  });


 });

})(jQuery);



