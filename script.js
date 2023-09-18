let myLibrary = [];
const bookName = document.getElementById('bookname');
const authorName = document.getElementById('authorname');
const addBtn = document.getElementById('add-btn');
const tellSomething = document.getElementById('Book-details');
let bookContainer = document.querySelector('.Book-Container');
const valid = document.querySelector('.validation');
let showSection = document.getElementById('show-section');
const mainContainer = document.getElementById('main-tag');
const sectionpanel = document.getElementById('for-section');
const sectionexiBtn = document.getElementById('exit-add');


function clearInput(){
    tellSomething.value = '';
    authorName.value = ''
    bookName.value = "";
    sectionpanel.style.display = 'none';
    mainContainer.style.display = 'flex';
}
showSection.addEventListener('click',()=>{
    sectionpanel.style.display = 'grid';
    mainContainer.style.display = 'none';
});
addBtn.addEventListener('click', () =>{
    bookContainer.textContent = ``;
    let Bookname = bookName.value;
    let Authorname = authorName.value;
    let Tellsomething = tellSomething.value;
    let indexCount = myLibrary.length;
    validate(Bookname, Authorname,Tellsomething, indexCount );
    
});
sectionexiBtn.addEventListener('click', () =>{
    clearInput();
});

function validate(Bookname, Authorname, Tellsomething, indexCount){
    if(Bookname === '' || Authorname === '' || Tellsomething === ''){
        valid.style.display = 'flex';
        bookName.disabled = true;
        authorName.disabled = true;
        tellSomething.disabled = true;
        addBtn.disabled = true;
        addBookToLibrary(myLibrary);
    }
    else{
        clearInput();
        let book = new Book(Bookname, Authorname, Tellsomething, indexCount);
        myLibrary.push(book);
        addBookToLibrary(myLibrary);
    }

}
function afterRemove(){
    bookContainer.textContent = ``;
    let newindexCount = 0;
    let newLibrary = [];
    for(const newlibrary of myLibrary){
        let newBook = newlibrary.bookName;
        let newAuthor = newlibrary.authorName;
        let newSypnosis = newlibrary.tellSomething;
        let newIndex = newindexCount;
        newindexCount++;
        let allNewbook = new Book(newBook, newAuthor, newSypnosis, newIndex);
        newLibrary.push(allNewbook);
    }
    myLibrary = newLibrary;
    addBookToLibrary(myLibrary);
}
const exitBtn = document.getElementById('validation-exit').addEventListener('click', () =>{
    valid.style.display = 'none';
    bookName.disabled = false;
    authorName.disabled = false;
    tellSomething.disabled = false;
    addBtn.disabled = false;
});

function Book(bookName,authorName,tellSomething, indexCount) {
    this.bookName = bookName,
    this.authorName = authorName,
    this.tellSomething = tellSomething,
    this.indexCount = indexCount 
}
function addBookToLibrary(allLibrary) {
    for(const library of allLibrary){
        const CardContainer = document.createElement("div");
        CardContainer.classList.add('card-holder');
        CardContainer.setAttribute("data-id", library.indexCount);
        let Title = document.createElement("h3");
        Title.textContent = library.bookName;
        let mainButtonContainer = document.createElement("div");
        mainButtonContainer.classList.add('main-button');
        let Author = document.createElement("p");
        Author.textContent = `Author: ${library.authorName}`;
        let Sypnosis = document.createElement("button");
        Sypnosis.textContent = `View Sypnosis`;
        Sypnosis.addEventListener('mouseover', () =>{
            showSypnosis(library.indexCount);
        });
        let delBtn = document.createElement("button");
        delBtn.textContent = `Delete`;
        delBtn.addEventListener('click',() =>{
            removeBook(library.indexCount);
        })
        CardContainer.appendChild(Title);
        CardContainer.appendChild(Author);
        mainButtonContainer.appendChild(Sypnosis);
        mainButtonContainer.appendChild(delBtn);
        CardContainer.appendChild(mainButtonContainer);
        bookContainer.appendChild(CardContainer); 
    } 
}
function removeBook(indexRemove){
    for(const removeBook of myLibrary){
        if(removeBook.indexCount === indexRemove){
            myLibrary.splice(indexRemove, 1);
            const elementsToRemove = document.querySelectorAll(`[data-id="${indexRemove}"]`); // Replace "2" with the specific value you want to match
            elementsToRemove.forEach(function (element) {
            element.remove();
            afterRemove();
  });
        }
    }
}
function showSypnosis(indexSyp){
   const forSyp = myLibrary.filter(miLibrary => miLibrary.indexCount === indexSyp);
    
}



