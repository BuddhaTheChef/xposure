// Bring in our required modules
const express = require('express');
// const bodyParser = require('body-parser');
const {
  json
} = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

// const config = require('../config');
const {
  secret
} = require('./server/config').session;
console.log(secret)
const {
  dbUser,
  database
} = require('./server/config').db;
const {
  domain,
  clientID,
  clientSecret
} = require('./server/config').auth0;

/////////////////////////////test/////////////////////////////////////////////

// const userCtrl = require('./public/component/home/homeCtrl.js');

/////////////////////////////test/////////////////////////////////////////////

// define port
const port = 3000;

// our database connection information
const connectionString = `postgres://${dbUser}@localhost/${database}`;

// App Declaration
const app = express();

// required middlewares
app.use(json());
app.use(cors());
app.use(express.static(`${__dirname}/public`));

// connecting to our DB with massive
massive(connectionString).then(db => app.set('db', db));

// setting up express sessions
// secret: config.session.secret;
app.use(session({
  secret,
  resave: true,
  saveUninitialized: true
}));

// setting up passport
app.use(passport.initialize());
app.use(passport.session());

// using passport to access auth0
// { domain: config.auth0.domain ... etc}
passport.use(new Auth0Strategy({
  domain,
  clientID,
  clientSecret,
  callbackURL: '/auth/callback'
}, (accessToken, refreshToken, extraParams, profile, done) => {
  //Find user in database
  console.log(profile);
  const db = app.get('db');
  // .then means this is a promise
  db.getUserByAuthId([profile._json.sub]).then((user, err) => {
    console.log('INITIAL: ', user);
    if (!user[0]) { //if there isn't a user, we'll create one!
      console.log('CREATING USER');
      db.createUserByAuth([profile._json.sub]).then((user, err) => {
        console.log('USER CREATED', user[0]);
        return done(err, user[0]); // GOES TO SERIALIZE USER
      })
    } else { //when we find the user, return it
      console.log('FOUND USER', user[0]);
      return done(err, user[0]);
    }
  });
}));

// put user on session
passport.serializeUser((user, done) => {
  done(null, user);
});

// pull user from session for manipulation
passport.deserializeUser((user, done) => {
  console.log(user);
  done(null, user);
});


// General Endpoints

///////////////////////////test///////////////////////////////////////////
app.get('/api/test', (req, res, next) => {
  const db = req.app.get('db');
  db.users.find({})
    .then(results => {
      res.json(results)
    })
    .catch(err => console.log(err));
});

// app.get('/api/users',userCtrl.getUserByName);
//
// app.post('/api/users/create', (req,res,next) => {
//   console.log("req.body:", req.body);
//
//   const db = req.app.get('db');
//   db.createUser(req.session).then((users) =>{
//     console.log(req.session);
//     res.json(users);
//   }).catch(error => console.log('ERROR:', error))
// });

app.put('/api/users', (req, res, next) => {
  const db = req.app.get('db');
  console.log(req.session.passport.user.authid);
  console.log(req.body)
  db.updateUser([req.session.passport.user.authid, req.body.first, req.body.last, req.body.email]).then((user) => {
    console.log(req.session);
    res.json(user);
  }).catch(error => console.log('ERROR:', error))
})


app.post('/api/usersImage', (req, res, next) => {
  const db = req.app.get('db');
  console.log(req.body)
  db.profilePicSubmit([req.body.userId, req.body.downloadURL])
    .then(result => {
      console.log(result)
      return res.json(result)
    });
})

app.get('/api/event/create/:authid', (req, res, next) => {
  console.log(req.params.authid)
  req.app.get('db').showEvent(req.params.authid).then(result => res.json(result));
})

app.post('/api/event/create', (req, res, next) => {
  const db = req.app.get('db');

  db.createEvent([req.body.title, req.body.location, req.body.eventemail, req.body.starts, req.body.ends, req.body.eventimage, req.body.eventdescription, req.body.authid])
    .then(result => {

      return res.json(result)
    });

})

app.delete('/api/event/create/:id', (req,res,next) =>  {
  const db = req.app.get('db');
  db.deleteEvent([req.params.id]).then(result => {

    return res.json(result)
  });
})

//////////////////////////////////////////////saved event/////////////////////////////////////////////////////////
app.post('/api/savedevent/create', (req, res, next) => {
  const db = req.app.get('db');

  db.createSavedEvent([req.body.title,req.body.location,req.body.start,req.body.ends,req.body.image,req.body.description,req.body.authid])
    .then(result => {

      return res.json(result)
    });

})

app.get('/api/savedevent/create/:authid', (req, res, next) => {
  console.log(req.params.authid)
  req.app.get('db').showSavedEvent(req.params.authid).then(result => res.json(result));
})

app.delete('/api/savedevent/create/:id', (req,res,next) =>  {
  const db = req.app.get('db');
  db.deleteSavedEvent([req.params.id]).then(result => {

    return res.json(result)
  });
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// app.get('/api/test', (req, res, next) => {
//     app.get('db').users.find({}).then(response => {
//         res.json(response);
//     });
// });


// auth endpoints

// initial endpoint to fire off login
app.get('/auth', passport.authenticate('auth0', {
  scope: 'openid profile'
}));

// redirect to home and use the resolve to catch the user
app.get('/auth/callback',
  passport.authenticate('auth0', {
    successRedirect: '/',
    failureRedirect: '/login'
  }), (req, res) => {
    res.status(200).json(req.user);
  });

// if not logged in, send error message and catch in resolve
// else send user
app.get('/auth/me', (req, res) => {
  if (!req.user) return res.status(401).json({
    err: 'User Not Authenticated'
  });
  res.status(200).json(req.user);
});

// remove user from session
app.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// listen on port
app.listen(port, () => {
  console.log(`LISTENING ON PORT: ${port}`);
});
