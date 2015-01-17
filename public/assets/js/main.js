(function ($) {
  'use strict';

  var App = {},
      arrows = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
      },
      cube = $('.jsconfuy-cube .perspective .cube'),
      title = $('.jsconfuy-cube .title');

  App.controllers = {
    homeView: function () {
      App.sections.HOME.$el.showPage();
      App.sections.HOME.section.trigger('click');
      cube.removeClass('pull-left');
      title.html('');
    },
    cfpView: function () {
      App.sections.CFP.$el.showPage();
      App.sections.CFP.section.trigger('click');
      cube.addClass('pull-left');
      title.html('Call for proposals');
    },
    commingSoonView: function () {
      App.sections.COMMING_SOON.$el.showPage();
      App.sections.COMMING_SOON.section.trigger('click');
      cube.removeClass('pull-left');
      title.html('Comming soon');
    },
    twitterView: function () {
      App.sections.TWITTER.$el.showPage();
      App.sections.TWITTER.section.trigger('click');
      cube.removeClass('pull-left');
      title.html('Follow us!');
    }
  };

  App.sections = {
    CFP: {
      $el: $('section.cfp'),
      section: $('#left'),
      view: App.controllers.cfpView
    },
    HOME: {
      $el: $('section.home'),
      section: $('#reset'),
      view: App.controllers.homeView
    },
    COMMING_SOON: {
      $el: $('section.coming-soon'),
      section: $('#right'),
      view: App.controllers.commingSoonView
    },
    TWITTER: {
      $el: $('section.twitter'),
      section: $('#up'),
      view: App.controllers.twitterView
    }
  };

  $(document).on('keyup', function (e) {
    switch (e.which) {
      case arrows.LEFT:
        App.sections.CFP.view();
        break;
      case arrows.UP:
        App.sections.TWITTER.view();
        break;
      case arrows.RIGHT:
        App.sections.COMMING_SOON.view();
        break;
      case arrows.DOWN:
        App.sections.HOME.view();
        break;
    }
  });

  $.fn.showPage = function (page) {
    var $page = (typeof page === 'undefined') ? this : $(page);

    if ($page.hasClass('active')) {
      return this;
    }

    $('section.page').children().animate({
      opacity: 0,
      top: '-50px',
    }, 250, function () {
      $(this).css({opacity: 0, left: '-50px', top: 0})
        .parent().removeClass('active');
    });

    $('.perspective').one('transitionend', function () {
      $page.addClass('active').children().animate({
        opacity: 1,
        left: 0,
      }, 250);
    });

    return this;
  };

}(jQuery));
