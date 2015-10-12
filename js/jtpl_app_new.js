//set global variables
var dest="https://catalog.mainlib.org/PAPIService";
var counter=0;

//device detection and homepage size
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
//enable back button in ios9	
if(device.platform === "iOS" && parseInt(device.version) === 9){
        $.mobile.hashListeningEnabled = false;
    }	
//homepage spacing in iphone6plus	
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
case 40: var val2="Blue-Ray DVD"; break;
default: var val2="other media format"; break;
}
return val2;
}

//case2 - BARCODE SCANNER
function getData(barcode){  
//var barcode=9781440569722;
p_searchitem=barcode;
var thedate=(new Date()).toUTCString();
var reqstring="https://catalog.mainlib.org/PAPIService/REST/public/v1/1033/100/13/search/bibs/keyword/ISBN?q="+p_searchitem+"";
var p_method="GET";

$.ajax({
        type       : "POST",
		url: "http://www.jeffersonlibrary.net/INTERMED_short.php",
        crossDomain: true,
        data: {"uri": ""+reqstring+"", "rdate": ""+thedate+"", "method":""+p_method+""},
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
			//stop_spin();
			var code=response;
			p_response={"code": ""+code+"", "reqstring": ""+reqstring+"", "thedate": ""+thedate+""};
			getit_bc(p_response.code,p_response.reqstring,p_response.thedate);
        },
        error      : function() {
            console.error("error");
            alert('Not working1!');                  
        }
});
}
//case 2 - get barcode detail
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
$( "#bcode" ).empty();

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
detlist_html +="<p class='hold_req'><a id=" + cont_no + " href='#login' data-role='button' data-inline='true' data-mini='true' data-icon='arrow-r' data-theme='a'>Put on Hold</a></p>";
detlist_html +="</td></tr></table>";
});
 
$( "#bcode" ).append(detlist_html);
});
};

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

//clear searchfield
$(document).on("pagecreate", function () {
  $(".ui-input-clear").on("click", function() {
    counter=0;
  });
});

//Clean the hidden hold field upon entering main account page
$('#main_login').on('click', function () {
$('#cn_holdreq').val("");								   
});

$('#clr_ifr').on('click', function () {
 $('#events_frame').attr('src', 'http://jeffersonlibrary.net/forms/eventsprobe_all_app.php');
});


//$('[data-rel="back"]').on('click', function () {
//setTimeout(function(){
//$('#events').focus();
//},1000);
//});

/*$('#hours_btn').on('click', function () {
alert('click');
$.ajax({
        type       : "GET",
		url: "http://www.jeffersonlibrary.net/test.html",
        crossDomain: true,
        //data: {"uri": ""+reqstring+"", "rdate": ""+thedate+"", "method":""+p_method+"", "patron_pin":""+p_pwd+""},
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
			var code=response;
alert('response');
		$('#close_dates').append(response);
			
        },
        error      : function() {
            console.error("error");
            alert('Not working1!');                  
        }
});
});*/

//ENCRYPTION/VALIDATION
function p_validate(p_query, p_searchitem, p_pwd, p_cn, p_bc, p_method, p_type, p_holdID ){

if(p_pwd ==='undefined') p_pwd ='';
if(p_cn ==='undefined') p_cn ='';
if(p_bc ==='undefined') p_bc ='';
if(p_type ==='undefined') p_type ='';
if(p_holdID ==='undefined') p_holdID ='';
if(p_searchitem ==='undefined') p_searchitem ='';
switch(p_query){
case 1:	var reqstring=""+dest+"/REST/public/v1/1033/100/13/search/bibs/keyword/kw?q="+p_searchitem+"&bibsperpage=20"; break;
case 2: var reqstring=""+dest+"/REST/public/v1/1033/100/13/search/bibs/keyword/ISBN?q="+p_searchitem+""; break;
case 3: var reqstring=""+dest+"/REST/public/v1/1033/100/13/search/bibs/keyword/CN?q="+p_searchitem+""; break;
case 4: var reqstring=""+dest+"/REST/public/v1/1033/100/13/search/bibs/boolean?q=*+sortby+PD/sort.descending&bibsperpage=10"; break;
case 5: var reqstring=""+dest+"/REST/public/v1/1033/100/13/patron/"+p_bc+""; break;
case 6: var reqstring=""+dest+"/REST/public/v1/1033/100/13/holdrequest"; break;
case 7: var reqstring=""+dest+"/REST/public/v1/1033/100/13/patron/"+p_bc+"/holdrequests/"+p_holdID+"/cancelled?wsid=1&userid=1"; break;
case 8: var reqstring=""+dest+"/REST/public/v1/1033/100/13/patron/"+p_bc+"/holdrequests/all"; break;
case 9: var reqstring=""+dest+"/REST/public/v1/1033/100/13/patron/"+p_bc+"/itemsout/all"; break;
case 10: var reqstring=""+dest+"/REST/public/v1/1033/100/13/patron/"+p_bc+"/itemsout/overdue"; break;
case 11: var reqstring=""+dest+"/REST/public/v1/1033/100/13/patron/"+p_bc+"/itemsout/"+p_holdID+""; break;
//case 12: var reqstring=""+dest+"/REST/public/v1/1033/100/13/bib/"+p_searchitem+""; break;
}
//
var thedate=(new Date()).toUTCString();
if(p_searchitem){
	//start_spin();
}
$.ajax({
        type       : "POST",
		url: "http://www.jeffersonlibrary.net/INTERMED_short.php",
        crossDomain: true,
        data: {"uri": ""+reqstring+"", "rdate": ""+thedate+"", "method":""+p_method+"", "patron_pin":""+p_pwd+""},
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
			//stop_spin();
			var code=response;
			p_response={"code": ""+code+"", "reqstring": ""+reqstring+"", "thedate": ""+thedate+""};
			//alert('here:'+p_holdID+','+p_cn+','+p_response.code+','+p_response.reqstring+','+p_response.thedate+','+p_bc+'');
			//alert('here:'+p_holdID+','+p_cn+','+code+','+reqstring+','+thedate+','+p_bc+'');
			switch(p_query){
			case 1:	get_books(p_response.code,p_response.reqstring,p_response.thedate); break;
			case 2: getit_bc(p_response.code,p_response.reqstring,p_response.thedate); break;
			case 3: get_detail(p_response.code,p_response.reqstring,p_response.thedate); break;
			case 4: get_news(p_response.code,p_response.reqstring,p_response.thedate); break;
			case 5: checklogin(p_response.code,p_response.reqstring,p_response.thedate,p_type,p_cn); break;
			case 6: createhold(p_holdID,p_cn,p_response.code,p_response.reqstring,p_response.thedate,p_bc); break;
			case 7: cancelhold(reqstring,thedate,code); break;
			//case 7: validate_patron(reqstring,thedate,code,hold_id); break;
			case 8: getholds(reqstring,thedate,code); break;
			case 9: items_out_all(reqstring,thedate,code); break;
			case 10: items_out_over(reqstring,thedate,code); break;
			case 11: item_renew(reqstring,thedate,code,p_bc); break;
			//case 12: filter_holds(p_response.code,p_response.reqstring,p_response.thedate, p_searchitem); break;
			}
			
        },
        error      : function() {
            console.error("error");
            alert('Not working1!');                  
        }
});
//alert('return from main'+hold_ind+'');
//return theret;
}

//case 1 - book search reqstring (get encryption data)
var typingTimer;                //timer identifier
var doneTypingInterval = 650;  //time in ms, 5 second for example

$('#search_item').on('keyup',function () {
counter +=1;
  searchitem=0;
  	if(counter>2){
	
	clearTimeout(typingTimer);
    if ($('#myInput').val) {
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
	}
	}
});

function doneTyping () {
   searchitem= $('#search_item').val();
  	p_searchitem=searchitem.replace(/\s+/g,"+");
	p_validate(1,''+p_searchitem+'','','','','GET','','');
}
//case 1 - get books
function get_books(code,reqstring,thedate){
start_spin();
//alert(reqstring);
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
var selection= ['Title', 'Author', 'PublicationDate', 'PrimaryTypeOfMaterial'];
$( "#blist" ).empty();
var blist_html='';
stop_spin();
$.each(response.BibSearchRows, function(key, value) {
cont_no=value.ControlNumber;
media=value.PrimaryTypeOfMaterial;
ISBN=value.ISBN;

switch(media){
	case 35: blist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/cd_icon.png" /></td ><td class="txtbox">'; break;
	case 40: blist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/blueray_icon.png" /></td ><td class="txtbox">'; break;
	case 33: blist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/dvd_icon.png" /></td ><td class="txtbox">'; break;
	default: if(ISBN==''){
		blist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/Jacket.jpg" /></td ><td class="txtbox">';
	} else{
		blist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?Return=T&Type=S&Value='+ISBN+'&userID=MAIN37789&password=CC10073" /></td ><td class="txtbox">';};
}

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
blist_html +="<p class='trail'><a id=" + cont_no + " href='#bib_detail' data-role='button' data-inline='true' data-mini='true' data-icon='arrow-r' data-theme='a'>Detail</a></p>";
blist_html +="</td></tr></table>";
$('.trail a[data-role=button]').button();
$('.trail a').button('refresh');
});
 
$( "#blist" ).append(blist_html);
$('.trail a').button();
});

}

//case 3 - get book detail (get encryption data)
$(document).on('click', '.trail a', function () {
p_searchitem=$(this).attr("id");
p_validate(3,''+p_searchitem+'','','','','GET','','');
});
//case 3 - get detail
function get_detail(code,reqstring,thedate){

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

var selection= ['Title', 'Author', 'PublicationDate', 'Description', 'ISBN', 'PrimaryTypeOfMaterial', 'LocalItemsTotal', 'LocalItemsIn', 'CurrentHoldRequests', 'Summary','CallNumber'];
$( "#bdetail" ).empty();

var detlist_html='';
  
$.each(response.BibSearchRows, function(key, value) {
cont_no=value.ControlNumber;
media=value.PrimaryTypeOfMaterial;
ISBN=value.ISBN;

switch(media){
	case 35: detlist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/cd_icon.png" /></td ><td class="txtbox">'; break;
	case 40: detlist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/blueray_icon.png" /></td ><td class="txtbox">'; break;
	case 33: detlist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/dvd_icon.png" /></td ><td class="txtbox">'; break;
	default: if(ISBN==''){
		detlist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/Jacket.jpg" /></td ><td class="txtbox">';
	} else{
	detlist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?Return=T&Type=S&Value='+ISBN+'&userID=MAIN37789&password=CC10073" /></td ><td class="txtbox">';};
}

								  
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
			case "CallNumber":
			key2="Call Number";
			break;
			case "CurrentHoldRequests":
			key2="Current Hold Requests";
			break;
			case "PrimaryTypeOfMaterial":
			key2="Media Type";
			value2=matconv(value2);
			break;
		}
	detlist_html += "<strong>" + key2 + "</strong>: " + value2 + "<br>";
	}

});
detlist_html +="<p class='hold_req'><a id=" + cont_no + " href='#login' data-role='button' data-inline='true' data-mini='true' data-icon='arrow-r' data-theme='a'>Put on Hold</a></p>";
detlist_html +="</td></tr></table>";
});
 
$( "#bdetail" ).append(detlist_html);
$('.hold_req a').button();
});
};

//case 4 - get new publication (encrypt)
/*$(document).on('click', '#thesearch', function () {
p_validate(4,'','','','','GET','','');
});
//case 4 - get news
function get_news(code,reqstring,thedate){
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
};*/

//case 5 - Hold Request or Login (get encryption)
$(document).on('click', '.hold_req a', function () {
var cont_num;
cont_num=$(this).attr("id");
$('#cn_holdreq').val(cont_num);
//alert(cont_num);
});
//Login
$('#loginsubmit').on ("click", function () {
var hold;
if($('#cn_holdreq').val()){hold=true;cont_num=$('#cn_holdreq').val();}else{	hold=false;cont_num='';}
p_barcode=$("#libcard").val();
p_pin=$("#libpin").val();
//alert('hold is'+hold+' and cont_num is '+cont_num+'');
p_validate(5,'',''+p_pin+'',''+cont_num+'',''+p_barcode+'','GET',''+hold+'','');
});
//case 5 - check login with indicator for hold or no hold (-> to putonhold or prepgetholds)
function checklogin(code,reqstring,thedate,hold,p_cn){
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
//alert(valid_pat);
if(valid_pat==true){
	if(hold=='true'){
	putonhold(res_pat_id, pat_barcode,p_cn);
	$('#cn_holdreq').val("");
	}else{
	prep_getholds(pat_barcode);
	}
	$('#patron_bc').val(pat_barcode);
} else{
alert('Login information not valid. Please try again');
}
//end ajax
}).fail(function() {
	alert ('Your login failed. Please try again');
});
//end checklogin
}

//case 6 - function putonhold (get encryption)
function putonhold(res_pat_id,pat_barcode,p_cn){
//alert('putonhold: this is'+res_pat_id+'and'+pat_barcode+'and'+p_cn+'');
p_validate(6,'','',''+p_cn+'',''+pat_barcode+'','POST','',''+res_pat_id+'');
};
//case 6 - function createhold & -> 8 prep getholds
function createhold(res_pat_id,cont_num,code,reqstring,thedate,pat_barcode){
//alert('begin createhold for'+res_pat_id+'');
//alert(cont_num);
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
  "data": '{"PatronID":"'+res_pat_id+'","BibID":"'+cont_num+'","ItemBarcode":"","VolumeNumber":"","Designation":"","PickupOrgID":"13","IsBorrowByMail":0,"PatronNotes":"","ActivationDate":"\/Date(2015-08-18T00:00:00.00)\/","Answer":"","RequestID":"","WorkstationID":1,"UserID":1,"RequestingOrgID":13,"TargetGUID":""}',
}

$.ajax(settings).done(function (response) {
//alert('your ajax request has been processed');
//clean the control number from the request
//$('#cn_holdreq').val()='';
prep_getholds (pat_barcode);
  console.log(response);
});
}

//case 7 - Cancel Hold - take hold id, validate patron and -> cancelhold
$(document).on('click', '.hold_cancel a', function () {
hold_id=$(this).attr("id");	
});
//modal dialog
$("#cancel_hold_conf").on('click', function(){
p_barcode=$("#patron_bc").val();
p_pin=$("#libpin").val();
$( "#loginresponse" ).empty();
p_validate(7,'',''+p_pin+'','',''+p_barcode+'','PUT','',''+hold_id+'');
});
//case 7 - cancelhold and -> prep_getholds
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
//if error code =0
if(cancel_confirm==0){
var pwd=$('#libpin').val();
var pat_barcode=$("#patron_bc").val();
p_validate(8,'',''+pwd+'','',''+pat_barcode+'','GET','','');
//prep_getholds(res_pat_id, cont_num, pat_barcode);
}else{
alert('your hold cancel request failed');
}
//end ajax
});
//end cancelhold
}

//case 8 - prep_getholds and -> 8 getholds or 9 items out all
function prep_getholds(pat_barcode){
	//searchitem1=pat_barcode;
	var pwd=$('#libpin').val();
p_validate(8,'',''+pwd+'','',''+pat_barcode+'','GET','','');
p_validate(9,'',''+pwd+'','',''+pat_barcode+'','GET','','');
};
//case 8 getholds (list)
function getholds(reqstring,thedate,code){	
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
var hold_selection= ['Title', 'Author', 'StatusDescription', 'FormatDescription'];

$( "#loginresponse" ).empty();
//alert('loginresponse should be empty now');
$.each(response.PatronHoldRequestsGetRows, function(key, value) {

if(value.StatusDescription!="Cancelled"){

media=value.FormatID;
switch(media){
	case 35: my_holds +='<table class="bibtbl"><tr><td class="picbox"><img src="img/cd_icon.png" /></td ><td class="txtbox">'; break;
	case 40: my_holds +='<table class="bibtbl"><tr><td class="picbox"><img src="img/blueray_icon.png" /></td ><td class="txtbox">'; break;
	case 33: my_holds +='<table class="bibtbl"><tr><td class="picbox"><img src="img/dvd_icon.png" /></td ><td class="txtbox">'; break;
	default: my_holds +='<table class="bibtbl"><tr><td class="picbox"><img src="img/book_icon.png" /></td ><td class="txtbox">'; break;
}													

			$.each(value, function(key2, value2) {
								   
				if(key2=="HoldRequestID"){
				hold_req_id=value2;
				}				   
								   
				if(value2!=''){
				if(jQuery.inArray( key2, hold_selection )!== -1){
				
				switch(key2){
				case "StatusDescription":
				key2="Status";
				break;
				case "FormatDescription":
				key2="Media Type";
				break;
				}

					if(key2=="Title"){
					my_holds += "<strong>" + key2 + ": " + value2 + "</strong><br>";
					}else{
					my_holds += key2 + ": " + value2 + "<br>";
					}

				}
				}
		});

my_holds +="<p class='hold_cancel'><a id=" + hold_req_id + " href='#popupDialog_cancelhold' data-rel='popup' data-position-to='window' data-transition='pop' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-icon-delete ui-btn-icon-left ui-btn-b'>Cancel Hold...</a></p>";

my_holds +="</td></tr></table>";
}//end screen out cancelled
});
								
$( "#loginresponse" ).append(my_holds);

});//end ajax 
};//end getholds function
//case 9 - items out all (list)
function items_out_all(reqstring,thedate,code){	
//alert('begin items out all');
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

var my_outs='';
var out_selection= ['FormatDescription', 'Title', 'Author', 'CheckOutDate', 'DueDate', 'RenewalCount'];

$( "#borrowed" ).empty();

$.each(response.PatronItemsOutGetRows, function(key, value) {

media=value.FormatID;
ISBN=value.ISBN;
RENCT=value.RenewalCount;
RENLIM=value.RenewalLimit;
var RENPOS=RENLIM-RENCT;
bib_id=value.BibID;
var hold_ind=false;
///////////////////////////////////////////////////////////

var reqstring=""+dest+"/REST/public/v1/1033/100/13/bib/"+bib_id+"";
var thedate=(new Date()).toUTCString();

p_method="GET";
p_pwd ='';

$.ajax({
        type       : "POST",
		url: "http://www.jeffersonlibrary.net/INTERMED_short.php",
        async: false,
		crossDomain: true,
        data: {"uri": ""+reqstring+"", "rdate": ""+thedate+"", "method":""+p_method+"", "patron_pin":""+p_pwd+""},
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
			var code=response;
			p_response={"code": ""+code+"", "reqstring": ""+reqstring+"", "thedate": ""+thedate+""};
			//alert('ready to send to filter holds');
			filter_holds(p_response.code,p_response.reqstring,p_response.thedate, bib_id);
        },
        error      : function() {
            console.error("error");
            alert('Not working1!');                  
        }
});

function filter_holds (code,reqstring,thedate,bibID){
//alert('begin filter_holds');
var settings = {
  "async": false,
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
$.each(response.BibGetRows, function(key, value) {
if(value.ElementID=='8'){
$.each(value, function(key2, value2) {
if(key2=='Value'){
var holds=value2;
if(holds>0){hold_ind=true;}else{hold_ind=false;}
};
});
};
});
});
};
/////////////////////////////////////////////////////////
//alert('we move on with'+bib_id+' is:'+hold_ind+'');
switch(media){
	case 35: my_outs +='<table class="bibtbl"><tr><td class="picbox"><img src="img/cd_icon.png" /></td ><td class="txtbox">'; break;
	case 40: my_outs +='<table class="bibtbl"><tr><td class="picbox"><img src="img/blueray_icon.png" /></td ><td class="txtbox">';hold_ind=true; break;
	case 33: my_outs +='<table class="bibtbl"><tr><td class="picbox"><img src="img/dvd_icon.png" /></td ><td class="txtbox">'; hold_ind=true; break;
	default: if(ISBN==''){
		my_outs +='<table class="bibtbl"><tr><td class="picbox"><img src="img/Jacket.jpg" /></td ><td class="txtbox">';
	} else{
	my_outs +='<table class="bibtbl"><tr><td class="picbox"><img src="http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?Return=T&Type=S&Value='+ISBN+'&userID=MAIN37789&password=CC10073" /></td ><td class="txtbox">';};
}										
			$.each(value, function(key2, value2) {
				if(key2=="ItemID"){
				out_req_id=value2;
				}
				if(key2=="RenewalCount"){
					if(hold_ind==true){value2='not renewable';}
					if(RENPOS<=0){value2='not renewable';hold_ind=true;}
					else{value2=""+value2+"";}
				}
				
				//my_outs += "<strong>" + key2 + ": " + value2 + "</strong><br>";
				
				if(value2!=''){
				if(jQuery.inArray( key2, out_selection )!== -1){
				
				switch(key2){
				case "RenewalCount":
				key2="Renewals Count";
				break;
				case "DueDate":
				var DDate= new Date( parseFloat(value2.substr(6 )));
				value2=DDate.toDateString();
				key2="Due Date";
				break;
				case "CheckOutDate":
				var CODate= new Date( parseFloat(value2.substr(6 )));
				value2=CODate.toDateString();
				key2="Check Out Date";
				break;
				}	
					
				if(key2=="Title"){
				my_outs += "<strong>" + key2 + ": " + value2 + "</strong><br>";
				}else{
				my_outs += key2 + ": " + value2 + "<br>";
				}

								
				}
				}
								   
			});
if(hold_ind==false){
my_outs +="<p class='out_extend'><a id=" + out_req_id + " href='#popupDialog_extend' data-rel='popup' data-position-to='window' data-transition='pop' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-icon-carat-r ui-btn-icon-left ui-btn-b'>Renew Item...</a></p>";
}
			
my_outs +="</td></tr></table>";
//}//end screen out cancelled
});
								
$( "#borrowed" ).append(my_outs);

});//end ajax 
};//end items_out_all function

//case 11 - extend (encrypt) - take: out_extend id, p_bc, p_pin
$(document).on('click', '.out_extend a', function () {
extend_id=$(this).attr("id");
});
//modal dialog
$("#extend_out_conf").on('click', function(){
p_barcode=$("#patron_bc").val();
p_pin=$("#libpin").val();
//alert('ready to extend'+extend_id+'');
$("#borrowed" ).empty();
//alert('this is ppin:'+p_pin+' - pbarcode:'+p_barcode+' - extendid:'+extend_id+'');
p_validate(11,'',''+p_pin+'','',''+p_barcode+'','PUT','',''+extend_id+'');
});
//case 11 - extend (ajax & go to prep_getholds)
function item_renew(reqstring,thedate,code,pat_barcode){
//alert('start item renew for '+pat_barcode+'');
var settings = {
  "async": true,
  "crossDomain": true,
  "url": ""+reqstring+"",
  "method": "PUT",
  "headers": {
    "polarisdate": ""+thedate+"",
    "authorization": ""+code+"",
    "content-type": "application/json"
  },
  "processData": false,
  "data": '{"Action": "renew","LogonBranchID": "13","LogonUserID": "1","LogonWorkstationID": "1","RenewData": { "IgnoreOverrideErrors": "true" }}'
}

$.ajax(settings).done(function (response) {
pwd=$('#libpin').val();
//alert('your request has been processed for '+pat_barcode+' at '+pwd+'');
//what if it can't be extended? Feedback needs to be here...
//prep_getholds (pat_barcode);
  //console.log(response);
  p_validate(9,'',''+pwd+'','',''+pat_barcode+'','GET','','');
});
}

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
