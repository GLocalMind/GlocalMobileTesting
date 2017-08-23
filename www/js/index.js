
var connectionType;
var appName='GLocalPanel';
var testingInBrowser = false;// For Testing
var onlinerewardsInBrowserStatus = false;
var loginUserId;
var dataIsFromServer = 0;
var selectionType = '';
var secondarySpecialityToChange = false;
var stateToChange = false;

//For Testing in Browser Document Ready
/*
$(function() {
	
	$("#loginForm").on("submit",handleLogin);
	$("#updateUserDetailsPageForm").on("submit",updateUserDetails);
	$("#registrationPageForm").on("submit",sendRegisteredData);
	$("#changePasswordPageForm").on("submit",changePasswordFn);
	$("#forgotPasswordPageForm").on("submit",forgotPasswordFn);
	$("#surveyLinkPageForm").on("submit",sendSurveyLinkFn);
	$('#unsubscribePageForm').on("submit",unsubscribeConfirmData);
	$('#contactUsForm').on("submit",sendContactUsDataFn);
	homePageDataFromServer('1');
	getUserDataFromServer();
	priSpeltyListFromServer(1);
	countryListFromServer(1);
	if(testingInBrowser){
		$("#username").val('testingsurvey02@gmail.com');
		$("#password").val('admin');
	}
});
*/
$( document ).on( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
	 $.support.cors = true;
     $.mobile.allowCrossDomainPages = true;
     
     jQuery.mobile.phonegapNavigationEnabled = true;
     jQuery.mobile.defaultDialogTransition = "pop";
     jQuery.mobile.defaultPageTransition = "none";
      
     jQuery.mobile.loader.prototype.options.text = "loading";
     jQuery.mobile.loader.prototype.options.textVisible = true;
     jQuery.mobile.loader.prototype.options.theme = "a";
     
     $.mobile.toolbar.prototype.options.updatePagePadding = false;
     $.mobile.toolbar.prototype.options.hideDuringFocus = "";
     $.mobile.toolbar.prototype.options.tapToggle = false;
     
     // We want popups to cover the page behind them with a dark background
     //$.mobile.popup.prototype.options.overlayTheme = "b";
     
     if ( device.platform === "iOS" ) {
    	 $.mobile.hashListeningEnabled=false;
     }
     if(device.platform === "iOS" && parseInt(device.version) === 9){
         $.mobile.hashListeningEnabled = false;
     }
});

var ajaxCallGet = "GET";
var ajaxCallPost = "POST";
var ajaxCallUnset = "GET";
var dynPanelCount = 1,
dynPanelBtnCount = 1;
var noDataFoundMsg = "No data found.";
//$(document).one('pagebeforecreate', function () {});

$(document).on("pageinit", function () {
	
	$('.input-label-focus .form-control').focusin(function(){
		$(this).parents('.form-group ').find('.control-label').addClass('label-up');
	});
	$('.input-label-focus .form-control').focusout(function(){ 
		if($(this).val()==''){ 
		$(this).parents('.form-group').find('label.control-label').removeClass('label-up')
		}
	});
	
});

$( document ).on( "pagecreate", "#login-page", function() {
	$('#loginForm').validate({
 	    rules: {
 	    	username: {
 	            required: true,
 	            email: true
 	        },
 	        password: {
 	            required: true,
 	            minlength:5
 	        },
 	    },
 	    errorPlacement: function (error, element) {
 	        error.appendTo(element.parent().next());
 	    },
 	    submitHandler: function (form) {
 	        $(':mobile-pagecontainer').pagecontainer('change', '#success', {
 	            reload: false
 	        });
 	        return false;
 	    }
 	});
});

$( document ).on( "pagecreate", "#forgotPassword", function() {
	$('#forgotPasswordPageForm').validate({
 	    rules: {
 	    	forgotEmailIdInput: {
 	            required: true,
 	           maxlength: 200,
 	            email: true
 	        }
 	    },
 	    errorPlacement: function (error, element) {
 	        error.appendTo(element.parent().next());
 	    },
 	    submitHandler: function (form) {
 	        $(':mobile-pagecontainer').pagecontainer('change', '#success', {
 	            reload: false
 	        });
 	        return false;
 	    }
 	});
});

$( document ).on( "pagecreate", "#registrationPage", function() {
	$('#registrationPageForm').validate({
 	    rules: {
 	    	firstNameInput: {
 	            required: true,
 	            minlength:3,
 	            maxlength: 100
 	        },
 	        lastNameInput: {
 	            required: true,
 	            maxlength: 45
 	        },
 	        middleNameInput: {
 	        	maxlength: 45
 	        },
 	        primaryNumberInput: {
	            digits: true,
	            maxlength: 45
	        },
	        emailIdInput: {
	        	required: true,
 	            email: true,
 	            maxlength: 200
 	        },
 	        primarySpecialityInput: {
	            required: true,
	        },
	        secondarySpecialityInput: {
 	            required: true,
 	        },
 	        countryInput: {
	            required: true,
	        },
 	    },messages: {
			primarySpecialityInput: {
				required: "Please select Primary Speciality",
			},
			lstAnswer: {
				required: "Please select Yes",
			}        
		},
 	    errorPlacement: function (error, element) {
 	        error.appendTo(element.parent().next());
 	    },
 	    submitHandler: function (form) {
 	        $(':mobile-pagecontainer').pagecontainer('change', '#success', {
 	            reload: false
 	        });
 	        return false;
 	    }
 	});
});

$( document ).on( "pagecreate", "#updateUserPage", function() {
	$('#updateUserDetailsPageForm').validate({
 	    rules: {
 	    	firstNameInput: {
 	            required: true,
 	            maxlength: 100
 	        },
 	        lastNameInput: {
 	           /* required: true,*/
 	            maxlength: 45
 	        },
 	        middleNameInput: {
	        	maxlength: 45
	        },
 	        primaryNumberInput: {
	            digits: true,
	            maxlength: 45
	        },
	        emailIdInput: {
 	            email: true,
 	            maxlength: 200
 	        },
 	        primarySpecialityInput: {
	            required: true,
	        },
	        secondarySpecialityInput: {
 	            required: true,
 	        },
 	        countryInput: {
	            required: true,
	        },
 	    },
 	    errorPlacement: function (error, element) {
 	        error.appendTo(element.parent().next());
 	    },
 	    submitHandler: function (form) {
 	        $(':mobile-pagecontainer').pagecontainer('change', '#success', {
 	            reload: false
 	        });
 	        return false;
 	    }
 	});
});

$( document ).on( "pagecreate", "#changePassword", function() {
	$('#changePasswordPageForm').validate({
 	    rules: {
 	    	oldPasswordInput: {
 	            required: true,
 	            minlength:5,
 	            maxlength: 45
 	        },
 	        newPasswordInput: {
 	            required: true,
 	            minlength:5,
	            maxlength: 45
 	        },
 	       confirmPasswordInput: {
 	    	   	required: true,
 	    	   	minlength:5,
	            maxlength: 45,
	            equalTo : "#newPasswordInput"
	        },
 	    },
 	    errorPlacement: function (error, element) {
 	        error.appendTo(element.parent().next());
 	    },
 	    submitHandler: function (form) {
 	        $(':mobile-pagecontainer').pagecontainer('change', '#success', {
 	            reload: false
 	        });
 	        return false;
 	    }
 	});
});	

$( document ).on( "pagecreate", "#contactUsPage", function() {
	$('#contactUsForm').validate({
 	    rules: {
 	    	fullNameInput: {
 	            required: true,
	            maxlength: 100,
 	        },
 	       emailIdInput: {
	            required: true,
	            maxlength: 200,
	            email:true
	        },
	        telephoneNumberInput: {
	            required: true,
	            maxlength: 45,
	            digits:true
	        },
	        countryInput:{
	        	required: true,
	            maxlength: 45,
	        },
	        emailBodyInput:{
	        	required: true,
	            maxlength: 500,
	        }
 	    },
 	    errorPlacement: function (error, element) {
 	        error.appendTo(element.parent().next());
 	    },
 	    submitHandler: function (form) {
 	        $(':mobile-pagecontainer').pagecontainer('change', '#success', {
 	            reload: false
 	        });
 	        return false;
 	    }
 	});
});	

$( document ).on( "pagecreate", "#unsubscribePage", function() {
	$('#unsubscribePageForm').validate({
 	    rules: {
 	    	unSubscribeComment: {
	            maxlength: 500
 	        },
 	    },
 	    errorPlacement: function (error, element) {
 	        error.appendTo(element.parent().next());
 	    },
 	    submitHandler: function (form) {
 	        $(':mobile-pagecontainer').pagecontainer('change', '#success', {
 	            reload: false
 	        });
 	        return false;
 	    }
 	});
});	

$( document ).on( "pagecreate", "#surveyLinkPage", function() {
	$('#surveyLinkPageForm').validate({
 	    rules: {
 	    	surveyNewEmailIdInput: {
 	            required: true,
	            maxlength: 200,
 	            email:true
 	        },
 	    },
 	    errorPlacement: function (error, element) {
 	        error.appendTo(element.parent().next());
 	    },
 	    submitHandler: function (form) {
 	        $(':mobile-pagecontainer').pagecontainer('change', '#success', {
 	            reload: false
 	        });
 	        return false;
 	    }
 	});
});

$.validator.setDefaults({
    debug: true,
    ignore: [],
    submitHandler: function() { },
    showErrors: function(map, list) {
        $(this.currentElements).each(function() {
            if(this.nodeName == "SELECT") {
				var inputText = $(this).attr('id');
				$(this).parent('.ui-select').find('.validation-place').html('');
				$(this).closest('.ui-select').next('.validation-place').html('');
                return true;
            }
            
            if(this.nodeName == "INPUT") {
				var inputText = $(this).attr('id');
				//alert(inputText);
				$(this).parent('.input-group.box').find('.validation-place').html('');
				$(this).closest('.ui-input-text').next('.validation-place').html('');
				//$('#'+inputText).parent('.input-group.box').find('.validation-place').html('<label id="'+inputText+'" class="error" for="'+inputText+'">This field is required.</label>');
                return true;
            }
            if(this.nodeName == "TEXTAREA") {
				var inputText = $(this).attr('id');
				//alert(inputText);
				$(this).parent('.input-group.box').find('.validation-place').html('');
				$(this).closest('.ui-input-text').next('.validation-place').html('');
				//$('#'+inputText).parent('.input-group.box').find('.validation-place').html('<label id="'+inputText+'" class="error" for="'+inputText+'">This field is required.</label>');
                return true;
            }
            
            //$(this).parent('.input-group.box').find('.validation-place').html('');
			//$(this).closest('.ui-input-text').next('.validation-place').html('');
        });
        
        $.each(list, function(index, error) {
            if(error.element.nodeName == "SELECT") {
				var inputText = $(error.element).attr('id');
				$(error.element).closest('.ui-select').next('.validation-place').html('<label id="'+inputText+'" class="error" for="'+inputText+'">'+error.message+'</label>');;
                return true;
            }
            
            if(error.element.nodeName == "INPUT") {
				var inputText = $(error.element).attr('id');
				//alert(inputText);
				//alert(inputText+"id" + " --- " +error.msg+" ===" + error.message);
				$(error.element).closest('.ui-input-text').next('.validation-place').html('<label id="'+inputText+'" class="error" for="'+inputText+'">'+error.message+'</label>');;
                return true;
            }
           // alert(error.element.nodeName);
            if(error.element.nodeName == "TEXTAREA") {
				var inputText = $(error.element).attr('id');
				//alert(inputText);
				//alert(inputText);
				//alert(inputText+"id" + " --- " +error.msg+" ===" + error.message);
				$(error.element).closest('.ui-input-text').next('.validation-place').html('<label id="'+inputText+'" class="error" for="'+inputText+'">'+error.message+'</label>');;
                return true;
            }
            
            //$(error.element).attr("title", error.message).addClass("invalidInput");
        });
    }
});


$(document).delegate('.tester', 'click', function () {
	// $(document).on('click', 'a[href^="http"]', function (e) {
	
	$(".form-group.input-label-anim .form-control").focusin(function(){
		$(this).parents('.form-group').find('label').addClass('label-up');
	});
	$(".form-group.input-label-anim .form-control").focusout(function(){ 
		$(this).parents('.form-group').find('label').removeClass('label-up')
		
	});
		 
		if (device.platform.toUpperCase() === 'ANDROID') {
	            var url = $(this).attr('href');
	            navigator.app.loadUrl(url, { openExternal: true });
	            e.preventDefault();
	    }
	    else if (device.platform == 'iOS' || device.platform.toUpperCase() === 'IOS') {
	    	   //alert('Hi........ ');
	           var url = 'http://www.google.co.in/';//$(thiss).attr('href');
	           window.open(url, '_system');
	           e.preventDefault();
	    }
	    else {
	        // Leave standard behaviour
	    }
	// });
});

/*

$( document ).on( "pagecreate", "#demo-page", function() {
	$( document ).on( "popupafterclose", function() {
        logout();
    });
});

$(document).on("pagecreate", function() {
	
});

	
	//this can be run in the global scope
	$(document).on('click.register', '.registerSubmitter', function(e) {
	    // do something
	});
	
	$("#popupVideo").on({
		popupafterclose: function() {
			
		},
	});
});
*/

var appUrl = 'http://122.166.219.146:8031/StavyahSurvey/mobileApp/appEntry.do'; // Local Test System GlocalMind
// var appUrl = 'http://192.168.1.12:9090/StavyahSurvey/mobileApp/appEntry.do'; // Local Test System
//var appUrl = 'http://106.51.71.198:8031/StavyahSurvey/mobileApp/appEntry.do'; // GlocalPanel Test System
// var appUrl = 'http://www.glocalpanel.com/mobileApp/appEntry.do'; // GlocalPanel Live
var appRequiresWiFi='This action requires internet.';
var serverBusyMsg='Server is busy, please try again later.';
var mData={};
var db= null;
var pushNotification;
var loginData={};
var onloadType = false;
var pushNotify;
var devicePlatform;

var app = {
    SOME_CONSTANTS : false,  // some constant
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.initFastClick();
    },
	
    // Bind Event Listeners Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    initFastClick : function() {
        window.addEventListener('load', function() {
            FastClick.attach(document.body);
        }, false);
    },
    // Phonegap is now ready...
    onDeviceReady: function() {
		$("#loginForm").on("submit",handleLogin);
		$("#updateUserDetailsPageForm").on("submit",updateUserDetails);
		$("#registrationPageForm").on("submit",sendRegisteredData);
		$("#changePasswordPageForm").on("submit",changePasswordFn);
		$("#forgotPasswordPageForm").on("submit",forgotPasswordFn);
		$("#surveyLinkPageForm").on("submit",sendSurveyLinkFn);
		$('#unsubscribePageForm').on("submit",unsubscribeConfirmData);
		$('#contactUsForm').on("submit",sendContactUsDataFn);
    	/*$("#commonPopup").enhanceWithin().popup();
    	$("#commonLogoutPopup").enhanceWithin().popup();
    	$("#loginForm").on("submit",handleLogin);
    	$('#commonPopup').hide();
    	$('#commonLogoutPopup').hide();
    	$('#messagePopup').enhanceWithin().popup();
    	$('#messagePopup').hide();
    	$('#unsubscribePopup').enhanceWithin().popup();
    	$('#unsubscribePopup').hide();*/
    	/*if (navigator.notification) { // Override default HTML alert with native dialog
    		window.alert = function (message) {
    			navigator.notification.alert(
    					message,    // message
    					null,       // callback
    					appName, // title
    					'OK'        // buttonName
    			);
    		};
    	}*/
    	
    	$('.versionId').text('v'+AppVersion.version);
    	// backbutton EventListener
        document.addEventListener("backbutton", onBackKeyDown, false);
        // devicePlatform
        devicePlatform = device.platform;
        window.localStorage["devicePlatform"] = device.platform;
        // device uuid
        //console.log(device.uuid);
        
        if(window.localStorage["gcmregistrationId"] === undefined ) {
			window.localStorage["gcmregistrationId"] = "";
		}
		try{
			
			/*pushNotify = window.plugins.pushNotification;
			if ( device.platform == 'Android' ){
				pushNotify.register(
			    successHandler,
			    errorHandler,
			    {
			        "senderID":"987771662647",
			        "ecb":"onNotification"
			    });
			} else if(device.platform == 'iOS'){
				pushNotify.register(
			    tokenHandler,
			    errorHandler,
			    {
			        "badge":"true",
			        "sound":"true",
			        "alert":"true",
			        "ecb":"onNotificationAPN"
			    });
			}*/
			
			var push = PushNotification.init({
			    android: {
			        senderID: "987771662647",
			    },
			    browser: {
			        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
			    },
			    ios: {
			        senderID: "987771662647",
			        gcmSandbox: true,
			        alert: "true", 
			        badge: "true", 
			        sound: "false"
			    },
			    /*ios: {
			        alert: "true",
			        badge: "true",
			        sound: "true",
			    },*/
			    windows: {}
			});

			push.on('registration', function(data) {
			    alert('data.registrationId : '+data.registrationId);
			    window.localStorage["gcmregistrationId"] = data.registrationId;
			});

			push.on('notification', function(data) {
				//alert('data.message : '+data.message);
				//$('#messagePopup').show();
				//$("#messagePopup").popup("open");
				//$('.messagePopup').text(data.message);
				//alert('e.payload.msgcnt : '+e.payload.msgcnt);
				  $("#features_list_detailed").append('<li>Title -> MSG: ' + data.title + '</li>');
				  //Only works for GCM 
				  $("#features_list_detailed").append('<li>MESSAGE -> MSG: ' + data.message + '</li>');
				  
				  $("#features_list_detailed").append('<li>MESSAGE -> MSG: ' + data.image + '</li>');
				  //Only works on Amazon Fire OS 
				  //$status.append('<li>MESSAGE -> TIME: ' +  + '</li>');
			    // data.message,
			    // data.title,
			    // data.count,
			    // data.sound,
			    // data.image,
			    // data.additionalData
			});

			push.on('error', function(e) {
			    // e.message
			});
		}
		catch(err){
			var txt="There was an error on this page.\n\n"; 
			txt+="Error description: " + err.message + "\n\n"; 
			console.log(err);
			console.log(txt); 
		}
		
        if(window.localStorage["user_logged_in"] === undefined ) {
        	window.localStorage["user_logged_in"] = "";
        }
        
        if(window.localStorage["user_logged_in"] == '') {
        }
        else if(window.localStorage["user_logged_in"] == 1) {
        	checkPreAuth();
        }	
        
		//app.setupPush();
        //initPushService();
        handleExternalURLs();
    },
    setupPush: function() {
        console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                "senderID": "987771662647"
            },
            ios: {
		        senderID: "987771662647",
		        gcmSandbox: true,
		        alert: "true", 
		        badge: "true", 
		        sound: "false",
		        vibration: "true"
		    },
            /*"ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },*/
            "windows": {}
        });
        console.log('after init');

        push.on('registration', function(data) {
            console.log('registration event: ' + data.registrationId);

            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }

            var parentElement = document.getElementById('registration');
            var listeningElement = parentElement.querySelector('.waiting');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
        });

        push.on('error', function(e) {
            console.log("push error = " + e.message);
        });

        push.on('notification', function(data) {
            console.log('notification event');
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
            );
       });
    }
    
};

function initPushService(){
	//pushNotification = window.plugins.pushNotification;
	var push = PushNotification.init({ 
	            "android": {"senderID": "987771662647"},
	            "ios": {
			        senderID: "987771662647",
			        gcmSandbox: true,
			        alert: "true", 
			        badge: "true", 
			        sound: "false",
			        vibration: "true"
			    }, 
	            "windows": {} 
	        });

	push.on('registration', function(response) {
		
		 // data.registrationId
		//alert('data.registrationId : '+response.registrationId);
		console.log(response.registrationId + " -- data.registrationId");
		
	    //registerPushAtServer(response);
	});

	push.on('notification', function(data) {
	    //handlePushNotification(data)
	});

	push.on('error', function(e) {
	    // e.message
	    console.log("Push Error: " + e);
	    alert("Push Error: " + e);
	});

	}

function fail() {
    console.log("failed to get filesystem");
}

// cordova-plugin-push-notification
// Kishore 3rd part Code
function onNotification(e) {
	  $("#features_list_detailed").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');
	  console.log('e.event : ' + e.event);
	  //alert('e.event : ' + e.event);
	  switch( e.event ){
	  case 'registered':
		  if ( e.regid.length > 0 )
		  {
			  $("#features_list_detailed").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
			  // Your GCM push server needs to know the regID before it can push to this device 
			  // here is where you might want to send it the regID for later use. 
			  //alert("regID = " + e.regid);
			  window.localStorage["gcmregistrationId"] = e.regid;
			  console.log('e.regid : ' + e.regid);
			  // loginData.gcmregdid = window.localStorage["gcmregistrationId"];
		  }
		  break;

	  case 'message':
		  // if this flag is set, this notification happened while we were in the foreground. 
		  // you might want to play a sound to get the user's attention, throw up a dialog, etc. 
		  if ( e.foreground )
		  {
			  $("#features_list_detailed").append('<li>--INLINE NOTIFICATION--' + '</li>');

			  // on Android soundname is outside the payload. 
			  // On Amazon FireOS all custom attributes are contained within payload 
			  //var soundfile = e.soundname || e.payload.sound;
			  // if the notification contains a soundname, play it. 
			  //var my_media = new Media("/android_asset/www/"+ soundfile);
			  //my_media.play();
		  }
		  else {  // otherwise we were launched because the user touched a notification in the notification tray. 
			  if ( e.coldstart ) {
				  $("#features_list_detailed").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
			  }
			  else {
				  $("#features_list_detailed").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
			  }
		  }
		  alert('Notification: '+e.payload.message);
		  //alert('e.payload.msgcnt : '+e.payload.msgcnt);
		  $("#features_list_detailed").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
		  //Only works for GCM 
		  $("#features_list_detailed").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
		  //Only works on Amazon Fire OS 
		  $status.append('<li>MESSAGE -> TIME: ' + e.payload.timeStamp + '</li>');
		  break;

	  case 'error':
		  $("#features_list_detailed").append('<li>ERROR -> MSG:' + e.msg + '</li>');
		  break;

	  default:
		  $("#features_list_detailed").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
	  break;
	  }
}

//iOS
function onNotificationAPN (event) {
	alert(event.alert);
	//alert("regID = " + event.regid);
  if ( event.alert )
  {
    navigator.notification.alert(event.alert);
  }
  if ( event.sound )
  {
    var snd = new Media(event.sound);
    snd.play();
  }
  if ( event.badge )
  {
    pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
  }
}

function tokenHandler (result) {
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
    alert('device token = ' + result);
}

//handle GCM notifications for Android
/*
function onNotification(e) {
	console.log(e.event);
	alert(e.event);
    switch( e.event ){
        case 'registered':
			if ( e.regid.length > 0 ){
				// Your GCM push server needs to know the regID before it can push to this device
				// here is where you might want to send it the regID for later use.
				console.log("regID = " + e.regid);
				alert("regID = " + e.regid);
				window.localStorage["gcmregistrationId"] = e.regid;
			}
        break;
        
        case 'message':
        	// if this flag is set, this notification happened while we were in the foreground.
        	// you might want to play a sound to get the user's attention, throw up a dialog, etc.
        	if (e.foreground){
        		console.log("INLINE NOTIFICATION");
			    // on Android soundname is outside the payload. 
			}
			else{	
				// otherwise we were launched because the user touched a notification in the notification tray.
				if (e.coldstart){
					//console.log("COLDSTART NOTIFICATION");
				}
				else{
					//console.log("BACKGROUND NOTIFICATION");
				}
			}
        	var dataNotifyObj = '<li>'+
									'<div class="main-content">'+
										'<div class="feat_small_icon">'+
											'<i class="fa fa-bell-o"></i>'+
										'</div>'+
										'<div class="feat_small_details">'+
											'<h5> '+ e.payload.message +' </h5>'+
											'<a href="#" class="ui-link"> '+getTodayDate();+' </a>'+
										'</div>'+
									'</div>'+	
								'</li>';
			
			console.log(e.payload.message+"---"+e.payload.msgcnt);
            //android only
        	break;
        
        case 'error':
			 console.log(e.msg);
			 alert(e.msg);
			 break;
        
        default:
		 	console.log(" Unknown, an event was received and we do not know what it is");
        	alert(" Unknown, an event was received and we do not know what it is");
        	break;
    }
}
*/

function successHandler (result) {
    console.log(result);
    //alert(result);
}

function errorHandler (error) {
    console.log(error);
    //alert(error);
    console.log(error.message);
    console.log(error.code);
}

function showModal(){
  $('body').append("<div class='ui-loader-background'> </div>");
  $.mobile.loading( "show" );
}

function hideModal(){
	 $(".ui-loader-background").remove();
	 $.mobile.loading( "hide" );
}

function onBackKeyDown() {
	$(".setting-popup").hide();
	$("#submitButton").prop("disabled",false);
	if($.mobile.activePage.is('#login-page')){
        showExitDialog();
    }
	else if($.mobile.activePage.is('#dashboardPage')){
       showExitDialog();
   }
	else{
		window.history.back();
   }
}

function checkConnection() {
	
	if(testingInBrowser){
		connectionType="WiFi connection";//For Testing
		return connectionType;
	}
	
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    return states[networkState];
}

function checkPreAuth() {
	connectionType=checkConnection();
	if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
		var form = $("#loginForm");
		
		if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined && window.localStorage.getItem("user_logged_in")==1) {
			if(window.localStorage["username"] != '' && window.localStorage["password"] != ''){
				if(testingInBrowser){
					window.localStorage["username"] = 'testingsurvey02@gmail.com';
					window.localStorage["password"] = 'admin';
					window.localStorage["userDetailsId"] = 362;
					window.localStorage["email"] = 'testingsurvey02@gmail.com';
					window.localStorage["name"] = 'TestingSurvey02';
					loginData.username='testingsurvey02@gmail.com';
					loginData.password='admin';
					loginData.gcmregdid = "reg";
				}
				$("#username", form).val(window.localStorage["username"]);
				$("#password", form).val(window.localStorage["password"]);
				handleLogin();
			}
			
		}
	}
	else{
		navigator.notification.alert(appRequiresWiFi, exitAppForcefully, appName,['Ok']);
	}
}

var commonLogoutPopupCountBind = 0;
var logoutCalCount = 0;
function logout() {
	
	window.localStorage["password"] = '';
	window.localStorage["user_logged_in"] = 0;
	window.localStorage["ID"] = '';
	window.localStorage["permissions"] = '';
	window.localStorage["email"] = '';
	window.localStorage["name"] = '';
	window.localStorage["userDetailsId"] = '';
	var form = $("#loginForm");
	$("#username", form).val(window.localStorage["username"]);
	$("#password", form).val('');
	//disable the button so we can't resubmit while we wait
	//form.find("#submitButton").prop("disabled",false);
	$(".setting-popup").hide();
	$.mobile.changePage('#login-page',{ transition: "slide"});
	
}

function loginFn(){
	loginUserId = $('#username').val();
	console.log(loginUserId);
	if(loginUserId == 'undefined' || loginUserId == ''){
		alert('Sorry please login with User Id');
	}else if(loginUserId != 'undefined'){
		loadDataFromServer();
	}
}

function loadDataFromServer(){
	//homePageDataFromServer('1');
}

function showExitDialog() {
    navigator.notification.confirm(
            ("Do you want to Exit?"), // message
            alertexit, // callback
            appName, // title
            ['YES','NO'] // buttonName
    );
}

//Call exit function
function alertexit(button){
    if(button=="1" || button==1){
        //device.exitApp();
        navigator.app.exitApp();
    }
}

function doLogout(data) {
	connectionType=checkConnection();
	if(connectionType=="Unknown connection" || connectionType=="No network connection"){
		navigator.notification.alert('Logout requires active internet connection', alertConfirm, appName, ['Ok']);
	}
	else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
		showLogoutDialog(data);
	}
}

function alertConfirm(buttonIndex){
	// function for alert having no actions
}

function exitAppForcefully(buttonIndex){
	//Call exit function
    if(button=="1" || button==1){
        navigator.app.exitApp();
    }
}

function showLogoutDialog(data) {
	//var menuId = $(data).data('modalid');
	//$('#'+ menuId ).popup( 'close' );
	if(testingInBrowser){
		alertlogout(1);
	}else{
		navigator.notification.confirm(
	            ("Are you sure to Logout?"), // message
	            alertlogout, // callback
	            appName, // title
	            ['YES','NO'] // buttonName
	    );
	}
}

//Call logout function
function alertlogout(button){

    if(button=="1" || button==1){
    	console.log('Logout');
    	logout();
    }
}

function alertCustomMsg(msg){
	navigator.notification.alert(msg, alertConfirm, appName, ['Ok']);	
}

function openPrivacyPolicyExternalApp(){
	var url="http://www.edit-ims.com/privacypolicy.html";
	navigator.app.loadUrl(url, { openExternal:true });
}

function isValidEmail(emailText) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailText);
};

function validatePhone(phoneText){
	var pattern = new RegExp(/^[0-9-+]+$/);
	return pattern.test(phoneText);
}

function handleLogin() {
	var form = $("#loginForm");
	//disable the button so we can't resubmit while we wait
	//form.find("#submitButton").prop("disabled",true);
	var u = $("#username", form).val();
	var p = $("#password", form).val();
	
	if(u.length > 201){
		//form.find("#submitButton").prop("disabled",false);
		$("#submitButton").prop("disabled",false);
		navigator.notification.alert('Email Id should be less than 200 Characters.',alertConfirm,appName,['Ok']);
		return;
	}
	
	if( !isValidEmail(u) ){
		//form.find("#submitButton").prop("disabled",false);
		$("#submitButton").prop("disabled",false);
		navigator.notification.alert('Please enter valid email Id.',alertConfirm,appName,['Ok']);
		return;
	}
	
	
	var mData = {};
	connectionType=checkConnection();
	if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" 
		|| connectionType=="Cell 2G connection" || connectionType=="Ethernet connection" || connectionType=="Cell generic connection"){
		secondarySpecialityToChange = false;
		stateToChange = false;
		priSpeltyListFromServer(1);
		countryListFromServer(1);
	}
	if(u != '' && p!= '') {
		
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,['Ok']);
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" 
			|| connectionType=="Cell 2G connection" || connectionType=="Ethernet connection" || connectionType=="Cell generic connection"){ 
			
			//showModal();
			//alert('Inside Connection : '+ connectionType);
			loginData.username=u;
			loginData.password=p;
			loginData.gcmregdid = window.localStorage["gcmregistrationId"];
			var gcmregId = '';
			gcmregId = window.localStorage["gcmregistrationId"];
			loginData.devicePlatform = window.localStorage["devicePlatform"];
			if(testingInBrowser){
				loginData.gcmregdid = "reg";//For Testing
				loginData.devicePlatform = "Android";
			}
			
			$.ajax({
				type : ajaxCallGet,
				url:appUrl,
				data : {"action":"login","loginData":JSON.stringify(loginData), "mData":JSON.stringify(mData) },
				success:function(data){
					var responseJson=jQuery.parseJSON(data);
					var responseMessage=responseJson["message"];
					if(responseJson.validMessageCode == "0" ){
						//var appUserData=responseJson.appUserData;
						window.localStorage["username"] = u;
						window.localStorage["password"] = p;
						window.localStorage["user_logged_in"] = 1;
											
						if (window.localStorage.getItem("permissions") === null ) {
							window.localStorage["permissions"] = '';
						}
						window.localStorage["email"] = u;
						var loginDataResponse=responseJson["actionResponse"];
						window.localStorage["name"] = loginDataResponse["name"];
						window.localStorage["userDetailsId"] = loginDataResponse["userDetailsId"];
						loginData.userDetailsId = loginDataResponse['userDetailsId'];
						window.localStorage["deviceUserUniqueId"] = loginDataResponse["deviceUserUniqueId"];
						window.localStorage['emailMapId'] = loginDataResponse['emailMapId'];
						window.localStorage["userRoleNameSimple"] = "";// loginDataResponse["userRoleNameSimple"]; // FIXME
						var userProfileDataResponse = responseJson["userProfileDataResponse"];
						isShowPage = 0;
						appendDataInEditPage(userProfileDataResponse);
						gotoHomePage(0);
						//$.mobile.changePage('#home-page',{ transition: "slideup"});
					}else{
						window.localStorage["password"] = '';
						window.localStorage["user_logged_in"] = 0;
						window.localStorage["appUserData"] = '';
						window.localStorage["userDetailsId"] = '';
						
						window.localStorage["email"] = '';
						
						var form = $("#loginForm");
						$.mobile.changePage('#login-page','slide');
						
						navigator.notification.alert(responseMessage,alertConfirm, appName, ['Ok']);
					}
				//hideModal();
			   },
			   error:function(data,t,f){
				   hideModal();
				   navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,['Ok']);
				   var responseJson = $.parseJSON(data);
				   if(responseJson.status==404){
					   navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,['Ok']);
				   }
			   }
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,['Ok']);
		}
		$("#submitButton").prop("disabled", false);
	}
	else{
		//navigator.notification.alert('You must enter a username and password.', alertConfirm, appName, ['Ok']);
		//form.find("#submitButton").prop("disabled",false);
	}
	return false;
}

function getRandomNumber(){
	var minimumNum=1;
	var maximumNum=74;
	var randomNum = Math.floor(Math.random() * (maximumNum - minimumNum + 1)) + minimumNum;
	return (randomNum-1);
}

function refreshSelect(ele,currentValue){
	// Grabbing a select field
	var el = $(ele);
	// Select the relevant option, de-select any others
	if(currentValue!=""){
		el.val(currentValue).attr('selected', true).siblings('option').removeAttr('selected');
	}
	// Initialize the selectmenu
	el.selectmenu();
	// jQM refresh
	el.selectmenu("refresh", true);
}



/** 
 * Convert seconds to hh-mm-ss format.
 * @param {number} totalSeconds - the total seconds to convert to hh- mm-ss
**/
function secondsTohhmm(totalSeconds) {
  var hours   = Math.floor(totalSeconds / 3600);
  var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  //var seconds = totalSeconds - (hours * 3600) - (minutes * 60);
  // round seconds
  //seconds = Math.round(seconds * 100) / 100

  var result = (hours < 10 ? "0" + hours : hours);
      result += ":" + (minutes < 10 ? "0" + minutes : minutes);
      //result += ":" + (seconds  < 10 ? "0" + seconds : seconds);
  return result;
}

function getTodayDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;//January is 0, so always add + 1

	var yyyy = today.getFullYear();
	if(dd<10){dd='0'+dd}
	if(mm<10){mm='0'+mm}
	//var todayString = yyyy+'-'+mm+'-'+dd;
	var todayString = dd + '/' +mm + '/' + yyyy;
	return todayString;
}

function currentDateTime() {
	var currentdate = new Date();
	var formattedSeconds=currentdate.getSeconds();
	if(formattedSeconds < 10){
		formattedSeconds = "0"+formattedSeconds;
	}
    var datetimeValue = formatdateTimeStr(currentdate.getFullYear()) + "-"
    				+formatdateTimeStr(currentdate.getMonth()+1)  +"-"
				    +formatdateTimeStr(currentdate.getDate()) 
	                +"T" 
	                + formatdateTimeStr(currentdate.getHours()) + ":"  
	                + formatdateTimeStr(currentdate.getMinutes()) + ":" 
	                + formatdateTimeStr(currentdate.getSeconds());
	return datetimeValue;
}

function formatdateTimeStr(i) {
    return (i < 10) ? "0" + i : "" + i;
}

function calculateDateTimeDiff(old_date,new_date) {
	// The number of milliseconds in one second
     var ONE_SECOND = 1000;
     // Convert both dates to milliseconds
     var old_date_obj = new Date(old_date).getTime();
     var new_date_obj = new Date(new_date).getTime();
     // Calculate the difference in milliseconds
     var difference_ms = Math.abs(new_date_obj - old_date_obj)
     // Convert back to totalSeconds
     var totalSeconds = Math.round(difference_ms / ONE_SECOND);
     //alert('total seconds--' +totalSeconds);
     return totalSeconds;
}


// Variables Declarations
var countryJsonObjSession = {};
var medicalProfileJsonObjSession = {};

//The directory to store data
var store;
var storeExternal;

//Used for status updates
var $status;

/* ************* Database Code Starts   -------------------------  */
// Open Database
function openDatabase() {
   db.transaction(initializeDB, errorCB, successCB);
}
//Close Database
function closeDatabase() {
}
// InitializeDB the database 
function initializeDB(tx) {
	//	tx.executeSql(CREATE TABLE IF NOT EXISTS customer_details (id integer primary key autoincrement,name text, total_price text, advance_price text, balance_price text, update_timestamp text, contact_number text, email_id text, country text, state text, city text, pincode text, address_one text, address_two text)');
	//	tx.executeSql('CREATE TABLE IF NOT EXISTS order_details(id integer primary key autoincrement, server_cat_id integer, server_prod_id integer, order_data text,update_timestamp text, server_prod_name text,customer_id integer, option_selected text, status_of_order text, gallery_id integer, gallery_name text)');
}

// Common Transaction success callback
function successCB() {
	//alert('db transcation success');
	//console.log('db transcation success');
	loadDataFromServer();
}
//Transaction error callback
function errorCB(err) {
	//alert("Error processing SQL: "+err.code);
	//console.log("Error processing SQL: "+err.code);
}




/* ************* Database Code Ends   -------------------------  */

/*  ------------------- Common Methods/Function Code Starts -------------------------  */
function getDataByAction(actionName, mDataJsonString, successCallbackFn, errorCallbackFn) {
	connectionType=checkConnection();
	
	if(connectionType=="Unknown connection" || connectionType=="No network connection"){
		navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,['Ok']);
	}
	else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
		//showModal();
		var loginData={};
		loginData.username=window.localStorage["username"];
		loginData.password=window.localStorage["password"];
		loginData.gcmregdid = "reg";//For Testing
		
		$.ajax({
			//type : 'POST',
			url:appUrl,
			data : {"action":actionName, "loginData":JSON.stringify(loginData), "mData":mDataJsonString },
			success: successCallbackFn,
		    error: errorCallbackFn
		});
	}
	else{
		navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,['Ok']);
	}
}
	
function getDataByUrlAndData(url, data, successCallbackFn, errorCallbackFn, ajaxCallType) {
	connectionType=checkConnection();
	if(connectionType=="Unknown connection" || connectionType=="No network connection"){
		navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,['Ok']);
	}
	else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
		$.ajax({
			type : ajaxCallType,
			url: url,
			data : data,
			success: successCallbackFn,
		    error: errorCallbackFn
		});
	}
	else{
		navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,['Ok']);
	}
}
	
function commonSuccessCallback(data) {
	hideModal();
	var res=jQuery.parseJSON(data);
	responseData=JSON.stringify(res);
	console.log(responseData);
}

function commonErrorCallback(data) {
    hideModal();
	navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,['Ok']);
	var responseJson = $.parseJSON(data);
	if(responseJson.status==404){
	     navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,['Ok']);
	}
}
	
function commonPageSuccessCallback(data){
	homePageData(data);
	var responseJson=jQuery.parseJSON(data);
	if(responseJson.statusCode == "0" ){
		var $parentEleObj = $('.common-page-tab1 .mb-st-assignment-list ul.st-assigment');
		$parentEleObj.html("");
		$('.common-page-tab1 .mb-st-assignment-list').show();
		var actionHeading=responseJson["actionHeading"];
		$('.common-page-tab1 .common-page-tab-heading').html(actionHeading);
		
		var action=responseJson["action"];
		var jsonData=responseJson["data"];
		
		if(action=="getHolidays"){
			commonPageAssignmentData($parentEleObj, jsonData);
		}
		else if(action=="getAttendanceForStaff"){
			commonPageAttendanceForStaffData($parentEleObj, jsonData);
		}
		$.mobile.changePage('#common-page','slide');
	}else{
		navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,['Ok']);
	}
	hideModal();
}
	
function commonPageLiNoDataMsg($parentEleObj, msg){
	var statusClass = "status-common";
	var dataEleObj = '<li>'+
						'<i class="fa fa-dot-circle-o status-circle '+statusClass+' "></i>'+
						'<div class="st-assign-detail">'+
							'<span class="assign-arrow"></span>'+
								'<p class="assign-title"> ' + msg +
								'</p>'+
						'</div>'+
					'</li>';
	$parentEleObj.append(dataEleObj);
}
	
function dateTimestamp() {
	var d = new Date();
	   
	var yyyy = addZero(d.getFullYear(), 4);
	var month = addZero(d.getMonth()+1, 2);
	var dd = addZero(d.getDate(), 2);
    
   
    var hh = addZero(d.getHours(), 2);
    var mm = addZero(d.getMinutes(), 2);
    var ss = addZero(d.getSeconds(), 2);
    var mss = addZero(d.getMilliseconds(), 3);
    
    var dateTimeStampTemp = yyyy +'-'+ month +'-'+ dd +"_"+ hh +':'+ mm +':'+ ss +' '+ mss;
    return dateTimeStampTemp;
}
	
function addZero(x,n) {
    while (x.toString().length < n) {
        x = "0" + x;
    }
    return x;
}
/*  ------------------- Common Methods/Function Code Ends -------------------------  */


/*  ------------------- Module-wise Methods/Function Code Starts ------------------  */	
	
	
	
var commonSuccessCBFn;
var errorCount = 0;
function commonUrlToCallServer(data, dataActionType, loginData){
	if(testingInBrowser){
		loginData.username='testing2.france@gmail.com';
		loginData.password='123456';
		loginData.gcmregdid = "reg";
	}
	
	connectionType=checkConnection();
	if(connectionType=="Unknown connection" || connectionType=="No network connection"){
		navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,['Ok']);
	}
	else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
		$.ajax({
			type : ajaxCallGet,
			//dataType : 'jsonp',
			url: appUrl,
			data:{"action": dataActionType, "loginData": loginData, "mData":data},
			//async:true,
			//crossDomain:true,
			success: commonSuccessCBFn,
			//error: commonErrorCallback
			error: commonErrorCBFn
		});
	}
}

function commonErrorCBFn(err){
	console.log(err);
	hideModal();
	if(err.readyState == 0 && err.responseText == '' && err.status == 0 && err.statusText =="error"){
		if(errorCount == 0){
			navigator.notification.alert('Please try again.',alertConfirm,appName,['Ok']);
			errorCount = parseInt(errorCount)+1;
		}
		
	}
	console.log('commonErrorCBFn : '+err.code);
	console.log('commonErrorCBFn : '+err.message);
}

function gotoLoginPage(){
	secondarySpecialityToChange = false;
	stateToChange = false;
	priSpeltyListFromServer(1);
	countryListFromServer(1);
	$.mobile.changePage('#login-page',{ transition: "slide"});
	$('#loginForm .validation-place').html('');
}

function gotoHomePage(typeOfModal){
	$(".setting-popup").hide();
	if(connectionType=="Unknown connection" || connectionType=="No network connection"){
		navigator.app.exitApp();
		//return;
	}else{
		$(".setting-popup").hide();
		secondarySpecialityToChange = false;
		stateToChange = false;
		priSpeltyListFromServer(1);
		countryListFromServer(1);
		homePageDataFromServer(typeOfModal);
		$("#submitButton").prop("disabled",false);
		setTimeout(function(){
			$.mobile.changePage('#dashboardPage',{ transition: "slideleft"});
	    },500);
		
	}
}

function gotoUnsubscribePage(data){
	$(".setting-popup").hide();
	if(connectionType=="Unknown connection" || connectionType=="No network connection"){
		navigator.app.exitApp();
		//return;
	}
	/*$('#alert-Message').show();
	
	var menuId = $(data).data('modalid');
	$('#'+ menuId ).popup( 'close' );  
	$('#'+ menuId ).bind({
		popupafterclose: function(event, ui) {*/
			if(testingInBrowser){
				showUnsubscribePageForm(1);
			}else{
				$("#submitButton").prop("disabled",false);
				$(".setting-popup").hide();
				navigator.notification.confirm(
			            ("Are you really want to unsubscribe?"), // message
			            showUnsubscribePageForm, // callback
			            appName, // title
			            ['YES','NO'] // buttonName
			    );
			}
			
			/*$(this).unbind("popupafterclose");*/
			showUnsubscribeData();
	/*	}
	});*/
}

function showUnsubscribePageForm(button){
    if(button=="1" || button==1){
    	$(".setting-popup").hide();
    	$.mobile.changePage('#unsubscribePage',{ transition: "slide"});
    }
}

function unsubscribePage(){
	$(".setting-popup").hide();
$( '#unsubscribePopup' ).popup( 'close' );
	
	$( "#unsubscribePopup" ).bind({
		popupafterclose: function(event, ui) {
			$.mobile.changePage('#unsubscribePage',{ transition: "slide"});
		}
	});
}

function gotoRedeemHistory(){
	if(connectionType=="Unknown connection" || connectionType=="No network connection"){
		navigator.app.exitApp();
		//return;
	}
	$("#submitButton").prop("disabled",false);
	$.mobile.changePage('#redeemHistory',{ transition: "slide"});
}

function gotoRegistrationPage(){
	if(connectionType=="Unknown connection" || connectionType=="No network connection"){
		navigator.app.exitApp();
		//return;
	}
	$("#submitButton").prop("disabled",false);
	$(".setting-popup").hide();
	selectionType = 0;
	onloadType = false;
	secondarySpecialityToChange = false;
	stateToChange = false;
	countryListFromServer(1);
	priSpeltyListFromServer(1);
	$('#firstNameInput').val('');
	$('#middleNameInput').val('');
	$('#lastNameInput').val('');
	$('#primaryNumberInput').val('');
	$('#emailIdInput').val('');
	
	$('#registrationPageForm #countryInput').val('').attr('selected', true).siblings('option').removeAttr('selected');   
	
	$('#registrationPageForm #stateInput').val('').attr('selected', true).siblings('option').removeAttr('selected');   
	
	$('#registrationPageForm #primarySpecialityInput').val('').attr('selected', true).siblings('option').removeAttr('selected');   
	
	$('#registrationPageForm #secondarySpecialityInput').val('').attr('selected', true).siblings('option').removeAttr('selected');  
	
	var formPrimarySpecId = $('#registrationPageForm #primarySpecialityInput');
	refreshSelect(formPrimarySpecId, '');
	var formSecSpecId = $('#registrationPageForm #secondarySpecialityInput');
	refreshSelect(formSecSpecId, '');
	var formCountryId = $('#registrationPageForm #countryInput');
	refreshSelect(formCountryId, '');
	var formStateId = $('#registrationPageForm #stateInput');
	refreshSelect(formStateId, '');
	
	$.mobile.changePage('#registrationPage',{ transition: "slide"});
	$('#registrationPageForm .validation-place').html('');
}

var isShowPage = 0;
function gotoShowProfilePage(childType, showType){
	$(".setting-popup").hide();
	if(connectionType=="Unknown connection" || connectionType=="No network connection"){
		navigator.app.exitApp();
		//return;
	}
	$("#submitButton").prop("disabled",false);
	$(".setting-popup").hide();
	$('#showSurveysPageId .nav-btn2 span').addClass('active');
	secondarySpecialityToChange = childType;
	stateToChange = childType;
	priSpeltyListFromServer(1);
	countryListFromServer(1);
	onloadType = true;
	isShowPage = showType;
	setTimeout(function(){
		loginData.username=window.localStorage["username"];
		getUserDataFromServer();
	},500);
	
}

function gotoUpdateProfilePage(){
	$(".setting-popup").hide();
	if(connectionType=="Unknown connection" || connectionType=="No network connection"){
		navigator.app.exitApp();
		//return;
	}
	$(".setting-popup").hide();
	$('#showSurveysPageId .nav-btn2 span').addClass('active');
	/*secondarySpecialityToChange = false;
	stateToChange = false;
	priSpeltyListFromServer(1);
	countryListFromServer(1);
	getUserDataFromServer();
	onloadType = true;
	isShowPage = false;*/
	$("#submitButton").prop("disabled",false);
	$('#updateUserDetailsPageForm .validation-place').html('');
	$.mobile.changePage('#updateUserPage',{ transition: "slide"});
}

function gotoSurveysPage(){
	$(".setting-popup").hide();
	if(connectionType=="Unknown connection" || connectionType=="No network connection"){
		navigator.app.exitApp();
		//return;
	}
	$(".setting-popup").hide();
	$.mobile.changePage('#showSurveys',{ transition: "slide"});
}

function gotoChangePassword(){
	$(".setting-popup").hide();
	if(connectionType=="Unknown connection" || connectionType=="No network connection"){
		navigator.app.exitApp();
		//return;
	}
	//$('.bottom-navigation .nav-btn.nav-btn3 .span-icon').css("background-position", "-44px -88px");
	//$('.nav-btn').removeClass('active');
	//$('#changePasswordPageId .nav-btn3 span').addClass('active');
	$('#oldPasswordInput').val('');
	$('#newPasswordInput').val('');
	$('#confirmPasswordInput').val('');
	$(".setting-popup").hide();
	$('#changePasswordPageForm .validation-place').html('');
	$("#submitButton").prop("disabled",false);
	$.mobile.changePage('#changePassword',{ transition: "slide"});
}

function gotoForgotPassword(){
	if(connectionType=="Unknown connection" || connectionType=="No network connection"){
		navigator.app.exitApp();
		//return;
	}
	$('#forgotEmailIdInput').val('');
	$(".setting-popup").hide();
	$('#forgotPasswordPageForm .validation-place').html('');
	$("#submitButton").prop("disabled",false);
	$.mobile.changePage('#forgotPassword',{ transition: "slide"});
}

function gotoSurveyLinkPage(thiss){
	if(connectionType=="Unknown connection" || connectionType=="No network connection"){
		navigator.app.exitApp();
		//return;
	}
	$('#surveyNewEmailIdInput').val('');
	var spmId = $(thiss).data('spmid');
	var urllink = $(thiss).data('urllink');
	$('#surveyLinkPageSPMId').val(spmId);
	$('#surveyLinkPageSurveyLink').val(urllink);
	$('#surveyLinkPageForm .validation-place').html('');
	$('.surveyMailIdClass').hide();
	$.mobile.changePage('#surveyLinkPage',{ transition: "slide"});
}

function gotoContactUsPage(thiss){
	if(connectionType=="Unknown connection" || connectionType=="No network connection"){
		navigator.app.exitApp();
		//return;
	}
	
	$('#contactUsForm #fullNameInput').val('');
	$('#contactUsForm #emailIdInput').val('');
	$('#contactUsForm #countryInput').val('');
	$('#contactUsForm #emailBodyInput').val('');
	
	var userLoggedIn = window.localStorage["user_logged_in"];
	if(userLoggedIn == 1){
		$('.fullNameDiv').hide();
		$('.fullNameDiv #fullNameInput').val(window.localStorage["name"]);
		$('.emailDiv').hide();
		$('.emailDiv #emailIdInput').val(window.localStorage["username"]);
		$('.countryDiv').hide();
		$('.countryDiv #countryInput').val(window.localStorage["countryId"]);
		$('.contactUsHref').hide();
		$('.contactUs-Navigator').show();
	}else{
		$('.fullNameDiv').show();
		$('.emailDiv').show();
		$('.countryDiv').show();
		$('.contactUsHref').show();
		$('.contactUs-Navigator').hide();
	}
	
	var formCountryId = $('#contactUsForm #countryInput');
	refreshSelect(formCountryId, '');
	
	countryListFromServer(1);
	
	selectionType = 0;
	$(".setting-popup").hide();
	$("#submitButton").prop("disabled",false);
	$('#contactUsForm .validation-place').html('');
	$.mobile.changePage('#contactUsPage',{ transition: "slide"});
}
	
/*  ------------------- Module-wise Methods/Function Code Starts ------------------  */	

/*  ------------------- Other Methods/Function like Click, Load, etc. Starts ------------------  */		
	
var actionTypeResp = '';
function commonSuccessCBFn(data){
	var responseData = $.parseJSON(data);
	var status = responseData['validMessageCode'];
	if(status == 0){
		var actionType = responseData['action'];
		var actionResponse = responseData['actionResponse'];
		if(actionType == 'country'){
			countryJsonObjSession = actionResponse;
			appendCountriesList(actionResponse);
		}else if(actionType == 'state'){
			appendStatesList(actionResponse);
		}else if(actionType == 'medicalProfile'){
			medicalProfileJsonObjSession = actionResponse;
			appendPrimarySpecialityList(actionResponse);
		}else if(actionType == 'practiceCategory'){
			appendSecondarySpecialityList(actionResponse);
		}else if(actionType == 'saveRegistrationUser'){
			registrationSuccessCBfn(actionResponse);
		}else if(actionType == 'showUserDetails'){
			appendDataInEditPage(actionResponse);
		}else if(actionType == 'forgotPassword'){
			successForgotPasswordFn(actionResponse);
		}else if(actionType == 'changePassword'){
			successChangePasswordFn(actionResponse);
		}else if(actionType == 'updateUserDetails'){
			successUserDetailsFn(actionResponse);
		}else if(actionType == 'showUnsubscribeData'){
			appendUnsubscribeDataToUser(actionResponse);
		}else if(actionType == 'saveUpdateUnsubscribeData'){
			successUnsubscribeFn(actionResponse);
		}else if(actionType == 'physicianHomePage'){
			$('#earnedIncentives').text(0);
			$('#usedIncentives').text(0);
			$('#totalIncentives').text(0);
			$('#missedIncenPhy').text(0);
			$('#totalIncenPhy').text(0);
			successHomePageDataFn(actionResponse);
		}else if(actionType == 'onlineRewardsLink'){
			successOnlineRewardsFn(actionResponse);
		}else if(actionType == 'sendSurveyLink'){
			successSendSurveyMailFn(actionResponse);
		}else if(actionType == 'sendContactUsDetails'){
			sendContactUsDetailsFn(actionResponse);
		}
	}else{
		hideModal();
		var message = responseData['message'];
		if(testingInBrowser){
			alert(message);
		}else{
			var userLoggedIn = window.localStorage["user_logged_in"];
			if(actionTypeResp == 'sendContactUsDetails' && (userLoggedIn == 1 || userLoggedIn == '1')){
				actionTypeResp = '';
				gotoHomePage(1);
				navigator.notification.alert(message +' Please try in web application.',alertConfirm,appName,['Ok']);
			}else{
				window.localStorage["password"] = '';
				var form = $("#loginForm");
				$("#password", form).val('');
				$.mobile.changePage('#login-page','slide');
				$("#submitButton").prop("disabled",false);
				navigator.notification.alert(message,alertConfirm,appName,['Ok']);
			}
			
		}
		
	}
}

// refreshSelect
function refreshSelect(ele,currentValue){
	// Grabbing a select field
	var el = $(ele);
	// Select the relevant option, de-select any others
	el.val(currentValue).attr('selected', true).siblings('option').removeAttr('selected');
	// Initialize the selectmenu
	el.selectmenu();
	// jQM refresh
	el.selectmenu("refresh", true);
}

function timeCatSelectRefresh(){
	var el = $('#timeCat');
	el.find('option').remove().end();
	var currentValue;
	jQuery.each(time_cats_arr_curr_role, function(index,value) {
		var jsonObj=value;
		var id=jsonObj["id"];
		var title=jsonObj["title"];
		el.append('<option value="'+id+'">'+title+'</option>').val(id);

		if(index==0){
			firstSelectValue=id;
		}
	});
	if(time_cats_arr_curr_role.length>0){
		el.val(currentValue).attr('selected', true).siblings('option').removeAttr('selected');   
	}	
	el.selectmenu();
	el.selectmenu("refresh", true);
}
	
function countryListFromServer(countryType){
	if(jQuery.isEmptyObject(countryJsonObjSession)){
		var dataToSend = {};
		dataToSend['type'] = countryType;
		var dataActionType = 'country';
		commonUrlToCallServer(JSON.stringify(dataToSend), dataActionType, JSON.stringify(loginData));
	}else{
		appendCountriesList(countryJsonObjSession);
	}
}
	
function onchangeCountry(type){
	selectionType = type;
	var formId = '';
	if(type == '0'){
		formId = $('#registrationPageForm #stateInput').empty();
	}else{
		formId = $('#updateUserDetailsPageForm #stateInput').empty();
	}
	stateToChange = false;
	onloadType = false;
	refreshSelect(formId, '');
	stateListFromServer(selectionType);
}
	
function stateListFromServer(type){
	var countryId = '';
	selectionType = type;
	if(type == '0'){
		countryId = $('#registrationPageForm #countryInput :selected').val();
	}else{
		countryId = $('#updateUserDetailsPageForm #countryInput :selected').val();
	}
	if(countryId != '' && countryId != undefined){
		var dataToSend = {};
		dataToSend['actionId'] = countryId;
		var dataActionType = 'state';
		commonUrlToCallServer(JSON.stringify(dataToSend), dataActionType, JSON.stringify(loginData));
	}
}

function priSpeltyListFromServer(medicalProfileType){
	if(jQuery.isEmptyObject(medicalProfileJsonObjSession)){
		var dataToSend = {};
		dataToSend['type'] = medicalProfileType;
		var dataActionType = 'medicalProfile';
		commonUrlToCallServer(JSON.stringify(dataToSend), dataActionType, JSON.stringify(loginData));
	}else{
		appendPrimarySpecialityList(medicalProfileJsonObjSession);
	}
}

function onchangePriSpelty(type){
	selectionType = type;
	var formId = '';
	if(type == '0'){
		formId = $('#registrationPageForm #secondarySpecialityInput');
	}else{
		formId = $('#updateUserDetailsPageForm #secondarySpecialityInput');
	}
	secondarySpecialityToChange = false;
	refreshSelect(formId, '');
	onloadType = false;
	secSpeclityFromServer(selectionType);
}

function secSpeclityFromServer(type){
	selectionType = type;
	var primarySpecialityId = '';
	if(type == '0'){
		primarySpecialityId = $('#registrationPageForm #primarySpecialityInput :selected').val();
	}else{
		primarySpecialityId = $('#updateUserDetailsPageForm #primarySpecialityInput :selected').val();
	}
	if(primarySpecialityId != '' && primarySpecialityId != undefined){
		var dataToSend = {};
		dataToSend['actionId'] = primarySpecialityId;
		var dataActionType = 'practiceCategory';
		commonUrlToCallServer(JSON.stringify(dataToSend), dataActionType, JSON.stringify(loginData));
	}
}

function appendCountriesList(actionResponseCountry){
	var validMessageCode = actionResponseCountry['validMessageCode'];
	if(validMessageCode == 0){
		var formId = '';
		var contactUsFormId = '';
		var valueCountryId = '';
		var firstSelectValue = '';
		var valueCUsCountryId = '';
		if(selectionType == '0'){
			formId = $('#registrationPageForm #countryInput');
			valueCountryId = $('#registrationPageForm #countryInput :selected').val();
			
		}else{
			formId = $('#updateUserDetailsPageForm #countryInput');
			valueCountryId = $('#updateUserDetailsPageForm #countryInput :selected').val();
		}
		
		contactUsFormId = $('#contactUsForm #countryInput');
		valueCUsCountryId = $('#contactUsForm #countryInput :selected').val();

		formId.find('option').remove().end();
		formId.append('<option value="">-- Select Country --</option>').val('');
		/*if(selectionType == '0'){*/
			contactUsFormId.find('option').remove().end();
			contactUsFormId.append('<option value="">-- Select Country --</option>').val('');
		/*}*/
		var countryArray = actionResponseCountry['countriesList'];
		jQuery.each(countryArray, function(index,value) { 
			var countryId = value['countryId'];
			var countryName = value['countryName'];
			formId.append('<option value="'+countryId+'">'+countryName+'</option>').val(countryId);
			/*if(selectionType == '0'){*/
			contactUsFormId.append('<option value="'+countryId+'">'+countryName+'</option>').val(countryId);
			/*}*/
			if(index == 0){
				firstSelectValue = countryId;
			}
		});
		if(valueCountryId != ''){
			formId.val(valueCountryId).attr('selected', true).siblings('option').removeAttr('selected');  
			/*if(selectionType == '0'){*/
				contactUsFormId.val('').attr('selected', true).siblings('option').removeAttr('selected');   
			/*}*/
		}else{
			/*if(selectionType == '0'){*/
				contactUsFormId.val('').attr('selected', true).siblings('option').removeAttr('selected');   
			/*}*/
			formId.val('').attr('selected', true).siblings('option').removeAttr('selected');   
		}
		formId.selectmenu();
		formId.selectmenu("refresh", true);
		$(formId).find('option').show();
		/*if(selectionType == '0'){*/
			contactUsFormId.selectmenu();
			contactUsFormId.selectmenu("refresh", true);
			$(contactUsFormId).find('option').show();
		/*}*/
	}else{
		var message = actionResponseCountry['message'];
		navigator.notification.alert(message,alertConfirm,appName,['Ok']);
	}
}

function appendStatesList(actionResponseStates){
	var validMessageCode = actionResponseStates['validMessageCode'];
	if(validMessageCode == 0){
		var formId = '';
		var firstSelectValue = '';
		var value = $('#updateUserDetailsPageForm #stateInput').val();
		if(selectionType == '0'){
			formId = $('#registrationPageForm #stateInput');
		}else{
			formId = $('#updateUserDetailsPageForm #stateInput');
		}
		formId.find('option').remove().end();
		formId.append('<option value="">-- Select State --</option>').val('');
		formId.selectmenu();
		formId.selectmenu("refresh", true);
		if(actionResponseStates['statesList'] != '' && actionResponseStates['statesList'] != undefined){
			var stateArray = actionResponseStates['statesList'];
			jQuery.each(stateArray, function(index,value) { 
				var stateId = value['stateId'];
				var stateName = value['stateName'];
				formId.append('<option value="'+stateId+'">'+stateName+'</option>').val(stateId);
				if(index==0){
					firstSelectValue=stateId;
				}
			});
			if(onloadType == true){
				firstSelectValue = value;
			}
			
			if(stateToChange){
				formId.val(firstSelectValue).attr('selected', true).siblings('option').removeAttr('selected');   
			}else{
				formId.val('').attr('selected', true).siblings('option').removeAttr('selected');   
			}
			
			formId.selectmenu();
			formId.selectmenu("refresh", true);
		}
	}else{
		var message = actionResponseStates['message'];
		navigator.notification.alert(message,alertConfirm,appName,['Ok']);
	}
}
	
function appendPrimarySpecialityList(actionResponseMP){
	var validMessageCode = actionResponseMP['validMessageCode'];
	if(validMessageCode == 0){
		var formId = '';
		var valueMedicalProfileId = '';
		var firstSelectValue = '';
		if(selectionType == '0'){
			formId = $('#registrationPageForm #primarySpecialityInput');
			valueMedicalProfileId = $('#registrationPageForm #primarySpecialityInput').val();
		}else{
			formId = $('#updateUserDetailsPageForm #primarySpecialityInput');
			valueMedicalProfileId = $('#updateUserDetailsPageForm #primarySpecialityInput').val();
		}
		formId.find('option').remove().end();
		formId.append('<option value="">-- Select Primary Speciality --</option>').val('');
		var mpArray = actionResponseMP['medicalProfileList'];
		jQuery.each(mpArray, function(index,value) { 
			var medicalProfId = value['medicalProfileId'];
			var medicalProfileName = value['medicalProfileName'];
			formId.append('<option value="'+medicalProfId+'">'+medicalProfileName+'</option>').val(medicalProfId);
			if(index == 0){
				firstSelectValue = medicalProfId;
			}
		});
		if(valueMedicalProfileId != ''){
			formId.val(valueMedicalProfileId).attr('selected', true).siblings('option').removeAttr('selected');   
		}else{
			formId.val('').attr('selected', true).siblings('option').removeAttr('selected');   
		}
		formId.selectmenu();
		formId.selectmenu("refresh", true);
	}else{
		var message = actionResponseMP['message'];
		navigator.notification.alert(message,alertConfirm,appName,['Ok']);
	}
}
	
function appendSecondarySpecialityList(actionResponseSecondSpecility){
	var validMessageCode = actionResponseSecondSpecility['validMessageCode'];
	if(validMessageCode == 0){
		if(actionResponseSecondSpecility['practiceCategoryList'] != '' && actionResponseSecondSpecility['practiceCategoryList'] != undefined){
			var formId = '';
			var firstSelectValue = '';
			var value = $('#updateUserDetailsPageForm #secondarySpecialityInput').val();
			if(selectionType == '0'){
				formId = $('#registrationPageForm #secondarySpecialityInput');
			}else{
				formId = $('#updateUserDetailsPageForm #secondarySpecialityInput');
			}
			formId.find('option').remove().end();
			formId.append('<option value="">-- Select Secondary Speciality --</option>').val('');
			formId.selectmenu();
			formId.selectmenu("refresh", true);
			var secondSpecilityArray = actionResponseSecondSpecility['practiceCategoryList'];
			jQuery.each(secondSpecilityArray, function(index,value) { 
				var practiceCategoryId = value['practiceCategoryId'];
				var practiceCategoryName = value['practiceCategoryName'];
				formId.append('<option value="'+practiceCategoryId+'">'+practiceCategoryName+'</option>').val(practiceCategoryId);
				if(index==0){
					firstSelectValue=practiceCategoryId;
				}
			});
			
			if(onloadType == true){
				firstSelectValue = value;
			}
			
			if(secondarySpecialityToChange){
				formId.val(firstSelectValue).attr('selected', true).siblings('option').removeAttr('selected');   
			}else{
				formId.val('').attr('selected', true).siblings('option').removeAttr('selected');   
			}
			
			formId.selectmenu();
			formId.selectmenu("refresh", true);
		}
		
	}else{
		var message = actionResponseSecondSpecility['message'];
		navigator.notification.alert(message,alertConfirm,appName,['Ok']);
	}
}

function registrationSuccessCBfn(response){
	$("#submitButton").prop("disabled",false);
	var validMessageCode = response['validMessageCode'];
	hideModal();
	var message = response['message'];
	if(validMessageCode == 0){
		gotoLoginPage();
	}
	if(testingInBrowser){
		alert('message');
	}else{
		navigator.notification.alert(message,alertConfirm,appName,['Ok']);
	}
	
}

function sendRegisteredData(){
	$("#submitButton").prop("disabled",true);
	var firstNameInput = $('#registrationPageForm #firstNameInput').val();
	var middleNameInput = $('#registrationPageForm #middleNameInput').val();
	var lastNameInput = $('#registrationPageForm #lastNameInput').val();
	var primaryNumberInput = $('#registrationPageForm #primaryNumberInput').val();
	var emailIdInput = $('#registrationPageForm #emailIdInput').val();
	var primarySpecialityInput = $('#registrationPageForm #primarySpecialityInput :selected').val();
	var secondarySpecialityInput = $('#registrationPageForm #secondarySpecialityInput :selected').val();
	var countryInput = $('#registrationPageForm #countryInput :selected').val();
	var stateInput = $('#registrationPageForm #stateInput :selected').val();
	var lastNameExist = false;
	var countryExist = false;
	var priSpecExist = false;
	var secSpecExist = false;
	var firstNameExist = false;
	var primaryNumberExist = false;
	var emailIdExist = false;
	var emailOkay = false;
	if(firstNameInput != undefined && firstNameInput != ''){
		firstNameExist = true;
	}else{
		$("#submitButton").prop("disabled",false);
		//navigator.notification.alert('FirstName is required fields.',alertConfirm,appName,['Ok']);
		return;
	}
	
	/*if(firstNameExist && firstNameInput.length > 101){
		navigator.notification.alert('First name should not be more than 100 Characters.',alertConfirm,appName,['Ok']);
		$("#submitButton").prop("disabled",false);
		return;
	}*/
	
	/*if(firstNameExist && firstNameInput.length < 3){
		$("#submitButton").prop("disabled",false);
		navigator.notification.alert('First name should not be minimum 3 Characters.',alertConfirm,appName,['Ok']);
		return;
	}*/

	if(lastNameInput != undefined && lastNameInput != ''){
		lastNameExist = true;
	}else{
		$("#submitButton").prop("disabled",false);
		//navigator.notification.alert('Lastname is required fields.',alertConfirm,appName,['Ok']);
		return;
	}
	/*if(lastNameExist && lastNameInput.length > 45){
		$("#submitButton").prop("disabled",false);
		navigator.notification.alert('Last name should not be more than 45 Characters.',alertConfirm,appName,['Ok']);
		return;
	}
	
	if(lastNameExist && lastNameInput.length < 3){
		$("#submitButton").prop("disabled",false);
		navigator.notification.alert('Last name should not be minimum 3 Characters.',alertConfirm,appName,['Ok']);
		return;
	}*/
	
	if(middleNameInput != undefined && middleNameInput != '' && middleNameInput.length > 45){
		$("#submitButton").prop("disabled",false);
		navigator.notification.alert('Middle name should not be more than 45 Characters.',alertConfirm,appName,['Ok']);
		return;
	}
	
	/*if(middleNameInput != undefined && middleNameInput != '' && middleNameInput.length < 3){
		$("#submitButton").prop("disabled",false);
		navigator.notification.alert('Middle name should not be minimum 3 Characters.',alertConfirm,appName,['Ok']);
		return;
	}*/
	
	if(countryInput != undefined && countryInput != ''){
		countryExist = true;
	}else{
		$("#submitButton").prop("disabled",false);
		//navigator.notification.alert('Country is required fields.',alertConfirm,appName,['Ok']);
		return;
	}
	if(primarySpecialityInput != undefined && primarySpecialityInput != ''){
		priSpecExist = true;
	}else{
		$("#submitButton").prop("disabled",false);
		//navigator.notification.alert('Primary Speciality is required fields.',alertConfirm,appName,['Ok']);
		return;
	}
	if(secondarySpecialityInput != undefined && secondarySpecialityInput != ''){
		secSpecExist = true;
	}else{
		$("#submitButton").prop("disabled",false);
		//navigator.notification.alert('Secondary Speciality is required fields.',alertConfirm,appName,['Ok']);
		return;
	}
	if(primaryNumberInput != undefined && primaryNumberInput != ''){
		primaryNumberExist = true;
	}
	if(emailIdInput != undefined && emailIdInput != ''){
		emailIdExist = true;
	}
	
	if(emailIdExist && emailIdInput.length > 201){
		$("#submitButton").prop("disabled",false);
		//navigator.notification.alert('Email Id should not be more than 200 Characters.',alertConfirm,appName,['Ok']);
		return;
	}
	
	if(emailIdExist && emailIdInput.length < 5){
		$("#submitButton").prop("disabled",false);
		//navigator.notification.alert('Email Id should not be minimum 5 Characters.',alertConfirm,appName,['Ok']);
		return;
	}
	
	if(primaryNumberExist && !validatePhone(primaryNumberInput)){
		$("#submitButton").prop("disabled",false);
		navigator.notification.alert('Please enter only numbers.',alertConfirm,appName,['Ok']);
		return;
	}
	
	if(primaryNumberExist && primaryNumberInput.length > 45){
		$("#submitButton").prop("disabled",false);
		//navigator.notification.alert('Telephone no. should not be more than 45 Characters.',alertConfirm,appName,['Ok']);
		return;
	}
	
	if(primaryNumberExist && primaryNumberInput.length < 3){
		$("#submitButton").prop("disabled",false);
		//navigator.notification.alert('Telephone no. should not be minimum 3 Characters.',alertConfirm,appName,['Ok']);
		return;
	}
	
	if(emailIdExist && !isValidEmail(emailIdInput) ){
		$("#submitButton").prop("disabled",false);
		//navigator.notification.alert('Please enter valid email Id.',alertConfirm,appName,['Ok']);
		return false;
	}else if(emailIdExist && isValidEmail(emailIdInput)){
		emailOkay = true;
	}
	
	if(!emailOkay){
		$("#submitButton").prop("disabled",false);
		//navigator.notification.alert('EmailId or PrimaryNumber is required fields.',alertConfirm,appName,['Ok']);
		return false;
	}
	
	if(!emailOkay && !primaryNumberExist){
		$("#submitButton").prop("disabled",false);
		navigator.notification.alert('EmailId or PrimaryNumber is required fields.',alertConfirm,appName,['Ok']);
		return false;
	}
	
	if(countryExist && priSpecExist && secSpecExist && firstNameExist && lastNameExist && emailOkay){
		var dataToSend = new Object();
		dataToSend['firstName'] = firstNameInput;
		dataToSend['middleName'] = middleNameInput;
		dataToSend['lastName'] = lastNameInput;
		dataToSend['medicalProfileId'] = primarySpecialityInput;
		dataToSend['practiceCategoryId'] = secondarySpecialityInput;
		dataToSend['telephoneNumber'] = primaryNumberInput;
		dataToSend['countryId'] = countryInput;
		dataToSend['stateId'] = stateInput;
		dataToSend['emailId'] = emailIdInput;
		dataToSend['gcmregdid'] = window.localStorage["gcmregistrationId"];
		dataToSend['devicePlatform'] = window.localStorage["devicePlatform"];
		var dataActionType = 'saveRegistrationUser';
		showModal();
		commonUrlToCallServer(JSON.stringify(dataToSend), dataActionType, JSON.stringify(loginData));
	}else{
		$("#submitButton").prop("disabled",false);
		//navigator.notification.alert('FirstName, EmailId/PrimaryNumber, Country, Primary Speciality, Secondary Speciality are required fields.',alertConfirm,appName,['Ok']);
	}
	
	
}

function getUserDataFromServer(){
	var dataToSend = new Object();
	$("#submitButton").prop("disabled",false);
	dataToSend['userDetailsId'] = window.localStorage["userDetailsId"];
	var dataActionType = 'showUserDetails';
	showModal();
	setTimeout(function(){
		commonUrlToCallServer(JSON.stringify(dataToSend), dataActionType, JSON.stringify(loginData));
    },500);
}

function appendDataInEditPage(data){
	var validMessageCode = data['validMessageCode'];
	hideModal();
	if(validMessageCode == 0){
		var userData = data['userData'];
		$('#updateUserDetailsPageForm #userDetailsIdInput').val(userData['userDetailsId']);
		$('#showUserDetailsPageForm #userDetailsIdInput').val(userData['userDetailsId']);
		$('#updateUserDetailsPageForm #firstNameInput').val(userData['firstName']);
		$('#showUserDetailsPageForm #firstNameShowPage').text(userData['firstName'] + ' ' +userData['middleName'] +' ' + userData['lastName']);
		$('#updateUserDetailsPageForm #middleNameInput').val(userData['middleName']);
		$('#updateUserDetailsPageForm #lastNameInput').val(userData['lastName']);
		$('#updateUserDetailsPageForm #primaryNumberInput').val(userData['telephoneNumber']);
		$('#showUserDetailsPageForm #primaryNumberShowPage').text(userData['telephoneNumber']);
		$('#updateUserDetailsPageForm #emailIdInput').val(userData['emailId']);
		$('#updateUserDetailsPageForm #emailMapIdForEdit').val(userData['emailMapId']);
		$('#showUserDetailsPageForm #emailIdShowPage').text(userData['emailId']);
		var medicalProfileId = userData['medicalProfileId'];
		var formPriSpecId = $('#updateUserDetailsPageForm #primarySpecialityInput');
		$('#showUserDetailsPageForm #primarySpecialityShowPage').text(userData['medicalProfileName']);
		refreshSelect(formPriSpecId, medicalProfileId);
		var practiceCategoryId = userData['practiceCategoryId'];
		var formSecSpecId = $('#updateUserDetailsPageForm #secondarySpecialityInput');
		$('#showUserDetailsPageForm #secondarySpecialityShowPage').text(userData['practiceCategoryName']);
		refreshSelect(formSecSpecId, practiceCategoryId);
		var countryId = userData['countryId'];
		var formCountryId = $('#updateUserDetailsPageForm #countryInput');
		$('#showUserDetailsPageForm #countryShowPage').text(userData['countryName']);
		refreshSelect(formCountryId, countryId);
		var stateId = userData['stateId'];
		var formStateId = $('#updateUserDetailsPageForm #stateInput');
		$('#showUserDetailsPageForm #stateShowPage').text(userData['stateName']);
		refreshSelect(formStateId, stateId);
		secondarySpecialityToChange = true;
		stateToChange = true;
		stateListFromServer(1);
		secSpeclityFromServer(1);
		$(".setting-popup").hide();
		if(isShowPage == 1){
			$.mobile.changePage('#showUserPage',{ transition: "slide"});
		}else if(isShowPage == 2){
			$.mobile.changePage('#updateUserPage',{ transition: "slide"});
		}
	}else{
		var message = data['message'];
		navigator.notification.alert(message,alertConfirm,appName,['Ok']);
	}
}

var updateDataToSend = new Object();
function updateUserDetails(){
	$("#submitButton").prop("disabled",true);
	var userDetailsIdInput = $('#updateUserDetailsPageForm #userDetailsIdInput').val();
	var firstNameInput = $('#updateUserDetailsPageForm #firstNameInput').val();
	var middleNameInput = $('#updateUserDetailsPageForm #middleNameInput').val();
	var lastNameInput = $('#updateUserDetailsPageForm #lastNameInput').val();
	var primaryNumberInput = $('#updateUserDetailsPageForm #primaryNumberInput').val();
	var emailIdInput = $('#updateUserDetailsPageForm #emailIdInput').val();
	var primarySpecialityInput = $('#updateUserDetailsPageForm #primarySpecialityInput :selected').val();
	var secondarySpecialityInput = $('#updateUserDetailsPageForm #secondarySpecialityInput :selected').val();
	var countryInput = $('#updateUserDetailsPageForm #countryInput :selected').val();
	var stateInput = $('#updateUserDetailsPageForm #stateInput :selected').val();
	
	var lastNameExist = false;
	var countryExist = false;
	var priSpecExist = false;
	var secSpecExist = false;
	var firstNameExist = false;
	var primaryNumberExist = false;
	var emailIdExist = false;
	var emailOkay = false;
	
	if(firstNameInput != undefined && firstNameInput != ''){
		firstNameExist = true;
	}else{
		$("#submitButton").prop("disabled",false);
		//navigator.notification.alert('FirstName is required fields.',alertConfirm,appName,['Ok']);
		return false;
	}
	
	if(firstNameExist && firstNameInput.length > 101){
		$("#submitButton").prop("disabled",false);
		navigator.notification.alert('First name should not be more than 100 Characters.',alertConfirm,appName,['Ok']);
		return;
	}
	
	if(firstNameExist && firstNameInput.length < 3){
		$("#submitButton").prop("disabled",false);
		navigator.notification.alert('First name should not be minimum 3 Characters.',alertConfirm,appName,['Ok']);
		return;
	}
	
	if(lastNameInput != undefined && lastNameInput != ''){
		lastNameExist = true;
	}else{
		$("#submitButton").prop("disabled",false);
		//navigator.notification.alert('Lastname is required fields.',alertConfirm,appName,['Ok']);
		return;
	}
	
	/* if(lastNameExist && lastNameInput.length > 45){
		$("#submitButton").prop("disabled",false);
		navigator.notification.alert('Last name should not be more than 45 Characters.',alertConfirm,appName,['Ok']);
		return;
	}
	
	if(lastNameExist && lastNameInput.length < 3){
		$("#submitButton").prop("disabled",false);
		navigator.notification.alert('Last name should not be minimum 3 Characters.',alertConfirm,appName,['Ok']);
		return;
	}
	
	if(middleNameInput != undefined && middleNameInput != '' && middleNameInput.length > 45){
		$("#submitButton").prop("disabled",false);
		navigator.notification.alert('Middle name should not be more than 45 Characters.',alertConfirm,appName,['Ok']);
		return;
	}
	*/
	/*if(middleNameInput != undefined && middleNameInput != '' && middleNameInput.length < 3){
		$("#submitButton").prop("disabled",false);
		navigator.notification.alert('Middle name should not be minimum 3 Characters.',alertConfirm,appName,['Ok']);
		return;
	}*/
	
	if(countryInput != undefined && countryInput != ''){
		countryExist = true;
	}else{
		$("#submitButton").prop("disabled",false);
		//navigator.notification.alert('Country is required fields.',alertConfirm,appName,['Ok']);
		return;
	}
	if(primarySpecialityInput != undefined && primarySpecialityInput != ''){
		priSpecExist = true;
	}else{
		$("#submitButton").prop("disabled",false);
		//navigator.notification.alert('Primary Speciality is required fields.',alertConfirm,appName,['Ok']);
		return;
	}
	if(secondarySpecialityInput != undefined && secondarySpecialityInput != ''){
		secSpecExist = true;
	}else{
		$("#submitButton").prop("disabled",false);
		//navigator.notification.alert('Secondary Speciality is required fields.',alertConfirm,appName,['Ok']);
		return;
	}
	if(primaryNumberInput != undefined && primaryNumberInput != ''){
		primaryNumberExist = true;
	}
	if(emailIdInput != undefined && emailIdInput != ''){
		emailIdExist = true;
	}
	/*
	else{
		$("#submitButton").prop("disabled",false);
		//navigator.notification.alert('EmailId is required fields.',alertConfirm,appName,['Ok']);
		return;
	}
	
	if(emailIdExist && emailIdInput.length > 201){
		$("#submitButton").prop("disabled",false);
		navigator.notification.alert('Email Id should not be more than 200 Characters.',alertConfirm,appName,['Ok']);
		return;
	}
	
	if(emailIdExist && emailIdInput.length < 5){
		$("#submitButton").prop("disabled",false);
		navigator.notification.alert('Email Id should not be minimum 5 Characters.',alertConfirm,appName,['Ok']);
		return;
	}
	*/
	
	if(primaryNumberExist && !validatePhone(primaryNumberInput)){
		$("#submitButton").prop("disabled",false);
		//navigator.notification.alert('Please enter only numbers.',alertConfirm,appName,['Ok']);
		return false;
	}
	
	if(emailIdExist && !isValidEmail(emailIdInput) ){
		$("#submitButton").prop("disabled",false);
		//navigator.notification.alert('Please enter valid email Id.',alertConfirm,appName,['Ok']);
		return;
	}else if(emailIdExist && isValidEmail(emailIdInput)){
		emailOkay = true;
	}else{
		return false;
	}
	
	if(!emailOkay && !primaryNumberExist){
		$("#submitButton").prop("disabled",false);
		navigator.notification.alert('EmailId or PrimaryNumber is required fields.',alertConfirm,appName,['Ok']);
		return;
	}
	
	/*if(primaryNumberExist && primaryNumberInput.length > 45){
		$("#submitButton").prop("disabled",false);
		navigator.notification.alert('Telephone no. should not be more than 45 Characters.',alertConfirm,appName,['Ok']);
		return;
	}*/
	
	/*if(primaryNumberExist && primaryNumberInput.length < 3){
		$("#submitButton").prop("disabled",false);
		navigator.notification.alert('Telephone no. should not be minimum 3 Characters.',alertConfirm,appName,['Ok']);
		return;
	}*/
	
	if(countryExist && priSpecExist && secSpecExist && firstNameExist && lastNameExist && (primaryNumberExist || emailOkay)){
		var dataToSend = new Object();
		dataToSend['firstName'] = firstNameInput;
		dataToSend['middleName'] = middleNameInput;
		dataToSend['lastName'] = lastNameInput;
		dataToSend['medicalProfileId'] = primarySpecialityInput;
		dataToSend['practiceCategoryId'] = secondarySpecialityInput;
		dataToSend['telephoneNumber'] = primaryNumberInput;
		dataToSend['countryId'] = countryInput;
		dataToSend['stateId'] = stateInput;
		dataToSend['emailId'] = emailIdInput;
		emailIdAfterUpdate = emailIdInput;
		dataToSend['userDetailsId'] = window.localStorage["userDetailsId"];
		dataToSend['emailMapId'] = $('#updateUserDetailsPageForm #emailMapIdForEdit').val();
		updateDataToSend = dataToSend;
		var dataActionType = 'updateUserDetails';
		var oldEmailId = window.localStorage["username"];
		if(oldEmailId != emailIdInput){
			if(testingInBrowser){
				commonUrlToCallServer(JSON.stringify(dataToSend), dataActionType, JSON.stringify(loginData));
			}else{
				navigator.notification.confirm(
			            ("Are you really want to change the EmailId?"), // message
			            sendUpdateDataToServer, // callback
			            appName, // title
			            ['YES','NO'] // buttonName
						);
			}
			
		}else{
			commonUrlToCallServer(JSON.stringify(dataToSend), dataActionType, JSON.stringify(loginData));
		}
	}else{
		$("#submitButton").prop("disabled",false);
		//navigator.notification.alert('FirstName, EmailId/PrimaryNumber, Country, Primary Speciality, Secondary Speciality are required fields.',alertConfirm,appName,['Ok']);
	}
}

function sendUpdateDataToServer(button){
	if(button=="1" || button==1){
    	showModal();
		var dataActionType = 'updateUserDetails';
		commonUrlToCallServer(JSON.stringify(updateDataToSend), dataActionType, JSON.stringify(loginData));
    }else{
		var oldEmailId = window.localStorage["username"];
		$('#updateUserDetailsPageForm #emailIdInput').val(oldEmailId);
	}
}

function successUserDetailsFn(responseData){
	hideModal();
	$("#submitButton").prop("disabled",false);
	var validMessageCode = responseData['validMessageCode'];
	if(validMessageCode == 0){
		var message = responseData['message'];
		var emailId = responseData['emailId'];
		//if(emailIdAfterUpdate != '' && emailIdAfterUpdate != undefined){
			window.localStorage["email"] = emailId;
			window.localStorage["username"] = emailId;
			$('.physician-mailId').text(emailId);
			window.localStorage["name"] = responseData['name'];
			$('.physician-priSpeciality').text(responseData['primarySpeciality']);
			$('.physician-name').text(responseData['name']);
		//}
		navigator.notification.alert(message,alertConfirm,appName,['Ok']);
		setTimeout(function(){
			gotoShowProfilePage(false, 1);
	    },500);
		
	}else{
		var message = responseData['message'];
		navigator.notification.alert(message,alertConfirm,appName,['Ok']);
	}
}

function forgotPasswordFn(){
	var dataToSend = new Object();
	$("#submitButton").prop("disabled",true);
	var emailId = $('#forgotPasswordPageForm #forgotEmailIdInput').val();
	var emailOkay = false;
	if(emailId != '' && emailId != undefined){
		dataToSend['emailId'] = emailId;
		if( !isValidEmail(emailId) ){
			//navigator.notification.alert('Please enter valid email Id.',alertConfirm,appName,['Ok']);
			return;
		}else{
			emailOkay = true;
		}
		if(emailOkay){
			var dataActionType = 'forgotPassword';
			showModal();
			commonUrlToCallServer(JSON.stringify(dataToSend), dataActionType, JSON.stringify(loginData));
		}
	}else{
		$("#submitButton").prop("disabled",false);
		//navigator.notification.alert('Please enter emailId',alertConfirm,appName,['Ok']);
	}
}

function successForgotPasswordFn(responseData){
	hideModal();
	$("#submitButton").prop("disabled",false);
	var validMessageCode = responseData['validMessageCode'];
	if(validMessageCode == 0){
		window.localStorage["password"] = '';
		navigator.notification.alert('User password has been successfully sent to your mail',alertConfirm,appName,['Ok']);
	}else{
		var message = responseData['message'];
		navigator.notification.alert(message,alertConfirm,appName,['Ok']);
	}
}

var newPasswordTemp = '';
function changePasswordFn(){
	var newPassword = $('#changePasswordPageForm #newPasswordInput').val();
	var confirmPassword = $('#changePasswordPageForm #confirmPasswordInput').val();
	var oldPassword = $('#changePasswordPageForm #oldPasswordInput').val();
	var form = $("#changePasswordPageForm");
	//form.find("#submitButton").prop("disabled",true);
	$("#submitButton").prop("disabled",true);
	if(newPassword != '' && confirmPassword != '' && oldPassword != '' && newPassword != undefined && confirmPassword != undefined && oldPassword != undefined){
		if(newPassword.length >= 5 && confirmPassword.length >= 5 && oldPassword.length >= 5){
			if(newPassword == confirmPassword){
				var dataToSend = new Object();
				dataToSend['userDetailsId'] = window.localStorage["userDetailsId"];
				dataToSend['oldPassword'] = $('#changePasswordPageForm #oldPasswordInput').val();
				dataToSend['newPassword'] = newPassword;
				newPasswordTemp = newPassword;
				var dataActionType = 'changePassword';
				showModal();
				commonUrlToCallServer(JSON.stringify(dataToSend), dataActionType, JSON.stringify(loginData));
			}else{
				//form.find("#submitButton").prop("disabled",false);
				$("#submitButton").prop("disabled",false);
				//navigator.notification.alert('New & confirm passwords should be same.',alertConfirm,appName,['Ok']);
			}
		}else{
			//form.find("#submitButton").prop("disabled",false);
			$("#submitButton").prop("disabled",false);
			if(newPassword.length < 5){
				//navigator.notification.alert('New Password should be atleast 5 characters.',alertConfirm,appName,['Ok']);
			}
			if(confirmPassword.length < 5){
				//navigator.notification.alert('New Password should be atleast 5 characters.',alertConfirm,appName,['Ok']);
			}
			if(oldPassword.length < 5){
				//navigator.notification.alert('New Password should be atleast 5 characters.',alertConfirm,appName,['Ok']);
			}
		}
	}else{
		//form.find("#submitButton").prop("disabled",false);
		$("#submitButton").prop("disabled",false);
		//navigator.notification.alert('Please Fill Required Fields.',alertConfirm,appName,['Ok']);
	}
}

function successChangePasswordFn(responseData){
	hideModal();
	var validMessageCode = responseData['validMessageCode'];
	$("#submitButton").prop("disabled",false);
	if(validMessageCode == 0){
		window.localStorage["password"] = newPasswordTemp;
		window.localStorage["user_logged_in"] = 0;
		window.localStorage["ID"] = '';
		window.localStorage["permissions"] = '';
		window.localStorage["email"] = '';
		window.localStorage["name"] = '';
		window.localStorage["userDetailsId"] = '';
		gotoLoginPage();
		navigator.notification.alert('User password has been successfully Changed. Please login with new password.',alertConfirm,appName,['Ok']);
	}else{
		var message = responseData['message'];
		navigator.notification.alert(message,alertConfirm,appName,['Ok']);
	}
}

function showUnsubscribeData(){
	var dataToSend = new Object();
	dataToSend['userDetailsId'] = window.localStorage["userDetailsId"];
	var dataActionType = 'showUnsubscribeData';
	showModal();
	commonUrlToCallServer(JSON.stringify(dataToSend), dataActionType, JSON.stringify(loginData));
}

function appendUnsubscribeDataToUser(responseData){
	var validMessageCode = responseData['validMessageCode'];
	var mainUnsubRadioButtonTag = '<fieldset data-role="controlgroup" class="ui-controlgroup ui-controlgroup-vertical ui-corner-all">';
		mainUnsubRadioButtonTag += '<div class="ui-controlgroup-controls ">';
		hideModal();
	if(validMessageCode == 0){
		var jsonArray = responseData['jsonArray'];
		console.log(jsonArray);
		
		for(var i=0;i<jsonArray.length;i++){
			var jsonArrayObj = jsonArray[i];
			var unsubOne = jsonArrayObj['1']
			var unsubTwo = jsonArrayObj['2'];
			var unsubThree = jsonArrayObj['3'];
			var unsubFour = jsonArrayObj['4'];
			mainUnsubRadioButtonTag += '<div class="ui-radio" onclick="unsubChangeFn(this);"> <label for="unsubscribeType1" class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-radio-on ui-first-child">'+unsubOne+'</label> <input type="radio" id="unsubscribeType1" name="unsubscribeType" value="0" checked="checked"></div>';
			mainUnsubRadioButtonTag += '<div class="ui-radio" onclick="unsubChangeFn(this);"> <label for="unsubscribeType2" class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-radio-off">'+unsubTwo+'</label> <input type="radio" id="unsubscribeType2" name="unsubscribeType" value="1"></div>';
			mainUnsubRadioButtonTag += '<div class="ui-radio" onclick="unsubChangeFn(this);"> <label for="unsubscribeType3" class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-radio-off">'+unsubThree+'</label> <input type="radio" id="unsubscribeType3" name="unsubscribeType" value="2"></div>';
			mainUnsubRadioButtonTag += '<div class="ui-radio" onclick="unsubChangeFn(this);"> <label for="unsubscribeType4" class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-radio-off">'+unsubFour+'</label> <input type="radio" id="unsubscribeType4" name="unsubscribeType" value="3"></div>';
		}
		mainUnsubRadioButtonTag += '</div></fieldset>';
		var firstLine = responseData['unsubPolicy'];
		var secondLine = responseData['unsubscribeReason'];
		$('#firstLineUnsub').empty();
		$('#secondLineUnsub').empty();
		$('#firstLineUnsub').append(firstLine);
		$('#secondLineUnsub').append(secondLine);
		$('#unSubscribeComment').val('');
		$('#appendUnsubscribeList').empty();
		$('#appendUnsubscribeList').append(mainUnsubRadioButtonTag);
		
	}else{
		var message = responseData['message'];
		navigator.notification.alert(message,alertConfirm,appName,['Ok']);
	}
}

function unsubChangeFn(data){
	$('.ui-radio').find('label').removeClass('ui-radio-on').addClass('ui-radio-off');
	$(data).find('label').removeClass('ui-radio-off').addClass('ui-radio-on');
}

function unsubscribeConfirmData(){
	navigator.notification.confirm(
            ("Are you really want to unsubscribe?"), // message
            showUnsubscribeSubmitPageForm, // callback
            appName, // title
            ['YES','NO'] // buttonName
    );
	//$('#unsubButton').attr("onclick","saveUpdateUnsubscribeData(this);");
}

function showUnsubscribeSubmitPageForm(button){
    if(button=="1" || button == 1){
    	saveUpdateUnsubscribeData('');
    }
}

function saveUpdateUnsubscribeData(data){
	$("#submitButton").prop("disabled",true);
	var dataToSend = new Object();
	dataToSend['userDetailsId'] = window.localStorage["userDetailsId"];
	dataToSend['unSubscribeSelectionTypeId'] = $('input[name=unsubscribeType]:checked').val();
	dataToSend['unSubscribeComment'] = $('#unSubscribeComment').val();
	console.log(dataToSend);
	var dataActionType = 'saveUpdateUnsubscribeData';
	showModal();
	commonUrlToCallServer(JSON.stringify(dataToSend), dataActionType, JSON.stringify(loginData));
}

function successUnsubscribeFn(response){
	$("#submitButton").prop("disabled",false);
	var validMessageCode = response['validMessageCode'];
	hideModal();
	var message = response['message'];
	if(validMessageCode == 0){
		navigator.notification.alert('Thank you for your review.',alertConfirm,appName,['Ok']);
		window.localStorage["password"] = '';
		window.localStorage["user_logged_in"] = 0;
		window.localStorage["ID"] = '';
		window.localStorage["permissions"] = '';
		window.localStorage["email"] = '';
		window.localStorage["name"] = '';
		window.localStorage["userDetailsId"] = '';
		gotoLoginPage();
	}else{
		navigator.notification.alert(message,alertConfirm,appName,['Ok']);
	}
}

function homePageDataFromServer(data){
	var dataToSend = new Object();
	dataToSend['userDetailsId'] = window.localStorage["userDetailsId"];
	var dataActionType = 'physicianHomePage';
	if(data == 1){
		showModal();
	}
	$('#earnedIncentives').text(0);
	$('#usedIncentives').text(0);
	$('#totalIncentives').text(0);
	$('#missedIncenPhy').text(0);
	$('#totalIncenPhy').text(0);
	commonUrlToCallServer(JSON.stringify(dataToSend), dataActionType, JSON.stringify(loginData));
}

function successHomePageDataFn(responseData){
	//$('.onlineRewardsClass').hide();
	var validMessageCode = responseData['validMessageCode'];
	$('#earnedIncentives').text(0);
	$('#usedIncentives').text(0);
	$('#totalIncentives').text(0);
	$('#missedIncenPhy').text(0);
	$('#totalIncenPhy').text(0);
	if(validMessageCode == 0){
		var fullName = responseData["fullName"];
		window.localStorage["name"] = fullName;
		$('#physicianName').text(fullName);
		if(responseData['medicalProfileName'] != ''){
			$('.physician-priSpeciality').text(responseData['medicalProfileName']);
		}else{
			$('.physician-priSpeciality').text('-----');
		}
		if(responseData['practiceCategoryName'] != ''){
			$('.physician-secSpeciality').text(responseData['practiceCategoryName']);
		}else{
			$('.physician-secSpeciality').text('-----');
		}
		window.localStorage["countryId"] = responseData['countryId'];
		window.localStorage["countryName"] = responseData['countryName'];
		$('.physician-mailId').text(window.localStorage["email"]);
		var surveyInvitationCount = responseData['surveysInvitationCount'];
		var surveyLiveCount = responseData['surveysOnGoingCount'];
		var surveyCompletedCount = responseData['surveysCompletedCount'];
		var surveyNotPartCount = responseData['surveysNotParticipatedCount'];
		var onlineRewardsLinkStatus = responseData['redeemPointsExist'];
		var earnedIncentiveBySurvey = responseData['earnedIncentives'];
		var missedIncentiveBySurvey = responseData['missedIncentives'];
		var totalIncentivesBySurvey = responseData['totalIncentivesBySurveys'];
		var approvedIncentives = responseData['approvedIncentives'];
		//var totalIncentivesBySurvey = parseInt(earnedIncentiveBySurvey)+parseInt(missedIncentiveBySurvey);
		/*if(testingInBrowser){
			if(onlinerewardsInBrowserStatus){
				onlineRewardsLinkStatus = true;
			}
		}*/
		if(onlineRewardsLinkStatus == true || onlineRewardsLinkStatus == "true"){
			var balanceRedeemPoints = responseData['balanceRedeemPoints'];
			var usedIncentives = responseData['usedIncentives'];
			var totalIncentives = responseData['totalIncentives'];
			var onlineRewardLink = '';
			if(testingInBrowser){
				onlineRewardLink = 'http://www.google.co.in/';
			}else{
				onlineRewardLink = responseData['onlineRewardsLink'];
			}
			$('#earnedIncentives').text(balanceRedeemPoints);
			$('#usedIncentives').text(usedIncentives);
			$('#totalIncentives').text(approvedIncentives);
			//$('.onlineRewardsUsers').show();
			//$('.nonOnlineUsers').hide();
			$('.incentive-info .redeemLinkClass').attr("data-urllink",onlineRewardLink);
			$('.incentive-info .redeemLinkClass').attr("onclick","openInAppBrowser(this);");
			$('.incentive-info .redeemLinkClass').attr('data-linktype','2');
			$('.incentive-info .redeemLinkClass').attr('data-redeempoints',balanceRedeemPoints);
			$('.rewardsUsersIcons').show();
			$('.nonRewardsUsersIcons').hide();
			
			var historyExist = responseData['historyExist'];
			var totalHistoryData = '';
			if(historyExist == true || historyExist == "true"){
				var redeemHistoryData = responseData['redeemHistoryData'];
				if(redeemHistoryData.length > 0){
					jQuery.each(redeemHistoryData, function(indexHistory,valueHistory) { 
						var localHistoryRow = '';
						var orderDate = valueHistory['orderDate'];
						var price = valueHistory['pointsUsed'];
						var orderStatus = valueHistory['orderStatus'];
						localHistoryRow +='<tr><td>'+orderDate+'</td>';
						localHistoryRow +='<td>'+orderStatus+'</td>';
						localHistoryRow +='<td>'+price+'</td></tr>';
						totalHistoryData += localHistoryRow;
					});
				}
			}else{
				totalHistoryData += '<tr><td colspan="3"> No data found. </td></tr>';
			}
			$('.redeem-History .redeemHistoryTable').find('tbody').empty();
			$('.redeem-History .redeemHistoryTable').find('tbody').append(totalHistoryData);
			//$('#earnedIncentives').parent('div').find('label').text('Ready to Redeem');
			//$('#usedIncentives').parent('div').find('label').text('Used  Incentives');
			//$('#totalIncentives').parent('div').find('label').text('Total Incentives');
		}else{
			$('.rewardsUsersIcons').hide();
			$('.nonRewardsUsersIcons').show();
			//$('.onlineRewardsUsers').hide();
			//$('.nonOnlineUsers').show();
			//$('#earnedIncentives').parent('div').find('label').text('Earned Incentives');
			//$('#usedIncentives').parent('div').find('label').text('Missed  Incentives');
			//$('#totalIncentives').parent('div').find('label').text('Total Incentives');
			//$('#earnedIncentives').text(earnedIncentiveBySurvey);
			$('#missedIncenPhy').text(missedIncentiveBySurvey);
			$('#totalIncenPhy').text(earnedIncentiveBySurvey);
		}
		var systemOpenWindow = '_system';
		
		if(surveyInvitationCount != '' && surveyInvitationCount != undefined){
			$('.invitationSurvey').empty();
			$('.invitationSurvey').append(surveyInvitationCount);
		}
		if(surveyLiveCount != '' && surveyLiveCount != undefined){
			$('.liveSurvey').empty();
			$('.liveSurvey').append(surveyLiveCount);
		}
		if(surveyCompletedCount != '' && surveyCompletedCount != undefined){
			$('.completedSurvey').empty();
			$('.completedSurvey').append(surveyCompletedCount);
		}
		if(surveyNotPartCount != '' && surveyNotPartCount != undefined){
			$('.nonParticipateSurvey').empty();
			$('.nonParticipateSurvey').append(surveyNotPartCount);
		}
		
		var surveysInvitationArray = responseData['surveysInvitationArray'];
		var surveysLiveArray = responseData['surveysLiveArray'];
		var surveysCompletedArray = responseData['surveysCompletedArray'];
		var surveysNotParticipatedArray = responseData['surveysNotParticipatedArray'];
		/*var jsonArrayNeedToLaunchArray = responseData['jsonArrayNeedToLaunch'];*/
		$('.inviteSurveysClass ul.survey-list-view').empty();
		$('.liveSurveysClass ul.survey-list-view').empty();
		$('.completedSurveysClass ul.survey-list-view').empty();
		$('.nonPartSurveysClass ul.survey-list-view').empty();
		$('.needToLaunchClass ul.survey-list-view').empty();
		var liveSurveyCount = surveysLiveArray.length;
		$('.live-survey-list-label-div').text('Live Surveys List ('+liveSurveyCount+')');
		/*var needToLaunchCount = jsonArrayNeedToLaunchArray.length;
		$('.need-to-launch-list-label-div').text('Need to launch surveys ('+needToLaunchCount+')');*/
		if(surveysInvitationArray.length > 0){
			$('.latestSurveyDiv').show();
			$('.noDataExistDiv').hide();
			var surveyInvitationMainDiv = '';
			var surveyInvitationHomePageDiv = '';
			jQuery.each(surveysInvitationArray, function(indexInvite,valueInvite) { 
				var localDiv = '';
				var surveyMainId = valueInvite['surveyMainId'];
				var surveyNumber = valueInvite['surveyNumber'];
				var surveyName = valueInvite['surveyName'];
				var surveyEndDate = valueInvite['surveyEndDate'];
				var incentives = valueInvite['incentives'];
				var duration = valueInvite['duration'];
				var surveyCriteriaId = valueInvite['surveyCriteriaId'];
				var acceptanceStatus = valueInvite['acceptanceStatus']
				var acceptanceStatusId = valueInvite['acceptanceStatusId'];
				var surveyReceivedDate = valueInvite['surveyReceivedDate'];
				var surveyParticipateLink = valueInvite['surveyParticipateLink'];
				var surveyPanelistMapId = valueInvite['surveyPanalistMapId'];
				var userAcceptLink = '';
				var userDeclinedLink = '';
				if(acceptanceStatusId == '1'){
					userAcceptLink += valueInvite['userAcceptLink'];
					userDeclinedLink += valueInvite['userDeclinedLink'];
				}
				var projectNumber = valueInvite['projectNumber'];
				var projectName = valueInvite['projectName'];
				var surveyProjectId = valueInvite['surveyProjectId'];
				var surveyLink = valueInvite['surveyLink'];
				var projectType = valueInvite['projectType'];
				
				localDiv += '<li class="box" ><div class="list-border"></div><i class="fa  fa-calendar-o"></i>';
				localDiv += '<div class="survey-content"><i class="fa fa-arrow-right"></i><div class="arrow"></div><p id="projectName">'+projectName+ '<span id="surveyNumber"> (' +surveyNumber+') </span></p>';
				localDiv += '<p id="surveyEndDate">End Date '+surveyEndDate+'</p>';
				localDiv += '<p id="incentives" class="survey-font-size">Incentives <span id="incentiveValue" class="gp-light-blue">'+incentives+'</span>';
				localDiv += '&nbsp; LOI <span id="durationValue" class="gp-light-blue">'+duration+'</span></p>';
				if(testingInBrowser && indexInvite == 1){
					acceptanceStatusId = 1;
				}
				localDiv += '<a href="#" class="ui-shadow ui-corner-all" data-urllink="'+surveyLink+'" data-spmid="'+surveyPanelistMapId+'" onclick="gotoSurveyLinkPage(this);"> Survey Link </a>';
				
				/* 
				if(acceptanceStatusId == '1'){
					localDiv += '<div class="ui-grid-a"><div class="ui-block-a log-data-show"><a href="#" class="st-ui-btn" id="submitUpdateId" value="Accept" data-flag="add" data-linktype="3" data-urllink="'+userAcceptLink+'" onclick="openInAppBrowser(this);">Accept</a></div>';
					localDiv += '<div class="ui-block-b"><a href="#" class="st-ui-btn" id="submitUpdateId" value="Decline" data-flag="add" data-linktype="3" data-urllink="'+userDeclinedLink+'" onclick="openInAppBrowser(this);">Decline</a></div></div>';					
				}else if(acceptanceStatusId == '4'){
					localDiv += '<a href="#" class="ui-shadow ui-corner-all" data-urllink="'+surveyLink+'" data-linktype="3" onclick="openInAppBrowser(this);"> Access Survey </a>';
				}
				*/
				
				localDiv +='</div>';
				localDiv += '</li>';
				/* 
				localDiv += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-align-left">';
				localDiv += '<div class="box">';
				localDiv += '<div class="row survey-details-border">';
				localDiv += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 survey-border-right">';
				localDiv += '<label id="projectName">Project: <span class="gp-light-blue">'+projectName+'</span></label>';
				localDiv += '<label id="surveyNumber">Study Id: <span class="gp-light-blue">'+surveyNumber+'</span></label>';
				localDiv += '<label id="surveyEndDate">Survey End Date: <span class="gp-light-blue"> '+surveyEndDate+'</span></label>';
				localDiv += '<label id="acceptanceStatus">Status: <span class="gp-light-blue">'+acceptanceStatus+'</span></label>';
				localDiv += '<label id="incentives">Incentives: <span id="incentiveValue" class="gp-light-blue">'+incentives+'</span></label>';
				localDiv += '<label id="duration">Duration: <span id="durationVal" class="gp-light-blue">'+duration+'</span></label>';
				if(acceptanceStatusId == '1'){
					
					localDiv += '<div class="ui-grid-a"><div class="ui-block-a log-data-show"><a href="#" class="ui-btn st-ui-btn" id="submitUpdateId" value="Decline" data-flag="add" data-urllink="'+userDeclinedLink.toString()+'" onclick="openInAppBrowser(this);">Decline</a></div>';
					localDiv += '<div class="ui-block-b"><a href="#" class="ui-btn st-ui-btn" id="submitUpdateId" value="Accept" data-flag="add" data-urllink="'+userAcceptLink.toString()+'" onclick="openInAppBrowser(this);">Accept</a></div></div>';					
				}else if(acceptanceStatusId == '4'){
					localDiv += '<button class="ui-btn ui-shadow ui-corner-all" data-urllink="'+surveyLink.toString()+'" onclick="openInAppBrowser(this);"> Access Survey </button>';
				}
				localDiv += '</div>';
				localDiv += '<div class="col-xs-3 col-sm-3 col-md-2 col-lg-2">';
				localDiv += '</div></div></div>';
				
				if(indexInvite == 0){
					$('.invitations-info .projectName').text(projectName);
					$('.invitations-info .surveyNumber').text(surveyNumber);
					$('.invitations-info .receivedDate span').text(surveyReceivedDate);
					$('.invitations-info .surveyEndDate span').text(surveyEndDate);
					$('.invitations-info .incentiveValue').text(incentives);
					$('.invitations-info .durationVal').text(duration);
				}
				*/
				surveyInvitationMainDiv += localDiv;
			});
			$('.inviteSurveysClass ul.survey-list-view').append(surveyInvitationMainDiv);
		}else{
			var nosurveyFound = '<li><p>No survey found.</p></li>'
			$('.inviteSurveysClass ul.survey-list-view').append(nosurveyFound);
		}
		
		/*
		if(jsonArrayNeedToLaunchArray.length > 0){
			var surveysNeededToLaunch = '';
			jQuery.each(jsonArrayNeedToLaunchArray, function(indexInvite,valueInvite) { 
				var localDiv = '';
				var surveyMainId = valueInvite['surveyMainId'];
				var surveyNumber = valueInvite['surveyNumber'];
				var surveyName = valueInvite['surveyName'];
				var surveyEndDate = valueInvite['surveyEndDate'];
				var incentives = valueInvite['incentives'];
				var duration = valueInvite['duration'];
				var surveyCriteriaId = valueInvite['surveyCriteriaId'];
				var acceptanceStatus = valueInvite['acceptanceStatus']
				var acceptanceStatusId = valueInvite['acceptanceStatusId'];
				var surveyReceivedDate = valueInvite['surveyReceivedDate'];
				var surveyParticipateLink = valueInvite['surveyParticipateLink'];
				var userAcceptLink = '';
				var userDeclinedLink = '';
				if(acceptanceStatusId == '1'){
					userAcceptLink += valueInvite['userAcceptLink'];
					userDeclinedLink += valueInvite['userDeclinedLink'];
				}
				var surveyPanelistMapId = valueInvite['surveyPanalistMapId'];
				var projectNumber = valueInvite['projectNumber'];
				var projectName = valueInvite['projectName'];
				var surveyProjectId = valueInvite['surveyProjectId'];
				var surveyLink = valueInvite['surveyLink'];
				var projectType = valueInvite['projectType'];
				
				localDiv += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-align-left">';
				localDiv += '<div class="box">';
				localDiv += '<div class="row survey-details-border">';
				localDiv += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 survey-border-right">';
				localDiv += '<label id="projectName">Project: <span class="gp-light-blue">'+projectName+'</span></label>';
				localDiv += '<label id="surveyNumber">Study Id: <span class="gp-light-blue">'+surveyNumber+'</span></label>';
				localDiv += '<label id="surveyEndDate">Survey End Date: <span class="gp-light-blue"> '+surveyEndDate+'</span></label>';
				localDiv += '<label id="acceptanceStatus">Status: <span class="gp-light-blue">'+acceptanceStatus+'</span></label>';
				localDiv += '<label id="incentives">Incentives: <span id="incentiveValue" class="gp-light-blue">'+incentives+'</span></label>';
				localDiv += '<label id="duration">Duration: <span id="durationVal" class="gp-light-blue">'+duration+'</span></label>';
				localDiv += '</div></div></div></div>';
				
				surveysNeededToLaunch += localDiv;
			});
			$('.needToLaunchClass ul.survey-list-view').append(surveysNeededToLaunch);
		}else{
			var nosurveyFound = '<li><p>No survey found.</p></li>'
			$('.needToLaunchClass ul.survey-list-view').append(nosurveyFound);
		}
		*/
		
		if(surveysLiveArray.length > 0){
			var surveyLiveMainDiv = '';
			var homePageLiveSurveysDiv = '';
			jQuery.each(surveysLiveArray, function(indexLive,valueLive) { 
				var localDiv = '';
				var homePageLocalDiv = '';
				var surveyMainId = valueLive['surveyMainId'];
				var surveyNumber = valueLive['surveyNumber'];
				var surveyName = valueLive['surveyName'];
				var surveyEndDate = valueLive['surveyEndDate'];
				var incentives = valueLive['incentives'];
				var duration = valueLive['duration'];
				var surveyCriteriaId = valueLive['surveyCriteriaId'];
				var acceptanceStatus = valueLive['acceptanceStatus']
				var acceptanceStatusId = valueLive['acceptanceStatusId'];
				var surveyReceivedDate = valueLive['surveyReceivedDate'];
				var surveyParticipateLink = valueLive['surveyParticipateLink'];
				var projectNumber = valueLive['projectNumber'];
				var projectName = valueLive['projectName'];
				var surveyProjectId = valueLive['surveyProjectId'];
				var surveyPanelistMapId = valueLive['surveyPanalistMapId'];
				var surveyLink = valueLive['surveyLink'];
				var projectType = valueLive['projectType'];
				
				
				localDiv += '<li class="box" ><div class="list-border"></div><i class="fa  fa-calendar-o"></i>';
				//localDiv += '<div class="survey-content" data-urllink="'+surveyLink+'" data-linktype="3" onclick="openInAppBrowser(this);"><i class="fa fa-arrow-right"></i><div class="arrow"></div><p id="projectName">'+projectName+ '<span id="surveyNumber"> (' +surveyNumber+') </span></p>';
				localDiv += '<div class="survey-content" data-urllink="'+surveyLink+'" data-linktype="3"><i class="fa fa-arrow-right"></i><div class="arrow"></div><p id="projectName">'+projectName+ '<span id="surveyNumber"> (' +surveyNumber+') </span></p>';
				localDiv += '<p id="surveyEndDate">End Date '+surveyEndDate+'</p>';
				localDiv += '<p id="incentives" class="survey-font-size">Incentives <span id="incentiveValue" class="gp-light-blue">'+incentives+'</span>';
				localDiv += '&nbsp; LOI <span id="durationValue" class="gp-light-blue">'+duration+'</span></p>';
				localDiv += '<a href="#" class="ui-shadow ui-corner-all" data-urllink="'+surveyLink+'" data-spmid="'+surveyPanelistMapId+'" onclick="gotoSurveyLinkPage(this);"> Survey Link </a></div>';
				localDiv += '</li>';
				
				surveyLiveMainDiv += localDiv;
				/*
				homePageLocalDiv += '<div class="row survey-details-border" data-urllink="'+surveyLink+'" onclick="openInAppBrowser(this);">';
				homePageLocalDiv += '<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 survey-border-right">';
				homePageLocalDiv += '<div class="invitation-name margin-live-survey">';
				homePageLocalDiv += '<p class="projectName">'+projectName+' </p>';
				homePageLocalDiv += '<span class="surveyNumber">'+surveyNumber+' </span>';
				homePageLocalDiv += '</div>';
				homePageLocalDiv += '<div class="invitation-date margin-live-survey">';
				homePageLocalDiv += '<label class="receivedDate"> <i class="fa fa-download"></i>Received : <span>'+surveyReceivedDate+'</span></label>';
				homePageLocalDiv += '<label class="surveyEndDate"><i class="fa fa-clock-o"></i>End : <span>'+surveyEndDate+'</span></label>';
				homePageLocalDiv += '</div>';
				homePageLocalDiv += '<div class="invitation-insentive row margin-live-survey">';
				homePageLocalDiv += '<p class="inc-live-survey"><label id="incentives">Incentive :  </label><span class="incentiveValue"> '+incentives+'</span></p>';
				homePageLocalDiv += '<p class="dur-live-survey"><label id="duration">Duration :  </label><span class="durationVal">'+duration+'</span></p>';
				homePageLocalDiv += '</div>';
				homePageLocalDiv += '</div>';
				homePageLocalDiv += '<div class="col-gp col-xs-2 col-sm-2 col-md-2 col-lg-2">';
				homePageLocalDiv += '<a href="#" class="invitations-all"><i class="fa  fa-arrow-right"></i></a>';
				homePageLocalDiv += '</div>';
				homePageLocalDiv += '</div>';
				
				homePageLiveSurveysDiv += homePageLocalDiv;
				
				*/
				
			});
			$('.liveSurveysClass').show();
			$('.liveSurveysClass ul.survey-list-view').append(surveyLiveMainDiv);
			$('.liveSurveysClassHomePage').empty();
			$('.liveSurveysClassHomePage').append(homePageLiveSurveysDiv);
		}else{
			var nosurveyFound = '<li><p>No survey found.</p></li>'
			$('.liveSurveysClass ul.survey-list-view').append(nosurveyFound);
		}
		if(surveysCompletedArray.length > 0){
			var surveyCompletedMainDiv = '';
			jQuery.each(surveysCompletedArray, function(indexCompleted,valueCompleted) { 
				var localDiv = '';
				var surveyMainId = valueCompleted['surveyMainId'];
				var surveyNumber = valueCompleted['surveyNumber'];
				var surveyName = valueCompleted['surveyName'];
				var surveyEndDate = valueCompleted['surveyEndDate'];
				var incentives = valueCompleted['incentives'];
				var duration = valueCompleted['duration'];
				var surveyCriteriaId = valueCompleted['surveyCriteriaId'];
				var acceptanceStatus = valueCompleted['acceptanceStatus']
				var acceptanceStatusId = valueCompleted['acceptanceStatusId'];
				var surveyReceivedDate = valueCompleted['surveyReceivedDate'];
				var surveyParticipateLink = valueCompleted['surveyParticipateLink'];
				var surveyPanelistMapId = valueCompleted['surveyPanalistMapId'];
				var projectNumber = valueCompleted['projectNumber'];
				var projectName = valueCompleted['projectName'];
				var surveyProjectId = valueCompleted['surveyProjectId'];
				//var surveyLink = valueCompleted['surveyLink'];
				var projectType = valueCompleted['projectType'];
				var completedStatus = valueCompleted['completedStatus'];
				
				/*
				localDiv += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-align-left">';
				localDiv += '<div class="box">';
				localDiv += '<div class="row survey-details-border">';
				localDiv += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 survey-border-right">';
				localDiv += '<label id="projectName">Project: <span class="gp-light-blue">'+projectName+'</span></label>';
				localDiv += '<label id="surveyNumber">Study Id: <span class="gp-light-blue">'+surveyNumber+'</span></label>';
				localDiv += '<label id="surveyEndDate">Survey End Date: <span class="gp-light-blue"> '+surveyEndDate+'</span></label>';
				localDiv += '<label id="acceptanceStatus">Status: <span class="gp-light-blue">'+acceptanceStatus+'</span></label>';
				localDiv += '<label id="incentives">Incentives: <span id="incentiveValue" class="gp-light-blue">'+incentives+'</span></label>';
				localDiv += '<label id="duration">Duration: <span id="durationVal" class="gp-light-blue">'+duration+'</span></label>';
				localDiv += '</div></div></div></div>';
				*/
				
				localDiv += '<li class="box" ><div class="list-border"></div><i class="fa  fa-calendar-o"></i>';
				localDiv += '<div class="survey-content"><i class="fa fa-arrow-right"></i><div class="arrow"></div><p id="projectName">'+projectName+ '<span id="surveyNumber"> (' +surveyNumber+') </span></p>';
				localDiv += '<p id="surveyEndDate">End Date '+surveyEndDate+'</p>';
				localDiv += '<p id="incentives" class="survey-font-size">Incentives <span id="incentiveValue" class="gp-light-blue">'+incentives+'</span>';
				localDiv += '&nbsp; LOI <span id="durationValue" class="gp-light-blue">'+duration+'</span></p>';
				localDiv += '<p id="surveyStatus" class="survey-font-size">Status: <span id="durationValue" class="gp-light-blue">'+completedStatus+'</span></p></div>';
				
				surveyCompletedMainDiv += localDiv;
			});
			$('.completedSurveysClass ul.survey-list-view').append(surveyCompletedMainDiv);
		}else{
			var nosurveyFound = '<li><p>No survey found.</p></li>'
			$('.completedSurveysClass ul.survey-list-view').append(nosurveyFound);
		}
		if(surveysNotParticipatedArray.length > 0){
			var surveyNotPartMainDiv = '';
			jQuery.each(surveysNotParticipatedArray, function(indexNonPart,valueNonPart) { 
				var localDiv = '';
				var surveyMainId = valueNonPart['surveyMainId'];
				var surveyNumber = valueNonPart['surveyNumber'];
				var surveyName = valueNonPart['surveyName'];
				var surveyEndDate = valueNonPart['surveyEndDate'];
				var incentives = valueNonPart['incentives'];
				var duration = valueNonPart['duration'];
				var surveyCriteriaId = valueNonPart['surveyCriteriaId'];
				var acceptanceStatus = valueNonPart['acceptanceStatus']
				var acceptanceStatusId = valueNonPart['acceptanceStatusId'];
				var surveyReceivedDate = valueNonPart['surveyReceivedDate'];
				var surveyParticipateLink = valueNonPart['surveyParticipateLink'];
				var surveyPanelistMapId = valueNonPart['surveyPanalistMapId'];
				var projectNumber = valueNonPart['projectNumber'];
				var projectName = valueNonPart['projectName'];
				var surveyProjectId = valueNonPart['surveyProjectId'];
				var surveyLink = valueNonPart['surveyLink'];
				var projectType = valueNonPart['projectType'];
				
				/*
				localDiv += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-align-left">';
				localDiv += '<div class="box">';
				localDiv += '<div class="row survey-details-border">';
				localDiv += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 survey-border-right">';
				localDiv += '<label id="projectName">Project: <span class="gp-light-blue">'+projectName+'</span></label>';
				localDiv += '<label id="surveyNumber">Study Id: <span class="gp-light-blue">'+surveyNumber+'</span></label>';
				localDiv += '<label id="surveyEndDate">Survey End Date: <span class="gp-light-blue"> '+surveyEndDate+'</span></label>';
				localDiv += '<label id="acceptanceStatus">Status: <span class="gp-light-blue">'+acceptanceStatus+'</span></label>';
				localDiv += '<label id="incentives">Incentives: <span id="incentiveValue" class="gp-light-blue">'+incentives+'</span></label>';
				localDiv += '<label id="duration">Duration: <span id="durationVal" class="gp-light-blue">'+duration+'</span></label>';
				localDiv += '</div></div></div></div>';
				*/
				
				localDiv += '<li class="box" ><div class="list-border"></div><i class="fa  fa-calendar-o"></i>';
				localDiv += '<div class="survey-content"><i class="fa fa-arrow-right"></i><div class="arrow"></div><p id="projectName">'+projectName+ '<span id="surveyNumber"> (' +surveyNumber+') </span></p>';
				localDiv += '<p id="surveyEndDate">End Date '+surveyEndDate+'</p>';
				localDiv += '<p id="incentives" class="survey-font-size">Incentives <span id="incentiveValue" class="gp-light-blue">'+incentives+'</span>';
				localDiv += ' &nbsp;LOI <span id="durationValue" class="gp-light-blue">'+duration+'</span></p>';
				localDiv += '</div>';
				
				surveyNotPartMainDiv += localDiv;
			});
			$('.nonPartSurveysClass ul.survey-list-view').append(surveyNotPartMainDiv);
		}else{
			var nosurveyFound = '<li><p>No survey found.</p></li>'
			$('.nonPartSurveysClass ul.survey-list-view').append(nosurveyFound);
		}
		$('.inviteSurveysClass').hide();
		$('.liveSurveysClass').hide();
		$('.completedSurveysClass').hide();
		$('.nonPartSurveysClass').hide();
		$('#needToLaunchClass').hide();
		$('#inviteSurveysHeading').hide();
		$('#liveSurveysHeading').hide();
		$('#completedSurveysHeading').hide();
		$('#nonPartSurveysHeading').hide();
		$('.needToLaunchHeading').hide();
		
		
		
	}else{
		var message = responseData['message'];
		navigator.notification.alert(message,alertConfirm,appName,['Ok']);
	}
	hideModal();
}

function showSurveysByTypeFn(type){
	$(".setting-popup").hide();
	$('.inviteSurveysClass').hide();
	$('.liveSurveysClass').hide();
	$('.completedSurveysClass').hide();
	$('.nonPartSurveysClass').hide();
	$('.needToLaunchClass').hide();
	
	$('#inviteSurveysHeading').hide();
	$('#liveSurveysHeading').hide();
	$('#completedSurveysHeading').hide();
	$('#nonPartSurveysHeading').hide();
	$('#needToLaunchHeading').hide();
	$('.show-Surveys .nav-btn span').removeClass('active');
	if(type == '1'){
		$('.inviteSurveysClass').show();
		$('#inviteSurveysHeading').show();
		$('.show-Surveys .nav-btn6 span').addClass('active');
	}else if(type == '2'){
		$('.liveSurveysClass').show();
		$('#liveSurveysHeading').show();
		$('.show-Surveys .nav-btn1 span').addClass('active');
	}else if(type == '3'){
		$('.completedSurveysClass').show();
		$('#completedSurveysHeading').show();
		$('.show-Surveys .nav-btn7 span').addClass('active');
	}else if(type == '4'){
		$('.nonPartSurveysClass').show();
		$('#nonPartSurveysHeading').show();
		$('.show-Surveys .nav-btn8 span').addClass('active');
	}else if(type == '5'){
		$('.needToLaunchClass').show();
		$('#needToLaunchHeading').show();
	}
	gotoSurveysPage();
}


var inAppBrowserRef;
function openInAppBrowser(thiss) {
	var urllink=$(thiss).data('urllink');
	var linktype = $(thiss).data('linktype');
	if(linktype == '2' || linktype == 2){
		var redeemPoints = $(thiss).data('redeempoints');
		if(parseInt(redeemPoints) <= 0){
			navigator.notification.alert('Points are not available for redeem.',alertConfirm,appName,['Ok']);
			return false;
		}
	}
	if(devicePlatform == 'iOS' || device.platform.toUpperCase() == 'IOS'){
		window.open(urllink, '_system', 'location=yes');
		e.preventDefault();
	}else  if(devicePlatform == 'Android' || device.platform.toUpperCase() == 'ANDROID'){
		navigator.app.loadUrl(urllink, { openExternal: true });
		e.preventDefault();
	}
}
 
function loadStartCallBack() {
    $('#status-message').text("loading please wait ...");
	//showModal();
}
 
function loadStopCallBack() {
    if (inAppBrowserRef != undefined) {
        inAppBrowserRef.insertCSS({ code: "body{font-size: 25px;" });
        $('#status-message').text("");
        inAppBrowserRef.removeEventListener('loadstart', loadStartCallBack);
        inAppBrowserRef.removeEventListener('loadstop', loadStopCallBack);
        inAppBrowserRef.removeEventListener('loaderror', loadErrorCallBack);
        inAppBrowserRef.show();
    }else{
    	$('#status-message').text('Sorry there is some issue. Please contact your supporter.');
    	navigator.notification.alert('Sorry there is some issue. Please contact your supporter.',alertConfirm,appName,['Ok']);
    }
}
 
function loadErrorCallBack(params) {
    $('#status-message').text("");
    var scriptErrorMesssage =
       "alert('Sorry we cannot open that page. Message from the server is : "
       + params.message + "');"
 
    inAppBrowserRef.executeScript({ code: scriptErrorMesssage }, executeScriptCallBack);
    inAppBrowserRef.close();
    inAppBrowserRef = undefined;
}
 
function executeScriptCallBack(params) {
 
    if (params[0] == null) {
 
        $('#status-message').text(
           "Sorry we couldn't open that page. Message from the server is : '"
           + params.message + "'");
    }
}

function dataTypeCheckJSON(someobj) {
	var dataType="";
	try {
		if (typeof someobj != 'string'){
			if(a.constructor.name === 'Array'){
				dataType="Array";
			}
			else if(a.constructor.name === 'Object'){
				dataType="Object";
			}
		}else if (typeof someobj == 'string'){
			dataType="string";
		}else{
			dataType="other";
		}
	} catch (e) {
		dataType="other";
	}
	return dataType;
}

function successActionFn(){
	$('#alert-Message').hide();
	//alert('alert showing');
	$('#messagePopup').show();
	$("#messagePopup").popup("open");
	$('.messagePopup').text('alert showing');
	
}

function noActionFn(){
	$('#alert-Message').hide();
}

function commonActionPopupClickFn(thiss){
	// commonActionPopup
	
}

function handleExternalURLs() {
    // Handle click events for all external URLs
    if (device.platform.toUpperCase() === 'ANDROID') {
        $(document).on('click', 'a[href^="http"]', function (e) {
            var url = $(this).attr('href');
            navigator.app.loadUrl(url, { openExternal: true });
            e.preventDefault();
        });
    }
    else if (device.platform.toUpperCase() === 'IOS') {
        $(document).on('click', 'a[href^="http"]', function (e) {
            var url = $(this).attr('href');
            alert('Hi...................... '+url);
            window.open(url, '_system');
            e.preventDefault();
        });
    }
    else {
        // Leave standard behaviour
    }
}

function handleExternalURLsData(thiss) {
    // Handle click events for all external URLs
    if (device.platform.toUpperCase() === 'ANDROID') {
        $(document).on('click', 'a.test[href^="http"]', function (e) {
            var url = $(this).attr('href');
            navigator.app.loadUrl(url, { openExternal: true });
            e.preventDefault();
        });
    }
    else if (device.platform == 'iOS' || device.platform.toUpperCase() === 'IOS') {
       //$(document).on('click', 'a.test[href^="http"]', function (e) {
    	   //alert('Hi........ ');
           var url = 'http://www.google.co.in/';//$(thiss).attr('href');
           window.open(url, '_system');
           e.preventDefault();
      // });
    }
    else {
        // Leave standard behaviour
    }
} 
function settingPopupFn(){
	$(".setting-popup").toggle();
	//$(".setting-popup").show();
}
function commonFn(){
	if($('.setting-popup').is(":visible")){
		$(".setting-popup").hide();
	}/*else{
		
	}*/
	
	/*if ($('.setting-popup').css('display') === 'none') {
	    //alert('hide');
	}else{
		$(".setting-popup").hide();
	}*/
}
function surveyMailIdToggle(){
	$(".surveyMailIdClass").show();
}

function sendSurveyLinkFn(){
	var spmId = $('#surveyLinkPageForm #surveyLinkPageSPMId').val();
	var surveyLink = $('#surveyLinkPageForm #surveyLinkPageSurveyLink').val();
	var newMailId = $('#surveyNewEmailIdInput').val();
	if(newMailId != undefined && newMailId != ''){
		var emailOkay = false;
		
		if(isValidEmail(newMailId) ){
			emailOkay = true;
		}else{
			return false;
		}
		if(emailOkay){
			$("#submitButton").prop("disabled",true);
			var dataToSend = new Object();
			dataToSend['spmId'] = spmId;
			dataToSend['surveyLink'] = surveyLink;
			dataToSend['newMailId'] = newMailId;
			var dataActionType = 'sendSurveyLink';
			showModal();
			commonUrlToCallServer(JSON.stringify(dataToSend), dataActionType, JSON.stringify(loginData));
		}
	}
}

function successSendSurveyMailFn(responseData){
	hideModal();
	var validMessageCode = responseData['validMessageCode'];
	$("#submitButton").prop("disabled",false);
	var message = responseData['message'];
	if(validMessageCode == 0){
		var emailId = responseData['emailId'];
		window.localStorage["email"] = emailId;
		window.localStorage["username"] = emailId;
		$('.physician-mailId').text(emailId);
		gotoHomePage(1);
	}
	navigator.notification.alert(message,alertConfirm,appName,['Ok']);
}

function sendContactUsDataFn(){
	var fullNameInput = $('#contactUsForm #fullNameInput').val();
	var emailIdInput = $('#contactUsForm #emailIdInput').val();
	//var telephoneNumberInput = $('#contactUsForm #telephoneNumberInput').val();
	//var subjectInput = $('#contactUsForm #subjectInput').val();
	var countryInput = $('#contactUsForm #countryInput :selected').val();
	var emailBodyInput = $('#contactUsForm #emailBodyInput').val();
	
	var userLoggedIn = window.localStorage["user_logged_in"];
	if(userLoggedIn == 1 || userLoggedIn == '1'){
		fullNameInput = window.localStorage["name"];
		emailIdInput = window.localStorage["username"];
		countryInput = window.localStorage["countryId"];
	}
	
	var nameExist = false;
	var emailExist = false; var telephoneExist = false; var subjectExist = false; var emailBodyExist = false;
	var emailOkay = false;
	var countryExist = false;
	if(fullNameInput != '' && fullNameInput != undefined){
		nameExist = true;
	}
	if(emailIdInput != '' && emailIdInput != undefined){
		emailExist = true;
	}
	/*if(telephoneNumberInput != '' && telephoneNumberInput != undefined){
		telephoneExist = true;
	}
	if(subjectInput != '' && subjectInput != undefined){
		subjectExist = true;
	}*/
	if(countryInput != '' && countryInput != undefined){
		countryExist = true;
	}
	if(emailBodyInput != undefined && emailBodyInput != ''){
		emailBodyExist = true;
	}
	if(emailExist && !isValidEmail(emailIdInput) ){
		//navigator.notification.alert('Please enter valid email Id.',alertConfirm,appName,['Ok']);
		return;
	}else if(emailExist && isValidEmail(emailIdInput) ){
		emailOkay = true;
	}else{
		return false;
	}
	//if(nameExist && telephoneExist && emailExist && subjectExist && emailBodyExist){
	if(nameExist && countryExist && emailOkay && emailBodyExist){
		$("#submitButton").prop("disabled",true);
		var dataToSend = new Object();
		dataToSend['name'] = fullNameInput;
		dataToSend['emailId'] = emailIdInput;
		//dataToSend['telephoneNumber'] = telephoneNumberInput;
		//dataToSend['subject'] = subjectInput;
		dataToSend['countryInput'] = countryInput;
		dataToSend['emailBody'] = emailBodyInput;
		var dataActionType = 'sendContactUsDetails';
		actionTypeResp = dataActionType;
		showModal();
		commonUrlToCallServer(JSON.stringify(dataToSend), dataActionType, JSON.stringify(loginData));
	}else{
		//$("#submitButton").prop("disabled",false);
		hideModal();
	}
}

function sendContactUsDetailsFn(responseData){
	hideModal();
	var validMessageCode = responseData['validMessageCode'];
	actionTypeResp = '';
	$("#submitButton").prop("disabled",false);
	var message = responseData['message'];
	if(validMessageCode == 0){
		var userLoggedIn = window.localStorage["user_logged_in"];
		if(userLoggedIn == 1){
			gotoHomePage(1);
		}else{
			gotoLoginPage();
		}
	}
	navigator.notification.alert(message,alertConfirm,appName,['Ok']);
}