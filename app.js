import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var contests = [];

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req, res) => {
    const response = await axios.get("https://codeforces.com/api/contest.list");
    contests.push(response.data.result);

    res.render("contest.ejs", {content: response.data.result});
});

app.get("/problems", async (req, res) => {
    const response = await axios.get("https://codeforces.com/api/problemset.problems");
    

    res.render("problems.ejs", {p: response.data.result.problems});
});

app.post("/filter", async(req, res) => {
    console.log(req.body.rating);
    const response = await axios.get("https://codeforces.com/api/problemset.problems");
    const problems = response.data.result.problems;

    let filpr = [];

    filpr = problems.filter(p => p.rating == req.body.rating);

    res.render("problems.ejs", {p: filpr});

})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})