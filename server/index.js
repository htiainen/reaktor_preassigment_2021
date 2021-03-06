const express = require("express");
const Cache = require("node-cache");
const cors = require("cors");

const legacyAPIInterface = require("./legacyAPIInterface.js");
const aggregation = require("./aggregation.js");

const server = express()

const cache = new Cache({
    stdTTL: 5*60,
    checkperiod: 60,
    deleteOnExpire: false
});

const updateCache = () => {
    try {
        legacyAPIInterface.collectData().then(data => {
            cache.set("productData", aggregation.constructAggregateData(data));
            console.log("cache updated");
        });
    } catch (e) {
        console.error(e);
    }
    
}

updateCache();

cache.on("expired", (key, value) => {
    console.log("cache expired, updating")
    updateCache();
});



server.use("/", express.static("client/build"));

server.listen(8080, () => {console.log("server up on 8080")});

server.get("/api", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.json(cache.get("productData"));
});

server.use(cors({origin: "*"}));