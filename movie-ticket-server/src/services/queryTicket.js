const Ticket = require("../models/ticket");

async function queryTicket(filter) {
    const sortField = {};

    if (filter.sort) {
        if (filter.sort.startsWith("-")) {
            sortField[filter.sort.slice(1)] = -1;
        } else {
            sortField[filter.sort] = 1;
        }
        delete filter.sort;
    }

    if (filter.user) {
        try {
            const cursor = await Ticket.sort(sortField)
                .populate("show")
                .populate("user")
                .find({ user: { _id: filter.user } });
            return cursor;
        } catch (error) {
            console.log(error);
        }
    }
    if (filter.count) {
        delete filter.count;
        try {
            const cursor = await Ticket.countDocuments(filter);
            return { count: cursor };
        } catch (error) {
            console.log(error);
        }
    } else {
        if (filter.limit) {
            const limit = filter.limit;
            delete filter.limit;
            try {
                const cursor = await Ticket.find(filter)
                    .sort(sortField)
                    .limit(limit);
                return cursor;
            } catch (error) {
                console.log(error);
            }
        }

        try {
            const cursor = await Ticket.find(filter)
                .sort(sortField)
                .populate("show")
                .populate("user");
            return cursor;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = queryTicket;
