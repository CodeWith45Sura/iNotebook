const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const jwt_SECRET = "jaishreeram";

// ROUTE-1 : Create a User using : POST "/api/auth/createuser". No login required

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password atleast contains 5 chars").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    //if there are errors, return Bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success, errors: errors.array() });
    }

    //check weather the user with this email exits already

    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .json({
            success,
            error: "Sorry a user with this email already exists",
          });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //  create a new user

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwt_SECRET);
      // console.log(authtoken);
      success = true;
      res.send({ success, authtoken });
    } catch (error) {
      // catch error
      console.log(error.message);
      res.status(500).send("Internal Server Error ");
    }
  }
);

//ROUTE-2  :  Authenticate a User using POST "/api/auth/login". no login required

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password can't be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    //if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({
            success,
            error: "Please try to login with correct credentials",
          });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwt_SECRET);
      // console.log(authtoken);
      success = true;
      res.send({ success, authtoken });
    } catch (error) {
      // catch error
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//  ROUTE-3 : get loggedin user details using: POST "/api/auth/getuser". login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    // catch error
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
