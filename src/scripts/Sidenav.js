import Sidenav from  '../components/Sidenav.html';
import R from 'ramda';


const comp = new Sidenav({
  target: document.querySelector('nav'),
  data: {
    versions: R.range(1, 11).reverse().map((n) => ({
      num: n,
      text: `제${n}호`,
      selected: n === 10
    }))
  }
});

export default comp;


