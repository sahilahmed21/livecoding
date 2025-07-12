const restrictTo = require("../middlewares/roleMiddleware")
router.get("/dashboard", protect, restrictTo("admin"), (req, res) => {
    res.json({ message: "Welcome, Admin" });
})