import http from "http";
import { URL } from "url";

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    // ROUTING BASED ON METHOD & PATH
    if (req.method === "GET" && url.pathname === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Welcome GET request</h1>");
        return;
    }

    if (req.method === "GET" && url.pathname === "/about") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>About Page GET request</h1>");
        return;
    }

    if (req.method === "POST" && url.pathname === "/submit") {
        let body = "";

        req.on("data", chunk => body += chunk);

        req.on("end", () => {
            try {
                const data = JSON.parse(body);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Data received", data }));
            } catch (error) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Invalid JSON" }));
            }
        });

        return; // stop further processing
    }

    if (req.method === "PUT" && url.pathname === "/update") {
        let body = "";
        req.on("data", chunk => body += chunk);
        res.on("end", () => {
            try {
                const data = JSON.parse(body);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Data updated", data }));

            } catch (err) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Invalid JSON" }));

            }
        })
        return;
    }

    if (req.method === "DELETE" && url.pathname === "/delete") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Resource deleted" }));
        return;
    }

    // Default 404
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 Not Found</h1>");
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
