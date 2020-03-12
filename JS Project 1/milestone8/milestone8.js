document.getElementById("myButton").addEventListener("click", fibonacciResult);
let inputBox = document.getElementById("fibNumber");
let loader = document.getElementById("loader");
let loader2 = document.getElementById("loader2");
let error42 = document.getElementById("error-42");
let output = document.getElementById("output");

fetchNumber2();

function fibonacciResult() {
  let userInput = document.getElementById("fibNumber");
  userInput = parseInt(userInput.value);
  let isChecked = document.getElementById("form-check").checked;
  let error50 = document.getElementById("errorMessage50");

  inputBox.classList.remove("theBox");
  invisible(output);
  invisible(error42);
  invisible(error50);
  visible(loader);
  if (isChecked) {
    if (userInput > 50) {
      error50message(error50);
    } else {
      fetch("http://localhost:5050/fibonacci/" + userInput)
        .then(response => {
          if (response.status === 400) {
            return response.text();
          } else {
            return response.json();
          }
        })
        .then(data => {
          console.log(data);
          if (typeof data === "object") {
            invisible(loader);
            visible(output);
            document.getElementById("output").innerText = data.result;
          } else {
            invisible(loader);
            document.getElementById("error-42").innerText =
              "Server Error: " + data;
            document.getElementById("error-42").classList.add("forty-two");
            visible(error42);
          }
        });
    }
    fetchNumber2();
  } else {
    visible(loader);
    invisible(output);
    setTimeout(() => {
      invisible(loader);
      visible(output);
    }, 2000);
    let localOutput = fibonacci(userInput);
    document.getElementById("output").innerText = localOutput;
    console.log(localOutput);
  }
}
function error50message(error50) {
  error50.innerHTML = "Can't be larger than 50";
  error50.classList.add("errorDecoration50");
  invisible(loader);
  inputBox.classList.add("theBox");
  visible(error50);
}
function fetchNumber2() {
  visible(loader2);
  fetch("http://localhost:5050/getFibonacciResults")
    .then(response => {
      return response.json();
    })
    .then(data => {
      invisible(loader2);
      const results = data.results;
      pastResults(results);
    });
}
function pastResults(results) {
  for (i = 0; i < results.length; i++) {
    let name = results[i].number;
    let result = results[i].result;
    let date = new Date(results[i].createdDate);

    document.getElementById("resultList").innerHTML +=
      `<li>The Fibonnaci of <b>${name}</b> is <b>${result}</b>. Calculated at: ${date}</li>` +
      "<hr>";
  }
}
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
function invisible(element) {
  element.style.visibility = "hidden";
}
function visible(element) {
  element.style.visibility = "visible";
}
