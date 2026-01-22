const server=require("./index")
const db=require("./db/conexion")

async function messages(){
    
    try{
    //await db.connect(process.env.mongo_uri)
    await db.connect("mongodb://localhost:27017/ecommerce_db")
    server.messageServer()
    } catch (error) {
        console.log("Error en la conexion db o el servidor")
        process.exit(1);
    }
}

server.app.listen(server.port,messages);