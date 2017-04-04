/**
 * Toolkit JavaScript
 */

'use strict';

// plugins
require("script!./plugins/jquery-1.11.3");
require('./plugins/bootstrap');

// modules
require('./modules/globals');


$(document).ready(function() {
	function invertCssColor(color) {
    var rgb = invertColor(hexColor2rgb(color));
    return rgb2hexColor(rgb);
  }

  function invertColor(rgb) {
      var yuv = rgb2yuv(rgb);
      var factor = 255;
      var threshold = 100;
      yuv.y = clamp(yuv.y + (yuv.y > threshold ? -factor : factor));
      return yuv2rgb(yuv);
  }

  function rgb2hexColor(rgb) {
      return '#' + dec2hex(rgb.r) + dec2hex(rgb.g) + dec2hex(rgb.b);
  }

  function hexColor2rgb(color) {
      color = color.substring(1); // remove #
      return {
          r: parseInt(color.substring(0, 2), 16),
          g: parseInt(color.substring(2, 4), 16),
          b: parseInt(color.substring(4, 6), 16)
      };
  }

  function rgb2hexColor(rgb) {
      return '#' + dec2hex(rgb.r) + dec2hex(rgb.g) + dec2hex(rgb.b);
  }

  function dec2hex(n) {
      var hex = n.toString(16);
      if (hex.length < 2) {
          return '0' + hex;
      }
      return hex;
  }

  function rgb2yuv(rgb){
    var y = clamp(rgb.r *  0.29900 + rgb.g *  0.587   + rgb.b * 0.114);
    var u = clamp(rgb.r * -0.16874 + rgb.g * -0.33126 + rgb.b * 0.50000 + 128);
    var v = clamp(rgb.r *  0.50000 + rgb.g * -0.41869 + rgb.b * -0.08131 + 128);
    return {y:y, u:u, v:v};
  }

  function yuv2rgb(yuv){
    var y = yuv.y;
    var u = yuv.u;
    var v = yuv.v;
    var r = clamp(y + (v - 128) *  1.40200);
    var g = clamp(y + (u - 128) * -0.34414 + (v - 128) * -0.71414);
    var b = clamp(y + (u - 128) *  1.77200);
    return {r:r,g:g,b:b};
  }

  function clamp(n){
      if (n<0) { return 0;}
      if (n>255) { return 255;}
      return Math.floor(n);
  }

  $('.navbar-branded').each(function(){
		var brandColor = $(this).attr('data-brand');
		if (!brandColor){
			brandColor = "#000000";
		}
		var inverseColor = invertCssColor(brandColor);
		var navbarCss = ".navbar-branded { background-color:" + brandColor + ";}" +
										".navbar-branded { border-color:" + inverseColor + ";}" +
										".navbar-branded .navbar-nav > li > a, .navbar-branded .navbar-brand { color:" + inverseColor + ";}" +
										" .navbar-branded .navbar-nav > li > a:hover { background-color: " + inverseColor +"; color: " + brandColor + ";}" +
										".navbar-branded .navbar-nav > .active > a, .navbar-branded .navbar-nav > .active > a:hover, .navbar-branded .navbar-nav > .active > a:focus, .navbar-branded .navbar-nav > .open > a, .navbar-branded .navbar-nav > .open > a:hover,.navbar-branded .navbar-nav > .open > a:focus { background: " + inverseColor + "; color: " + brandColor + "; }" +
										".navbar-branded .dropdown-menu > li > a:hover, .navbar-branded .dropdown-menu > li > a:focus { background: " + brandColor + "; color: " + inverseColor +"; }";

										// TODO: write CSS for mobile menu button, lol
		writePageCss(navbarCss);
	})


	function writePageCss(content){
		$('head').append('<style type="text/css">' + content + '</style>');
	}



});
