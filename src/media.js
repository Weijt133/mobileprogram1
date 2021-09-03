//
// media data App
// Author: Junwei Tang
// Assignment1 Part 1
//
;
var data = []; // start with empty array
var position = -1; // current position 
function doAdd() {
    document.getElementById("message").innerHTML = ""; //clear message
    var title = document.getElementById("Title").value;
    if (title == "") {
        document.getElementById("message").innerHTML =
            "Title must be entered";
        return; // do nothing
    }
    if (find(title) != null) {
        document.getElementById("message").innerHTML =
            "Title must be unique";
        return; // do nothing
    }
    var author = document.getElementById("Author").value;
    var publisher = document.getElementById("Publisher").value;
    if (author == "" && publisher == "") {
        document.getElementById("message").innerHTML =
            "Each record must have an Author or Publisher or both.";
        return; // do nothing
    }
    var type = document.getElementById("Type").value;
    var notes = document.getElementById("Notes").value;
    // add an element to end of data
    position = data.length; // one past end of array
    data[position] = { title: title, author: author, publisher: publisher, type: type, notes: notes };
    updateDisplay();
}
function doEdit() {
    document.getElementById("message").innerHTML = ""; //clear message
    var title = document.getElementById("Title").value;
    if (title == "") {
        document.getElementById("message").innerHTML =
            "Title must be entered";
        return; // do nothing
    }
    var author = document.getElementById("Author").value;
    var publisher = document.getElementById("Publisher").value;
    if (author == "" && publisher == "") {
        document.getElementById("message").innerHTML =
            "Each record must have an Author or Publisher or both.";
        return; // do nothing
    }
    var type = document.getElementById("Type").value;
    var notes = document.getElementById("Notes").value;
    // we can add an element to end of data
    data[position] = { title: title, author: author, publisher: publisher, type: type, notes: notes };
    updateDisplay();
    alert('Successfully edit.');
}
function doNext() {
    if (position >= data.length - 1) {
        document.getElementById("message").innerHTML =
            "Already at end of list"; // error message
        return; // do nothing
    }
    position++; // back up position
    updateDisplay();
}
function doPrev() {
    if (position == 0) {
        document.getElementById("message").innerHTML =
            "Already at start of list"; // error message
        return; // do nothing
    }
    position--; // back up position
    updateDisplay();
}
function doDelete() {
    if (position < 0) {
        document.getElementById("message").innerHTML =
            "List is empty"; // error message
        return; // do nothing
    }
    // delete array element at current position
    if (confirm('Do you really want to delete media: ' + data[position].title + '?')) {
        data.splice(position, 1); // tricky javascript code
    }
    else {
        return;
    }
    if (data.length == position)
        position--; // deleted last element in list
    updateDisplay();
}
function updateDisplay() {
    var posString = "";
    if (position >= 0) {
        var current = data[position];
        document.getElementById("Title").value = "" + current.title;
        document.getElementById("Author").value = current.author;
        document.getElementById("Publisher").value = current.publisher;
        document.getElementById("Type").value = current.type;
        document.getElementById("Notes").value = current.notes;
        posString = "record " + (position + 1) + " of " + data.length;
    }
    else {
        document.getElementById("Title").value = "";
        document.getElementById("Author").value = "";
        document.getElementById("Publisher").value = "";
        document.getElementById("Type").value = "";
        document.getElementById("Notes").value = "";
        posString = "Media list is empty";
    }
    document.getElementById("currentRecord").innerHTML = posString;
}
function find(searchTitle) {
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var singleData = data_1[_i];
        if (singleData.title == searchTitle) {	// search data base on title
            return singleData;
        }
    }
    return null;
}
function doSearch() {
    var STitle = document.getElementById("SearchTitle").value;
    if (STitle == "") {
        document.getElementById("message").innerHTML =
            "Title must be entered";
        return; // do nothing
    }
    if (find(STitle) == null) {
        document.getElementById("message").innerHTML =
            "Title is not existed.";
        return; // do nothing
    }
    position = data.indexOf(find(STitle));
    updateDisplay();
}
