// ### Import CSS Files ###
import './reset.css';
import './style.css';
// ### Import JS Modules ###

const searchbox = document.querySelector('input');
searchbox.addEventListener('keypress', (key) => {
  if (key.code === 'Enter') console.log(searchbox.value);
});
let timer = null;
searchbox.addEventListener('keyup', (key) => {
  if (key.code !== 'Enter' && searchbox.value !== '') {
    clearTimeout(timer);
    timer = setTimeout(() => console.log('hi'), 500);
  }
});
