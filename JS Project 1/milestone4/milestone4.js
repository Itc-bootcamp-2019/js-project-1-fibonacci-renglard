function fibonacci(x) {
  let f1 = 0;
  let f2 = 1;
  let fx;

  if (x == 0) {
    return 0;
  } else if (x == 1) {
    return 1;
  } else {
    for (let i = 2; i <= x; i++) {
      fx = f1 + f2;
      f1 = f2;
      f2 = fx;
    }
    return fx;
  }
}

function fibonacciResult() {
  let a = document.getElementById("fibNumber");
  document.getElementById("demo").innerText = fibonacci(a.value);
}

document.getElementById("myButton").addEventListener("click", fibonacciResult);
