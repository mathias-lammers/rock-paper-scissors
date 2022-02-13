const app = require("./app");

const PORT = process.env.PORT || 3001;

app
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  })
  .on("error", (e) => {
    console.log("Error: ", e.message);
  });

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
