const config = require("./settings/appsettings.secrets.json");
const express = require("express");
const cors = require("cors");
const taller2Routes = require("./routes/taller2Routes");

// Constants
const { ALLOWED_ORIGINS, HOST, PORT } = config;

// App
const app = express();

app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.indexOf(origin) === -1) {
        const msg = "Origen no permitido.";
        console.log(`${msg} origin: ${origin}`);
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  })
);

app.use((req, res, next) => {
  let data = "";
  req.setEncoding("utf8");
  req.on("data", function(chunk) {
    data += chunk;
  });
  req.on("end", () => {
    req.body = data;
    next();
  });
});

//Routes
app.use("/api", taller2Routes);

//middleware
app.use(express.json());

app.listen(PORT, HOST);
console.log(`Corriendo API en http://${HOST}:${PORT}`);

module.exports = app;
