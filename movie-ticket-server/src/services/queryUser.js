const User = require("../models/user");

async function queryUser(filter) {
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
        try {
            const cursor = await User.countDocuments(filter);
            return { count: cursor };
        } catch (error) {
            console.log(error);
        }
    } else {
        if (filter.limit) {
            const limit = filter.limit;
            delete filter.limit;
            try {
                const cursor = await User.find(filter)
                    .sort(sortField)
                    .limit(limit);
                return cursor;
            } catch (error) {
                console.log(error);
            }
        }

        try {
            const cursor = await User.find(filter).sort(sortField);
            return cursor;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = queryUser;
