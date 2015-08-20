//device detection and homepage size
$(document).ready(function(){
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
var deviceType = (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : 'NULL';
//alert(deviceType);
alert('hello world');
if(deviceType!='NULL'){
	$('.ui-btn').css({'margin-top':'1px', 'margin-bottom': '1px'}); 
}

var model = device.model;
if(model=='iPhone7,1'){
	//alert('this is an iphone 4s');
	$('.ui-btn').css({'margin-top':'', 'margin-bottom':''}); 
}
}
});

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

//testquery
//run a blind query
$(document).ready(function(){
$.ajax({
        type       : "POST",
        url: "http://www.jeffersonlibrary.net/INTERMED.php?rq=2",
        crossDomain: true,
        data: {val:'K'},
		//dataType   : 'json',
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
			//alert('hello4');
		//$( "#blist" ).append(response);
        },
        error      : function() {
            console.error("error");
            alert('Not working!');                  
        }
    });     
});

//Book Search Direct Ajax
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
        data: {uri: reqstring, rdate: thedate},
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

//BARCODE SCANNER
function getData(barcode){

  searchitem=0812927532;

    $.ajax({
        type       : "POST",
        url: "http://www.jeffersonlibrary.net/INTERMED.php?rq=1",
        crossDomain: true,
        data: {val: searchitem},
		//dataType   : 'json',
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
            //console.error(JSON.stringify(response));
            //alert('Works!');
			$( "#bcode" ).empty();
			$( "#bcode" ).append(response);
        },
        error      : function() {
            console.error("error");
            alert('Not working!');                  
        }
    });     
};

//spinner
function start_spin(){
window.plugins.spinnerDialog.show();
//alert('startspin');
}
function stop_spin(){
window.plugins.spinnerDialog.hide();
//alert('stopspin');
}

//AJAX to Book Search
$('#search_item').on ("keyup", function () {
//start_spin();
  searchitem=0;
  searchitem= $('#search_item').val();
    $.ajax({
        type       : "POST",
        url: "http://www.jeffersonlibrary.net/INTERMED.php?rq=2",
        crossDomain: true,
        data: {val: searchitem},
		//dataType   : 'json',
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
            //console.error(JSON.stringify(response));
			var response= jQuery.parseJSON(response);
			//console.error(jQuery.parseJSON(response));
			var selection= ['Title', 'Author', 'PublicationDate', 'Description', 'PrimaryTypeOfMaterial'];
			$( "#blist" ).empty();

			var myhtml='';
				$.each(response.BibSearchRows, function(key, value) {
					cont_no=value.ControlNumber;
					ISBN=value.ISBN;
			
					//$( "#blist" ).append('');
					//$( "#blist" ).append('<img src="http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?Return=T&Type=S&Value='+ISBN+'&userID=MAIN37789&password=CC10073" /><br />');
					myhtml +='<table class="bibtbl"><tr><td class="picbox"><img src="http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?Return=T&Type=S&Value='+ISBN+'&userID=MAIN37789&password=CC10073" /></td ><td class="txtbox">';
				$.each(value, function(key2, value2) {
								   
				   
					//if(value2!='' || value2>=0){
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
					
					
					
					myhtml += key2 + ": " + value2 + "<br>";
					}
					//}
				});
				myhtml +="<p class='trail'><a id=" + cont_no + " href='#bib_detail'>Detail</a></p>";
				myhtml +="</td></tr></table>";
				});
				$( "#blist" ).append(myhtml);
			//stop_spin();
        },
        error      : function() {
            console.error("error");
            alert('Not working!');                  
        }
    });

});

//AJAX to Book Detail
$(document).on('click', '.trail a', function () {
searchitem=$(this).attr("id");
 //searchitem=2557;
 // alert('this is' + contid + 'here');
var mybib_detail='';

$.ajax({
        type : "POST",
        url: "http://www.jeffersonlibrary.net/INTERMED.php?rq=3",
        crossDomain: true,
        data: {val: searchitem},
		//dataType   : 'json',
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
			
			var response= jQuery.parseJSON(response);
			//console.error(jQuery.parseJSON(response));
			var selection= ['Title', 'Author', 'PublicationDate', 'Description', 'ISBN', 'PrimaryTypeOfMaterial', 'LocalItemsTotal', 'LocalItemsIn', 'CurrentHoldRequests', 'Summary'];
			$( "#bdetail" ).empty();

			var mybib_detail='';
			mybib_detail +='<H3>Title Detail</H3>';
				$.each(response.BibSearchRows, function(key, value) {
					cont_no=value.ControlNumber;
					ISBN=value.ISBN;
					//$( "#blist" ).append('');
					//$( "#blist" ).append('<img src="http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?Return=T&Type=S&Value='+ISBN+'&userID=MAIN37789&password=CC10073" /><br />');
					mybib_detail +='<table class="bibtbl"><tr><td class="picbox"><img src="http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?Return=T&Type=S&Value='+ISBN+'&userID=MAIN37789&password=CC10073" /></td ><td class="txtbox">';
				$.each(value, function(key2, value2) {
					//if(value2!=''){
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
					
					mybib_detail += key2 + ": " + value2 + "<br>";
					}
					//}
				});
				mybib_detail +="<p class='hold_req'><a id=" + cont_no + " href='#login'>Put on Hold</a></p>";
				mybib_detail +="</td></tr></table>";
				
				});
				$( "#bdetail" ).append(mybib_detail);
			//stop_spin();
			
        },
        error      : function() {
            console.error("error");
            alert('Not working!');                  
        }
    });     
});     

//AJAX to Patron Login
$('#loginsubmitxx').on ("click", function () {
    $.ajax({
        type: "POST",
        url: "http://www.jeffersonlibrary.net/INTERMED.php?rq=4",
        crossDomain: true,
        data: form.serialize(),
		//dataType   : 'json',
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
            //console.error(JSON.stringify(response));
            //alert('Works!');
			$("#loginresponse").empty();
			var response= jQuery.parseJSON(response);
			var res_pat_id=response.PatronID;
			var valid_pat=response.ValidPatron;
			var pat_barcode=response.Barcode;
			
			//$("#loginresponse").append(pat_barcode);
			if(valid_pat==true){
				login();
			} else{
			$("#loginresponse").append(valid_pat);
			}
			
				
        },
        error      : function() {
            console.error("error");
            alert('Not working!');                  
        }
    });     
});

//Hold Request and/or Login
$(document).on('click', '.hold_req a', function () {
cont_num=$(this).attr("id");
$('#cn_holdreq').val(cont_num);
});


$('#loginsubmit').on ("click", function () {
var form = $('#loginform');
//check if from hold req
var hold;
if($('#cn_holdreq').val()){hold=true;}else{hold=false;}
								 
    $.ajax({
        type: "POST",
        url: "http://www.jeffersonlibrary.net/INTERMED.php?rq=4",
        crossDomain: true,
        data: form.serialize(),
		//dataType   : 'json',
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
           
			//$( "#loginresponse" ).empty();
			var response= jQuery.parseJSON(response);
			var res_pat_id=response.PatronID;
			var pat_barcode=response.PatronBarcode;
			var valid_pat=response.ValidPatron;
			
			if(hold){putonhold(res_pat_id, cont_num, pat_barcode);
			$('#cn_holdreq').val("");
			}else{getholds(pat_barcode);}
        },
        error      : function() {
            console.error("error");
            alert('Not working!');                  
        }
    });     
});

//putonhold
function putonhold(res_pat_id, cont_num, pat_barcode){
	    
		$.ajax({
        type: "POST",
        url: "http://www.jeffersonlibrary.net/INTERMED.php?rq=5",
        crossDomain: true,
        data: {ControlID: cont_num, PatronID: res_pat_id},
		//dataType   : 'json',
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
            //console.error(JSON.stringify(response));
            //alert('Works!');
			//$( "#loginresponse" ).empty();
			var response= jQuery.parseJSON(response);
			//var response=response.Message;
			//alert('ajax 5 is done!');
			//$( "#loginresponse" ).append(response);
			//this validates the Patron and returns the PatronID
			getholds(pat_barcode);
        },
        error      : function() {
            console.error("error");
            alert('Not working!');                  
        }
    	}); 
};//e putonhold function

//getholds
function getholds(pat_barcode){
	//alert('this is' + pat_barcode + 'here');
	searchitem1=pat_barcode;
	searchitem2=$('#libpin').val();
	//alert('item1' + searchitem1 + 'item2 ' + searchitem2 + 'done');
	$.mobile.changePage("#inside");
	    $.ajax({
        type: "POST",
        url: "http://www.jeffersonlibrary.net/INTERMED.php?rq=7",
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
			var my_holds='';
			var hold_selection= ['Title', 'Author', 'StatusDescription', 'HoldRequestID', 'FormatID'];
			$( "#loginresponse" ).empty();

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

        },
        error      : function() {
            console.error("error");
            alert('Not working!');                  
        }
    }); 
};//e getholds function

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

//Cancel Hold - login part
$(document).on('click', '.hold_cancel a', function () {
hold_id=$(this).attr("id");	
//alert('hold_id is' + hold_id + 'here');
//$( "#loginresponse" ).empty();
//$("#loginform .ui-btn").hide();
var form = $('#loginform');

    $.ajax({
        type: "POST",
        url: "http://www.jeffersonlibrary.net/INTERMED.php?rq=4",
        crossDomain: true,
        data: form.serialize(),
		//dataType   : 'json',
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
            //console.error(JSON.stringify(response));
            //alert('Works!');
			$( "#loginresponse" ).empty();
			var response= jQuery.parseJSON(response);
			var PatronID= response.PatronID;
			var pat_barcode=response.PatronBarcode;
			//alert('hello from Ajax');
			//$( "#loginresponse" ).append(response);
			//this validates the Patron and returns the PatronID
			cancelhold(PatronID, pat_barcode, hold_id);
        },
        error      : function() {
            console.error("error");
            alert('Not working!');                  
        }
    });     
});

//cancelhold2
function cancelhold(PatronID, pat_barcode, hold_id){
	//alert('this is cancelhold ' + pat_barcode + hold_id + 'here');
	searchitem1=$('#libpin').val();
	searchitem2=hold_id;
	searchitem3=pat_barcode;
	
	    $.ajax({
        type: "POST",
        url: "http://www.jeffersonlibrary.net/INTERMED.php?rq=6",
        crossDomain: true,
        data: {PatronBarcode:searchitem3, hold_id:searchitem2, libpin:searchitem1 },
		//dataType   : 'json',
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
            //console.error(JSON.stringify(response));
            //alert('Works!');
			$( "#loginresponse" ).empty();
			//var response= jQuery.parseJSON(response);
			//var response=response.Message;
			//$( "#loginresponse" ).append(response);
			//this validates the Patron and returns the PatronID
			getholds2(pat_barcode, hold_id) 
        },
        error      : function() {
            console.error("error");
            alert('Not working!');                  
        }
    	}); 
};//e getholds function

//getholds2
function getholds2(pat_barcode, hold_id){
	searchitem1=pat_barcode;
	searchitem2=$('#libpin').val();
	    $.ajax({
        type: "POST",
        url: "http://www.jeffersonlibrary.net/INTERMED.php?rq=7",
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
			$( "#loginresponse" ).empty();
			var response= jQuery.parseJSON(response);
			var my_holds='';
			var hold_selection= ['Title', 'Author', 'StatusDescription'];
			$( "#loginresponse" ).empty();

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

					}
					}
									   
				});
				my_holds +="<p class='hold_cancel'><a id=" + hold_id + "href='#inside'>Cancel Hold</a></p>";
				my_holds +="</td></tr></table>";
			}//end screen out cancelled
				});

			$( "#loginresponse" ).append(my_holds);

        },
        error      : function() {
            console.error("error");
            alert('Not working!');                  
        }
    }); 
};//e getholds2 function

//Flashlight
$('#flashlight').on('click', function () {
//alert('clicky');
$('.ui-grid-solo .flash .ui-btn').css({'background-color': '#FDF000'});
window.plugins.flashlight.available(function(isAvailable) {
  if (isAvailable) {

    // switch on
    window.plugins.flashlight.switchOn(); // success/error callbacks may be passed

    // switch off after 5 seconds
    setTimeout(function() {
     window.plugins.flashlight.switchOff(); // success/error callbacks may be passed
    $('.ui-grid-solo .flash .ui-btn').css({'background-color': '#FFF7B7'});
	}, 5000);
	//$('.ui-grid-solo .flash .ui-btn').css({'background-color': '#FFF7B7'});
  } 
 else {
    alert("Flashlight not available on this device");
  }
});
});

//get new publications
$(document).on('click', '#thesearch', function () {
//alert('SEARCH');
//start_spin();
  searchitem='x';
  //searchitem= $('#search_item').val();
    $.ajax({
        type       : "POST",
        url: "http://www.jeffersonlibrary.net/INTERMED.php?rq=8",
        crossDomain: true,
        data: {val: searchitem},
		//dataType   : 'json',
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
            //console.error(JSON.stringify(response));
			var response= jQuery.parseJSON(response);
			//console.error(jQuery.parseJSON(response));
			var selection= ['Title', 'Author', 'PublicationDate', 'LocalItemsIn', 'CurrentHoldRequests'];
			$( "#news" ).empty();

			var myhtml='';
			myhtml +='<H3>New Publications</H3>';
				$.each(response.BibSearchRows, function(key, value) {
					cont_no=value.ControlNumber;
					ISBN=value.ISBN;
					//$( "#blist" ).append('');
					//$( "#blist" ).append('<img src="http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?Return=T&Type=S&Value='+ISBN+'&userID=MAIN37789&password=CC10073" /><br />');
					myhtml +='<table class="bibtbl"><tr><td class="picbox"><img src="http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?Return=T&Type=S&Value='+ISBN+'&userID=MAIN37789&password=CC10073" /></td ><td class="txtbox">';
				$.each(value, function(key2, value2) {
					if(value2!=''){
					if(jQuery.inArray( key2, selection )!== -1){
					
						if(key2=="Title"){
						myhtml += "<strong>" + key2 + ": " + value2 + "</strong><br>";
						}else{
						myhtml += key2 + ": " + value2 + "<br>";
						}
					}
					}
				});
				myhtml +="<p class='trail'><a id='" + cont_no + "' href='#bib_detail'>Detail</a></p>";
				myhtml +="</td></tr></table>";
				});
				$( "#news" ).append(myhtml);
			//stop_spin();
        },
        error      : function() {
            console.error("error");
            alert('Not working!');                  
        }
    });

});

//change page
function login(){
	$.mobile.changePage("#inside");
}

//fastclick
window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);

});