'use strict';

require('./initializers/polyfills'); // defines key ECMAScript 5 methods that may be missing from older browsers, so must be loaded first.

var $ = window.jQuery = require('jquery');

var heightToHold = $('.docs__primary-nav').outerHeight(true);
var $navShell = $('.docs__nav-shell');
var $docsNav = $('.docs__nav');

$(window).on('scroll', function(){

  var heightToShift = $('.docs__intro').height();

  if( $(this).scrollTop() > heightToShift ) {
    $docsNav.addClass('docs__nav--fixed');
    $navShell.css('height', heightToHold);
  } else {
    $docsNav.removeClass('docs__nav--fixed');
    $navShell.removeAttr('style');
  }

});

console.log(heightToHold);
