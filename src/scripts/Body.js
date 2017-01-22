import Body from '../components/Body.html';
import request from 'superagent';
import { markdown } from 'markdown';
import yaml from 'js-yaml';

const comp = new Body({
  target: document.querySelector('main'),
  data: {
    addenda: { content: '', meta: '' },
  },
});

let meta = {};

request.get('assets/data/10/preamble.md')
  .then((res) => {
    comp.set({ preamble: markdown.toHTML(res.text) });
  });

request.get('assets/data/10/provision.md')
  .then((res) => {
    comp.set({ provision: markdown.toHTML(res.text) });
  });

request.get('assets/data/10/meta.yaml')
  .then((res) => {
    meta = yaml.load(res.text);
    comp.set({ meta: markdown.toHTML(meta.general) });

    return request.get('assets/data/10/addenda.md');
  })
  .then((res) => {
    comp.set({
      addenda: {
        body: markdown.toHTML(res.text),
        meta: markdown.toHTML(meta.addenda)
      }
    });
  });

export default comp;
