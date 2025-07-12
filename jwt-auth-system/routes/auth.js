const { body, validationResult } = require("express-validator");
const validateRegister = [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    }
];
module.export = { validateRegister };
