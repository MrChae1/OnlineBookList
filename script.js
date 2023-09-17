const myLibrary = [];
const bookName = document.getElementById('bookname');
const authorName = document.getElementById('authorname');
const addBtn = document.getElementById('add-btn');
const tellSomething = document.getElementById('Book-details');
let bookContainer = document.querySelector('.Book-Container');


addBtn.addEventListener('click', () =>{
    bookContainer.textContent = ``;
    let Bookname = bookName.value;
    let Authorname = authorName.value;
    let Tellsomething = tellSomething.value;
    let book = new Book(Bookname, Authorname, Tellsomething)
    myLibrary.push(book);
    console.log(myLibrary);
    addBookToLibrary();
});

function Book(bookName,authorName,tellSomething) {
    this.bookName = bookName,
    this.authorName = authorName,
    this.tellSomething = tellSomething 
}
function addBookToLibrary() {
    for(const library of myLibrary){
        const CardContainer = document.createElement("div");
        CardContainer.classList.add('card-holder');
        let Title = document.createElement("h3");
        Title.textContent = library.bookName;
        let Author = document.createElement("p");
        Author.textContent = `Author: ${library.authorName}`;
        let Sypnosis = document.createElement("p");
        Sypnosis.textContent = `Sypnosis; ${library.tellSomething}`;
        let delBtn = document.createElement("button");
        delBtn.textContent = `Delete`;
        CardContainer.appendChild(Title);
        CardContainer.appendChild(Author);
        CardContainer.appendChild(Sypnosis);
        CardContainer.appendChild(delBtn);
        bookContainer.appendChild(CardContainer); 
    }

    
}


