document.getElementById("myButton").addEventListener("click", fibonacciResult);
let inputBox = document.getElementById("fibNumber");

function fibonacciResult() {
  let userInput = document.getElementById("fibNumber");
  userInput = parseInt(userInput.value);

  let error50 = document.getElementById("errorMessage50");
  inputBox.classList.remove("theBox");
  document.getElementById("output").style.visibility = "hidden";
  document.querySelector(".loader").style.visibility = "visible";
  document.getElementById("error-42").style.visibility = "hidden";
  error50.style.visibility = "hidden";

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
          document.querySelector(".loader").style.visibility = "hidden";
          document.getElementById("output").style.visibility = "visible";
          document.getElementById("output").innerText = data.result;
        } else {
          document.querySelector(".loader").style.visibility = "hidden";
          document.getElementById("error-42").innerText =
            "Server Error: " + data;
          document.getElementById("error-42").classList.add("forty-two");
          document.getElementById("error-42").style.visibility = "visible";
        }
      });
  }
  fetchNumber2();
}

function error50message(error50) {
  error50.innerHTML = "Can't be larger than 50";
  error50.classList.add("errorDecoration50");
  document.querySelector(".loader").style.visibility = "hidden";
  inputBox.classList.add("theBox");
  error50.style.visibility = "visible";
}

fetchNumber2();

function fetchNumber2() {
  document.querySelector(".loader2").style.visibility = "visible";
  fetch("http://localhost:5050/getFibonacciResults")
    .then(response => {
      return response.json();
    })
    .then(data => {
      //console.log(data.results);
      document.querySelector(".loader2").style.visibility = "hidden";

      const results = data.results;
      pastResults(results);
      // console.log(data.results[0].number);
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
