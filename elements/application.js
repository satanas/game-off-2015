'use strict';

var Application = function() {
  this.value = 0;
  this.bonus = 0;
  this.name = null;
};

Application.prototype.constructor = Application;

Application.prototype.build = function() {
  if (this.value === 1) {
    this.name = 'Pure Ruby';
    this.bonus = singleBonus;
  } else if (this.value === 2) {
    this.name = 'Pure Javascript';
    this.bonus = singleBonus;
  } else if (this.value === 4) {
    this.name = 'Pure Java';
    this.bonus = singleBonus;
  } else if (this.value === 8) {
    this.name = 'Pure Python';
    this.bonus = singleBonus;
  } else if (this.value === 32) {
    this.name = 'Pure PHP';
    this.bonus = singleBonus;
  } else if (this.value === 5) {
    this.name = 'JRuby';
    this.bonus = doubleBonus;
  } else if (this.value === 12) {
    this.name = 'Jython';
    this.bonus = doubleBonus;
  } else if (this.value === 48) {
    this.name = 'PHP Web';
    this.bonus = doubleBonus;
  } else if (this.value === 20) {
    this.name = 'JSP';
    this.bonus = doubleBonus;
  } else if (this.value === 17) {
    this.name = 'Ruby on Rails';
    this.bonus = doubleBonus;
  } else if (this.value === 24) {
    this.name = 'Django';
    this.bonus = doubleBonus;
  } else if (this.value === 18) {
    this.name = 'Express';
    this.bonus = doubleBonus;
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
