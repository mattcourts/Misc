/*
author: Matt Courts
description: field validation validation for web forms
version: 0.5

used regex = /pattern/i; instead of new RegExp();  RegExp was only returning false....
http://gskinner.com/RegExr/
*/

function fillForm(){ //debug only
	document.appForm.First_Name.value = "matt";
	document.appForm.MI.value = "k";
	document.appForm.Last_Name.value = "courts";
	document.appForm.Address1.value = "5555 test rd";
	document.appForm.Address2.value= "";
	document.appForm.City.value = "cincy";
	document.appForm.State.value = "oh";
	document.appForm.Zip.value = "45103";
	document.appForm.Social.value = "555-55-5555";
	document.appForm.Home_Phone.value = "(555)-555-5555";
	document.appForm.Business_Phone.value = "";
	document.appForm.email.value = "test@email.com";
	document.appForm.Spouse_Name.value = "noName";
	document.appForm.Served_From.value = "11/46";
	document.appForm.Served_To.value = "12/47";
	document.appForm.Rank_Rate.value = "RM2";
	document.appForm.Rank_Rate_Discharge.value = "RM6";
	document.appForm.HowFound.value = "Google";
	document.appForm.OtherDescription.value = "no description";
	document.appForm.Membership_Type.value = "Honorary Membership";
	document.appForm.passimage.value = "5555"; //intentional fail
}

function validateFields(){
	var theForm = {	//associative list of all input values
		First_Name: document.appForm.First_Name.value,
		MI: document.appForm.MI.value,
		Last_Name: document.appForm.Last_Name.value,
		Address1: document.appForm.Address1.value,
		Address2: document.appForm.Address2.value,
		City: document.appForm.City.value,
		State: document.appForm.State.value,
		Zip: document.appForm.Zip.value,
		Social: document.appForm.Social.value,
		Home_Phone: document.appForm.Home_Phone.value,
		Business_Phone: document.appForm.Business_Phone.value,
		Cell_Phone: document.appForm.Cell_Phone.value,
		Email: document.appForm.email.value,
		Spouse_Name: document.appForm.Spouse_Name.value,
		Served_From: document.appForm.Served_From.value,
		Served_To: document.appForm.Served_To.value,
		Rank_Rate: document.appForm.Rank_Rate.value,
		Rank_Rate_Discharge: document.appForm.Rank_Rate_Discharge.value,
		HowFound: document.appForm.HowFound.value,
		OtherDescription: document.appForm.OtherDescription.value,
		Membership_Type: document.appForm.Membership_Type.value,
		passimage: document.appForm.passimage.value,
		};
 

 	//validate chars in theForm
	for (item in theForm){
		if (theForm[item].length > 0){
			if (!checkChars(theForm[item])){
				var text = item.replace("_"," ");
				alert("Improper character detected, please check " + text + " field.");
				var validateCheck = false;
			}
		}
	}

		

	if (!validateCheck) { //submit form unless validation error
		document.appForm.method = 'POST';
		document.appForm.action = 'application_confirmation.htm';
		document.appForm.submit();
	} else {
		alert("Error submitting form, please contact the Webmaster at somebody@yahoo.com");
	}
}

function toUpper(obj){
	var str = obj.value;
	obj.value = str.toUpperCase();
}

function checkZip(obj){
	var zip10 = /(^\d{5}$)|(^\d{5}-\d{4}$)/i; //##### | #####-####
		if (!zip10.test(obj.value)){
			alert("Please enter a valid Zip code, \n 12345 or 12345-6789");
			obj.focus();
			obj.select();
		}
}

function isNumber(str) {
	return (!isNaN(str));
}

function checkPhone(obj) { 
	if (obj.value > 1){
		var regex = /^[(]\d{3}[)][\s?-]\d{3}[\s?-]\d{4}$/i; // (###) ###-#### and (###)-###-####
			if (!regex.test(obj.value)){
				alert("Please enter phone number in the\n(123) 456-7890 format.");
				obj.focus();
			}
	}
}

function checkEmail(obj){
	var regex = /^[\w-\._]+@[\w]+\.\w{2,4}$/i;  //test_test.test-test152@test45.com passes
	if (!regex.test(obj.value)){
		alert("Please enter a valid email address");
		obj.focus();	
	}
}

function properCase(obj){
	var str = obj.value;
	obj.value = str.substring(0,1).toUpperCase() + str.slice(1);
}

function checkChars(str){
	var check = ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890()-/,.@" + " ");

	for (var i = 0;  i < str.length; i++){
		var charLoc = check.indexOf(str.charAt(i));  //removes large embeded calls in if statement
		if (str.charAt(i) != check.charAt(charLoc)){
			return false;
		}
	}
	return true;
}

function checkDate(obj){
	var regex = /(^\d{2}\/\d{2}\/\d{2}$)|(^\d{2}\/\d{2}$)|(^\d{2}\/\d{4}$)/i; // ##/##/## | ##/## | ##/####
	if (!regex.test(obj.value)){
		alert("Please enter valid date\n MM/YYYY");
		obj.focus();
	}
}

function checkSocial(obj){
	if (obj.value > 1){	
		var regex = /^\d{3}-\d{2}-\d{4}$/i; //###-##-####
		if (!regex.test(obj.value)){
			alert("Please enter valid Social Security number\n 123-45-7890");
		}
	}
}

function checkHowFound(obj){
	var selection = obj.options[obj.selectedIndex].value;

		if (selection === "Other"){
			if (document.appForm.OtherDescription.value === ""){
				alert("Please describe how you found our website.");
				document.appForm.OtherDescription.focus();
			}
		}
}

function checkSecurityCode(obj){
	if (obj.value != "4jk293"){
		alert("Security code entered incorrectly, please try again");
		obj.focus();
		obj.select();
	}
}
	