function bookLibrary(){
    let myLibrary = [];
    const resect = document.querySelector('.reSection');
    const mainContainer = document.getElementById('main-tag');
    const bookContainer = document.querySelector('.Book-Container');
    const bookName = document.getElementById('bookname');
    const authorName = document.getElementById('authorname');
    const tellSomething = document.getElementById('Book-details');
    const valid = document.querySelector('.validation');
    const AllBtn = document.querySelector('.for-button');
    const forbtn = AllBtn.querySelectorAll('button');
    
    function Book(bookName,authorName,tellSomething, indexCount) {
        this.bookName = bookName,
        this.authorName = authorName,
        this.tellSomething = tellSomething,
        this.indexCount = indexCount 
    }
    
    const gotoSection = () => {
        const showSection = document.getElementById('show-section');
        showSection.addEventListener('click', () => {
            reDisplay();
        });
    }
    const reDisplay = () => {
        resect.style.display = resect.style.display === 'grid' ? 'none' : 'grid';
        mainContainer.style.display = mainContainer.style.display === 'none' ? 'flex' : 'none';
        const removeValue = [tellSomething, authorName,bookName];
        removeValue.forEach(RValue => RValue.value = '');
    }
    const Insection = () => {
        AllBtn.addEventListener('click', (e) => {
            if(e.target.id === 'add-btn'){
                bookContainer.textContent = ``;
                const title = bookName.value;
                const author = authorName.value;
                const say = tellSomething.value;
                const indexCount = myLibrary.length;
                Validate(title, author, say, indexCount);
            }
            else if(e.target.id === 'exit-add'){
                reDisplay();
            }
        });     
    } 
    const Validate = (title, author, say, indexCount) => {
        if(!title || !author || !say){
            validateBtn();
            addtoShelf(myLibrary, bookContainer);
        }
        else{
            reDisplay();
            const book = new Book(title, author, say, indexCount)
            myLibrary.push(book);
            addtoShelf(myLibrary);
        }
    }
    const exitBtn = document.getElementById('validation-exit').addEventListener('click', () =>{
        validateBtn();
    });

    const validateBtn = () => {
        valid.style.display = valid.style.display === 'flex'? 'none': 'flex';
        const elementsToDisable = [bookName, authorName, tellSomething, forbtn[0], forbtn[1]];
        elementsToDisable.forEach(element => element.disabled = element.disabled === true? false : true);
    } 

    function addtoShelf(allLibrary){
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
        addtoShelf(myLibrary);
    }

    return { gotoSection, Insection }
}

function recommendBook(){
    const Library = bookLibrary();

    function addingBook(){
        Library.gotoSection();
        Library.Insection(); 
    }

    addingBook();
}

const start = recommendBook();


