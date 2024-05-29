const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('homepage');
})

router.get('/homepage', (req, res) => {
    console.log(req.session);
    res.render('homepage',{user:req.session.passport.user})
})

module.exports = router;