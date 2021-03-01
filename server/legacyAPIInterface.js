const axios = require("axios");
const config = require("./config.js");

const collectData = async () => {
    try {
        const productData = await getProductsFromCategories(config.CATEGORIES);
        const availabilityData = await getDataFromManufacturers(extractManufacturers(productData));
        return {
            productData: productData,
            availabilityData: availabilityData
        };
    } catch (e) {
        console.error(e);
    };
}

const extractManufacturers = (productCategories) => {
    return [...new Set(...productCategories.map(
        productData => productData.map(product => product.manufacturer)))];
}

const getDataFromManufacturers = async (manufacturers) => {
    try {
        return Promise.all(manufacturers.map(
            async manufacturers => await fetchAvailabilityByManufacturer(manufacturers)));
    } catch (e) {
        console.error(e);
    };
}

const getProductsFromCategories = async (categories) => {
    try {
        return Promise.all(categories.map(async category => await fetchByCategory(category)));
    } catch (e) {
        console.error(e);
    }
}

const fetchAvailabilityByManufacturer = async (manufacturer) => {
    const legacyAvailabilityAPI = createAxiosInstance("availability");
    try {
        console.log(`fetching from ${manufacturer}`)
        const response = await fetchFromEndpoint(legacyAvailabilityAPI, manufacturer);
        const data = response.data.response;
        if (Array.isArray(data)) {
            console.log(`received good response from ${manufacturer}`);
            return data;
        }
        console.log(`bad response from ${manufacturer}, retrying`)
        return await fetchAvailabilityByManufacturer(manufacturer);
    } catch (e) {
        console.error(e);
    }
}

const fetchByCategory = async (category) => {
    const legacyProductAPI = createAxiosInstance("products");
    try {
        console.log(`fetching from ${category}`)
        const response = await fetchFromEndpoint(legacyProductAPI, category);
        console.log(`received response from ${category}`);
        const data = response.data;
        return data;
    } catch (e) {
        console.error(e);
    }
}

const fetchFromEndpoint = async (api, endpoint) => {
    try {
        const response = await api.get(endpoint);
        return response;
    } catch (e) {
        console.error(e);
    }
}

const createAxiosInstance = (path) => {
    const instance = axios.create({
        baseURL: `https://bad-api-assignment.reaktor.com/v2/${path}`,
    });
    return instance;
}

module.exports = {
    collectData: collectData
};