const express = require('express');
const app = express();
const path = require('path');
const handlebars = require("express-handlebars");
const { serializeError } = require('serialize-error');

const customHandlebars = handlebars.create({ layoutsDir: "./views" });
const port = process.env.PORT || 3000;

app.engine("handlebars", customHandlebars.engine);
app.set("view engine", "handlebars");

app.use("/files", express.static("public"));

app.get("/", (req, res) => res.send("Express on Vercel"));

app.get("/check" , (req , res)=>{
    res.json({ port });
});

app.get("/home" , (req , res)=>{
    try {
        return res.render("index", { port });
    } catch (ex) {
        return res.send(serializeError(ex));
    }
});

app.get('/uploadUser', function (req, res) {
	res.sendFile(path.join(__dirname, '..', 'components', 'user_upload_form.htm'));
});

app.listen(port, () => console.log(`Server ready on port ${port}`));

module.exports = app;
