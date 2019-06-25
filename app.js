const  express=require('express');
const expressLayouts=require('express-ejs-layouts');
const mongoose=require('mongoose'); 
const flash=require('connect-flash');
const session=require('express-session'); 
//create rest object
const app=express();
 
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
// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  
}))

//connect flash
app.use(flash());

//Global vars
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
})
//Routes
app.use("/",require("./Routes/index"));
app.use("/users",require("./Routes/user"));


const PORT=process.env.PORT || 5000;

app.listen(PORT,console.log(`server is listening port number ${PORT}`));