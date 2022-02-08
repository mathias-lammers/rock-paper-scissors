const app = require("./app");

const PORT = process.env.PORT || 3000;

app
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  })
  .on("error", (e) => {
    console.log("Error: ", e.message);
  });
