const express = require("express");
const Profile = require("../Models/Schema.js");
const bcrypt = require('bcrypt');

const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const stu = await Profile.find();
    res.json(stu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get("/:id", async (req, res) => {
  try {
    const singleperson = await Profile.findById(req.params.id);
    res.json(singleperson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/Search/:key', async (req, res) => {
  try{
    const Searchuser = await Profile.find(
      {
        "$or":[
          {"Name": {$regex: req.params.key, $options: 'i'}},
          {"Email": {$regex: req.params.key, $options: 'i'}},
        ]
      
    })
    res.json(Searchuser);
  }catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/NewUser", async (req, res) => {
  const createUser = new Profile({
    Name: req.body.Name,
    Email: req.body.Email,
    Phone_No: req.body.Phone_No,
    Password: req.body.Password,
  });

  try {
    const NewProfile = await createUser.save();
    res.json(NewProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post('/Login', async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const user = await Profile.findOne({ Email, Password });

    if (!user) {
      return res.json({ success: false, message: 'Invalid email or password' })
    }else{
      return res.json({ success: true, message: 'Login Successfully' });
    }


  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});




router.patch("/:id", async (req, res) => {
  try {
    const stuData = await Profile.findById( req.params.id );
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




router.delete('/:id', async (req, res) => {
    try{
    const stuData = await Profile.findByIdAndDelete( req.params.id)
    res.json(stuData);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
})


module.exports = router;
