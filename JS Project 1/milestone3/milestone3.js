function fibonacci(x) {
  let f1 = 0;
  let f2 = 1;
  let i;
  let fx;

  if (x < 1) {
    y = 0;
  } else if (x === 1) {
    y = 1;
  } else {
    for (i = 2; i <= x; i++) {
      fx = f1 + f2;
      f1 = f2;
      f2 = fx;
    }
    y = fx;
  }
  // return y;

  document.getElementById("x").innerText = "7";
  document.getElementById("y").innerText = y;
}
fibonacci(7);
