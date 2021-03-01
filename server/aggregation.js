const constructAggregateData = (data) => {
    const aggregateData = insertValues(cleanAvailabilityData(data.availabilityData), 
                                        data.productData);
    console.log(aggregateData);
    return aggregateData;
}

const insertValues = (availabilityData, productData) => {
    return productData.map(productType => {
        return productType.map(productRecord => {
            const availability = availabilityData.get(productRecord.id);
            return {...productRecord, availability: availability}
        });
    });
}

const cleanAvailabilityData = (dirty) => {
    const flatData = [...dirty].flat();

    return new Map(flatData.map(item => {
        return cleanAvailabilityRecord(item);
    }));
}

const cleanAvailabilityRecord = (availabilityRecord) => {
    const id = availabilityRecord.id.toLowerCase();
    const availability = getInStockValue(availabilityRecord.DATAPAYLOAD).toLowerCase();
    return [id, availability];
}

const getInStockValue = (str) => {
    return str.match(/<INSTOCKVALUE>(\w+)<\/INSTOCKVALUE>/)[1];
}

module.exports = {
    constructAggregateData
};