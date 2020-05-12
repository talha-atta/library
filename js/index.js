//DOM Manipulation
let titleInput = document.getElementById("title").value;
let authorInput = document.getElementById("author").value;
let pagesInput = document.getElementById("pages").value;
let readInput = document.getElementById("read").value;

let messageBox = document.getElementById("display");

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  myLibrary.push(titleInput.value);
  console.log(myLibrary.push(titleInput.value));
  console.log(titleInput.value);
  myLibrary.push(authorInput.value);
  myLibrary.push(pagesInput.value);
  myLibrary.push(readInput.value);
  //   clearAndShow();
}

// function clearAndShow() {
//   // Clear our fields
//   titleInput.value = "";
//   authorInput.value = "";
//   pagesInput.value = "";
//   readInput.value = "";

//   // Show our output
//   messageBox.innerHTML = "";

//   messageBox.innerHTML += "Books: " + myLibrary.join(", ") + "<br/>";
// }
