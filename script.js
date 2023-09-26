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
    const removeValue = [tellSomething, authorName,bookName];
    removeValue.forEach(RValue => RValue.value = '');
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
        const elementsToDisable = [bookName, authorName, tellSomething, addBtn, sectionexiBtn];
        elementsToDisable.forEach(element => element.disabled = true);
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
    const elementsToDisable = [bookName, authorName, tellSomething, addBtn, sectionexiBtn];
        elementsToDisable.forEach(element => element.disabled = false);
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
        Sypnosis.addEventListener("click", () => showSypnosis(library.indexCount, CardContainer));
        let delBtn = document.createElement("button");
        delBtn.textContent = `Delete`;
        delBtn.addEventListener('click', () => removeBook(library.indexCount) );
        //Appending part
        CardContainer.append(Title, Author, mainButtonContainer);
        mainButtonContainer.append(Sypnosis, delBtn);    
        bookContainer.appendChild(CardContainer); 
    } 
}
function removeBook(indexRemove){
            myLibrary.splice(indexRemove, 1);
            const elementsToRemove = document.querySelectorAll(`[data-id="${indexRemove}"]`);
            elementsToRemove.forEach(element => element.remove());
            afterRemove();
}
function showSypnosis(indexSyp, contain){
   const forSyp = myLibrary.filter(miLibrary => miLibrary.indexCount === indexSyp).map(miLibrary => miLibrary.tellSomething);  
   let showSyp = document.createElement("div");
   showSyp.classList.add('forsypnosisonly')
   let newP = document.createElement('p')
   const newButton = document.createElement('button');
   newButton.textContent = 'Close';
   newButton.addEventListener('click', () => showSyp.style.display = 'none');
   newP.textContent = `${forSyp[0]}`;
   showSyp.append(newP, newButton);
   contain.appendChild(showSyp);
}



