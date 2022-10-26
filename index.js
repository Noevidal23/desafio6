const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { create } = require('express-handlebars');
const router = require('./routes/routerPage.js');
const producto = require('./models/productos/productos');
const mensaje = require('./models/mensajes/mensajes')
const date = require('date-format')


const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.static('public'));
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const hbs = create({
    helpers: {
    }
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use('/', router)


io.on('connection', socket => {
    sendProducts(socket);
    sendMessages(socket);

    socket.on('new-producto', data => {
        saveProduct(data)
    })
    socket.on('new-message', data => {
        saveMessage(data)
    })
})


httpServer.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});



const sendProducts = async (socket) => {
    const productos = await producto.getAll()
    socket.emit('productos', productos)
}
const sendMessages = async (socket) => {
    const mensajes = await mensaje.getAll()
    socket.emit('mensajes', mensajes)
}
const saveProduct = async (data) => {
    
    await producto.save(data);
    io.sockets.emit('producto-push', data)
}
const saveMessage = async (data) => {
    data.time = date('dd/MM/yy-hh:mm:ss')
    await mensaje.save(data);
    io.sockets.emit('message-push', data)
}