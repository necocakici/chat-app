const express = require("express");
const socket = require("socket.io");

const app = express();
// Server kurulumu.
const server = app.listen(3000);

//HTML,CSS, JS yönetmek için statik public klasörümüz.
app.use(express.static("public"));

//socket başlangıcı, içerisine serverı verip çağırıyorum.
const io = socket(server);

//connection kontrol kısmı, bağlantı gerçekleşme noktası.
io.on('connection', (socket) => {
    //Her kullanıcının unique id aldığını kontrol ettim.
    console.log(socket.id);

    //click ve 'chat' ile data'dan gelen bilgileri bütün browserlara(bütün socketlere) yolluyor.
    socket.on('chat', data=>{
        io.sockets.emit('chat', data)
    })

    // typing dinlenip gelen değeri datayla yakalıyoruz ve broadcast ile bütün browserlara anlık typing olduğunu söylüyor ve gelen datayı bütün browserlara yolluyoruz.
    socket.on('typing', data =>{
        socket.broadcast.emit('typing', data)
    })
  });
