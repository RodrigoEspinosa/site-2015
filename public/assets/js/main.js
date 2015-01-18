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
      $title = $('.jsconfuy-cube .title'),
      mc;

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

    this.showPage();
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
  View.prototype.showPage = function () {
    var self = this,
        $page = this.view.$el;

    $('section.page').each(function () {
      $(this).removeClass('active').children().animate({
        opacity: 0,
        top: '-50px',
      }, 250, function () {
        $(this).css({opacity: 0, left: '-50px', top: 0});
      });
    });

    if (typeof App.firstLoad === 'undefined') {
      App.firstLoad = false;
      $page.addClass('active').children().animate({
        opacity: 1,
        left: 0,
      }, 250);
    } else {
      $('.perspective').one('transitionend', function (e) {
        $cube.trigger('transitionend');
        $page.addClass('active').children().animate({
          opacity: 1,
          left: 0,
        }, 250);
      });
    }
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
  App.controllers.homeView.render();

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

  $('body').hammer()  
    .bind('panleft panright panup pandown', function(ev) {
      this.panEvent = ev.type;
    })
    .bind('panend', function(ev) {
      if (this.panEvent) {

        switch (this.panEvent) {
          case 'panleft':
            if (App.currentView !== App.controllers.cfpView.id) {
              App.controllers.cfpView.render();
            }
            break;
          case 'panup':
            if (App.currentView !== App.controllers.twitterView.id) {
              App.controllers.twitterView.render();
            }
            break;
          case 'panright':
            if (App.currentView !== App.controllers.commingSoonView.id) {
              App.controllers.commingSoonView.render();
            }
            break;
          case 'pandown':
            if (App.currentView !== App.controllers.homeView.id) {
              App.controllers.homeView.render();
            }
            break;
        }

        this.panEvent = void 0;
      }
    });

}(jQuery));
