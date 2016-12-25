import Addenda from '../components/Addenda.html';
import request from 'superagent';
import { markdown } from 'markdown';
import yaml from 'js-yaml';

const comp = new Addenda({
  target: document.querySelector('.body__addenda')
});

request.get('assets/data/01-addenda.md')
  .then((res) => {
    comp.set({ content: markdown.toHTML(res.text) });
  });

request.get('assets/data/01-meta.yaml')
  .then((res) => {
    const obj = yaml.load(res.text);
    comp.set({ meta: markdown.toHTML(obj.addenda) });
  });

export default comp;
