import express from 'express';
import cors from 'cors';
import { createCard, userinput } from './types.js';
import { Admin, Card } from './db.js';
import jwt from 'jsonwebtoken';

const SECRET='SecRET';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


const authenticateJwt=(req,res,next)=>{
    const authHeader = req.headers.authentication;
    if(authHeader){
        const token = authHeader;
        jwt.verify(token,SECRET,(err,user)=>{
            if(err){
                return res.senStatus(403);
            }
            req.user=user;
            next();
        });
    }else{
        res.senStatus(401);
    }
}
app.post ('/admin/signup',async (req,res)=>{
    const{username ,password}= req.body;
    const payload = {username,password};
    const parsedpayload = userinput.safeParse(payload);
    if(!parsedpayload.success){
        res.status(411).json({
            message:"invalid input"
        })
    }else{
        const admin  =await Admin.findOne({username});
        if(admin){
            res.status(403).json({
                message:"Admin already exists"
            });
        }else{
            
            const newAdmin =await new Admin({username:username,password:password});
            await newAdmin.save();
            const token  = jwt.sign ({username,role:'admin'},SECRET,{expiresIn:'1h'});
            res.json({message:'Admin creaetd successfully',token});
        }
    }
})

app.post('/admin/login',async(req,res)=>{
    const {username ,password}=req.body;const payload = {username,password};
    const parsedpayload = userinput.safeParse(payload);
    if(!parsedpayload.success){
        res.status(411).json({
            message:"invalid input"
        })
    }else{
        const admin = await Admin.findOne({username,password});
        if(admin){
            const token  = jwt.sign({username,role:'admin'},SECRET,{expiresIn:'1h'});
            res.json({message:"Logged in successfully",token});
        }else{
            res.status(403).json({message:"Inavlid username or password"});
        }
    }
});

app.get('./cards',async(req,res)=>{
    const cards = await Card.find({});
    res.json({cards});
})

app.post('/newcard', async (req, res) => {
    const payload = req.body;
    const parsedPayload = createCard.safeParse(payload);
    if (!parsedPayload.success) {
        res.status(411).json({
            message: "Invalid Input"
        });
        return;
    }
    await Card.create({
        imgSrc: payload.imgSrc,
        imgAlt: payload.imgAlt,
        title: payload.title,
        description: payload.description,
        buttonText: payload.buttonText,
        link: payload.link
    });
    res.json({
        message: "Card Created"
    });
});


app.get('/cards',async(req,res)=>{
    const cards =await Card.find({});
    res.json({cards});

})

// app.delete('/card/:id',async (req,res)=>{
//     const cardId = parseInt(req.params.id);
// //     const cardIndex = card.
// });

app.u
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
