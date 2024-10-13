const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const port = process.env.PORT || 3000;

app.use("/files", express.static("public"));

app.get("/", (req, res) => res.send("Express on Vercel"));

app.get("/home" , (req , res)=>{
    res.render("index", { port });
});

app.get('/uploadUser', function (req, res) {
	res.sendFile(path.join(__dirname, '..', 'components', 'user_upload_form.htm'));
});

app.post('/uploadSuccessful', urlencodedParser, async (req, res) => {
	try {
		await sql`INSERT INTO Users (Id, Name, Email) VALUES (${req.body.user_id}, ${req.body.name}, ${req.body.email});`;
		res.status(200).send('<h1>User added successfully</h1>');
	} catch (error) {
		console.error(error);
		res.status(500).send('Error adding user');
	}
});

app.listen(port, () => console.log(`Server ready on port ${port}`));

module.exports = app;
