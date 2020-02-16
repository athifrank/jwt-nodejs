const express=require('express')
const jwt=require('jsonwebtoken')
const app=express()

app.get('/api',verify,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
          res.sendStatus(403);
        }else{
            res.json({
                name:'athi',
                age:26,
                authData
            })
        }
    })

})

app.post('/api/sign',(req,res)=>{
    const user={
        id:1,
        name:'athi'
    }
    jwt.sign(user,'secretkey',(err,token)=>{
        res.json({
            token 
        })
    })
})

function verify(req,res,next){
    const bearerHeader=req.headers['authorization'];

    if(typeof bearerHeader !=='undefined'){
        const bearer=bearerHeader.split(' ')
        const bearerToken=bearer[1];
        req.token=bearerToken;
        next();
    }else{
        res.sendStatus(403)
    }
}

app.listen(5000,()=>{
    console.log('server running')
})
