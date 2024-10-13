const express = require('express');
const app = express();
const path = require('path');
const handlebars = require("express-handlebars");
const cors = require('cors');

const customHandlebars = handlebars.create({ layoutsDir: "./views" });
const port = process.env.PORT || 3000;

app.engine("handlebars", customHandlebars.engine);
app.set("view engine", "handlebars");

app.set('views', path.join(__dirname, 'views'));
app.use(cors({
    "origin": "https://*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));
app.use("/files", express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => res.send("Express on Vercel"));
app.get("/check" , (req , res)=>{
    res.json({ v_port: port, v_url: process.env.VERCEL_URL });
});
app.get("/home" , (req , res)=>{
    try {
        return res.render("index", { layout: false, v_port: port, v_url: process.env.VERCEL_URL });
    } catch (ex) {
        return ex.toString();
    }
});
app.get('/uploadUser', function (req, res) {
	res.sendFile(path.join(__dirname, '..', 'components', 'user_upload_form.htm'));
});

app.listen(port, () => console.log(`Server ready on port ${port}`));

module.exports = app;
