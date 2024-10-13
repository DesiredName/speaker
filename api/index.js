const express = require('express');
const app = express();
const path = require('path');
const handlebars = require("express-handlebars");
const csp = require('express-csp-header');

const customHandlebars = handlebars.create({ layoutsDir: "./views" });
const port = process.env.PORT || 3000;

app.engine("handlebars", customHandlebars.engine);
app.set("view engine", "handlebars");

app.use("/files", express.static("public"));
app.use(csp({
    policies: {
        'default-src': [csp.NONE, csp.UNSAFE_EVAL]
    }
}))

app.get("/", (req, res) => res.send("Express on Vercel"));

app.get("/check" , (req , res)=>{
    res.json({ port });
});

app.get("/home" , (req , res)=>{
    try {
        return res.render("index", { port });
    } catch (ex) {
        return ex.toString();
    }
});

app.get('/uploadUser', function (req, res) {
	res.sendFile(path.join(__dirname, '..', 'components', 'user_upload_form.htm'));
});

app.listen(port, () => console.log(`Server ready on port ${port}`));

module.exports = app;
