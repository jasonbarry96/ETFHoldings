console.log("Client side JS file loaded");

// function callETF(){
//   var element = document.getElementById("etf");
//   var http = new XMLHttpRequest();
//   http.open("post", "http://localhost:3000/");
//   http.send(element);
// }

document.getElementById("etfinput").addEventListener("submit", function(event){
  event.preventDefault()
});

async function postData(data = {}) {
  // Default options are marked with *
  const element = document.getElementById('constituents');
  var formatted = {etf: data.value};
  const response = await fetch("http://localhost:3000/", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      //'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(formatted) // body data type must match "Content-Type" header
  }).then(response => response.json())
    .then(data => element.innerHTML = "<h2>ETF Holdings</h2> <div id='constituents'>" + data + "</div>");
  // const result = item => <p>
  // const results = response.json();
  // return results; // parses JSON response into native JavaScript objects
}
