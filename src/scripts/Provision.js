import Provision from '../components/Provision.html';
import request from 'superagent';
import { markdown } from 'markdown';

const comp = new Provision({
  target: document.querySelector('.body__provision')
});

request.get('assets/data/01/provision.md')
  .then((res) => {
    comp.set({ content: markdown.toHTML(res.text) });
  });

export default comp;
