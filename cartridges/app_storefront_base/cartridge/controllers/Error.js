'use strict';

var server = require('server');
var system = require('dw/system/System');
var Resource = require('dw/web/Resource');

server.use('Start', function (req, res, next) {
    res.setStatusCode(500);
    var showError = system.getInstanceType() !== system.PRODUCTION_SYSTEM
        && system.getInstanceType !== system.STAGING_SYSTEM;
    res.render('error', {
        error: req.error || {},
        showError: showError,
        message: Resource.msg('subheading.error.general', 'error', null)
    });
    next();
});

module.exports = server.exports();
