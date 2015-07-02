// JavaScript Document
window.addEventListener("eventname/handlername", functionName, false);

function onBatteryStatus () {
//handle whatever	
}

window.addEventListener("eventname/handlername", functionName, false);

function getPicture () {
//handle whatever	
}
///////////////////////////////////////////////////
navigator.camera.getPicture (onSuccess, onFail, {
							 quality: 50, 
							 destinationType: Camera.DestinationType.DATA_URI,
							 ...,
							 ....
							 });

function onSuccess (imageData) {
	var image= document.getElementById ('myImage');
	image.scr = ImageURI;
}

function onFail(message) {
	alert('Failed because: ' +message);
}
////////////////////////////////////////////////////////////////
Barcode Scanner
/////////////////////////////////////////////////////////////
function saveName(){
window.localStorage.setItem("userName", document.getElementById("userName").value);
alert("User saved");
}

function setNameFormElement(){
var userName=window.localStorage.getItem("userName");
document.getElementById("userName").value= userName;
}

function clearName(){
window.localStorage.removeItem("userName");
document.getElementById("userName").value='';
alert("User cleared");
}
///////////////////////////////////////////////////////////////////