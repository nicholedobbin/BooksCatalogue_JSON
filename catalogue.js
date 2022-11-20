// Declare varibales
let bookArray = []; 
let favouritesList = document.getElementById("favouritesList"); 
let selectList = document.getElementById("selectList"); 


// Constructor function for Book objects.
function Book(title, author, genre, rating) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.rating = rating;
}

// Function to add books to session storage and book array (resetting form after each entry).
function addBook() {
    // Create sessionStorage items "books" and "load"
    if (sessionStorage.getItem("load") === null) {  
        sessionStorage.setItem("load", true);
        sessionStorage.setItem("books", JSON.stringify(bookArray)); 
    }

    // Get array of objects from sessionStorage's "books" item.
    bookArray = JSON.parse(sessionStorage.getItem("books")); 
    
    // Create new book object.
    let newBook = new Book( 
        document.getElementById("title").value,
        document.getElementById("author").value,
        document.getElementById("genre").value,
        document.getElementById("rating").value,
    );

    // Push newBook to bookArray.
    bookArray.push(newBook); 
    // Updates sessionStorage's "books" item.
    sessionStorage.setItem("books", JSON.stringify(bookArray));   
    
    // Reset form fields.
    const myForm = document.getElementById('myForm'); 
    myForm.reset(); 

    // Call addBookToSelectList function (to add books to the <select> list).
    addBookToSelectList(); 
};

//============================= FUNCTION: ADD <LI> ELEMENTS TO <UL>'S FAVOURITES LIST DISPLAY ==========================================

// Add event listener to addBookButton that calls addToFavourites function.
let addBookButton = document.getElementById("addBookBtn");
addBookButton.addEventListener("click", addToFavourites); 

// Function to add list items to favourites list display.
function addToFavourites() {
    // Clears favouritesList <ul>'s innerHTML. 
    favouritesList.innerHTML = null;  
    
    // Create <li> elements containing text content of bookArray[i]'s object values.
    for (i = 0; i < bookArray.length; i++) { 
        let favouritesItem = document.createElement("li"); 
        // Set <li> id to 'i' (to let the id index value increment).
        favouritesItem.id = i; 
        let bookTitle = bookArray[i].title; 
        let bookAuthor = bookArray[i].author; 
        let bookGenre = bookArray[i].genre;  
        let bookRating = bookArray[i].rating;  
        favouritesItem.textContent = (
            `Title: ${bookTitle} | Author: ${bookAuthor} | Genre: ${bookGenre} | Rating: ${bookRating}/5`
            ); 
        // Append <li>  elements to favouritesList <ul>.
        favouritesList.appendChild(favouritesItem); 
    };
    // Call addSpanElement function.
    addSpanElement(); 
}

// Function to add span elmenets to list elements & event listener for deleteBook function. 
function addSpanElement() {
    let listElements = document.getElementsByTagName("LI"); 
    for (i = 0; i < bookArray.length; i++) {  
        let spanItem = document.createElement("span"); 
        spanItem.className = "close";   
        spanItem.innerHTML = `  [Delete]`; 
        spanItem.addEventListener("click", deleteBook);  
        listElements[i].appendChild(spanItem); 
    };
}

// Function to change display style of event target's parent <li> element to none, removing it from the display.
function deleteBook(e) { 
    e.target.parentElement.style = "display: none"; 
}


// Function to add book <option> to <select> list.
function addBookToSelectList() {
    // Calls clearSelect function to clear selectList.
    clearSelect(); 
    for (i = 0; i < bookArray.length; i++) {  
        let optItem = document.createElement("option");  
        optItem.value = i; 
        optItem.innerHTML = bookArray[i].title; 
        selectList.style.visibility = "visible"; 
        selectList.appendChild(optItem);  
    };
}

// Function to remove selectList's child <option> elements at indexes greater than 0.
function clearSelect() {
    for (i=selectList.length-1; i>0; i--) {
        selectList.remove(i); 
    }
}

// Function to edit book objects in book array, session storage, favourites list display and select/dropdown list.
// Called in newCatalogue.html's <select onchange="editBook(this.value)"> element.
// It contains a nested function bookArray[i].bio(), which changes the selected object's values ('this') in bookArray to new 
// input values entered by the user using prompts and alerts. It then calls the nested function, updates the sessionStorage,
// and calls the addToFavourites and addBookToSelectList functions to update the favourites list display and selectList options.
function editBook(indexOfBookObj) { 
    bookArray[indexOfBookObj].bio = function() { 
        let newTitle = prompt(
            `You're editing: ${this.title} by ${this.author} in the ${this.genre} genre, with a rating of ${this.rating}/5.
            Edit title: `
            ); 
        this.title = newTitle; 
        let newAuthor = prompt("Edit author: ");
        this.author = newAuthor; 
        let newGenre = prompt("Edit genre: "); 
        this.genre= newGenre; 
        let newRating = prompt("Edit rating: "); 
        this.rating = newRating + "/5"; 
        alert(
            `Edited book is: ${this.title} by ${this.author} in the ${this.genre} genre, with a rating of ${this.rating}.`
            );
    };
    bookArray[indexOfBookObj].bio(); 
    sessionStorage.setItem("books", JSON.stringify(bookArray)); 
    addToFavourites(); 
    addBookToSelectList();
}








