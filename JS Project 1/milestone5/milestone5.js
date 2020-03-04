document.getElementById("myButton").addEventListener("click", fibonacciResult);

function fibonacciResult() {
  userInput = document.getElementById("fibNumber");
  userInput = parseInt(userInput.value);

  fetch("http://localhost:5050/fibonacci/" + userInput)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      document.getElementById("output").innerText = data.result;
    });
}
