const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("mock-db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/api/auth/login", (req, res) => {
  if (req.body.email === "fulano@example.com" && req.body.password === "123456") {
    res.status(200).send({
      id: "22659280-cd81-42e1-b13e-4a28e1890b33",
      type: "login",
      attributes: {
        name: "Fulano de Tal",
        email: "fulano@example.com",
        token:
          "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkZ1bGFubyIsImV4cCI6MTYyMTU3MTE5OSwiaWF0IjoxNjIxNTcxMTk5fQ.jAAiOXHsGeaFn8dlrpyCVE6VExpziCMS_v3EL7nNylU",
        permissions: [],
        relationships: [
          {
            type: "company",
            attributes: {
              name: "Umbrella Corp",
              address: "1 Infinite Loop, California",
              contact: "+5511999999999",
              site: "www.umbrella.com",
              type: "hybrid",
            },
            relationships: [],
          },
        ],
      },
    });
  } else {
    res.status(401).send({
      error: true,
      message: "Credentials not found."
    });
  }
});

server.use("/api", router);
server.listen(3333, () => {
  console.log("JSON Server is running");
});
