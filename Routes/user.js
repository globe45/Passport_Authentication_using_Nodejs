const express=require('express');
const router=express.Router();
const bcrypt = require('bcryptjs');
const passport=require('passport');
//User modals
const User =require("../models/user");
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
        //validation passed
        User.findOne({email : email})
        .then(user => {
            if (user){
                //email are already exists\
                errors.push({msg :"Email is already Registered"});  
                res.render('register',{
                    errors,name,email,password,password2
                });
            } else{
                const newUser  =new User({
                    name,      
                    email,
                    password 
                });
                //Hash Password
                 bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.password, salt, (err,hash)=>{
                       if(err)throw err;
                         //set password hashed
                        newUser.password = hash;
                        //save user
                     newUser.save()
                         .then(user =>{
                               req.flash('success_msg','You are now registered and ca login');
                               res.redirect('/users/login')
                         })
                       .catch(err => console.log(err))
                
                     })
                   })
                 
            }
        }) 

    }
});  
//login handle  
router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect :'/users/login',
        failureFlash: true
    })(req,res,next);

});

//logout handle
router.get('/logout',(req,res)=>{
req.logOut();
req.flash('success_msg','you are logged out ')
res.redirect('/users/login')     
});

module.exports=router;