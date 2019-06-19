const  express=require('express');
const expressLayouts=require('express-ejs-layouts');
//create rest object
const app=express();
//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//Routes
app.use("/",require("./Routes/index"));
app.use("/users",require("./Routes/user"));


const PORT=process.env.PORT || 5000;

app.listen(PORT,console.log(`server is listening port number ${PORT}`));