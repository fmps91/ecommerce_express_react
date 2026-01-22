const port = process.env.PORT || 4000;
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")
const cors = require("cors");
const { type } = require('os');
const { error } = require('console');

app.use(express.json());
app.use(cors());


app.get('/', async function (req, res) {
    //await mongoDB.connect(process.env.mongo_uri)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send(`ok`);
});

/* const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/images')
    }, 
    filename:  (req, file, cb) => {
        return cb(null,`${file.filename}_${Date.now()}${path.extname(file.originalname)}`)
    },
})

const upload = multer({storage:storage}) */




/* app.post("/upload",upload.single("product"), (req,res) => {

    res.json({
        success:1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
}) */

app.use("/images", express.static('upload/images'))

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    avilable: {
        type: Boolean,
        default: true
    }
});

app.post("/addproduct", async (req, res) => {


    //1. inicializar storage para guardar
    const dir = './upload/images';
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './upload/images')
        },
        filename: (req, file, cb) => {
            return cb(null, `${file.filename}_${Date.now()}${path.extname(file.originalname)}`)
        },
    })


    // 2. Inicializar multer con el storage configurado
    const upload = multer({ storage: storage }).single('product');


    //3. inicializar product


    // 4. Ejecutar multer
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ error: err.message });
        } else if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        //console.log("req: ",req)
        const totalProducts = await Product.countDocuments({});

        let id = 1;
        if (totalProducts > -1) {
            id = id + totalProducts;
        }

        let product = new Product({
            id: id,
            name: req.body.name,
            image: `http://localhost:${port}/images/${req.file.filename}`,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        })


        //console.log(product);
        await product.save();

        res.send({
            message: 'Archivo recibido',
            file: req.product,
        });
    });
  
})


app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({
        id: req.body.id
    });
    console.log("removed")
    res.json({
        success: true,
        name: "removed"
    })

})

app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    res.json({
        success: true,
        "products": products
    })
})



//module users
const Users = mongoose.model('Users',{
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    cartData:{
        type:Object
    },
    date:{
        type:Date,
        default: Date.now
    }
})

//creating endpoints user
app.post('/signup',async (req,res)=>{
    let ckeck = await Users.findOne({email:req.body.email})

    if (ckeck) {
        return res.status(400).json({
            success:false,
            error: "existing user found with emal equal"
        })
    }

    let cart = {};
    for (let index = 0; index < 300; index++) {
        cart[index]=0      
    }

    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cartData: cart
    })

    await user.save();

    const data = {
        user:{
            id: user.id
        }
    } 

    const token = jwt.sign(data,'secret_ecom');
    res.json({
        success:true,
        token
    })
})




app.post('/signin',async(req,res)=>{
    console.log("signin/ ",req.body)
    let user = await Users.findOne({email:req.body.email});
    console.log("user: ",user)
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user:{
                    id: user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({
                success:true,
                token
            })
        }else{
            res.json({
                success:false,
                error: "wrong in the password"
            })
        }
    }else{
        res.json({
                success:false,
                error: "user not found"
            })
    }
})



//create endpoint for newcollection
app.get('/newcollections',async(req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("newcollection fetched")
    res.json({
        success:true,
        products:newcollection
    })
})


//create endpoint for popular in women section
app.get('/popularinwomen',async(req,res)=>{
    let products = await Product.find({category:'women'})
    let popular_in_women = products.slice(0,4);
    console.log("popular in women fetched")
    res.json({
        success:true,
        products:popular_in_women
    })
})

//creating middelware to fetch user
const fetchUser = async (req,res,next)=>{

        let token;
    
    // Intentar obtener de Authorization header primero

        token = (req.header('Authorization')).split(' ')[1];

        console.log("token: ",token)
    
    
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: "Token de autenticación requerido" 
        });
    }
    
    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (error) {
        // Manejo de errores...
        console.log("error en middleware: ",error)
        res.status(401).json({success:false,message:"the token error"})
    }
}


//creating endpoint for adding products in cardata
app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log("added: ",req.body)
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] +=1;
    await Users.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.json({
        success:true,
        //products:popular_in_women
    })
})

//creating endpoint removing product from cart
app.post('/removetocart',fetchUser,async(req,res)=>{
    console.log("removed: ",req.body)
    let userData = await Users.findOne({_id:req.user.id});
    if (userData.cartData[req.body.itemId]>0) 
    userData.cartData[req.body.itemId] -=1;
    await Users.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.json({
        success:true,
        //products:popular_in_women
    })
})

//creating endpoint to getcart
app.post('/getcart',fetchUser,async(req,res)=>{
    
    let userData = await Users.findOne({_id:req.user.id});
    console.log("data: ",userData)
    res.json({
        success:true,
        user: userData.cartData,
    })
})

async function messageServer() {

    console.log(`Server is running at http://localhost:${port}`);

}


module.exports = { app, port, messageServer };