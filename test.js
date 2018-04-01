const Pool = require('./pool');
const p1 = new Pool(2);
const p2 = new Pool(3);

let t1 = {
  name: 't1',
  num: 0
};

let t2 = {
  name: 't2',
  num: 0
};

const a = (obj) => {
  return _ => {
    return new Promise(resolve => {
      setTimeout(_ => {
        console.log(`${obj.name} ${obj.num++}`);
        resolve();
      }, 2000);
    })
  };
};

p1.add(a(t1));
p1.add(a(t1));
p1.add(a(t1));
p1.add(a(t1));
p1.add(a(t1));

p2.addSync([a(t2), a(t2), a(t2), a(t2), a(t2), a(t2), a(t2)]);