const express = require("express");
const { processCSV } = require("./processor");

const app = express();
const PORT = 3000;

app.get("/process-csv", async (req, res) => {
    try {
        const stats = await processCSV();
        res.json({ success: true, data: stats });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
