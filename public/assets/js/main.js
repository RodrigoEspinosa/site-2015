(function ($) {
  'use strict';

  var LEFT_ARROW = 37,
      RIGHT_ARROW = 39,
      currentState = 1,
      App = {};

  App.controllers = {
    homeView: function () {
      $('#reset').trigger('click');
      $('section.home').showPage();
      // $('.jsconfuy-cube').css('left', 'calc(50% - 5em)');
    },
    cfpView: function () {
      $('#left').trigger('click');
      $('section.cfp').showPage();
      // var cubePosX = $('section.cfp').data('cube-pos-x');
      // alert(cubePosX);
      // $('.jsconfuy-cube').css('left', cubePosX);
    },
    commingSoonView: function () {
      $('#right').trigger('click');
      $('section.coming-soon').showPage();
      // $('.jsconfuy-cube').css('left', 'calc(50% - 5em)');
    },
    twitterView: function () {
      $('#up').trigger('click');
      $('section.twitter').showPage();
    }
  };

  App.views = {
    0: App.controllers.cfpView,
    1: App.controllers.homeView,
    2: App.controllers.commingSoonView,
    3: App.controllers.twitterView
  };

  $(document).on('keyup', function (event) {
    if (event.which === LEFT_ARROW) {
      currentState -= (currentState > 0) ? 1 : 0;
    } else if (event.which === RIGHT_ARROW) {
      currentState += (currentState < 3) ? 1 : 0;
    } else {
      return this;
    }

    // Reload the view
    App.views[currentState]();
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
