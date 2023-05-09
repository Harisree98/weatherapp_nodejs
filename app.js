let express = require('express');
let request = require('request');
let port = 3010;
let app = express();

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.get('/data',(req,res)=>{
    let userInput = req.query.id ? req.query.id : 1;
    //http://localhost:3010/data?limit=2;
    //http://localhost:3010/data?userId=1
    //let url = `https://fakestoreapi.com/carts?userId=${userInput}`;
    let url = `https://fakestoreapi.com/products?limit=${userInput}`; 
    request(url,(err,response)=>{
        if(err) throw err;
        const output = JSON.parse(response.body);
        res.send(response.body);
    })
})

app.get('/weather',(req,res)=>{
    let city = req.query.city?req.query.city:'Delhi';
    let url =`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
    //calling api
    request(url,(err,response)=>{
        if(err) throw err;
        const output = JSON.parse(response.body);
        //res.render('index',{title:'Weather app',result:output});
        res.send(response.body);
    })
})

app.get('/json',(req,res)=>{
    let userInput = req.query.id ? req.query.id:1;
    //http://localhost:3010/json?postId=1
    let url =`https://jsonplaceholder.typicode.com/comments?postId=${userInput}`;
    //calling api
    request(url,(err,response)=>{
        if(err) throw err;
        const output = JSON.parse(response.body);
        //res.render('index',{title:'Weather app',result:output});
        res.send(response.body);
    })
})

app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Running on port ${port}`)
})