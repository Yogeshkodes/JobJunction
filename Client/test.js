function foo(...args) {
  const [a, ...middle] = args;
  //   const c = middle.pop();
  console.log(a, middle, c);
}

foo(1, 2, 3, 4, 5);
// Output: 1 [2, 3, 4] 5
