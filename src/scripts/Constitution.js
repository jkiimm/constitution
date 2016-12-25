import Constitution from '../components/Constitution.html';
import request from 'superagent';
import { markdown } from 'markdown';

const comp = new Constitution({
  target: document.querySelector('.body__constitution')
});

request.get('assets/data/01-the-constitution.md')
  .then((res) => {
    comp.set({ content: markdown.toHTML(res.text) });
  });

export default comp;
