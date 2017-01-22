import Body from '../components/Body.html';

const comp = new Body({
  target: document.querySelector('main'),
  data: {
    addenda: { content: '', meta: '' },
  },
});

export default comp;
