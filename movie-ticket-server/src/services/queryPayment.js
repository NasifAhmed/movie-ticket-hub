const { Payment } = require("../models/model");

async function queryPayment(filter) {
    const sortField = {};

    if (filter.sort) {
        if (filter.sort.startsWith("-")) {
            sortField[filter.sort.slice(1)] = -1;
        } else {
            sortField[filter.sort] = 1;
        }
        delete filter.sort;
    }
    if (filter.count) {
        delete filter.count;
        const cursor = await Payment.countDocuments(filter);
        return { count: cursor };
    }
    const cursor = await Payment.find(filter)
        .sort(sortField)
        .populate("camp")
        .populate("owner");
    return cursor;
}

module.exports = queryPayment;
