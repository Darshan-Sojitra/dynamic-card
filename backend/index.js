import express from 'express';
import cors from 'cors';
import { createCard, userinput } from './types.js';
import { Admin, Card, User } from './db.js';
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

app.get('./cards',authenticateJwt,async(req,res)=>{
    const cards = await Card.find({});
    res.json({cards});
})

app.post('/newcard',authenticateJwt, async (req, res) => {
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


app.post('/user/signup',async(req,res)=>{
    const{username,pasword}= req.body;
    const payload = {username,password};
    const parsedPayload = userinput.safeParse(payload);
    if(!parsedPayload.success){
        res.status(411).json({"message":"Invalid input"});
        return;
    }else{
        const newuser =await new User({username,password});
        await newuser.save();
        const token = jwt.sign({username:username, role:'user'},SECRET,{expiresIn:'1h'});
        res.json({"message":"new user created",token:token});

    }
})

app.post('user/login',authenticateJwt,async (req,res)=>{
    const{username,password}=req.body;
    const payload = {username,password};
    const parsedPayload = userinput.safeParse(payload);
    if(!parsedPayload.success){
        res.status(411).json({message:"Invalid Input"});
        retutn ;
    }else{
        const token = jwt.sign({username:username},SECRET,{expiresIn:'1h'});
        res.json({message:"User was loged in succesffuly"});
    }

})


app.delete('/card/:id',async (req,res)=>{
    const cardId = req.params.id;
    try {
        const deletedCard = await Card.findByIdAndDelete(cardId);
        if (!deletedCard) {
            return res.status(404).json({ message: "Card not found" });
        }
        res.json({ message: "Card deleted successfully" });
    } catch (error) {
        console.error("Error deleting card:", error);
        res.status(500).json({ message: "Internal server error" });
    }
//     const cardIndex = card.
});


app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
