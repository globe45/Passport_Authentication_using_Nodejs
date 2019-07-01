const  express=require('express');
const expressLayouts=require('express-ejs-layouts');
const mongoose=require('mongoose'); 
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport'); 

//create rest object
const app=express();

//passport config
require('./config/passport')(passport);
 
//DB Config
const db=require('./config/keys').MongoURI;
 
//connect to mongo
mongoose.connect(db,{useNewUrlParser : true})
.then(()=> console.log('MongoDB Connected...'))
.catch(err => console.log(err));


//EJS
app.use(expressLayouts);
app.set('view engine','ejs');
//Bodyparser
app.use(express.urlencoded({extended : false}));

//express Session
// app.set('trust proxy', 1) trust first proxy
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
  
})); 
//passport  middleware 
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//Global vars
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg' );
    res.locals.error =req.flash('error' );
    next();
})
//Routes
app.use("/",require("./Routes/index"));
app.use("/users",require("./Routes/user"));


const PORT=process.env.PORT || 5000;

app.listen(PORT,console.log(`server is listening port number ${PORT}`));