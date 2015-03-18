# A todo app using RiotJS and Rails

This application is for demonstration, not for production use.

# PREREQUISITES

* Ruby 2.0 or later
* [Node.js](https://nodejs.org/)
* [bower](http://bower.io/)
* [gulp](http://gulpjs.com/)

You can install bower and gulp as below:

```
$ sudo npm install --global bower gulp
```

# INSTALLATION

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
