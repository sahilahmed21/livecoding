const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

function processCSV() {
    return new Promise((resolve, reject) => {
        const results = [];
        const filePath = path.join(__dirname, "../data.csv");

        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                if (row.value && !isNaN(row.value)) {
                    results.push(Number(row.value));
                }
            })
            .on("end", () => {
                if (results.length === 0) {
                    return reject(new Error("No valid numeric data found in CSV."));
                }

                const totalEntries = results.length;
                const sum = results.reduce((a, b) => a + b, 0);
                const average = sum / totalEntries;
                const max = Math.max(...results);
                const min = Math.min(...results);

                resolve({
                    totalEntries,
                    average,
                    max,
                    min,
                });
            })
            .on("error", (err) => reject(err));
    });
}

module.exports = { processCSV };
