"use strict";

var _           = require('underscore');
var express     = require('express');
var meetup      = require('meetup-api');
var path        = require('path');

var attendees = {};

var register = function(req, res) {
  var event_id = req.param('id');
  var member_id = req.param('member_id');
  var api = meetup(req.app.get('key'));

  var set_attendance = function() {
    var params = {
      urlname: req.app.get('group-name'),
      id: event_id,
      member: member_id,
      status: "attended"
    }
    api.takeEventAttendance(params, function(err, resp) {
      if (!err) { return; }
      console.log(JSON.stringify({ params: params, errors: resp.errors}));
    });
  };

  var get_rsvps = function(cb) {
    api.getRVSPs(
      { event_id: req.param('id') }, function(err, resp) {
        cb(_.reduce(resp.results, function(acc, rsvp) {
          acc[rsvp.member.name] = rsvp.member.member_id;
          return acc;
        }, {}));
      });
  };

  var _finish = function(attendees) {
    res.render('register', { attendees: JSON.stringify(attendees) });
  };

  if (req.param('member_id')) { set_attendance(); }

  get_rsvps(_finish);
};

var serve = exports.serve = function() {

  var app = express();

  app.configure(function() {
    app.set('group-name', process.env.GROUP_NAME);
    app.set('key', process.env.KEY);
    app.set('port', process.env.PORT || 9001);
    app.set('views', path.join(__dirname + '/../views'));
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, '/../public')));
  });

  app.configure('development', function(){
    app.use(express.errorHandler());
  });

  app.get("/register/:id", register);
  app.post

  // ------

  var server = app.listen(app.get('port'), function() {
    console.log("Listening on port " + app.get("port"));
  });

  return [ app, server ];
};
