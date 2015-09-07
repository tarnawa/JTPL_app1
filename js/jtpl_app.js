//set global variable
var dest="https://catalog.mainlib.org/PAPIService";

//device detection and homepage size
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
var deviceType = (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : 'NULL';
//alert(deviceType);
if(deviceType!='NULL'){
	$('.ui-btn').css({'margin-top':'1px', 'margin-bottom': '1px'}); 
}

var model = device.model;
if(model=='iPhone7,1'){
	//alert('this is an iphone 6plus');
	$('.ui-btn').css({'margin-top':'', 'margin-bottom':''}); 
}
}

//function media material conversion
function matconv(val2){
switch(val2){
case 1:	var val2="Book"; break;
case 2: var val2="Printed or Manuscript Music"; break;
case 3: var val2="Cartographic Material"; break; 
case 4:	var val2="Visual Materials"; break; 
case 5: var val2="Sound Recording"; break; 
case 6:	var val2="Electronic Resources"; break; 
case 7:	var val2="Archival Mixed Materials"; break; 
case 8:	var val2="Serial"; break; 
case 9:	var val2="Printed Music"; break; 
case 10: var val2="Manuscript Music"; break; 
case 11: var val2="Printed Cartographic Material"; break; 
case 12: var val2="Manuscript Cartographic Material"; break; 
case 13: var val2="Map"; break; 
case 14: var val2="Globe"; break; 
case 15: var val2="Manuscript Material"; break; 
case 16: var val2="Projected Medium"; break; 
case 17: var val2="Motion Picture"; break; 
case 18: var val2="Video Recording"; break; 
case 19: var val2="Two Dimensional Non-projected Graphic"; break; 
case 20: var val2="Three Dimensional Object"; break; 
case 21: var val2="Musical Sound Recording"; break; 
case 22: var val2="Nonmusical Sound Recording"; break; 
case 23: var val2="Kit"; break; 
case 24: var val2="Periodical"; break; 
case 25: var val2="Newspaper"; break; 
case 26: var val2="Microform"; break; 
case 27: var val2="Large Print"; break; 
case 28: var val2="Braille"; break; 
case 33: var val2="DVD"; break; 
case 34: var val2="Videotape"; break; 
case 35: var val2="Music CD"; break; 
case 36: var val2="eBook"; break; 
case 37: var val2="Audio Book"; break; 
}
return val2;
}


$(document).ready(function(){

//open in app browser
$('#3m_btn').on('click', function () {
window.open('http://ebook.3m.com/library/jtpl/Featured', '_blank', 'location=yes');
});
$('#zinio_btn').on('click', function () {
window.open('https://www.rbdigital.com/mainincnj/service/zinio/landing?', '_blank', 'location=yes');
});
$('#oneclick_btn').on('click', function () {
window.open('http://jeffersontwpnj.oneclickdigital.com/', '_blank', 'location=yes');
});
$('#freegal_btn').on('click', function () {
window.open('http://jeffersonlibrary.freegalmusic.com/homes/index', '_blank', 'location=yes');
});

//google map

var map;
    $(document).on("pageshow", "#direction", function () {

      map = new GMaps({
        div: '#map_canvas',
        lat: 41.0205399,
        lng: -74.5490396,
		width: '100%',
        height: '250px',
		zoom: 15,
        zoomControl: true,
        zoomControlOpt: {
            style: 'SMALL',
            position: 'TOP_LEFT'
        },
        panControl: false
      });
	  
	    map.addMarker({
        lat: 41.0205399,
        lng: -74.5490396,
        title: 'JTPL',
        infoWindow: {
          content: '<p>Jefferson Township Public Library, 1031 Weldon Road, Oak Ridge, NJ 07438</p>'
        }
      });
});

//navigator
$('#dir_start').on ("tap", function () {
//start_spin();									   
launchnavigator.navigate(
  [41.0204913,-74.5491630],
  null,
  function(){
    //alert("Plugin success");
  },
  function(error){
    alert("Plugin error: "+ error);
  },
  {
    preferGoogleMaps: true,
    enableDebug: true,
    disableAutoGeolocation: true
});
});

//spinner
function start_spin(){
window.plugins.spinnerDialog.show();
//alert('startspin');
}
function stop_spin(){
window.plugins.spinnerDialog.hide();
//alert('stopspin');
}

//PRIME QUERY with 20K records
/*var thedate=(new Date()).toUTCString();
var reqstring=""+dest+"/REST/public/v1/1033/100/13/search/bibs/keyword/ti?q=*&limit=TOM=bks&bibsperpage=20000";

$.ajax({
        type       : "POST",
		url: "http://www.jeffersonlibrary.net/INTERMED_short.php",
        crossDomain: true,
        data: {uri: reqstring, rdate: thedate, method:"GET"},
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
			var code=response;
			
		getit1(code,reqstring,thedate);
        },
        error      : function() {
            console.error("error");
            alert('Not working1!');                  
        }
    });

function getit1(code,reqstring,thedate){

var blist_html='';

var settings = {
  "async": true,
  "crossDomain": true,
  "url": ""+reqstring+"",
  "method": "GET",
  "headers": {
    "polarisdate": ""+thedate+"",
    "authorization": ""+code+"",
    "content-type": "application/json"
  }
}

$.ajax(settings).done(function (response) {
//alert('second ajax fires');
var response=JSON.stringify(response);
var response= jQuery.parseJSON(response);

$.each(response.BibSearchRows, function(key, value) {
cont_no=value.ControlNumber;										
blist_html+="this is"+cont_no+"";
});

$( "#blist" ).append(blist_html);
});
};
*/


//Clear Search Field Counter


//AJAX to Book Search (direct) test

var counter=0;

$(document).on("pagecreate", function () {
  $(".ui-input-clear").on("click", function() {
    counter=0;
  });
});


$('#search_item').on('keyup',function () {
counter +=1;
//alert(counter);
  searchitem=0;
  if(counter>2){

var timeoutID;
function delayedQuery() {
  timeoutID = window.setTimeout(runquery, 300);
}

function runquery() {
	
  searchitem= $('#search_item').val();
  searchitem=searchitem.replace(/\s+/g,"+");
//alert(searchitem);
var thedate=(new Date()).toUTCString();
//var reqstring=""+dest+"/REST/public/v1/1033/100/13/search/bibs/boolean?q="+searchitem+"&bibsperpage=20";
//var reqstring=""+dest+"/REST/public/v1/1033/100/13/search/bibs/boolean?q="+searchitem+"+sortby+TI+AU";
var reqstring=""+dest+"/REST/public/v1/1033/100/13/search/bibs/keyword/kw?q="+searchitem+"&limit=TOM=bks&bibsperpage=20";
//var reqstring=""+dest+"/REST/public/v1/1033/100/13/search/bibs/keyword/ti?q=*&limit=TOM=bks&bibsperpage=20000";
//alert(reqstring);
start_spin();
$.ajax({
        type       : "POST",
		url: "http://www.jeffersonlibrary.net/INTERMED_short.php",
        crossDomain: true,
        data: {uri: reqstring, rdate: thedate, method:"GET"},
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
			var code=response;
			
		getit(code,reqstring,thedate);
        },
        error      : function() {
            console.error("error");
            alert('Not working1!');                  
        }
    });
}

function getit(code,reqstring,thedate){

var blist_html='';

var settings = {
  "async": true,
  "crossDomain": true,
  "url": ""+reqstring+"",
  "method": "GET",
  "headers": {
    "polarisdate": ""+thedate+"",
    "authorization": ""+code+"",
    "content-type": "application/json"
  }
}

$.ajax(settings).done(function (response) {
//alert('second ajax fires');
var response=JSON.stringify(response);
var response= jQuery.parseJSON(response);

var selection= ['Title', 'Author', 'PublicationDate', 'Description', 'PrimaryTypeOfMaterial'];
$( "#blist" ).empty();
var blist_html='';
  
$.each(response.BibSearchRows, function(key, value) {
cont_no=value.ControlNumber;
ISBN=value.ISBN;
blist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?Return=T&Type=S&Value='+ISBN+'&userID=MAIN37789&password=CC10073" /></td ><td class="txtbox">';
								  
$.each(value, function(key2, value2) {
	
	if(jQuery.inArray( key2, selection )!== -1){
	switch(key2){
		case "PublicationDate":
		key2="Publication Date";
		break;
		case "PrimaryTypeOfMaterial":
		key2="Media Type";
		value2=matconv(value2);
		break;
	}
	blist_html += "<strong>" + key2 + "</strong>: " + value2 + "<br>";
	}

});
blist_html +="<p class='trail'><a id=" + cont_no + " href='#bib_detail'>Detail</a></p>";
blist_html +="</td></tr></table>";
});
 
$( "#blist" ).append(blist_html);
stop_spin();
});
}
}
});



//change page
function login(){
	$.mobile.changePage("#inside");
}

//fastclick
window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);

//Flashlight
$('#flashlight').on('click', function () {
//alert('clicky');
$('.ui-grid-solo .flash .ui-btn').css({'background-color': '#FF0', 'background': '-webkit-radial-gradient(white 15%, yellow 85%)','background': '-o-radial-gradient(white 15%, yellow 85%)','background':' -moz-radial-gradient(white 15%, yellow 85%)',' background': 'radial-gradient(white 15%, yellow 85%)'});
window.plugins.flashlight.available(function(isAvailable) {
  if (isAvailable) {

    // switch on
    window.plugins.flashlight.switchOn(); // success/error callbacks may be passed

    // switch off after 5 seconds
    setTimeout(function() {
     window.plugins.flashlight.switchOff(); // success/error callbacks may be passed
   $('.ui-grid-solo .flash .ui-btn').css({'background-color': '#FC3', 'background': '-webkit-radial-gradient(white 0%, yellow 0%)','background': '-o-radial-gradient(white 0%, yellow 0%)','background':' -moz-radial-gradient(white 0%, yellow 0%)',' background': 'radial-gradient(white 0%, yellow 0%)'});
	}, 5000);
	//$('.ui-grid-solo .flash .ui-btn').css({'background-color': '#FFF7B7'});
  } 
 else {
    alert("Flashlight not available on this device");
  }
});
});

});