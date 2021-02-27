const axios = require("axios");
const epxress = require("express");

const config = require("./config.json");

const instance = axios.create({
    baseURL: "https://bad-api-assignment.reaktor.com/v2",
    headers: {"x-force-error-mode": config.FORCE_REQUEST_FAILURE ? "all" : "none"}
});

const resp = instance.get("products/facemasks").then(response => {
    console.log(response.data)
});