//device detection
$(window).load(function() {
var deviceType = (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : 'NULL';
//alert(deviceType);
//alert('hello world');
if(deviceType!='NULL'){
	$('.ui-btn').css({'margin-top':'1px', 'margin-bottom': '1px'}); 
}
});

//testquery
//run a blind query
$(window).load(function() {
$.ajax({
        type       : "POST",
        url: "http://www.jeffersonlibrary.net/INTERMED.php?rq=2",
        crossDomain: true,
        data: {val: 'X'},
		//dataType   : 'json',
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
			//alert('hello');
		//$( "#blist" ).append(response);
        },
        error      : function() {
            console.error("error");
            alert('Not working!');                  
        }
    });     
});

//google map
$(window).load(function(){
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
});

$(document).ready(function(){
//navigator
$('#dir_start').on ("tap", function () {
start_spin();									   
launchnavigator.navigate(
  [41.0204913,-74.5491630],
  null,
  function(){
     stop_spin(); //alert("Plugin success");
  },
  function(error){
      alert("Directions can not be generated."+ error);
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
			var selection= ['Title', 'Author', 'PublicationDate', 'LocalItemsIn', 'CurrentHoldRequests'];
			$( "#blist" ).empty();

			var myhtml='';
				$.each(response.BibSearchRows, function(key, value) {
					cont_no=value.ControlNumber;
					ISBN=value.ISBN;
					//$( "#blist" ).append('');
					//$( "#blist" ).append('<img src="http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?Return=T&Type=S&Value='+ISBN+'&userID=MAIN37789&password=CC10073" /><br />');
					myhtml +='<table class="bibtbl"><tr><td class="picbox"><img src="http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?Return=T&Type=S&Value='+ISBN+'&userID=MAIN37789&password=CC10073" /></td ><td class="txtbox">';
				$.each(value, function(key2, value2) {
					if(value2!=''){
					if(jQuery.inArray( key2, selection )!== -1){
					myhtml += key2 + ": " + value2 + "<br>";
					}
					}
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
			var selection= ['Title', 'Author', 'PublicationDate', 'LocalItemsIn', 'CurrentHoldRequests', 'Summary'];
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
					if(value2!=''){
					if(jQuery.inArray( key2, selection )!== -1){
					mybib_detail += key2 + ": " + value2 + "<br>";
					}
					}
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
			var hold_selection= ['Title', 'Author', 'StatusDescription', 'HoldRequestID'];
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