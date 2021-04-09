// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

const glyphs = document.getElementsByClassName("like-glyph");
const errorDiv = document.getElementById('modal');
const errorP = document.getElementById('modal-message');

errorDiv.className = 'hidden';
errorP.innerHTML = '';

console.log(glyphs);
console.log(glyphs.length);
for (let i = 0; i < glyphs.length; i++) {
  glyphs[i].innerHTML = EMPTY_HEART;
  glyphs[i].classList.remove('activated-heart');
}
// glyphs.forEach( function(glyph) {
//   glyph.innerHTML = EMPTY_HEART;
// });

for (let i = 0; i < glyphs.length; i++) {
  glyphs[i].addEventListener('click', event => {
    const glyphSpan = event.target;
    const glyphState = glyphSpan.classList.contains('activated-heart');
    console.log(!glyphSpan);
    if (!glyphState) {
      mimicServerCall()
      .then( () => {
        glyphSpan.innerHTML = FULL_HEART;
        glyphSpan.classList.add('activated-heart');
        errorDiv.className = 'hidden';
      })
      .catch( e => {
        errorDiv.className = '';
            console.log(e);
        errorP.innerHTML = e;
      });
    } else if (glyphState) {
      mimicServerCall()
      .then( () => {
        glyphSpan.innerHTML = EMPTY_HEART;
        glyphSpan.classList.remove('activated-heart');
        errorDiv.className = 'hidden';
      })
      .catch( e => {
        errorDiv.className = '';
            console.log(e);
        errorP.innerHTML = e;
      });
    } else {
      alert('Error: Something must have gone wrong.')
    }
  });
}

// function listen() {}


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
