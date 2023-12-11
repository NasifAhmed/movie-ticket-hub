const User = require("../models/user");

async function insertUser(data) {
    let user = {
        name: data.name,
        email: data.email,
        role: data.role,
    };

    if (data._id) {
        try {
            const response = await User.updateOne({ _id: data._id }, user, {
                upsert: true,
            });
            console.log("User updated successfully");
            console.log(response);
            return response;
        } catch (err) {
            console.log("Error updating user", err);
        }
    } else {
        try {
            const newUser = new User(user);
            const response = await newUser.save();
            console.log("User saved successfully");
            console.log(response);
            return response;
        } catch (err) {
            console.log("Error saving user", err);
        }
    }
}

module.exports = insertUser;
