document.getElementById("myButton").addEventListener("click", fibonacciResult);
let inputBox = document.getElementById("fibNumber");
let loader = document.getElementById("loader");
let loader2 = document.getElementById("loader2");
let error42 = document.getElementById("error-42");
let output = document.getElementById("output");
hide(loader);
fetchResultList();

function fibonacciResult() {
  let userInput = document.getElementById("fibNumber");
  userInput = parseInt(userInput.value);
  let isChecked = document.getElementById("form-check").checked;
  let error50 = document.getElementById("errorMessage50");
  inputBox.classList.remove("theBox");
  hide(output);
  hide(error42);
  hide(error50);

  if (isChecked) {
    if (userInput > 50) {
      error50message(error50);
    } else {
      show(loader);
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
            hide(loader);
            show(output);
            document.getElementById("output").innerText = data.result;
          } else {
            hide(loader);
            document.getElementById("error-42").innerText =
              "Server Error: " + data;
            document.getElementById("error-42").classList.add("forty-two");
            show(error42);
          }
        });
    }
    fetchResultList();
  } else {
    show(loader);
    hide(output);
    setTimeout(() => {
      hide(loader);
      show(output);
    }, 2000);
    let localOutput = fibonacci(userInput);
    document.getElementById("output").innerText = localOutput;
    console.log(localOutput);
  }
}
function error50message(error50) {
  error50.innerHTML = "Can't be larger than 50";
  error50.classList.add("errorDecoration50");
  hide(loader);
  inputBox.classList.add("theBox");
  show(error50);
}
function fetchResultList() {
  show(loader2);
  fetch("http://localhost:5050/getFibonacciResults")
    .then(response => {
      return response.json();
    })
    .then(data => {
      hide(loader2);
      const results = data.results;
      pastResults(results);
    });
}
function pastResults(results) {
  for (let i = 0; i < results.length; i++) {
    let name = results[i].number;
    let result = results[i].result;
    let date = new Date(results[i].createdDate);

    let resultWrapper = document.getElementById("resultWrapper");

    let fetchResult = document.createElement("div");
    fetchResult.classList.add("fetchResult");

    let part1 = document.createElement("span");
    part1.innerText = "The Fibonacci of ";

    let boldNumber = document.createElement("span");
    boldNumber.innerText = name;
    boldNumber.classList.add("bold");

    let part2 = document.createElement("span");
    part2.innerText = " is ";

    let boldResult = document.createElement("span");
    boldResult.innerText = result;
    boldResult.classList.add("bold");

    let part3 = document.createElement("span");
    part3.innerText = ". Calculated at: ";

    let theDate = document.createElement("span");
    theDate.innerText = date;

    fetchResult.append(part1, boldNumber, part2, boldResult, part3, theDate);
    resultWrapper.append(fetchResult);
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
function hide(element) {
  element.classList.add("visibility");
}
function show(element) {
  element.classList.remove("visibility");
}
