const express = require('express')
const path = require('path')

const app = new express()
const ejs = require('ejs')

app.set('view engine','ejs')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())

app.listen(process.env.PORT,()=>{
    console.log(process.env.PORT,)
})

app.get('/', (req,res) =>{
    res.render('index')
    //res.end('hello world!')
})

app.get('/game', (req,res) =>{
    res.render('game41')
})

app.get('/test', (req,res) =>{
    res.end('This is a test.')
})

app.get('/posts/new',(req,res) =>{
    res.render('create')
})
