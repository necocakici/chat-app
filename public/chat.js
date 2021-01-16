//Browser taraafından connection.
const socket = io.connect("http://localhost:3000");

const sender = document.getElementById("sender");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");


//Submit butonu clickini kontrol edicez.
submitBtn.addEventListener("click", () => {
    //Serverdaki socket ile bağlantı kurup emit ile köprü oluşturucaz. Server-Browser bilgi akışı. Sockete gelen bilgileri gönderiyoruz.
    //İlk parametre yazışma takip için chat değeri, ikinci param nesne. 
    //Emit ile 'BU' browserda yakaladığmız message ve sender'ı server tarafında kullanabilcez.
  socket.emit("chat", {
    message: message.value,
    sender: sender.value,
  });
});
//'chat' te yakalanan datayı output'a basıyor.
socket.on('chat', data=>{
    feedback.innerHTML = ''
    output.innerHTML += `<p><strong>${data.sender}: </strong> ${data.message}</p>`
    message.value = ''
})

//Bu sockette(browserda) message keypress olduğunda servera senderValue'u yollayacak.
message.addEventListener('keypress', ()=>{
    socket.emit('typing', sender.value)
})
//typing ile gleen değeri datayla yakalıyoruz ve feedback'e yazdırıyoruz.
socket.on('typing', data => {
    feedback.innerHTML = `<p>${data} yazıyor...</p>`
})