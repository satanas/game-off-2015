'use strict';

var Language = function() {
  this.index = Math.floor(Math.random() * 6);
  this.points = 10;
  this.name = ['rb', 'js', 'java', 'py', 'html', 'php'][this.index];
};

Language.prototype.constructor = Language;

Language.prototype.isRuby = function() {
  return (this.index === 0) ? true : false;
};

Language.prototype.isJavascript = function() {
  return (this.index === 1) ? true : false;
};

Language.prototype.isJava = function() {
  return (this.index === 2) ? true : false;
};

Language.prototype.isPython = function() {
  return (this.index === 3) ? true : false;
};

Language.prototype.isHTML = function() {
  return (this.index === 4) ? true : false;
};

Language.prototype.isPHP = function() {
  return (this.index === 5) ? true : false;
};

Language.prototype.isBug = function() {
  return (this.index === 6) ? true : false;
};

Language.prototype.addBug = function() {
  this.index = 6;
  this.points = -(this.points);
  this.name = 'bug';
};
