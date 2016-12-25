import Body from '../components/Body.html';
import request from 'superagent';
import { markdown } from 'markdown';
import yaml from 'js-yaml';

const comp = new Body({
  target: document.querySelector('main')
});

request.get('assets/data/01-meta.yaml')
  .then((res) => {
    const obj = yaml.load(res.text);
    comp.set({ meta: markdown.toHTML(obj.general) });
  });

export default comp;
