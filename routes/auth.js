// Import dependencies
const smtpTransport = require('nodemailer-smtp-transport');
const fs = require('fs');
const moment = require('moment');
const handlebars = require('handlebars');
const config = require('../config/settings');
const _      = require('lodash');
const jwt    = require('jsonwebtoken');
const authenticationHelpers = require('./authenticationHelpers');
const utilityFunctions = require('./utilityfunctions');

function readHTMLFile(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function(err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
}

/**
 * create authentication token
 * @param  {Object} user Create authentication token using user data
 */
function createToken(user) {
    return jwt.sign(_.omit(user, 'password'), config.secretKey, { expiresIn: 60*60*5 });
}

const validateEmail = utilityFunctions.validateEmail;

/**
 * utility function to send email using nodemailer
 * @param  {String}   recipient  recipient of mail
 * @param  {String}   subject    Subject of mail
 * @param  {String}   content    Content of mail
 * @param  {Object}   user       User object
 * @param  {Object}   nodemailer Module instance to send mail
 * @param  {Function} done       Callback function
 */
function sendEmail(recipient, subject, content, user, nodemailer, done) {
    const transport = nodemailer.createTransport(smtpTransport({
        service: config.nodeMailer.PROVIDER,
        auth: {
            user: config.nodeMailer.EMAIL,
            pass: config.nodeMailer.PASSWORD
        }
    }));
    const mailOptions = {
        to: recipient,
        from: config.nodeMailer.EMAIL,
        subject: subject,
        html: content
    };
    transport.sendMail(mailOptions, function(err) {
        done(err, user);
    });
}

module.exports = function(router, passport, async, nodemailer, crypto, models) {

    const localUser = models.user_account;
    /**
     * Handle local login
     * @param  {Object} req   Request object
     * @param  {Object} res   Response object
     * @param  {Object} next  Callback to the next function to be executed
     */
    router.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(200).json(info);
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                return res.status(200).json({user: user, token: createToken(user)});
            });
        })(req, res, next);
    });

    // Handle Google login
    router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

    // Handle callback after Google login
    router.get('/google/callback',
        passport.authenticate('google', { successRedirect: '/',
            failureRedirect: '/login' }));

    /**
     * Handle logout
     * @param  {Object} req  Request object
     * @param  {Object} res  Response object
     */
    router.get('/logout', authenticationHelpers.isAuthOrRedirect, function(req, res) {
        req.logout();
        res.json({loggedOut: req.isAuthenticated()});
    });

    /**
     * Create and send authentication token to client
     * @param  {Object} req  Request object
     * @param  {Object} res  Response object
     */
    router.get('/authenticated', authenticationHelpers.isAuth, function(req, res) {
        res.json({authenticated: true, token: createToken(req.user)});
    });

    /**
     * Handle forgot password and generate reset password token
     * @param  {Object} req  Request object
     * @param  {Object} res  Response object
     */
    router.post('/forgot', function(req, res) {
        if(!req.body.email || !validateEmail(req.body.email)) {
            return res.status(400).json({error: 'Email is invalid'});
        }
        async.waterfall([
            function(done) {
                crypto.randomBytes(20, function(err, buf) {
                    const token = buf.toString('hex');
                    done(err, token);
                });
            },
            function(token, done) {
                const user = {email: req.body.email};
                localUser.find({where: {
                    email: req.body.email,
                    provider: 'local'
                }}, {raw: true})
                    .then(data => {
                        if(!data) {
                            return res.status(200).json({info: 'This account does not exist or you cannot change the password for this account'});
                        }
                        const date = moment(moment.now() + 60*60*1000).format('YYYY-MM-DD HH:mm:ss');
                        localUser.update({
                            resetPasswordToken: token,
                            resetPasswordExpires: date
                        }, {
                            where: {
                                email: req.body.email,
                                provider: 'local'
                            }
                        })
                            .then(function(updateData) {
                                readHTMLFile('./public/pages/forgot-password.html', function(err, html) {
                                    const template = handlebars.compile(html);
                                    const replacements = {
                                        host: req.headers.host,
                                        token: token,
                                        name: data.fname
                                    };
                                    const htmlToSend = template(replacements);
                                    const to = req.body.email;
                                    const subject = 'PC PREP KIT Password Reset';
                                    sendEmail(to, subject, htmlToSend, user, nodemailer, done);
                                });
                            })
                            .catch(function(err) {
                                return res.status(500).json({error: 'Something went wrong'});
                            });
                    }).catch(function(err) {
                        return res.status(500).json({error: 'Something went wrong'});
                    });
            }
        ],
        function(err, user) {
            if(err) {
                return res.status(500).json({error: 'Something went wrong'});
            }
            const successMessage = `An e-mail has been sent to ${user.email} with further instructions`;
            return res.status(200).json({success: successMessage});
        });
    });

    /**
     * Check validity of reset password token
     * @param  {Object} req  Request object
     * @param  {Object} res  Response object
     */
    router.get('/reset/:token', function(req, res) {
        if(!req.params.token) {
            return res.status(400).json({error: 'Password reset token is invalid or has expired'});
        }
        localUser.find({where: {
            resetPasswordToken: req.params.token,
            provider: 'local',
            resetPasswordExpires: {
                $gte: Date.now()
            }
        }}, {raw: true})
            .then(data => {
                if(!data) {
                    return res.status(200).json({info: 'Password reset token is invalid or has expired'});
                }
                res.redirect(`/reset/${req.params.token}`);
            }).catch(function(err) {
                return res.status(500).json({error: 'Something went wrong'});
            });
    });

    /**
     * Handle resetting the password
     * @param  {Object} req  Request object
     * @param  {Object} res  Response object
     */
    router.put('/reset/:token', function(req, res) {
        async.waterfall([
            function(done) {
                localUser.find({where: {
                    resetPasswordToken: req.params.token,
                    resetPasswordExpires: {
                        $gte: Date.now()
                    }
                }}, {raw: true})
                    .then(data => {
                        if(!data) {
                            return res.status(200).json({info: 'Password reset token is invalid or has expired'});
                        }
                        const user = {email: data.email};
                        localUser.update({
                            resetPasswordToken: null,
                            resetPasswordExpires: null,
                            password: req.body.password
                        }, {
                            where: {
                                resetPasswordToken: req.params.token,
                                provider: 'local'
                            }
                        })
                            .then(updateData => {
                                if(!updateData) {
                                    return res.status(500).json({error: 'Something went wrong'});
                                }
                                readHTMLFile('./public/pages/password-reset-success.html', function(err, html) {
                                    const template = handlebars.compile(html);
                                    const replacements = {
                                        email: user.email,
                                        name: data.fname
                                    };
                                    const htmlToSend = template(replacements);
                                    const to = user.email;
                                    const subject = 'Your password has been changed';
                                    sendEmail(to, subject, htmlToSend, user, nodemailer, done);
                                });
                            }).catch(function(err) {
                                return res.status(500).json({error: 'Something went wrong'});
                            });
                    }).catch(function(err) {
                        return res.status(500).json({error: 'Something went wrong'});
                    });
            }
        ],
        function(err, user) {
            if (err) {
                return res.status(500).json({error: 'Something went wrong'});
            }
            return res.status(200).json({success: 'Success! Your password has been changed.'});
        });
    });
};
