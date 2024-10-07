const http = require("http");
const httpProxy = require("http-proxy");

// Create a proxy server
const proxy = httpProxy.createProxyServer({});

// List of target servers
const targets = [
  "http://localhost:3000/books",
  "http://localhost:3001/movies",
];

// Index to keep track of the current target
let currentIndex = 0;

// Create a server to handle incoming requests
const server = http.createServer((req, res) => {
  const target = targets[currentIndex];
  currentIndex = (currentIndex + 1) % targets.length;

  console.log(`Proxying request for ${req.url} to ${target}`);

  proxy.web(req, res, { target }, (err) => {
    console.error(`Error proxying to ${target}:`, err.message);
    res.writeHead(502, { "Content-Type": "text/plain" });
    res.end("Bad Gateway");
  });
});

// Handle proxy errors globally
proxy.on('error', (err, req, res) => {
  console.error("Proxy error:", err);
  res.writeHead(502, { "Content-Type": "text/plain" });
  res.end("Bad Gateway");
});

// Start the server
server.listen(8000, () => {
  console.log("Load balancer running on port 8000");
});
