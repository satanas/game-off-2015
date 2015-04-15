'use strict';

var Application = function() {
  this.bugs = 0;
  this.value = 0;
  this.bonus = 0;
  this.name = null;
};

Application.prototype.constructor = Application;

Application.prototype.build = function() {
  if (this.bugs >= game.global.bugsToRollback) {
    this.name = 'Rollback';
    this.bonus = game.global.bonus.rollback;
  } else if (this.value === 1) {
    this.name = 'Pure Ruby';
    this.bonus = game.global.bonus.ultra;
  } else if (this.value === 2) {
    this.name = 'Pure Javascript';
    this.bonus = game.global.bonus.ultra;
  } else if (this.value === 4) {
    this.name = 'Pure Java';
    this.bonus = game.global.bonus.ultra;
  } else if (this.value === 8) {
    this.name = 'Pure Python';
    this.bonus = game.global.bonus.ultra;
  } else if (this.value === 32) {
    this.name = 'Pure PHP';
    this.bonus = game.global.bonus.ultra;
  } else if (this.value === 5) {
    this.name = 'JRuby';
    this.bonus = game.global.bonus.ultra;
  } else if (this.value === 12) {
    this.name = 'Jython';
    this.bonus = game.global.bonus.ultra;
  } else if (this.value === 21 || this.value === 23) {
    this.name = 'JRuby Web';
    this.bonus = game.global.bonus.super;
  } else if (this.value === 30 || this.value === 28) {
    this.name = 'Jython Web';
    this.bonus = game.global.bonus.super;
  } else if (this.value === 80 || this.value === 82 || this.value === 18) {
    this.name = 'Standard Web';
    this.bonus = game.global.bonus.super;
  } else if (this.value === 48 || this.value === 34 || this.value === 50) {
    this.name = 'PHP Web';
    this.bonus = game.global.bonus.super;
  } else if (this.value === 20 || this.value === 22 || this.value === 6) {
    this.name = 'JSP';
    this.bonus = game.global.bonus.super;
  } else if (this.value === 17 || this.value === 19 || this.value === 3) {
    this.name = 'Ruby on Rails';
    this.bonus = game.global.bonus.super;
  } else if (this.value === 24 || this.value === 26 || this.value === 10) {
    this.name = 'Django';
    this.bonus = game.global.bonus.super;
  } else if (this.value === 18) {
    this.name = 'Express';
    this.bonus = game.global.bonus.super;
  } else {
    this.name = 'Unknown app';
  }
};

Application.prototype.addCode = function(block) {
  if (block.language.isRuby()) {
    this.addRuby();
  } else if (block.language.isJavascript()) {
    this.addJavascript();
  } else if (block.language.isJava()) {
    this.addJava();
  } else if (block.language.isPython()) {
    this.addPython();
  } else if (block.language.isHTML()) {
    this.addHTML();
  } else if (block.language.isPHP()) {
    this.addPHP();
  } else if (block.language.isBug()) {
    this.addBug();
  }
};

Application.prototype.addRuby = function() {
  this.value = this.value | 1;
};

Application.prototype.addJavascript = function() {
  this.value = this.value | 2;
};

Application.prototype.addJava = function() {
  this.value = this.value | 4;
};

Application.prototype.addPython = function() {
  this.value = this.value | 8;
};

Application.prototype.addHTML = function() {
  this.value = this.value | 16;
};

Application.prototype.addPHP = function() {
  this.value = this.value | 32;
};

Application.prototype.addBug = function() {
  this.bugs += 1;
};
