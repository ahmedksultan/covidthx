var express = require("express");
var router = express.Router();
const Admin = require("../models/Admin");

/* GET register page. */
router.get("/register", function (req, res, next) {
    res.render("admin_register.html");
});

/* GET login page. */
router.get("/login", function (req, res, next) {
    res.render("admin_login.html");
});

/* POST register handle. */
router.post("/register", function (req, res, next) {
    const { username, password, password2 } = req.body;
    let errors = [];

    if (!username || !password || !password2) {
        errors.push({ msg: "Please fill in all fields" });
    }

    if (password != password2) {
        errors.push({ msg: "Passwords do not match" });
    }

    if (password.length < 8) {
        errors.push({ msg: "Password should be at least 8 characters" });
    }

    if (errors.length > 0) {
        res.render("admin_register.html", {
            errors: errors,
        });
    } else {
        Admin.findOne({ username: username }).then((sameusername) => {
            if (sameusername) {
                errors.push({ msg: "Admin with username already exists" });
                res.render("admin_register.html", { errors: errors });
            } else {
                const newAdmin = new Admin({
                    username: username,
                    password: password,
                });
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                        if (err) throw err;
                        newAdmin.password = hash;
                        newAdmin
                            .save()
                            .then((admin) => {
                                res.redirect("/users/login");
                            })
                            .catch((err) => console.log(err));
                    })
                );
            }
        });
    }
});

module.exports = router;
