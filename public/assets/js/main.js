(function ($) {
  'use strict';

  var App = {},
      arrows = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
      },
      $cube = $('.jsconfuy-cube .perspective .cube'),
      $title = $('.jsconfuy-cube .title');

  var View = function (_title, _view, _options) {
    this.id = View.prototype.uniqueID();

    this.title = _title;
    this.view = _view;

    this.options = $.extend({
      pullLeft: false
    }, _options);
  };
  View.prototype.uniqueID = function () {
    View.prototype.idCounter = View.prototype.idCounter || 0;
    View.prototype.idCounter += 1;
    return View.prototype.idCounter;
  };
  View.prototype.render = function () {
    var self = this;

    App.currentView = this.id;

    this.view.$el.showPage();
    this.view.section.trigger('click');

    $title.removeClass('active').html('');
    $cube.removeClass('pull-left');

    if (this.options.pullLeft) {
      $cube.addClass('pull-left');
    }

    $cube.one('transitionend', function () {
      var t = setTimeout(function () {
        $title.html(self.title);
        $title.addClass('active');
      }, 350);
    });
  };

  App.sections = {
    CFP: {
      $el: $('section.cfp'),
      section: $('#left')
    },
    HOME: {
      $el: $('section.home'),
      section: $('#reset')
    },
    COMMING_SOON: {
      $el: $('section.coming-soon'),
      section: $('#right')
    },
    TWITTER: {
      $el: $('section.twitter'),
      section: $('#up')
    }
  };

  App.controllers = {
    homeView: new View('', App.sections.HOME),
    cfpView: new View('Call for proposals', App.sections.CFP, {pullLeft: true}),
    commingSoonView: new View('Comming soon', App.sections.COMMING_SOON),
    twitterView: new View('Follow us!', App.sections.TWITTER)
  };

  $(document).on('keyup', function (e) {
    switch (e.which) {
      case arrows.LEFT:
        if (App.currentView !== App.controllers.cfpView.id) {
          App.controllers.cfpView.render();
        }
        break;
      case arrows.UP:
        if (App.currentView !== App.controllers.twitterView.id) {
          App.controllers.twitterView.render();
        }
        break;
      case arrows.RIGHT:
        if (App.currentView !== App.controllers.commingSoonView.id) {
          App.controllers.commingSoonView.render();
        }
        break;
      case arrows.DOWN:
        if (App.currentView !== App.controllers.homeView.id) {
          App.controllers.homeView.render();
        }
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
      $cube.trigger('transitionend');
      $page.addClass('active').children().animate({
        opacity: 1,
        left: 0,
      }, 250);
    });

    return this;
  };

}(jQuery));
