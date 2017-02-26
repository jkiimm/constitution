import Dimmer from '../components/Dimmer.html';

const comp = new Dimmer({
  target: document.querySelector('.dimmer'),
  data: {
    className: 'screen'
  },
});

export default comp;
