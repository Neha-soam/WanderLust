const express = require("express");
const app = express();
const session = require("express-session");
const flash= require("connect-flash");
const path=require("path");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
const sessionOptions = {secret:"mysecretcode",resave:true,saveUninitialized:true}

app.use(session(sessionOptions));
app.use(flash());
app.get("/reqCount",(req,res)=>{
    if(req.session.count){req.session.count++}else{
        req.session.count=1;
    }
    // res.send("test succesful");
})
app.use((req,res,next)=>{
res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})
app.get("/register",(req,res)=>{
    let {name="anonyms"}=req.query;
    req.session.name=name;
    if(name==="anonyms"){
        req.flash("error","user not registered");
    }else{
        req.flash("success", "Registration successful");
    }
    

    res.redirect("/hello");
})
app.get("/hello",(req,res)=>{
    
    // res.send(`hello ${req.session.name}`);
    res.render("page.ejs",{name:req.session.name});

})

app.listen(3000,()=>{
    console.log("server is listning to 3000");
    
})