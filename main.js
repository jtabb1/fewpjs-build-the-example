// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
// (This developer prefers vanilla for loops because they are rumored
//  to be more performant than other types of loops, per:
//  https://blog.bitsrc.io/measuring-performance-of-different-javascript-loop-types-c0e9b1d193ed 
//  (retrieved April 9, 2021))

const glyphs = document.getElementsByClassName("like-glyph");
const errorDiv = document.getElementById('modal');
const errorP = document.getElementById('modal-message');

errorDiv.className = 'hidden';
errorP.innerHTML = '';

for (let i = 0; i < glyphs.length; i++) {
  glyphs[i].innerHTML = EMPTY_HEART;
  glyphs[i].classList.remove('activated-heart');
}

for (let i = 0; i < glyphs.length; i++) {
  glyphs[i].addEventListener('click', event => {
    const glyphSpan = event.target;
    const glyphState = glyphSpan.classList.contains('activated-heart');
    changeDom(glyphState, glyphSpan);
  });
}

function changeDom(state, node) {
  mimicServerCall()
  .then( () => {
    if (!state) {
      node.innerHTML = FULL_HEART;
      node.classList.add('activated-heart');
    } else {
      node.innerHTML = EMPTY_HEART;
      node.classList.remove('activated-heart');
    }
    errorDiv.className = 'hidden';
  })
  .catch( e => {
    errorDiv.className = '';
    errorP.innerHTML = e;
  });
}

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
