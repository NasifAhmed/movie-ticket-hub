const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const showRoutes = require("./routes/showRoutes");
const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const connectDB = require("./utils/connectDB");

// Setup
const app = express();
const PORT = 5000;
// Middlewares
app.use(
    cors({
        origin: ["http://localhost:5173", "https://movie-ticket-hub.web.app"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());

// Default home route
app.get("/", morgan(`dev`), (req, res) => {
    res.send("Server running ......");
});

// Routes
app.use(showRoutes);
app.use(userRoutes);
app.use(ticketRoutes);
app.use(paymentRoutes);

const main = async function () {
    try {
        await connectDB();
    } catch (error) {
        console.log(`DB connection ERROR : ${error}`);
    }
    try {
        // await dataInitializer();
    } catch (error) {
        console.log(`DB data initialize ERROR : ${error}`);
    }
    // Start the server
    app.listen(PORT, () => {
        console.log(`Seerver running on port ${PORT}`);
    });
};

main();
