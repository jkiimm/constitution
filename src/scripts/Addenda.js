import Addenda from '../components/Addenda.html';
import request from 'superagent';
import { markdown } from 'markdown';

const comp = new Addenda({
  target: document.querySelector('.body__addenda')
});

request.get('/assets/data/01-addenda.md')
  .then((res) => {
    comp.set({ content: markdown.toHTML(res.text) });
  });

export default comp;
