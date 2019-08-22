/* eslint-disable no-undef */

const socket = io();
let currentGame;

function showMessage(text) {
  $('#game #messages').text(text);
  $('#game #messages').fadeIn('slow');
  $('#game #options').fadeOut('slow');
}

function startGame() {
  $('#home').fadeOut('slow');
  $('#game').fadeIn('slow');
  $('#game').css('display', 'flex');
  showMessage('Waiting for your opponent...');
}

function getRound() {
  $('#game #messages').fadeOut('slow');
  $('#game #options').fadeIn('slow');
}

$(() => {
  $('#startGame').submit((e) => {
    const nickname = $('#nickname').val();
    const startValue = $('#startValue').val();
    if (!nickname) {
      $('#nickname').addClass('is-invalid');
      return false;
    }
    $('#nickname').removeClass('is-invalid');

    const data = {
      nickname,
      startValue,
    };
    socket.emit('new-game', data);
    e.preventDefault();
    return false;
  });

  $('#games').on('click', '.join-game', (e) => {
    currentGame = $(e.target).attr('owner');
    socket.emit('join-game', currentGame);
    startGame();
    e.preventDefault();
    return false;
  });

  $('.option').click((e) => {
    socket.emit('round', $(e.target).attr('val'));
    showMessage('Waiting for the other player...');
    e.preventDefault();
    return false;
  });

  socket.on('waiting-opponent', () => {
    currentGame = socket.id;
    startGame();
  });

  socket.on('error', (msg) => {
    $('.alert').text(msg);
    $('.alert').fadeIn();
    setTimeout(() => {
      $('.alert').fadeOut();
      window.location.reload();
    }, 5000);
  });

  socket.on('active-games', (games) => {
    $('#games').empty();
    if (games) {
      games.forEach((game) => {
        const button = `<button class="join-game" owner="${game.users.owner}">Play with ${game.nickname}</button>`;
        $('#games').append($('<li>').html(button));
      });
    }
  });

  socket.on('your-round', () => {
    getRound();
  });

  socket.on('winner', () => {
    showMessage('You are The Winner!!');
    setTimeout(() => {
      window.location.reload();
    }, 7000);
  });

  socket.on('game-over', () => {
    showMessage('Game Over, Do you want to try again?');
    setTimeout(() => {
      window.location.reload();
    }, 7000);
  });
});
