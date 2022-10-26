const socket = io.connect();

socket.on('productos', data => {
	renderizadoProductos(data)
})

socket.on('mensajes', data => {
	renderizadoMensajes(data)
})

const form = document.getElementById('form')
const formChat = document.getElementById('formChat')
const renderProducto = document.querySelector('#productos')
const chatContainer = document.querySelector('#chat')

form.addEventListener('submit', (event) => {
	event.preventDefault()
	const producto = {
		nombre: document.querySelector('#nombre').value,
		precio: document.querySelector('#precio').value,
		url: document.querySelector('#url').value,
	}
	document.querySelector('#nombre').value = ''
	document.querySelector('#precio').value = ''
	document.querySelector('#url').value = ''
	socket.emit('new-producto', producto)
})

formChat.addEventListener('submit', (event) => {
	event.preventDefault()
	const mensaje = {
		nombre: document.querySelector('#name').value,
		mensaje: document.querySelector('#mensaje').value,
	}
	document.querySelector('#mensaje').value = ''

	socket.emit('new-message', mensaje)
})






const renderizadoProductos = async (productos) => {
	const respuesta = await fetch('./productos.template.handlebars')
	const template = await respuesta.text()
	const compiledTemplate = Handlebars.compile(template);
	const html = compiledTemplate({ productos })
	renderProducto.innerHTML = html
}

const renderizadoMensajes = async (messages) => {

	const respuesta = await fetch('./chat.template.handlebars')
	const template = await respuesta.text()
	const compiledTemplate = Handlebars.compile(template);
	const html = compiledTemplate({ messages })
	chatContainer.innerHTML = html
}







