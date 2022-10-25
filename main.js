const form = document.querySelector('form');
const main = document.querySelector('main');
const noteTitle = document.querySelector('#title');
const noteDescrition = document.querySelector('#description');
const cancelBtn = document.querySelector('#cancelBtn');
const noteContainer = document.querySelector('.noteContainer');
const localStorageArr = JSON.parse(localStorage.getItem("notes")) || [];
let isFocused = false; 

class Note {
    constructor(title, description){
        this.title = title;
        this.description = description;
        this.isCrossed = false;
    };
    shiftToArray() { 
        localStorageArr.unshift(this);
        return JSON.stringify(localStorageArr);
    };
    postToLocalStorage = () => {localStorage.setItem('notes', this.shiftToArray())};
};

const displayNotes = array => {
    noteContainer.textContent = "";
    array.forEach((element, i) => {
        createNotes(element, i);
    });
};

// Creates note Cards
const createNotes = (obj, i) => {
    const noteCard = document.createElement('div');
    noteCard.className = 'note';
    noteCard.id = i;

    const noteTrashCan = document.createElement('img');
    noteTrashCan.src = "./svg/trash-can-solid.svg";
    noteTrashCan.alt = "trash can icon";
    noteTrashCan.id = "delete-post";
    
    const noteTitleLine = document.createElement('h3');
    noteTitleLine.className = "titleLine";
    noteTitleLine.textContent = obj.title;
    
    const noteDescritionLine = document.createElement('p');
    noteDescritionLine.className = "descriptionLine";
    noteDescritionLine.id = "crossOut-post";
    noteDescritionLine.textContent = obj.description;
    if (obj.isCrossed) {
        noteDescritionLine.style.textDecoration = 'line-through';
        noteDescritionLine.style.fontStyle = 'italic';
    }

    const cornerDiv = document.createElement('div');
    cornerDiv.className = "corner";

    noteContainer.append(noteCard);
    noteCard.append(noteTrashCan, noteTitleLine, noteDescritionLine, cornerDiv);    
};

// The cancel event

const cancelEvent = () => {
    noteTitle.style.display = "none";
    cancelBtn.style.display = "none";
    noteDescrition.value = "";
}

const focusedEvent = () => {
    noteTitle.style.display = "block";
    cancelBtn.style.display = "block";
}

// decides if display notes

localStorageArr === []? noteContainer.textContent = "" : displayNotes(localStorageArr); 


// Displays title input element and cancel button

noteDescrition.addEventListener('focus', () => {
    focusedEvent();
});

// Delete and cross out

noteContainer.addEventListener('click', (e) => {
    let delBTNClick = e.target.id == 'delete-post';
    let crossOutClick = e.target.id == 'crossOut-post';
    
    if (delBTNClick) {
        let id = e.target.parentElement.id;
        localStorageArr.splice(id, 1);
        localStorage.setItem('notes', JSON.stringify(localStorageArr));
        displayNotes(localStorageArr);
    };
    
    if (crossOutClick) {
        let id = e.target.parentElement.id;
        localStorageArr[id].isCrossed = true;
        localStorage.setItem('notes', JSON.stringify(localStorageArr));
        e.target.style.textDecoration = 'line-through';
        e.target.style.fontStyle = 'italic';
    };
});

// Submit event

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputTitleValue = noteTitle.value;
    const inputDescriptionValue = noteDescrition.value;

    const newNote = new Note(inputTitleValue, inputDescriptionValue);
    console.log(newNote);
    newNote.postToLocalStorage();

    console.log(localStorage);
    isFocused = false; 
    location.reload();
});

// Listens for cancel events

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cancelEvent();
});

main.addEventListener('click', () => {
    cancelEvent();
});