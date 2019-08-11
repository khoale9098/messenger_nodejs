const express= require('express');
const app = express();

var hostname= "localhost";
var port = 8000;

app.get('/', (req, res)=>{
    res.send("<h1>Hello World</h1>")
});
app.listen(port,hostname, ()=>{
    console.log(` Runing at ${hostname}:${port}/`);
})

