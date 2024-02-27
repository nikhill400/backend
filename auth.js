



const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { users } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post(
  "/signup",
  [
    check("email", "Please input a valid email").isEmail(),
    check("password", "Please input a password with a min length of 6").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const { password, email } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    let user = users.find((user) => {
      return user.email === email;
    });

    if (user) {
      return res.status(422).json({
        errors: [
          {
            Status: "This user already exists",
            Result:"Failed"
          },
        ],
      });
    }

    let hashedPassword = await bcrypt.hash(password, 6);

    users.push({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ email }, "nfb32iur32ibfqfvi3vf932bg932g932", { expiresIn: 360000 });

    res.json({ token });
  }
);

router.post('/login', async (req, res) => {
  const { password, email } = req.body;

  let user = users.find((user) => {
    return user.email === email;
  });

  if (!user) {
    return res.status(422).json({
      errors: [
        {
          Status: "Invalid user",
          Result:"Failed"
        },
      ],
    });
  }

  let isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(404).json({
      errors: [
        {
          Status: "Invalid Password",
          Result:"Failed"
        },
      ],
    });
  }

  const token = jwt.sign({ email }, "nfb32iur32ibfqfvi3vf932bg932g932", { expiresIn: 360000 });

  res.json({ token });
});

router.get("/all", (req, res) => {
  res.json(users);
});

module.exports = router;
