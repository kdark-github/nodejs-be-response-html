const http = require("http");
var username = "";

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Assignment 1</title></head>");
    res.write(
      `<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form>${
        username && "username: " + username
      }</body>`
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Assignment 1</title></head>");
    res.write("<body><ul><li>User 1</li><li>User 2</li></ul></body>");
    res.write("</html>");
    return res.end();
  }
  // Send a HTML response with some "Page not found text
  if (url === "/create-user") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody.split("=")[1]); // username=whatever-the-user-entered
      username = parsedBody.split("=")[1];
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.write("<html>");
      res.write("<head><title>Assignment 1</title></head>");
      res.write("<body><h2>Username</h2>");
      res.write(`<p>${username}</p>`);
      res.write("</body>");
      res.write("</html>");
      res.end();
    });
  }
});

server.listen(3040);
