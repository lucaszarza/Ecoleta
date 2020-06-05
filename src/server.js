const express = require("express");
const server = express();

//Configurar pasta publica
server.use(express.static("public"))



//utilizando templete engine, nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})


//Configurar caminhos da minha aplicação
//pagina inicial

server.get("/", (req, res) => {
    return res.render("index.html", )
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

//ligando o servidor
server.listen(3000);