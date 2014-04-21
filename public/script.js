var socket = io.connect();

function addMessage(msg, user_name) {
    $("#messages").append('<div class="message"><p>' + user_name + ' : ' + msg + '</p></div>');
}

function sendMessage() {
    if ($('#messageInput').val() != "")
    {
        socket.emit('message', $('#message').val());
        addMessage($('#message').val(), "Me", new Date().toISOString(), true);
        $('#message').val('');
    }
}

function setName() {
    if ($("#nameInput").val() != "") {
        socket.emit('setName', $("#nameInput").val());
        $('#controls').show();
        $('#nameInput').hide();
        $('#nameSet').hide();
    }
}

socket.on('message', function(data) {
    addMessage(data['message'], data['user']);
});

$(function() {
    $("#controls").hide();
    $("#nameSet").click(function() {setName()});
    $("#submit").click(function() {sendMessage();});
});