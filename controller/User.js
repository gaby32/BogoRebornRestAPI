const userModel = require('../accessible_models/User');
const bcrypt = require('bcrypt');

module.exports = {
    getAll: function(req, res, next) {
        userModel.find({}, function (err, result){
            if (err)
                next(err);
            else
                res.json({status: "success", message: "[SUCCESS] [All users have been queried successfully.]", data: result})
        });
    },
    create: function (req, res, next) {
        userModel.create({info: req.body.firstName}, function (err, result) {
            if (err)
                next(err);
            else
                res.json({status: "success", message: "User added successfully!", data: null});
        });
    },
    authenticate: function (req, res, next) {
        userModel.findOne({username: req.body.username}, function (err, userInfo) {
            if (err) {
                next(err);
            } else {
                if (userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password, req.body.lastLoggedIn)) {
                    const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), {expiresIn: '1h'});
                    res.json({status: "success", message: "user found!!!", data: {user: userInfo, token: token}});
                } else {
                    res.json({status: "error", message: "Invalid email/password!!!", data: null});
                }
            }
        });
    },
    updateProfile: function (req, res, next) {
        userModel.findByIdAndUpdate(
            req.params._id,
            req.body,
            {new: true},
            (err, userInfo) => {

                if (err) return res.status(500).send(err);
                return res.send(userInfo);
            }
        )
    }
};