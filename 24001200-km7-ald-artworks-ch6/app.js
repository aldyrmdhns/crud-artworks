if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const app = express();
const PORT = 9090;
const route = require("./src/routes/artRoute");
const errorHandler = require("./src/middlewares/errorHandler");

app.use(express.json());

app.use("/", (req, res) => {
	res.send("Ello, This is just to test the CI/CD Change!");
});

app.use("/api/v1/arts", route);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`-> Listening on PORT: ${PORT}`);
});
