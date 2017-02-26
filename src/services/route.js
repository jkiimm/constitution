import Navigo from 'navigo';
import request from 'superagent';
import { markdown } from 'markdown';
import yaml from 'js-yaml';
import body from '../scripts/Body';
import toolbar from '../scripts/Toolbar';

const router = new Navigo(null, true);

router.on('/articles/:ver', (params) => {
  setContent(params.ver);
})
.resolve();

export default router;

function setContent(ver) {
  const verStr = `0${ver}`.slice(-2);
  let meta = {};

  toolbar.set({ heading: `헌법 제${ver}호` });

  request.get(`assets/data/${verStr}/preamble.md`)
    .then((res) => {
      body.set({ preamble: markdown.toHTML(res.text) });
    });

  request.get(`assets/data/${verStr}/provision.md`)
    .then((res) => {
      body.set({ provision: markdown.toHTML(res.text) });
    });

  request.get(`assets/data/${verStr}/meta.yaml`)
    .then((res) => {
      meta = yaml.load(res.text);
      body.set({ meta: markdown.toHTML(meta.general) });

      return request.get(`assets/data/${verStr}/addenda.md`);
    })
    .then((res) => {
      body.set({
        addenda: {
          body: markdown.toHTML(res.text),
          meta: markdown.toHTML(meta.addenda)
        }
      });
    });
}

