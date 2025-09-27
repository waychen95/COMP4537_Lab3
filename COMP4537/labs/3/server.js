const utils = require('./modules/utils');
const template = require('./lang/messages/en/user')
const http = require('http')
const url = require('url')
const fs = require("fs")

class Server {
    constructor(port) {
        this.port = port
    }

    createServer() {
        http.createServer((req, res) => {

            const parsed_url = url.parse(req.url, true)

            const pathname = parsed_url.pathname
            const query = parsed_url.query

            console.log(pathname)

            if (pathname === "/COMP4537/labs/3/getDate/") {
                this.handleDate(query, res)
            } else if (pathname === "/COMP4537/labs/3/writeFile/") {
                this.handleWriteFile(query, res)
            } else if (pathname === "/COMP4537/labs/3/readFile/") {
                this.handleReadFile(res)
            } else {
                res.writeHead(404, {'Content-Type':'text/html'})
                res.end(template.pnf_error)
            }

        }).listen(this.port, '0.0.0.0')

        console.log(template.listening)
    }

    handleDate(query, res) {
        const name = query.name || template.unknown_user
        const date = new Date()
        const message = utils.getDate(name, date)
        res.writeHead(200, {'Content-Type':'text/html'})
        res.end(message)
    }

    handleWriteFile(query, res) {
        const text = query.text
        const file_name = "file.txt"
        console.log(file_name, text)
        fs.appendFile(file_name, text + "\n", (err) => {
            if (err) {
                res.writeHead(500, {'Content-Type':'text/html'})
                res.end(template.append_error)
                return
            }
            res.writeHead(200, {'Content-Type':'text/html'})
            res.end(template.append_success)
        })
    }

    handleReadFile(res) {
        const file_name = "file.txt"
        fs.readFile(file_name, "utf-8", (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type':'text/html'})
                res.end(template.readfile_error.replace("%1", file_name))
                return
            }
            res.writeHead(200, {'Content-Type':'text/html'})
            res.end(template.readfile_text.replace("%1", data))
        })
    }
}

const port_number = 8080
const server = new Server(port_number)
server.createServer()