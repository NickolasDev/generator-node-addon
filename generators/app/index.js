'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    // This makes `appname` a required argument.
    if(this.args[0]){
      this.destinationRoot(this.args[0]);
    }
  },
  prompting: function () {
    var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('NodeAddon') + ' generator!'
    ));

    var prompts = [{
        message: 'Name',
        name: 'name',
        validate: function (str) {
            return !!str;
        },
        default: 'myModule'
    },{
        message: 'Description',
        name: 'description',
        validate: function (str) {
            return !!str;
        },
        default: 'my nodejs module'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {

      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this.props
      );
      this.fs.copy(
        this.templatePath('main.js'),
        this.destinationPath('main.js')
      );
      this.fs.copy(
        this.templatePath('src/main.cc'),
        this.destinationPath('src/main.cc')
      );
      this.fs.copy(
        this.templatePath('_binding.gyp'),
        this.destinationPath('binding.gyp')
      );
      this.fs.copy(
        this.templatePath('README.md'),
        this.destinationPath('README.md')
      );
    },
    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.npmInstall()
  }
});
