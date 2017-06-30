/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/**
	 * Toolkit JavaScript
	 */

	'use strict';

	$(document).ready(function () {
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

	    function rgb2yuv(rgb) {
	        var y = clamp(rgb.r * 0.29900 + rgb.g * 0.587 + rgb.b * 0.114);
	        var u = clamp(rgb.r * -0.16874 + rgb.g * -0.33126 + rgb.b * 0.50000 + 128);
	        var v = clamp(rgb.r * 0.50000 + rgb.g * -0.41869 + rgb.b * -0.08131 + 128);
	        return { y: y, u: u, v: v };
	    }

	    function yuv2rgb(yuv) {
	        var y = yuv.y;
	        var u = yuv.u;
	        var v = yuv.v;
	        var r = clamp(y + (v - 128) * 1.40200);
	        var g = clamp(y + (u - 128) * -0.34414 + (v - 128) * -0.71414);
	        var b = clamp(y + (u - 128) * 1.77200);
	        return { r: r, g: g, b: b };
	    }

	    function clamp(n) {
	        if (n < 0) {
	            return 0;
	        }
	        if (n > 255) {
	            return 255;
	        }
	        return Math.floor(n);
	    }

	    $('.navbar-branded-inverse').each(function () {
	        var brandColor = $(this).attr('data-brand');
	        if (!brandColor) {
	            brandColor = "#000000";
	        }
	        var inverseColor = invertCssColor(brandColor);
	        var navbarCss = ".navbar-branded-inverse { background-color:" + brandColor + ";}" + ".navbar-branded-inverse { border-color:" + brandColor + ";}" + ".navbar-branded-inverse .navbar-nav > li > a, .navbar-branded-inverse .navbar-brand { color:" + inverseColor + ";}" + " .navbar-branded-inverse .navbar-nav > li > a:hover { background-color: " + inverseColor + "; color: " + brandColor + ";}" + ".navbar-branded-inverse .navbar-nav > .active > a, .navbar-branded-inverse .navbar-nav > .active > a:hover, .navbar-branded-inverse .navbar-nav > .active > a:focus, .navbar-branded-inverse .navbar-nav > .open > a, .navbar-branded-inverse .navbar-nav > .open > a:hover,.navbar-branded-inverse .navbar-nav > .open > a:focus { background: " + inverseColor + "; color: " + brandColor + "; }" + ".navbar-branded-inverse .dropdown-menu > li > a:hover, .navbar-branded-inverse .dropdown-menu > li > a:focus { background: " + brandColor + "; color: " + inverseColor + "; }";

	        // TODO: write CSS for mobile menu button
	        writePageCss(navbarCss);
	    });

	    $('.navbar-branded').each(function () {
	        var brandColor = $(this).attr('data-brand');
	        if (!brandColor) {
	            brandColor = "#000000";
	        }
	        var inverseColor = invertCssColor(brandColor);
	        var navbarCss = ".navbar-branded { border-top: 5px solid " + brandColor + "}" + ".navbar-branded .navbar-nav > li > a, .navbar-branded .navbar-brand { color:" + brandColor + ";}" + ".navbar-branded .navbar-nav > li > a:hover { background-color: " + brandColor + "; color: " + inverseColor + ";}" + ".navbar-branded .navbar-nav > .active > a, .navbar-branded .navbar-nav > .active > a:hover, .navbar-branded .navbar-nav > .active > a:focus, .navbar-branded .navbar-nav > .open > a, .navbar-branded .navbar-nav > .open > a:hover,.navbar-branded .navbar-nav > .open > a:focus { background: " + brandColor + "; color: " + inverseColor + "; }" + ".navbar-branded .dropdown-menu > li > a:hover, .navbar-branded .dropdown-menu > li > a:focus { background: " + brandColor + "; color: " + inverseColor + "; }";

	        // TODO: write CSS for mobile menu button
	        writePageCss(navbarCss);
	    });

	    function writePageCss(content) {
	        $('head').append('<style type="text/css">' + content + '</style>');
	    }

	    $('.has-clear input[type="text"], .has-clear input[type="search"], .has-clear input[type="email"], .has-clear input[type="tel"]').on('input propertychange', function () {
	        var $this = $(this);
	        var visible = Boolean($this.val());
	        $this.siblings('.form-control-clear').toggleClass('hidden', !visible);
	    }).trigger('propertychange');

	    $('.form-control-clear').click(function () {
	        $(this).siblings('input').val('').trigger('propertychange').focus();
	    });
	});

/***/ }
/******/ ]);