const express = require("express")
const path = require("path")
const fs = require("node:fs")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
    fs.readdir("./files", (err, files) => {
        res.render("index", {files: files})
    })
})

app.post("/create", (req, res) => {
    fs.writeFile(`./files/${req.body.filename.split(" ").join("")}.txt`, req.body.description, (err)=> {
        res.redirect("/")
    })
})

app.get("/files/:filename", (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
        res.render("show", {filename: req.params.filename, filedata: filedata})
    })
})

app.listen(3000, () => {
    console.log("Server is running on port", 3000)
})