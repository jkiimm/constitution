import Preamble from '../components/Preamble.html';
import request from 'superagent';
import { markdown } from 'markdown';

const comp = new Preamble({
  target: document.querySelector('.body__preamble')
});

request.get('assets/data/01-preamble.md')
  .then((res) => {
    comp.set({ content: markdown.toHTML(res.text) });
  });

export default comp;
