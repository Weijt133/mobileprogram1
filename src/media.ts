//
// media data App
// Author: Junwei Tang
// Assignment1 Part 1
//

interface Media {title:string; author:string; publisher:string; type:string; notes:string};

let data:[Media] = <[Media]>[];	// start with empty array
let position:number = -1;           // current position 


function doAdd():void {
	document.getElementById("message").innerHTML = "";//clear message
	
	let title: string = (<HTMLInputElement>document.getElementById("Title")).value;
	if (title == "") {
		document.getElementById("message").innerHTML =
        		"Title must be entered"; 
		return; // do nothing
	}
	if(find(title) != null){
		document.getElementById("message").innerHTML =
        		"Title must be unique"; 
		return; // do nothing
	}
	
	let author: string = (<HTMLInputElement>document.getElementById("Author")).value;
	let publisher: string = (<HTMLInputElement>document.getElementById("Publisher")).value;
	if (author == "" && publisher == "") {
		document.getElementById("message").innerHTML =
        		"Each record must have an Author or Publisher or both."; 
		return; // do nothing
	}
	
	let type: string = (<HTMLInputElement>document.getElementById("Type")).value;
	let notes: string = (<HTMLInputElement>document.getElementById("Notes")).value;
	// add an element to end of data
	
	position = data.length;  // one past end of array
	data[position] = { title: title, author: author, publisher: publisher, type: type, notes: notes };
	
	updateDisplay();
}

function doEdit():void {
	document.getElementById("message").innerHTML = "";//clear message
	
	let title: string = (<HTMLInputElement>document.getElementById("Title")).value;
	if (title == "") {
		document.getElementById("message").innerHTML =
        		"Title must be entered"; 
		return; // do nothing
	}
	
	let author: string = (<HTMLInputElement>document.getElementById("Author")).value;
	let publisher: string = (<HTMLInputElement>document.getElementById("Publisher")).value;
	if (author == "" && publisher == "") {
		document.getElementById("message").innerHTML =
        		"Each record must have an Author or Publisher or both."; 
		return; // do nothing
	}
	
	let type: string = (<HTMLInputElement>document.getElementById("Type")).value;
	let notes: string = (<HTMLInputElement>document.getElementById("Notes")).value;
	// we can add an element to end of data
	
	data[position] = { title: title, author: author, publisher: publisher, type: type, notes: notes };
	
	updateDisplay();
	alert('Successfully edit.');
}

function doNext() {
	if (position >= data.length-1) {
		document.getElementById("message").innerHTML =
        		"Already at end of list"; // error message
		return; // do nothing
	}
	
	position++;  // back up position
	updateDisplay();
}

function doPrev() {
	if (position==0) {
		document.getElementById("message").innerHTML =
        		"Already at start of list"; // error message
		return; // do nothing
	}
	
	position--;  // back up position
	updateDisplay();
}

function doDelete() {
	if (position < 0) {  // check for empty list
		document.getElementById("message").innerHTML =
        		"List is empty"; // error message
		return; // do nothing
	}
	// delete array element at current position
	if (confirm('Do you really want to delete media: ' + data[position].title + '?')){
		data.splice(position, 1);  // tricky javascript code
	}
	else{
		return;
	}
	if (data.length == position) position--; // deleted last element in list
	updateDisplay();
}

function updateDisplay():void {
	let posString:string = "";
	if (position >= 0) {	// there is some data
		let current:Media  = data[position];
		(<HTMLInputElement>document.getElementById("Title")).value = ""+current.title;
		(<HTMLInputElement>document.getElementById("Author")).value = current.author;
		(<HTMLInputElement>document.getElementById("Publisher")).value = current.publisher;
		(<HTMLInputElement>document.getElementById("Type")).value = current.type;
		(<HTMLInputElement>document.getElementById("Notes")).value = current.notes;
		posString = "record " + (position+1) + " of " + data.length;
	}  else {  // list is empty
		(<HTMLInputElement>document.getElementById("Title")).value = "";
		(<HTMLInputElement>document.getElementById("Author")).value = "";
		(<HTMLInputElement>document.getElementById("Publisher")).value = "";
		(<HTMLInputElement>document.getElementById("Type")).value = "";
		(<HTMLInputElement>document.getElementById("Notes")).value = "";
		posString = "Media list is empty";
	}
	document.getElementById("currentRecord").innerHTML = posString;
}

function find(searchTitle:string):Media {
	for (let singleData of data){
		if (singleData.title == searchTitle){	// search data base on title
			return singleData;
		}
	}
	return null;
}

function doSearch():void{
	let STitle: string = (<HTMLInputElement>document.getElementById("SearchTitle")).value;
	if (STitle == "") {
		document.getElementById("message").innerHTML =
        		"Title must be entered"; 
		return; // do nothing
	}
	if (find(STitle) == null){
		document.getElementById("message").innerHTML =	"Title is not existed."; 
		return; // do nothing
	}
	
	position = data.indexOf(find(STitle));
	updateDisplay();
}
