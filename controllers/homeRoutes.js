const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/register', (req, res) => {
  console.log(req.session.passport.user);
    res.render('register', )
});

router.post('/register', async (req, res) => {
    const {email, password, password2} = req.body;
    let errors= [];

    if (!email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
      }
    
      if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
      }
    
      if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
      }
    
      if (errors.length > 0) {
        res.render('register', {
          errors,
          username,
          password,
          password2
        });
      } else {
        try {
          let user = await User.findOne({ where: { email } });
          if (user) {
            errors.push({ msg: 'Username already exists' });
            res.render('register', {
              errors,
              username,
              password,
              password2
            });
          } else {
            const hash = await bcrypt.hash(password, 10);
            await User.create({ email, password: hash });
            res.redirect('/homepage');
            req.session.save;
          }
        } catch (err) {
          console.error(err);
          res.status(500).send('Server Error');
        }
      }
    });


// Login Handle
router.post('/login',passport.authenticate('local', {
  successRedirect: '/homepage',
  failureRedirect: '/login',
})
);
  
  // Logout Handle
  router.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) return next(err);
      res.redirect('/login');
    });
  });
  
  module.exports = router;