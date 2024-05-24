exports.getHome = (req, res) => {
    res.render('home', {user: req.user});
};

exports.getDashboard = (req, res) => {
    res.render('dashboard', {user: req.user});
};