const Router = require("express");
const bcrypt = require("bcrypt");
const { Admin, Project } = require("../Db");
const jwt=require('jsonwebtoken')
const {jwt_token}=require('../Config');
const adminMiddleware = require("../middlerware/adminmiddleware");
// const usermiddleware = require("../middlerware/usermiddleware");
const adminmiddleware = require("../middlerware/adminmiddleware");

function generateToken(user) {
  const payload = {
      _id: user._id,  // Ensure _id is included
      username: user.username
  };
  return jwt.sign(payload, jwt_token, { expiresIn: '1h' });  // Adjust expiration time as needed
}

const router = Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existUser = await Admin.findOne({ username });

    if (existUser) {
      return res.status(409).json({
        message: "user name already exit",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({
      username,
      password: hashedPassword,
    });
    res.status(200).json({
      message: "Admin is created",
    });
  } catch (error) {
    res.json({
      message: "err",
      error: error.message,
    });
  }
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await Admin.findOne({
    username,
  });

  if (user && bcrypt.compare(password,user.password)) {
   
    const token = generateToken(user);

    res.json({
        token
    })
  } else {
    res.status(401).json({
      message: "Incorrect email and pass",
    });
  }
});

router.get('/allproject',adminMiddleware,async(req,res)=>{
  const data=await Project.find({});
  res.json(data)
})

router.patch('/projects/:id/status',adminmiddleware ,async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // "Accept" or "Reject"

  console.log(id , status)

  // Determine the status based on the action
  let newStatus;
  if (status === 'accept') {
      newStatus = true;
  } else if (status === 'reject') {
      newStatus = false;
  } else {
      return res.status(400).send({ error: 'Invalid action' });
  }

  try {
      const project = await Project.findByIdAndUpdate(
          id,
          { status: newStatus },
          { new: true, runValidators: true }
      );

      if (!project) {
          return res.status(404).send({ error: 'Project not found' });
      }

      res.send(project);
  } catch (error) {
      res.status(400).send(error);
  }
});

module.exports = router;
