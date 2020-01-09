const express = require("express");
const api = require("../helpers/api");
const router = express.Router();
const fetch = require("node-fetch");
const trace = require("../helpers/trace");
const date = require("../helpers/date");
const numeroALetra = require("../helpers/deNumeroALetras");
const qr = require("../helpers/qr.js");

router.get("/edad/:date", (req, res) => {
  res.status(200).send({ edad: date.calculateAge(req.params.date).toString() });
});

router.get("/getUF", async function(req, res) {
  trace.trackEvent("Request a /api/example correcta.");

  const request = await fetch(api.uriConfig.api.getUF(date.fechaNow()), {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" }
  }).catch(error => {
    console.log(`error: ${error}`);
    trace.trackException(
      `Error llamando a ${api.uriConfig.api.getUF(
        "fecha en formato dd-mm-yyyy"
      )}. Error: ${error}`
    );
    res.status(500).send({
      msg:
        "Ha ocurrido un error llamando al API para obtener la información solicitada.",
      ok: false
    });
    res.end();
  });

  const response = await request.json();
  if (response) {
    trace.trackEvent("Llamada a servicio correcta.", response);
    res.send(`<h2>El valor de la UF es: $${response.serie[0].valor}</h2>`);
    res.end();
  } else {
    trace.trackException(
      `Error llamando a ${api.uriConfig.apiQR.tokens}. Error: ${error}`
    );
    res.status(500).send({
      msg:
        "Ha ocurrido un error llamando al API para obtener la información solicitada.",
      ok: false
    });
    res.end();
  }
});

router.get("/numeroLetra/:num", (req, res) => {
  res.status(200).send(numeroALetra.NumeroALetras(req.params.num));
});

router.get("/getQR", (req, res) => {
  res.status(200).send(qr.qrGenerate());
});

module.exports = router;
