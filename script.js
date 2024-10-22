// Business logic for notes 
function NoteBook() {
    this.notes = {};
    this.currentId = 0;
}

NoteBook.prototype.addNote = function (note) {
    note.id = this.assignId();
    this.notes[note.id] = note;
};

NoteBook.prototype.assignId = function () {
    this.currentId += 1;
    return this.currentId;
};

NoteBook.prototype.findNote = function (id) {
    if (this.notes[id] != undefined) {
        return this.notes[id];
    }
    return false;
};

NoteBook.prototype.deleteNote = function (id) {
    if (this.notes[id] === undefined) {
        return false;
    }
    delete this.notes[id];
    return true;
};

// Business logic for each note 
function Note(noteTitle, noteText) {
    this.noteTitle = noteTitle;
    this.noteText = noteText;
}

// UI logic
let noteBook = new NoteBook();

function displayNoteDetails(noteBookToDisplay) {
    let noteList = $("ul#notes");
    let htmlForNoteInfo = "";
    Object.keys(noteBookToDisplay.notes).forEach(function (key) {
        const note = noteBookToDisplay.findNote(key);
        htmlForNoteInfo += "<li id=" + note.id + ">" + note.noteTitle + " " + "</li>";
    });
    noteList.html(htmlForNoteInfo);
}

function showNote(noteId) {
    const note = noteBook.findNote(noteId);
    $("#show-note").show();
    $(".note-title").html(note.noteTitle);
    $(".note-text").html(note.noteText);
    let buttons = $("#buttons");
    buttons.empty();
    buttons.append("<button class='deleteButton' id=" + + note.id + ">Delete</button>");

    let editButton = $("#buttonsEdit");
    editButton.empty();
    editButton.html("<button class='editButton' id=" + note.id + ">Edit</button>");
}

function editNote(id) {
    let note = noteBook.findNote(id);

    $("input#new-note-title").val(note.noteTitle);
    $("textarea#new-note-text").val(note.noteText);

    noteBook.deleteNote(id);
    $("#show-note").hide();
}

function attachNoteListeners() {
    $("ul#notes").on("click", "li", function () {
        showNote(this.id);
    });
    $("#buttons").on("click", ".deleteButton", function () {
        noteBook.deleteNote(this.id);
        $("#show-note").hide();
        displayNoteDetails(noteBook);
    });
    $("#buttonsEdit").on("click", ".editButton", function () {
        editNote(this.id);

    });
}


$(document).ready(function () {
    attachNoteListeners();
    $("form#new-note").submit(function (event) {
        event.preventDefault();
        const inputtedNoteTitle = $("input#new-note-title").val();
        const inputtedNoteText = $("textarea#new-note-text").val();
        $("input#new-note-title").val("");
        $("textarea#new-note-text").val("");
        let newNote = new Note(inputtedNoteTitle, inputtedNoteText);
        noteBook.addNote(newNote);
        displayNoteDetails(noteBook);
    });
});