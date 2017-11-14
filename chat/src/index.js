window.onload = function() {
	var $ = function(el) {
		return document.querySelector(el);
	};
	function showMsg(from, msg) {
		var li = document.createElement('li');
		li.className = 'announcement';
		// server xss
		li.innerHTML = (from ? from + ':' : '') + msg;
		$('#messages').appendChild(li);
	}

	var socket = io.connect();
	socket.on('connect', function() {
		socket.emit('join', prompt('What is your name?'));
		$('#chat').style.display = 'block';
	});

	socket.on('announcement', function(msg) {
		showMsg('', msg);
	});

	socket.on('chat', showMsg);

	socket.on('disconnect', function() {
		showMsg('Err:', 'you are disconnected')
	});

	// send messages
	$('button').onclick = function(e) {
		var $el = $('#input');
		var msg = $el.value.trim();
		if (!msg) {
			alert('please input some words');
		}
		socket.emit('chat', msg);
		showMsg('Me', msg);
		$el.value = '';
		$el.focus();
	}
}
