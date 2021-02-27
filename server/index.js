const axios = require("axios");
const epxress = require("express");

const config = require("./config.json");

const server = epxress();

const instance = axios.create({
    baseURL: "https://bad-api-assignment.reaktor.com/v2",
    headers: {"x-force-error-mode": config.FORCE_REQUEST_FAILURE ? "all" : "none"}
});

server.listen(8080, () => {console.log("server up on 8080")})
server.get("/", (req, res) => {
    instance.get("products/facemasks").then(response => {
        res.send(
            response.data
        );
    })
});