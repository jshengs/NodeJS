const admin = require('firebase-admin');
const serviceAccount = require('../nodejs1-7a602-firebase-adminsdk-td09f-fad664aec3.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

//sign up
admin.auth().createUser({
    email: 'user@test.com',
    password: 'user',
}).then((userRecord)=>{
    console.log('User Created: ', userRecord.uid);
}).catch((err)=>{
    console.log('Error: ', err);
});

//sign in
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.listen(8080);

app.post('/login', (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;

    admin.auth().getUserByEmail(email)
    .then((userRecord) =>{
        if(userRecord && userRecord.email === email && userRecord.password === password){
            res.status(200).send('Login Successful');
        } else{
            res.status(401).send('Failed');
        }
    })
        .catch((err) => {
            res.status(401).send('User not found');
      
    });
});

//manage login session
app.post('/sessionLogin', (req, res) =>{
    const token = req.body.token.toString();
    admin.auth().createSession(token, {expiresIn: 60*60*24*5*1000})
    .then((sessionCookie)=>{
        const options = {maxAge:60*60*24*5*1000, httpOnly: true, secure: true};
        res.cookie('session', sessionCookie, options);
    res.end(JSON.stringify({ status: 'success' }));
}, err => {
  res.status(401).send('UNAUTHORIZED REQUEST!');
});
});

app.use((req, res, next) => {
    const sessionCookie = req.cookies.session || '';
    admin.auth().verifySessionCookie(sessionCookie, true)
      .then(() => {
        next();
      })
      .catch((err) => {
        res.redirect('/login');
      });
  });