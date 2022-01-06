const express = require('express')
const path = require('path')

const app = new express()
const ejs = require('ejs')

app.set('view engine','ejs')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())

/*
app.listen(4000,()=>{
    console.log('App listening on port 4000')
})
*/
app.listen(process.env.PORT,()=>{
    console.log(`App listening on port ${process.env.PORT}`)
})



//Get user data from local json file
const fs = require('fs');
const data = fs.readFileSync('user.json');
const user = JSON.parse(data);//str to matrix
let [result,ind] = []
let players=[]
let test = []

app.get('/', (req,res) =>{
    const myname = "Hello"
    res.render('index1',{myname:myname,myname:''});
    //res.render('index5');
    
})

app.post('/',(req,res) =>{
    //const message=req.body.username;
    //res.render('login',{message:message,myname:''});
})

app.post('/login',(req,res) =>{
    const username=req.body.username;
    const password=req.body.password;
    var [result,ind]=Guess(username);
    if (result === null){
        const message = 'Username is not exist!';
        res.render('login',{message:message,myname:''});
    }
    
    if (user[ind]["password"] != password){
        const message = 'password was wrong!';
        res.render("login",{message:message,myname:''});
    }
    else{
        players.push(username)
        res.render("member",{myname:username});
      
        
        //const coin = result['credit'];
        //if (parseInt(coin) <= 50 ){
        //    res.render("coin",{coin});
        //}
        //else{
        //   user[ind]["credit"]--;
        //    const data = JSON.stringify(user);//matrix tp str
        //    fs.writeFileSync('user.json', data);//save to user.json
        //    res.render("game41",{coin});
        //}
    }
    //search if username exists
    
  
})

app.post('/tips',(req,res) =>{
    const myname = ""
    res.render("tips",{myname:myname});
  
  
      })
app.get('/game',(req,res) =>{
    [result,ind]=Guess(players[0]);
    let score = req.body.score
    if (parseInt(score)>parseInt(user[ind]["score"]))user[ind]["score"] = parseInt(score);
    else;
    const data = JSON.stringify(user);//matrix tp str
    fs.writeFileSync('user.json', data);//save to user.json
    res.render("member",{myname:players[0]});
})
app.post('/game',(req,res) =>{
    [result,ind]=Guess(players[0]);
    const myname = players[0]
    const coin = user[ind]['credit'];
    const score = user[ind]['score'];
    result["credit"]--;
    const data = JSON.stringify(user);//matrix tp str
    fs.writeFileSync('user.json', data);//save to user.json
    res.render("game41",{coin:coin,score:score,myname:myname});
      })
app.get('/coin',(req,res) =>{
    [result,ind]=Guess(players[0]);
    const coin = user[ind]['credit'];
    res.render("coin",{coin:coin,myname:players[0]});
    let s =req.body.coin;
    user[ind]["credit"] += parseInt(s);
    const data = JSON.stringify(user);//matrix tp str
    fs.writeFileSync('user.json', data);//save to user.json
    const message = 'Log In again!';
    res.render("login",{message:message,myname:''});
})
app.post('/coin',(req,res) =>{
    [result,ind]=Guess(players[0]);
    const coin = user[ind]['credit'];
    res.render("coin",{coin:coin,myname:players[0]});
})
app.get('/login',(req,res) =>{
    const message = 'Hello!';
    res.render("login",{message:message,myname:''});
})
app.get('/member',(req,res) =>{
    res.render("member",{myname:players[0]});
})
app.post('/member',(req,res) =>{
    [result,ind]=Guess(players[0]);
    const coin = user[ind]['credit'];
    let s =req.body.coin;
    if (s==null)s=0;
    user[ind]["credit"] += parseInt(s);
    const data = JSON.stringify(user);//matrix tp str
    fs.writeFileSync('user.json', data);//save to user.json
    res.render("member",{myname:players[0]}); 
})
app.get('/Register',(req,res) =>{
    const message = 'Please select a username and password!'
    res.render("register",{message:message,myname:''});

})
app.post('/Register',(req,res) =>{
    const username=req.body.username;
    const password=req.body.password;
    const key = req.body.key;
    let result
    result=Guess(username);
    if (result[0] != null){
        const message = username + ' has be registed';
        res.render("register",{message:message,myname:''});
    }
    else if (key != "Yuntech"){
        const message = 'Key Error!';
        res.render("register",{message:message,myname:''});
    }
    else if (result[0] === null){
        const newdata={"username":username,"password":password,"credit":50,"score":0};
        user.push(newdata);
        //console.log(user)
        const data = JSON.stringify(user);//matrix tp str
        fs.writeFileSync('user.json', data);//save to user.json
        const message = 'Hello!';
        res.render("login",{message:message,myname:''})
    }
    
    
  

})
function Guess(username){
  let ind = null;
  let result = null;
  for (let i=0 ; i <= user.length ; i++)
    
    {
        if (user[i]["username"] == username) 
        {    result = user[i];  //get the user data
             ind = i;  //index number of this user
             console.log(result);
             return [result,ind];
        }
    }
}

