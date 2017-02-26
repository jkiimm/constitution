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
  let content = {};

  toolbar.set({ heading: `헌법 제${ver}호` });
  body.set({ innerClass: 'body__inner body__inner--loading' });

  Promise.all([
    request.get(`assets/data/${verStr}/preamble.md`),
    request.get(`assets/data/${verStr}/provision.md`),
    request.get(`assets/data/${verStr}/meta.yaml`),
  ])
    .then((ress) => {
      content.preamble = markdown.toHTML(ress[0].text);
      content.provision = markdown.toHTML(ress[1].text);

      meta = yaml.load(ress[2].text);
      content.meta = markdown.toHTML(meta.general);

      return request.get(`assets/data/${verStr}/addenda.md`);
    })
    .then((res) => {
      content.addenda = {
        body: markdown.toHTML(res.text),
        meta: markdown.toHTML(meta.addenda)
      };
      content.innerClass = 'body__inner';

      body.set(content);
    });
}

