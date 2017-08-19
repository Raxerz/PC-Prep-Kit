const express = require('express');
const router = express.Router();

const mail = require('./mailService');
const models = require('../database/models');
const utilityFunctions = require('./utilityfunctions');
const config = require('../config/settings');
const handlebars = require('handlebars');

const localUser = models.user_account;
const infokit = models.info_kit;
const progress = models.progress;
const validateEmail = utilityFunctions.validateEmail;
const validateName = utilityFunctions.validateName;
const validatePassword = utilityFunctions.validatePassword;
const randomStr = utilityFunctions.randomString;
const readHTMLFile = utilityFunctions.readHTMLFile;

function verificationMail(req, res, rString) {
    readHTMLFile('./public/pages/registration-verification.html', function(err, html) {
        const template = handlebars.compile(html);
        const replacements = {
            host: req.headers.host,
            token: rString,
            email: req.body.email

        };
        const htmlToSend = template(replacements);
        mail.mailOptions.to = req.body.email;
        mail.mailOptions.subject = 'PC PrepKit Email Verification';
        mail.mailOptions.html = htmlToSend;
        mail.smtpTransport.sendMail(mail.mailOptions, function(error) {
            if(error) {
                res.status(500).json({error: 'Something Went Wrong! Try again later.'});
            } else {
                res.json('Verification Mail Sent, Please check your mail.');
            }
        });
    });
}
// Receiving HTTP Post
router.post('/', function(req, res) {
    if(!req.body.email || !validateEmail(req.body.email)) {
        return res.status(400).json({error: 'Email is invalid'});
    }

    if(!req.body.fname || !validateName(req.body.fname)) {
        return res.status(400).json({error: 'First Name is invalid'});
    }

    if(!req.body.lname || !validateName(req.body.lname)) {
        return res.status(400).json({error: 'Last Name is invalid'});
    }

    if(!req.body.password || !validatePassword(req.body.password)) {
        return res.status(400).json({error: 'Password is invalid'});
    }
    const rString = randomStr(50, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    localUser.create({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        verificationCode: rString,
        provider: 1
    }).then(task => {
        infokit.create({
            user_id: task.dataValues.id
        }).then(task => {
            progress.create({
                user_id: task.dataValues.user_id
            }).then(task => {
                verificationMail(req, res, rString);
            }).catch(error => {
                if(error) {
                    res.status(500).json({error: 'Something went wrong'});
                }
            });
        })
    })
});

module.exports = router;
