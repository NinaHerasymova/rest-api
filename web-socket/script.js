const socket = new WebSocket('wss://zi-node-chat.herokuapp.com');
const chat = document.querySelector('.chat');
const input = document.querySelector('.input');
const status = document.querySelector('.status');
let userName = false;
let newObject;
let message = '';

socket.onopen = function() {
  try {
    console.log('Connection done');
    status.innerText = 'Choose username:';
  } catch (e) {
    console.error(e);
  }
};

socket.onerror = function() {
  console.log('Connection error');
  status.innerText = 'Error';
  input.innerText = 'Server error';
  input.disabled = true;
};

socket.onmessage = function(event) {
  let json = JSON.parse(event.data);
  let type = json.type;

  if (type === 'history') {
    for (i = 0; i < json.data.length; i++) {
      getMessage(
        json.data[i].time,
        json.data[i].text,
        json.data[i].author,
        json.data[i].color
      );
    }
  } else if (type === 'message') {
    getMessage(
      json.data.time,
      json.data.text,
      json.data.author,
      json.data.color
    );
    chat.lastChild.scrollIntoView(false);
  } else if (type === 'color') {
    status.style.color = json.data;
  }
  input.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
      let msg = this.value;
      status.innerHTML = this.value;
      if (this.value !== '') {
        socket.send(msg);
        this.value = '';
      } else {
        return;
      }
    }
  });
  function getMessage(time, text, author, color) {
    let msTime = new Date(time);
    let string = document.createElement('p');
    let timeStr = `${
      msTime.getHours() < 10 ? '0' + msTime.getHours() : msTime.getHours()
    }:
                   ${
                     msTime.getMinutes() < 10
                       ? '0' + msTime.getMinutes()
                       : msTime.getMinutes()
                   }`;
    string.innerHTML += `<span style="color: ${color}"> ${author}:</span>${timeStr} @ ${text}`;
    chat.append(string);
  }
};
