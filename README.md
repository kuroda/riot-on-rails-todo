# A todo app using RiotJS and Rails

This application is for demonstration, not for production use.

# PREREQUISITES

Following softwares are required to run this application:

* Ruby 2.0 or later
* [Node.js](https://nodejs.org/)
* [bower](http://bower.io/)
* [gulp](http://gulpjs.com/)

## Install Node.js and npm

### On Mac OS X with Homebrew

```
$ brew install node
```

### On Ubuntu

```
$ sudo add-apt-repository ppa:chris-lea/node.js
$ sudo apt-get update
$ sudo apt-get install nodejs npm
```

## Install bower and gulp

```
$ sudo npm install --global bower gulp
$ sudo chown -R $(whoami) ~/.npm
```

# INSTALLATION OF THIS APPLICATION

```
$ git clone https://github.com/kuroda/riot-on-rails-todo.git
$ cd riot-on-rails-todo
$ cp config/skel/database.yml config/
$ bundle install
$ npm install
$ bower install
$ gulp
$ bin/rake db:setup
```

# USAGE

```
$ bin/rails s
```
