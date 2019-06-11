const experss=require('express');
const router=experss.Router();
const jwt=require('jsonwebtoken');
const User=require('../models/user');
const Event=require('../models/events');
const mongoose=require('mongoose');
const db= "mongodb+srv://userandy:passwordandy@cluster0-8jed4.mongodb.net/eventsDB"

mongoose.connect(db,{ useNewUrlParser: true}, err=>{
    if(err){
        console.error('Error in connecting mongodb !! '+err );
    }else{
        console.log("Connected mongodb !! ");
    }
})

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('unauthorized request')
    }
    let payload=jwt.verify(token,'secretKey');
    if(!payload){
        return res.status(401).send('unauthorized request')
    }
    req.userId=payload.subject
    next()
    }


router.get('/',(req,res)=>{
    res.send('From API Route');
})

router.post('/createEvent',(req,res)=>{
    let eventData=req.body
    
    let event=new Event(eventData);
    event.save((error,eventDetails)=>{
        if (error){
            console.log(error)
        }else{
            var payload={subject:eventDetails._id}
            let token=jwt.sign(payload,'secretKey')
            res.status(200).send({token});
        }
    })
})

router.post('/register',(req,res)=>{
    let userData=req.body

    let user=new User(userData);
    user.save((error,registeredUser)=>{
        if (error){
            console.log(error)
        }else{
            var payload={subject:registeredUser._id}
            let token=jwt.sign(payload,'secretKey')
            res.status(200).send({token});
        }
    })
})

router.post('/login',(req,res)=>{
    let userData=req.body

    User.findOne({email:userData.email},(error,user)=>{
        if(error){
            console.log(error)
        }else{
            if(!user){
                res.status(401).send('invalid email');
            }else{
                if(user.password!==userData.password){
                    res.status(401).send('Invalid Password');
                } else {
                    let payload=({subject:user._id});
                    var token =jwt.sign(payload,'secretKey');
                    res.status(200).send({token});
                }
            }
        }
    })
})

router.get('/events', (req,res)=>{
    
    Event.find((error,events)=>{
        if(error){
            console.log('error');
        }else{
            let payload=({subject:user._id});
            var token =jwt.sign(payload,'secretKey');
            res.status(200).send({token},events);
        }
    })

    
})

router.get('/special',verifyToken, (req,res)=>{
    
        Event.find((error,events)=>{
            if(error){
                console.log('error');
            }else{
                let payload=({subject:user._id});
                var token =jwt.sign(payload,'secretKey');
                res.status(200).send({token},events);
            }
        })

})

module.exports=router;