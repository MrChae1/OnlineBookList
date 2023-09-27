class Book{
    constructor(bookName, authorName, tellSomething, indexCount){
        this.bookName = bookName,
        this.authorName = authorName,
        this.tellSomething = tellSomething,
        this.indexCount = indexCount 
    }
}
// class Library{
//     constructor(){
//         this.myLibrary = []
//     }
//     validateBook(){
//         for(const valLibrary of this.myLibrary){
//             if(valLibrary)
//         }

//     }
// }

function BookLibrary(){
    const sectionBtnArea = document.querySelector('.for-button');
    const containerMain = document.querySelector('.reSection');
    const mainContainer = document.getElementById('main-tag');
    const mainElement = Array.from(mainContainer.querySelectorAll('*'));
    
    const AddBookShowSection = () =>{
        mainElement[0].addEventListener('click', () => {
            containerMain.style.display = "flex";
            mainContainer.style.display = "none";
        });
    }

    const getBook = () => {
        sectionBtnArea.addEventListener('click', function(event){
            if(event.target.id === 'add-btn'){
                const InputArea = Array.from(document.querySelectorAll('input'));
                const detailArea = document.querySelector('textarea');
                const bookName = InputArea[0].value;
                const authorName = InputArea[1].value; 
                const bookDetails = detailArea.value;
                validateBook(bookName, authorName, bookDetails, InputArea, detailArea );
            } 
            else{
                console.log('Exit');
            }
             
        });
    }
    const validateBook = (bName, bAuthor, bDetails, input, detail) => {
        if(!bName || !bAuthor || !bDetails){
            const valid = document.querySelector('.validation').style.display = 'flex';
            disabledChange(input, detail);
        }
    }

    const disabledChange = (input, detail) => {
        if(detail.disabled === true){
            detail.disabled = false;
            input.forEach(value => value.disabled = false);
            const btn = sectionBtnArea.querySelectorAll('button');
            btn.forEach(value => value.disabled = false);
        }
        else{
            detail.disabled = true;
            input.forEach(value => value.disabled = true);
            const btn = sectionBtnArea.querySelectorAll('button');
            btn.forEach(value => value.disabled = true);
        }
    }
    return { AddBookShowSection, getBook }
}

function recommendBook(){
    const Library = BookLibrary();
    Library.AddBookShowSection();
    Library.getBook();
}

const Start = recommendBook();




