const express = require("express");
const Profile = require("../Models/Schema.js");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const JwtKey = "chinu"; // Replace with your secret key

const router = express.Router();
router.use(express.json());



router.get("/", verifytoken, async (req, res) => {
  try {
    const stu = await Profile.find();
    res.json(stu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




router.get("/:id", verifytoken,  async (req, res) => {
  try {
    const singleperson = await Profile.findById(req.params.id);
    res.json(singleperson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/Search/:key",  async (req, res) => {
  try {
    const Searchuser = await Profile.find({
      $or: [
        { Name: { $regex: req.params.key, $options: "i" } },
        { Email: { $regex: req.params.key, $options: "i" } },
      ],
    });
    res.json(Searchuser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/NewUser",  async (req, res) => {
  const createUser = new Profile({
    Name: req.body.Name,
    Email: req.body.Email,
    Phone_No: req.body.Phone_No,
    Password: req.body.Password,
  });

  try {
    const NewProfile = await createUser.save();
    Jwt.sign({ NewProfile }, JwtKey, { expiresIn: "10h" }, (err, token) => {
      if (err) {
        console.error("JWT Error:", err);
        return res
          .status(500)
          .json({ success: false, message: "Failed to generate token" });
      }
      return res.json({
        success: true,
        message: "User created successfully",
        token,
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/Login", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const user = await Profile.findOne({ Email, Password });

    if (!user) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    // Verify the registration token
    const registrationToken = req.body.token;

    try {
      const decoded = Jwt.verify(registrationToken, JwtKey);

      // If verification succeeds, use the same token for login
      const loginToken = registrationToken;

      return res.json({ success: true, token: loginToken });

    } catch (verificationError) {
      console.error("Token Verification Error:", verificationError);
      return res.json({ success: false, message: "Token mismatch" });
    }
   
  } catch (error) {
    console.error("Login Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});





router.patch("/:id", verifytoken,  async (req, res) => {
  try {
    const stuData = await Profile.findById(req.params.id);
    stuData.Name = req.body.Name;
    stuData.Email = req.body.Email;
    stuData.Phone_No = req.body.Phone_No;
    stuData.Password = req.body.Password;

    const Updatestu = await stuData.save();
    res.json(Updatestu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/:id", verifytoken,  async (req, res) => {
  try {
    const stuData = await Profile.findByIdAndDelete(req.params.id);
    res.json(stuData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


function verifytoken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[0];
    Jwt.verify(token, JwtKey, (err, valid) => {
      if (err) {
        res.status(401).send("Please provide a valid token.");
      } else {
        next();
      }
    });
  } else {
    res.status(401).send("Please add a token with Headers");
  }
}

module.exports = router;
