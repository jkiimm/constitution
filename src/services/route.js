import Navigo from 'navigo';
import request from 'superagent';
import { markdown } from 'markdown';
import yaml from 'js-yaml';
import app from '../scripts/Body';

const router = new Navigo(null, true);

router.on('/articles/:ver', (params) => {
  setContent(`0${params.ver}`.slice(-2));
})
.resolve();

export default router;

function setContent(ver) {
  let meta = {};

  request.get(`assets/data/${ver}/preamble.md`)
    .then((res) => {
      app.set({ preamble: markdown.toHTML(res.text) });
    });

  request.get(`assets/data/${ver}/provision.md`)
    .then((res) => {
      app.set({ provision: markdown.toHTML(res.text) });
    });

  request.get(`assets/data/${ver}/meta.yaml`)
    .then((res) => {
      meta = yaml.load(res.text);
      app.set({ meta: markdown.toHTML(meta.general) });

      return request.get(`assets/data/${ver}/addenda.md`);
    })
    .then((res) => {
      app.set({
        addenda: {
          body: markdown.toHTML(res.text),
          meta: markdown.toHTML(meta.addenda)
        }
      });
    });
}

