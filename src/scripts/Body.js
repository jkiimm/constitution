import Body from '../components/Body.html';

const comp = new Body({
  target: document.querySelector('main'),
  data: {
    addenda: { content: '', meta: '' },
    innerClass: 'body__inner',
  },
});

export default comp;
