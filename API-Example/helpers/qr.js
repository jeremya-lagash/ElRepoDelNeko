const qr = require("qr-image");

function qrGenerate() {
  const code = qr.imageSync("https://9dec147e.ngrok.io", {
    type: "svg",
    ec_level: "H",
    size: 20,
    margin: 2
  });
  return code;
}

module.exports = { qrGenerate };
