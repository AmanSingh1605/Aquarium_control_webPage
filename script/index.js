let homeElement = document.querySelector("#home-page");
let readingElement = document.querySelector("#reading-page");
let graphElement = document.querySelector("#graph-page");
let contactElement = document.querySelector("#contact-page");

homeElement.style.display = "block";
readingElement.style.display = "none";
graphElement.style.display = "none";
contactElement.style.display = "none";

function homepage() {
  homeElement.style.display = "block";
  readingElement.style.display = "none";
  graphElement.style.display = "none";
  contactElement.style.display = "none";
}
function readingpage() {
  homeElement.style.display = "none";
  readingElement.style.display = "block";
  graphElement.style.display = "none";
  contactElement.style.display = "none";
}
function graphpage() {
  homeElement.style.display = "none";
  readingElement.style.display = "none";
  graphElement.style.display = "block";
  contactElement.style.display = "none";
}
function contactpage() {
  homeElement.style.display = "none";
  readingElement.style.display = "none";
  graphElement.style.display = "none";
  contactElement.style.display = "block";
}



