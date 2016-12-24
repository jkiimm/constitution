import Body from '../components/Body.html';
import request from 'superagent';
import { markdown } from 'markdown';

const comp = new Body({
  target: document.querySelector('main')
});

request.get('/assets/data/01-the-constitution.md')
  .then((res) => {
    comp.set({ content: markdown.toHTML(res.text) });
  });

export default comp;
