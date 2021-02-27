const axios = require("axios").default;
const epxress = require("express");

const FORCE_REQUEST_FAILURE = true;

const instance = axios.create({
    baseURL: "https://bad-api-assignment.reaktor.com/v2",
    headers: {"x-force-error-mode": FORCE_REQUEST_FAILURE ? "all" : "none"}
});

const resp = instance.get("products/facemasks").then(response => {
    console.log(response.data)
});