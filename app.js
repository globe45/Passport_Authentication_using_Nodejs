const  express=require('express');
const expressLayouts=require('express-ejs-layouts');
const mongoose=require('mongoose'); 
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

//Routes
app.use("/",require("./Routes/index"));
app.use("/users",require("./Routes/user"));


const PORT=process.env.PORT || 5000;

app.listen(PORT,console.log(`server is listening port number ${PORT}`));