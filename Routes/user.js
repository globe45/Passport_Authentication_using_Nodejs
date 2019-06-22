const express=require('express');

const router=express.Router();
//login
router.get("/login",(req,res)=>{
    res.render("login")

})
//register
router.get("/register",(req,res)=>{
    res.render("register")
})
//resister handle
router.post('/register',(req,res)=>{
    const {name,email, password, password2}=req.body;
    let errors=[];
    //check require field

    if(!name || !email || !password || !password2){
        errors.push({msg :'please fill the all feild'});
    }
    //check the password is matching or not 
    if(password !=password2){
        errors.push({msg : 'passwords do not match'});
    }
    //check paasword length
    if(password.length<6){
        errors.push({msg: 'password should be atleast 6 character'});
    }

    if(errors.length >0){
        res.render('register',{
            errors,name,email,password,password2
        });
    }else{
        res.send('pass');
    }
});  
module.exports=router;