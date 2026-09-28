
if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const dbUrl=process.env.ATLASDB_URL;

const Listing = require("./models/listing.js");
const path = require("path");
// const Review = require("./models/review.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
// const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session"); 
const MongoStore=require("connect-mongo");


const flash= require("connect-flash");
const passport = require("passport");
const LocalStrategy=require("passport-local");//static method
const User = require("./models/user.js");

// const {listingSchema,reviewSchema}=require("./schema.js");

const listingsRouter = require("./routes/listing.js");
const router = express.Router();
const reviewsRouter = require("./routes/review.js");
const userRouter=require("./routes/user.js");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
main()
    .then(() => {
        console.log("connected to DB");

    })
    .catch((err) => {
        console.log(err);

    })

async function main() {
    await mongoose.connect(dbUrl);
}


const store = MongoStore.create(
    {
        mongoUrl:dbUrl,
    crypto:{
        secret:"mysecretcode"
    },
    touchAfter:24*3600,
}
)
store.on("error",(err)=>{
    console.log("ERROR IN MONGO STORE",err);
    
})
const sessionOptions = {secret:"mysecretcode",
    
  
    resave:false
    ,saveUninitialized:false,
    cookie:{
        // expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true, 

    }
}

app.use(session(sessionOptions)); 
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})

// app.get("/", (req, res) => {
//     res.send("Hii");

// });
// app.get("/demoUser",async(req,res)=>{
//     let fakeUser = new User({
//         email:"neha@123",
//         username:"delta-student",
//     })
//     let registeredUser=await User.register(fakeUser,"helloworld");
//     res.send(registeredUser);
    
// })


app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);



app.all("/*splat", (req, res, next) => {
    next(new ExpressError(404, "page not found"));
})
//custom error handler
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{err});

})




app.listen(8080, () => {
    console.log("server is listening to port 8080");

})