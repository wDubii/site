const Express = require('express')
const Path = require('path')
const App = Express()

App.use(Express.static(Path.join(__dirname, '../Distribution')))
App.get('/', (Request, Response) => {
  Response.sendFile(Path.join(__dirname, '../Distribution/Main.html'))
})
App.listen(4040)

module.exports = App