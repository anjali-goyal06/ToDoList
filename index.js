const port = process.env.PORT || 3000
console.log("valuee = "+process.env.VAL);

const app = require('./app.js')

app.listen(port,()=>console.log('running at port = '+port))

