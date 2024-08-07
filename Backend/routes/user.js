const Router = require("express");
const { User, Project } = require("../Db");
const bcrypt = require("bcrypt");
const { Admin } = require("../Db");
const jwt = require("jsonwebtoken");
const { jwt_token } = require("../Config");
// const adminMiddleware = require("../middlerware/adminmiddleware");

const usermiddleware = require("../middlerware/usermiddleware");

const router = Router();

function generateToken(user) {
    const payload = {
        _id: user._id,  // Ensure _id is included
        username: user.username
    };
    return jwt.sign(payload, jwt_token, { expiresIn: '1h' });  // Adjust expiration time as needed
}

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existUser = await User.findOne({ username });

    if (existUser) {
      return res.status(409).json({
        message: "user name already exit",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashedPassword,
    });
    res.status(200).json({
      message: "User is created",
    });
  } catch (error) {
    res.json({
      message: "err",
      error: error.message,
    });
  }
});


router.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        
        // Check if user exists and if password matches
        if (user && await bcrypt.compare(password, user.password)) {
            // Generate JWT token
            const token = generateToken(user);

            // Send the token in response
            res.json({
                token
            });
        } else {
            // Incorrect credentials
            res.status(401).json({
                message: "Incorrect username or password"
            });
        }
    } catch (error) {
        console.error('Error during signin:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.post('/create', usermiddleware, async (req, res) => {
    const { projectName, description, moneyWant } = req.body;
    const userId = req.user._id;  // Use the user ID from the attached user object

    try {
        console.log(projectName, moneyWant, description);

        // Create a new project
        const project = await Project.create({
            projectName,
            description,
            moneyWant
        });

        // Find the user and add the project ID to their fundReq array
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.fundReq.push(project._id);
        await user.save();

        res.json({
            message: 'Created project and updated user',
            project
        });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/requestedprojects', usermiddleware, async (req, res) => {
  try {
      const userId = req.user._id; // Get the user ID from the middleware
      const user = await User.findById(userId).populate('fundReq'); // Populate the fundReq array with project details

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Populate the fundReq array to get detailed project information
      const requestedProjects = await Project.find({ _id: { $in: user.fundReq } });

      res.json(requestedProjects); // Send the detailed project information back to the client
  } catch (error) {
      console.error('Error fetching requested projects:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
