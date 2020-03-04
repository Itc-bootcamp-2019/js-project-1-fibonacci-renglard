function fibonacci(x) {
  let f1 = 0;
  let f2 = 1;

  if (x === 0) {
    fx = 0;
  } else if (x === 1) {
    fx = 1;
  } else {
    console.log("fib of 0 is f1 which is ", f1);
    console.log("fib of 1 is f2 which is ", f2);
    for (let i = 2; i <= x; i++) {
      fx = f1 + f2;
      console.log("fx of", i, "is", fx);
      f1 = f2;
      console.log("new f1 value is", f1);
      f2 = fx;
      console.log("new f2 value is", f2);
    }
    return fx;
  }
}
let number = (document.getElementById("x").innerText = 7);
document.getElementById("fx").innerText = fibonacci(number);
