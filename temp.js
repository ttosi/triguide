// Write one Javascript statement on 
// the indicated line that will make the
// printed number always be between 10 and 20
let x = 2;
let y = 8;

const a = function (b) {
  return function (c) {
    //console.log(x, y, b, c);
    return x + y + Math.abs(b) + c;
  }
};

// Statement will go here
y = 4;

const fn = a(x);
x = 4;

let z = 0;
let min = 50;
let max = 0;

while (z < 100) {
  let cur = fn(Math.random() * 10);
  console.log(cur);
  min = cur < min ? cur : min;
  max = cur > max ? cur : max;
  z++;
}

console.log(Math.floor(min), Math.floor(max));
