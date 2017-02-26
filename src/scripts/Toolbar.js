import Toolbar from '../components/Toolbar.html';

const comp = new Toolbar({
  target: document.querySelector('header'),
  data: {
    heading: ''
  },
});

export default comp;
