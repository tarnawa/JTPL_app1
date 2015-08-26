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

//run a warmup query
$(document).ready(function(){
  searchitem=0;
  searchitem='y';
var thedate=(new Date()).toUTCString();
var reqstring="http://plato-r2.polarislibrary.com/PAPIService/REST/public/v1/1033/100/1/search/bibs/boolean?q="+searchitem+"";
//alert('beginning');
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
		getit_t(code,reqstring,thedate);
        },
        error      : function() {
            console.error("error");
            alert('Not working1!');                  
        }
});

function getit_t(code,reqstring,thedate){
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
});
};
});

//Test on inline media Book Search Direct Ajax
$(document).ready(function(){
//$('#onlinebtn').on('click', function () {	
$('#search_item2').on ("keyup", function () {

  searchitem=0;
  searchitem= $('#search_item2').val();

var thedate=(new Date()).toUTCString();
var reqstring="http://plato-r2.polarislibrary.com/PAPIService/REST/public/v1/1033/100/1/search/bibs/boolean?q="+searchitem+"";
//alert('beginning');
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


function getit(code,reqstring,thedate){

var mytesthtml='';

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

var response=JSON.stringify(response);
var response= jQuery.parseJSON(response);

var selection= ['Title', 'Author', 'PublicationDate', 'Description', 'PrimaryTypeOfMaterial'];
$( "#showme" ).empty();
var mytesthtml='';
  
$.each(response.BibSearchRows, function(key, value) {
cont_no=value.ControlNumber;
ISBN=value.ISBN;
mytesthtml +='<table class="bibtbl"><tr><td class="picbox"><img src="http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?Return=T&Type=S&Value='+ISBN+'&userID=MAIN37789&password=CC10073" /></td ><td class="txtbox">';
								  
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
	mytesthtml += key2 + ": " + value2 + "<br>";
	}

});
mytesthtml +="<p class='trail'><a id=" + cont_no + " href='#bib_detail'>Detail</a></p>";
mytesthtml +="</td></tr></table>";
});
 
$( "#showme" ).append(mytesthtml);
});

}
});
});

//draft for file write/read
$(document).ready(function(){	
/*	var returnSuccess='success';
    var SettingsFileName='abc.xml';
    var SettingsDownloadUrl='http://jeffersonlibrary.net/app.xml';
	var base='http://jeffersonlibrary.net/';
    //or 
   // var base='www/xml/';
    var success = function(result) { 
                console.log("SUCCESS: \r\n"+result );  
				alert('success');
            };

    var error = function(error) { 
                      console.error("ERROR: \r\n"+error );
					  alert('no success');
                };
   FilePlugin.callNativeFunction(success, error,{'result':returnSuccess,'file':SettingsFileName,'downloadurl':SettingsDownloadUrl,'base_path':base} ); 
*/
});

//BARCODE SCANNER
function getData(barcode){
//alert('hello world');
var barcode=9780345528117;
alert(barcode);

searchitem=barcode;

var thedate=(new Date()).toUTCString();
var reqstring="http://plato-r2.polarislibrary.com/PAPIService/REST/public/v1/1033/100/1/search/bibs/keyword/ISBN?q="+searchitem+"";
//alert('beginning');
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
			
		getit_bc(code,reqstring,thedate);
        },
        error      : function() {
            console.error("error");
            alert('Not working1!');                  
        }
    });

function getit_bc(code,reqstring,thedate){

var detlist_html='';

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

var response=JSON.stringify(response);
var response= jQuery.parseJSON(response);

var selection= ['Title', 'Author', 'PublicationDate', 'Description', 'ISBN', 'PrimaryTypeOfMaterial', 'LocalItemsTotal', 'LocalItemsIn', 'CurrentHoldRequests', 'Summary'];
//$( "#bcode" ).empty();

var detlist_html='';
  
$.each(response.BibSearchRows, function(key, value) {
cont_no=value.ControlNumber;
ISBN=value.ISBN;
detlist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?Return=T&Type=S&Value='+ISBN+'&userID=MAIN37789&password=CC10073" /></td ><td class="txtbox">';
								  
$.each(value, function(key2, value2) {
	
	if(jQuery.inArray( key2, selection )!== -1){
		switch(key2){
			case "PublicationDate":
			key2="Publication Date";
			break;
			case "LocalItemsTotal":
			key2="Local Items Total";
			break;
			case "LocalItemsIn":
			key2="Local Items In";
			break;
			case "CurrentHoldRequests":
			key2="Current Hold Requests";
			break;
			case "PrimaryTypeOfMaterial":
			key2="Media Tyoe";
			value2=matconv(value2);
			break;
		}
	detlist_html += key2 + ": " + value2 + "<br>";
	}

});
detlist_html +="<p class='hold_req'><a id=" + cont_no + " href='#login'>Put on Hold</a></p>";
detlist_html +="</td></tr></table>";
});
 
$( "#bcode" ).append(detlist_html);
});
};
};


$(document).ready(function(){

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

//AJAX to Book Search (direct)
$('#search_item').on ("keyup", function () {

  searchitem=0;
  searchitem= $('#search_item').val();

var thedate=(new Date()).toUTCString();
var reqstring="http://plato-r2.polarislibrary.com/PAPIService/REST/public/v1/1033/100/1/search/bibs/boolean?q="+searchitem+"";
//alert('beginning');
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
	blist_html += key2 + ": " + value2 + "<br>";
	}

});
blist_html +="<p class='trail'><a id=" + cont_no + " href='#bib_detail'>Detail</a></p>";
blist_html +="</td></tr></table>";
});
 
$( "#blist" ).append(blist_html);
});
}
});

//AJAX to Book Detail (direct)
$(document).on('click', '.trail a', function () {
searchitem=$(this).attr("id");

var thedate=(new Date()).toUTCString();
var reqstring="http://plato-r2.polarislibrary.com/PAPIService/REST/public/v1/1033/100/1/search/bibs/keyword/CN?q="+searchitem+"";
//alert('beginning');
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

function getit(code,reqstring,thedate){

var detlist_html='';

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

var response=JSON.stringify(response);
var response= jQuery.parseJSON(response);

var selection= ['Title', 'Author', 'PublicationDate', 'Description', 'ISBN', 'PrimaryTypeOfMaterial', 'LocalItemsTotal', 'LocalItemsIn', 'CurrentHoldRequests', 'Summary'];
$( "#bdetail" ).empty();

var detlist_html='';
  
$.each(response.BibSearchRows, function(key, value) {
cont_no=value.ControlNumber;
ISBN=value.ISBN;
detlist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?Return=T&Type=S&Value='+ISBN+'&userID=MAIN37789&password=CC10073" /></td ><td class="txtbox">';
								  
$.each(value, function(key2, value2) {
	
	if(jQuery.inArray( key2, selection )!== -1){
		switch(key2){
			case "PublicationDate":
			key2="Publication Date";
			break;
			case "LocalItemsTotal":
			key2="Local Items Total";
			break;
			case "LocalItemsIn":
			key2="Local Items In";
			break;
			case "CurrentHoldRequests":
			key2="Current Hold Requests";
			break;
			case "PrimaryTypeOfMaterial":
			key2="Media Tyoe";
			value2=matconv(value2);
			break;
		}
	detlist_html += key2 + ": " + value2 + "<br>";
	}

});
detlist_html +="<p class='hold_req'><a id=" + cont_no + " href='#login'>Put on Hold</a></p>";
detlist_html +="</td></tr></table>";
});
 
$( "#bdetail" ).append(detlist_html);
});
}
});

//get new publications (direct)
$(document).on('click', '#thesearch', function () {

var thedate=(new Date()).toUTCString();
var reqstring="http://plato-r2.polarislibrary.com/PAPIService/REST/public/v1/1033/100/1/search/bibs/boolean?q=*+sortby+PD/sort.descending+CN&bibsperpage=10";
//alert('beginning');
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

function getit(code,reqstring,thedate){

var np_list_html='';

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

var response=JSON.stringify(response);
var response= jQuery.parseJSON(response);

var selection= ['Title', 'Author', 'PublicationDate', 'Description', 'PrimaryTypeOfMaterial'];
$( "#news" ).empty();
var np_list_html='';
  
$.each(response.BibSearchRows, function(key, value) {
cont_no=value.ControlNumber;
ISBN=value.ISBN;
np_list_html +='<table class="bibtbl"><tr><td class="picbox"><img src="http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?Return=T&Type=S&Value='+ISBN+'&userID=MAIN37789&password=CC10073" /></td ><td class="txtbox">';
								  
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
	np_list_html += key2 + ": " + value2 + "<br>";
	}

});
np_list_html +="<p class='trail'><a id=" + cont_no + " href='#bib_detail'>Detail</a></p>";
np_list_html +="</td></tr></table>";
});
 
$( "#news" ).append(np_list_html);
});
}
});

//Nuked - AJAX to Patron Login (new direct)
/*$('#loginsubmitxx').on ("click", function () {

var p_barcode=("#libcard").val();
var p_pin=("#libpin").val(); ;

var thedate=(new Date()).toUTCString();
var reqstring="http://plato-r2.polarislibrary.com/PAPIService/REST/public/v1/1033/100/1/patron/"+p_barcode+"";

$.ajax({
        type       : "POST",
		url: "http://www.jeffersonlibrary.net/INTERMED_short.php",
        crossDomain: true,
        data: {uri: reqstring, rdate:thedate, patron_pin:p_pin, method:"GET"},
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
			var code=response;
			
		checklogin(code,reqstring,thedate);
        },
        error      : function() {
            console.error("error");
            alert('Not working1!');                  
        }
    });
});

function checklogin(code,reqstring,thedate){

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

var response=JSON.stringify(response);
//var response= jQuery.parseJSON(response);
alert(response);

//end ajax
});
//end checklogin
}*/

//Hold Request and/or Login (new direct)
$(document).on('click', '.hold_req a', function () {
cont_num=$(this).attr("id");
$('#cn_holdreq').val(cont_num);
});

$('#loginsubmit').on ("click", function () {
var form = $('#loginform');
//check if from hold req
var hold;
if($('#cn_holdreq').val()){hold=true;}else{hold=false;}
//alert(hold);								 
p_barcode=$("#libcard").val();
p_pin=$("#libpin").val();

var thedate=(new Date()).toUTCString();
var reqstring="http://plato-r2.polarislibrary.com/PAPIService/REST/public/v1/1033/100/1/patron/"+p_barcode+"";

$.ajax({
        type       : "POST",
		url: "http://www.jeffersonlibrary.net/INTERMED_short.php",
        crossDomain: true,
        data: {uri: reqstring, rdate:thedate, patron_pin:p_pin, method:"GET"},
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
		var code=response;

		checklogin(code,reqstring,thedate,hold);
        },
        error      : function() {
            console.error("error");
            alert('Not working1!');                  
        }
    });
});
//check login credentials and go putonhold or getholds
function checklogin(code,reqstring,thedate,hold){
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

var response=JSON.stringify(response);
var response= jQuery.parseJSON(response);
//response is a json object
var res_pat_id=response.PatronID;
var pat_barcode=response.PatronBarcode;
var valid_pat=response.ValidPatron;

if(hold==true){putonhold(res_pat_id, cont_num, pat_barcode);
$('#cn_holdreq').val("");
}else{prep_getholds(pat_barcode);}
//end ajax
});
//end checklogin
}
//function putonhold (get credentials)
function putonhold(res_pat_id, cont_num, pat_barcode){
var thedate=(new Date()).toUTCString();
var reqstring="http://plato-r2.polarislibrary.com/PAPIService/REST/public/v1/1033/100/1/holdrequest";

$.ajax({
        type       : "POST",
		url: "http://www.jeffersonlibrary.net/INTERMED_short.php",
        crossDomain: true,
        data: {uri: reqstring, rdate:thedate, method:"POST"},
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
		var code=response;
		//alert(res_pat_id);
		//alert(pat_barcode);
		createhold(res_pat_id,cont_num,code,reqstring,thedate,pat_barcode);
        },
        error      : function() {
            console.error("error");
            alert('Not working1!');                  
        }
    });
};
//function createhold
function createhold(res_pat_id,cont_num,code,reqstring,thedate,pat_barcode){
var settings = {
  "async": true,
  "crossDomain": true,
  "url": ""+reqstring+"",
  "method": "POST",
  "headers": {
    "polarisdate": ""+thedate+"",
    "authorization": ""+code+"",
    "content-type": "application/json"
  },
  "processData": false,
  "data": '{"PatronID":"'+res_pat_id+'","BibID":"'+cont_num+'","ItemBarcode":"","VolumeNumber":"","Designation":"","PickupOrgID":"3","IsBorrowByMail":0,"PatronNotes":"","ActivationDate":"\/Date(2015-08-18T00:00:00.00)\/","Answer":"","RequestID":"","WorkstationID":1,"UserID":1,"RequestingOrgID":1,"TargetGUID":""}',
}

$.ajax(settings).done(function (response) {
//alert('your request has been processed');
prep_getholds (pat_barcode);
  console.log(response);
});
}

//get items out function
function getitemsout(pat_barcode){
	//alert('this is' + pat_barcode + 'here');
	searchitem1=pat_barcode;
	searchitem2=$('#libpin').val();
	//alert('item1' + searchitem1 + 'item2 ' + searchitem2 + 'done');
	$.mobile.changePage("#inside");
	    $.ajax({
        type: "POST",
        url: "http://www.jeffersonlibrary.net/INTERMED.php?rq=9",
        crossDomain: true,
        data: {PatronBarcode:searchitem1, libpin:searchitem2 },
		//dataType   : 'json',
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
            //console.error(JSON.stringify(response));
            //alert('7 has a response');
			//$( "#loginresponse" ).empty();
			var response= jQuery.parseJSON(response);
			var my_borrow='';
			var hold_selection= ['Title', 'Author', 'DueDate', 'Barcode'];
			$( "#loginresponse" ).empty();

			$.each(response.PatronHoldRequestsGetRows, function(key, value) {
																
			if(value.StatusDescription!="Cancelled"){													
																
			my_borrow +='<table class="bibtbl"><tr><td class="picbox"></td><td class="txtbox">';
				$.each(value, function(key2, value2) {
					if(value2!=''){
					if(jQuery.inArray( key2, hold_selection )!== -1){
					
						if(key2=="Title"){
						my_borrow += "<strong>" + key2 + ": " + value2 + "</strong><br>";
						}else{
						my_borrow += key2 + ": " + value2 + "<br>";
						}

					if(key2=="HoldRequestID"){
					hold_req_id=value2;
					//alert("this is" + hold_req_id + "here");
					}

					}
					}
									   
				});
				my_borrow +="<p class='extend_item'><a id=" + hold_req_id + " href='#inside'>Do something</a></p>";
				my_borrow +="</td></tr></table>";
			}//end screen out cancelled
				});

			$( "#borrowed" ).append(my_borrow);

        },
        error      : function() {
            console.error("error");
            alert('Not working!');                  
        }
    }); 
};//e get items out function

//Cancel Hold - take hold id and prep validate patron
$(document).on('click', '.hold_cancel a', function () {
hold_id=$(this).attr("id");	
p_barcode=$("#libcard").val();
p_pin=$("#libpin").val();

$( "#loginresponse" ).empty();
//var form = $('#loginform');

var thedate=(new Date()).toUTCString();
var reqstring="http://plato-r2.polarislibrary.com/PAPIService/REST/public/v1/1033/100/1/patron/"+p_barcode+"";

$.ajax({
        type: "POST",
		url: "http://www.jeffersonlibrary.net/INTERMED_short.php",
        crossDomain: true,
        data: {uri: reqstring, rdate:thedate, patron_pin:p_pin, method:"GET"},
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
		var code=response;
		validate_patron(reqstring,thedate,code,hold_id);
        },
        error      : function() {
            console.error("error");
            alert('Not working1!');                  
        }
    });
});

//validate patron and go to prep cancelhold
function validate_patron(reqstring,thedate,code,hold_id){
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
var response=JSON.stringify(response);
var response= jQuery.parseJSON(response);
//response is a json object
//var res_pat_id=response.PatronID;
var pat_barcode=response.PatronBarcode;
var valid_pat=response.ValidPatron;

if(valid_pat==true){prep_cancelhold(pat_barcode,hold_id);
$('#cn_holdreq').val("");
}else{
alert('log in failed - please try again');
}
//end ajax
});
//validate patron
}

//prep_cancelhold and go to cancelhold
function prep_cancelhold(pat_barcode,hold_id){

	pwd=$('#libpin').val();
	
var thedate=(new Date()).toUTCString();
var reqstring="http://plato-r2.polarislibrary.com/PAPIService/REST/public/v1/1033/100/1/patron/"+pat_barcode+"/holdrequests/"+hold_id+"/cancelled?wsid=1&userid=1";	

	    $.ajax({
        type: "POST",
        url: "http://www.jeffersonlibrary.net/INTERMED_short.php",
        crossDomain: true,
        data: {uri:reqstring, rdate: thedate, method:"PUT", patron_pin:pwd},
		//dataType   : 'json',
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
			var code=response;
			cancelhold(reqstring,thedate,code) 
        },
        error      : function() {
            console.error("error");
            alert('Not working!');                  
        }
    	});
//end prep_cancelhold
}

//cancelhold and go to prep_getholds
function cancelhold(reqstring, thedate, code){

var settings = {
  "async": true,
  "crossDomain": true,
  "url": ""+reqstring+"",
  "method": "PUT",
  "headers": {
    "polarisdate": ""+thedate+"",
    "authorization": ""+code+"",
    "content-type": "application/json"
  }
}
$.ajax(settings).done(function (response) {
var response=JSON.stringify(response);
var response= jQuery.parseJSON(response);
//response is a json object
var cancel_confirm=response.PAPIErrorCode;

if(cancel_confirm==0){
prep_getholds(res_pat_id, cont_num, pat_barcode);
}else{
alert('your hold cancel request failed');
}
//end ajax
});
//end cancelhold
}

//prep_getholds and go to getholds
function prep_getholds(pat_barcode){
	//alert('this is' + pat_barcode + 'here');
	//searchitem1=pat_barcode;
	var pwd=$('#libpin').val();
//alert(pwd);	
var thedate=(new Date()).toUTCString();
var reqstring="http://plato-r2.polarislibrary.com/PAPIService/REST/public/v1/1033/100/1/patron/"+pat_barcode+"/holdrequests/all";	

	    $.ajax({
        type: "POST",
        url: "http://www.jeffersonlibrary.net/INTERMED_short.php",
        crossDomain: true,
        data: {uri:reqstring, rdate: thedate, method:"GET", patron_pin:pwd},
		//dataType   : 'json',
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
			var code=response;
			getholds(reqstring,thedate,code) 
        },
        error      : function() {
            console.error("error");
            alert('Not working!');                  
        }
    	});
//end prep_getholds
}

//getholds
function getholds(reqstring,thedate,code){	
//alert('getholds started');
$.mobile.changePage("#inside");
//var response='';	
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

var response=JSON.stringify(response);
var response= jQuery.parseJSON(response);

var my_holds='';
var hold_selection= ['Title', 'Author', 'StatusDescription', 'HoldRequestID', 'FormatID'];

$( "#loginresponse" ).empty();
//alert('loginresponse should be empty now');
$.each(response.PatronHoldRequestsGetRows, function(key, value) {
																
		if(value.StatusDescription!="Cancelled"){													
															
		my_holds +='<table class="bibtbl"><tr><td class="picbox"></td><td class="txtbox">';
			$.each(value, function(key2, value2) {
				if(value2!=''){
				if(jQuery.inArray( key2, hold_selection )!== -1){
				
					if(key2=="Title"){
					my_holds += "<strong>" + key2 + ": " + value2 + "</strong><br>";
					}else{
					my_holds += key2 + ": " + value2 + "<br>";
					}

				if(key2=="HoldRequestID"){
				hold_req_id=value2;
				//alert("this is" + hold_req_id + "here");
				}

				}
				}
								   
								   
			});
			my_holds +="<p class='hold_cancel'><a id=" + hold_req_id + " href='#inside'>Cancel Hold</a></p>";
			my_holds +="</td></tr></table>";
		}//end screen out cancelled
});
								
	$( "#loginresponse" ).append(my_holds);

});//end ajax 
};//end getholds function

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
alert('clicky');
$('.ui-grid-solo .flash .ui-btn').css({'background-color': '#FDF000', 'background': '-webkit-radial-gradient(white 15%, yellow 85%)','background': '-o-radial-gradient(white 15%, yellow 85%)','background':' -moz-radial-gradient(white 15%, yellow 85%)',' background': 'radial-gradient(white 15%, yellow 85%)'});
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