let library = JSON.parse(window.localStorage.getItem("library"));
library = library === null ? [] : library;

const modal = document.querySelector(".modal");
const modalBtn = document.querySelector("#modal-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const addBtn = document.querySelector("#add-btn");
const booksContainer = document.querySelector(".books");
const clearBtn = document.querySelector("#clear-btn");

document.addEventListener("DOMContentLoaded", render);

window.addEventListener("click", (e) => {
  if (e.target == modal) closeModal();
});

cancelBtn.addEventListener("click", closeModal);

modalBtn.addEventListener("click", () => (modal.style.display = "flex"));

addBtn.addEventListener("click", addBookToLibrary);

clearBtn.addEventListener("click", clearAll);

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary() {
  let isValid = true;
  const inputs = document.querySelectorAll("input");
  const inputsArr = Array.from(inputs);
  const status = document.querySelector("#status");

  inputsArr.forEach((input) => {
    if (input.value === "") {
      input.classList.add("invalid");
      isValid = false;
    } else {
      input.classList.remove("invalid");
    }
  });

  if (isValid) {
    const book = new Book(
      inputsArr[0].value,
      inputsArr[1].value,
      inputsArr[2].value,
      status.value
    );

    library.push(book);

    save();
    closeModal();
    render();
  }
}

function render() {
  const msg = document.querySelector(".msg");
  booksContainer.innerHTML = "";

  library.length === 0
    ? (msg.style.display = "block")
    : (msg.style.display = "none");

  library.forEach((book, index) => {
    // Book card
    const bookCard = document.createElement("div");
    bookCard.classList.add("book");
    bookCard.setAttribute("data-book", index);

    // Info section
    const info = document.createElement("div");
    const title = document.createElement("h4");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const status = document.createElement("p");
    info.classList.add("info");
    status.classList.add("status", book.status.toLowerCase());
    title.innerText = book.title;
    author.innerHTML = `<strong>Author: </strong>${book.author}`;
    pages.innerHTML = `<strong>Pages: </strong>${book.pages}`;
    status.innerHTML = `<strong>Status: </strong><span class="reading-status">${book.status}</span>`;

    info.appendChild(title);
    info.appendChild(author);
    info.appendChild(pages);
    info.appendChild(status);

    // Card bottom section
    const cardBottom = document.createElement("p");
    const toggleStatusBtn = document.createElement("button");
    const trash = document.createElement("span");
    cardBottom.classList.add("card-bottom");
    toggleStatusBtn.classList.add("toggle-status-btn");
    trash.classList.add("trash");
    toggleStatusBtn.innerText = "Toggle Status";
    trash.innerHTML = '<i class="fas fa-trash"></i>';
    toggleStatusBtn.setAttribute("data-status", index);
    trash.setAttribute("data-trash", index);

    cardBottom.appendChild(toggleStatusBtn);
    cardBottom.appendChild(trash);

    bookCard.appendChild(info);
    bookCard.appendChild(cardBottom);

    booksContainer.appendChild(bookCard);

    // Event listeners
    toggleStatusBtn.addEventListener("click", toggleStatus);
    trash.addEventListener("click", deleteBook);
  });
}

function closeModal() {
  const inputs = document.querySelectorAll("input");
  const inputsArr = Array.from(inputs);

  inputsArr.forEach((input) => {
    input.value = "";
    input.classList.remove("invalid");
  });

  modal.style.display = "none";
}

function toggleStatus(e) {
  const index = e.target.getAttribute("data-status");
  const book = booksContainer.querySelector(`.book[data-book="${index}"]`);
  const statusContainer = book.querySelector(".status");

  if (statusContainer.classList.contains("read")) {
    statusContainer.classList.remove("read");
    statusContainer.classList.add("unread");
    statusContainer.querySelector(".reading-status").innerText = "Unread";
    library[index].status = "Unread";
  } else {
    statusContainer.classList.remove("unread");
    statusContainer.classList.add("read");
    statusContainer.querySelector(".reading-status").innerText = "Read";
    library[index].status = "Read";
  }

  save();
}

function deleteBook(e) {
  const index = e.target.getAttribute("data-trash");
  library.splice(index, 1);

  save();
  render();
}

function clearAll() {
  library = [];
  save();
  render();
}

function save() {
  window.localStorage.removeItem("library");
  window.localStorage.setItem("library", JSON.stringify(library));
}
