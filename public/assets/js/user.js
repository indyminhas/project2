// On connection, get data for user with that id
$(function () {
    const roomList = $("#roomList")
    $.get("/api/user", function (data, status) {
        console.log(data)
        data.Rooms.forEach(room => {
            $(`<button>
               <a href="/room/${room.route_name}" class="secondary-content"> ${room.room_name}</a>
                </button>
                <br>`).appendTo(roomList)
        })
    })
})

// initialization for according element
$(document).ready(function(){
    $('.collapsible').collapsible();
  });

// Create Room functionality
const createRoomForm = document.getElementById("createRoomForm");
const createRoomInput = document.getElementById("createRoomInput");

createRoomForm.addEventListener('submit', e => {
    e.preventDefault()
    var room = { room_name: createRoomInput.value.trim()}
    // post request to the room table
    $.post('/api/rooms', room).then(function(){
        location.reload()
    }).catch(err=>{
        alert(err)
    })
    createRoomForm.value = ''
});

// Delete Room functionality



