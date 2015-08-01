'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    // This makes `appname` a required argument.
    this.argument('appname', { type: String, required: true });
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
        this.destinationPath(path.join(this.appname, 'package.json')),
        this.props
      );
      this.fs.copy(
        this.templatePath('main.js'),
        this.destinationPath(path.join(this.appname, 'main.js'))
      );
      this.fs.copy(
        this.templatePath('src/main.cc'),
        this.destinationPath(path.join(this.appname, 'src/main.cc'))
      );
      this.fs.copy(
        this.templatePath('_binding.gyp'),
        this.destinationPath(path.join(this.appname, 'binding.gyp'))
      );
      this.fs.copy(
        this.templatePath('README.md'),
        this.destinationPath(path.join(this.appname, 'README.md'))
      );
    },
    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath(path.join(this.appname, '.editorconfig'))
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath(path.join(this.appname, '.jshintrc'))
      );
    }
  },

  install: function () {
    this.npmInstall()
  }
});
