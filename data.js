/*
author: Matt Courts
description: lightweight mvc framework for online shop selling cameras.  Academic assignment
version: 1.0

code map:
main function
|-model
|	|___modelControl
|			|_Item info
|			|_customer info	
|
|-control
|	|___dataStorage
|	|		|_cookie controls
|	|		|_localStorage control
|	|
|	|_cart control
|	|_form control
|
|-view
	|_data presentation functions and formatting
*/
var MVC = function(){
//this. declares public
	
	//model layer
	var modelControl = function(){

		function itemControl(){
			var items = new Array();

			//item data as an object
			var item = function(ID, name, description, price, picture){
				this.ID = ID;
				this.name = name;
				this.description = description;
				this.price = price;
				this.picture = picture;	
			}
		
			//add an item
			this.add = function(ID, name, description, price){
					var imgPath = "images/" + ID + ".png";
					items[ID] = new item(ID, name, description, price, imgPath);
			}

			//remove the item
			this.remove = function(ID){
				delete items[ID];	
			}

			//view the item
			this.view = function(ID){
				try {
					return items[ID];	
				} catch(e){
					console.log("Item: " + ID + "Not found" + e);	
				}
			}

			//get list of ID's
			this.IDList = function(){
				var list = new Array();
				for (key in items){
					list.push(key);
				}
				return list;				
			}

			//add 9 items
			this.add(100, "Nikon D4", "<ul><li>DSLR Camera</li><li>Body only</li><li>CMOS 13.2 MP</li></ul>", 5996.99);
			this.add(101, "Nikon D3000", "<ul><li>DSLR Camera</li><li>Body only</li><li>CMOS 10.2 MP</li></ul>", 359.95);
			this.add(102, "Nikon D3200", "<ul><li>DSLR Camera</li><li>Body only</li><li>CMOS 24.2 MP</li></ul>", 429.95);
			this.add(103, "Nikon D5100", "<ul><li>DSLR Camera</li><li>Body only</li><li>CMOS 16.2 MP</li></ul>", 595.99);
			this.add(104, "Nikon D3000 3x 18-55mm", "<ul><li>DSLR Camera</li><li>3x 10-55 lens</li><li>CMOS 10.2 MP</li></ul>", 439.99);
			this.add(105, "Nikon D5100 18-55mm", "<ul><li>DSLR Camera</li><li>10-55 lens</li><li>CMOS 16.2 MP</li></ul>", 799.99);
			this.add(106, "Dolica Profession Tripod", "<ul><li>Camera Tripod</li><li>18.5\"-62\"</li><li>quick release locking legs</li></ul>", 69.99);
			this.add(107, "Dolica Camera Case", "<ul><li>Camera bag</li><li>8.66\"x6.30\"x5.7\"</li><li>Water Proof</li></ul>", 19.99);
			this.add(108, "Nikon Neoprene Neck Strap", "<ul><li>Neck Strap</li><li>1' long</li><li>Soft, Padded, Neoprene</li></ul>", 6.00);
		}
		this.item = new itemControl();

		function customerControl(){
			var customerList = new Array();

			var customer = function(ID, firstName, lastName, address, address2, city, state, zip, phone, creditCard, cardType, cardCSC, cardLastFour){
				this.ID = ID;
				this.firstName = firstName;
				this.lastName = lastName;
				this.address = address;
				this.address2 = address2;
				this.city = city;
				this.state = state;
				this.zip = zip;
				this.phone = phone;
				this.creditCard = creditCard;
				this.cardType = cardType;
				this.cardCSC = cardCSC;
				this.cardLastFour = cardLastFour;
			}

			this.newCustomer = function(firstName, lastName, address, address2, city, state, zip, phone, creditCard, cardType, cardCSC, cardLastFour){
				if (arguments.length === 12){
					var ID = Math.floor((Math.random() * 1000) + 1000);
					customerList[ID] = new customer(ID, firstName, lastName, address, address2, city, state, zip, phone, creditCard, cardType, cardCSC, cardLastFour);
					
					var cust = customerList[ID];
					for (itm in cust){
						control.storage.save(itm, cust[itm]);
					}

					return ID;
				} else {
					console.log("error adding new customer" + arguments);
				}
			}

			this.remove = function(ID){
				console.log('f');
				delete customerList[ID];
			}

			this.view = function(ID){
				return customerList[ID];
			}

			this.update = function(ID, field, data){
				customerList[ID][field] = data;
			}
			
			this.getAll = function(){
				return customerList;
			}

		}
		this.customer = new customerControl();
		
	}
	var model = new modelControl();
	
	//control layer
	var storeControl = function(){
		
		//cookie and local storage functions
		function dataStorage(){

			var cookiesEnabled = false;

			//cookie functions not visible outside parent function
			function cookieControl(){
				var cookieSet = false;

				//save a cookie
				this.save = function(cName, cValue, cdays) {
					var jDate = new Date();
					if (!cdays) cdays = 30;
					jDate.setDate(jDate.getDate() + cdays);
					var encValue = encodeURI(cValue); //escape function deprecated
					document.cookie = cName + '=' + encValue + '=' + jDate.toGMTString();
				}

				//retrieve a particular cookie
				this.get = function(cName){
					var cValue = document.cookie;
					var cStart = cValue.indexOf(" " + cName + "=");
					if (cStart == -1){
					  	cStart = cValue.indexOf(cName + "=");
					}
					if (cStart == -1){
						cValue = null;
					} else{
						cStart = cValue.indexOf("=", cStart) + 1;
						var cEnd = cValue.indexOf(";", cStart);
						if (cEnd == -1){
							cEnd = cValue.length;
						}
					cValue = decodeURI(cValue.substring(cStart,cEnd));
					}
					return cValue;
				}

				//retrieve all cookies in array
				this.getCookies = function(){
					var cookies = document.cookie;
					if (cookies === ""){
						var cookieSplit="";
						for (item in cookies){
							var tempSplit = cookies[item].split('=');
							cookieSplit[tempSplit[0]] = tempSplit[1];
						}
						for (itm in cookieSplit){
							cookieSplit[itm] = decodeURI(cookieSplit[itm]);
						}
						return cookieSplit;
					} else {
						return false;
					}
					
				}

				//remove cookie
				this.delete = function(cName){
					document.cookie = cName + "" + "-1";
				}
			}
			var cookie = new cookieControl();

			//fallback for local cookie saving issue.  HTML 5 Local storage functions.   not visible outside parent function
			function localStorageControl(){

				//save the data
				this.save = function(name, value){
					if (typeof(Storage) !== "undefined"){
						localStorage[name] = encodeURI(value);
					} else {
						document.log("localStorage not available defaulting to cookies");
						this.setCookie(name, value);
					}
				}

				//retrieve the data
				this.get = function(name){
					try {
						return localStorage[name];
					} catch(e){
						document.log("cannot find " + name + " in local Storage\n" + e);
					}
				}

				//delete the data
				this.delete = function(name){
					delete localStorage[name];
				}

				//returns all data in local storage
				this.all = function(){
					if (!localStorage){
						return false;
					}
					return localStorage;
				}
			}
			var locStorage = new localStorageControl();

			//save the data to enabled source
			this.save = function(name, data){
				if (cookiesEnabled){
					cookie.save(name, data);
				} else {
					locStorage.save(name, data);
				}
			}

			//update the data to enabled source
			this.update = function(name, data){
				if (cookiesEnabled){
					cookie.save(name, data);
				} else {
					locStorage.save(name, data);
				}
			}

			//delete the data from the enabled source
			this.delete = function(name){
				if (cookiesEnabled){
					cookie.delete(name);
				} else {
					locStorage.delete(name);
				}
			}

			//retrieve the data from the enabled source
			this.get = function(name){
				if (cookiesEnabled){
					return cookie.get(name);
				} else {
					return locStorage.get(name);
				}
			}

			this.getAll = function(){
				var ctemp = cookie.getCookies();
				var ltemp = locStorage.all();
				if (!ctemp && !ltemp){
					return false;
				} else if(!ltemp && ctemp){
					return ctemp;
				} else if (ltemp && !ctemp){
					return ltemp;
				} else {
					return ctemp.concat(ltemp);
				}
				return false; //fallback 
			}

			//test cookie saving - for local testing then reads the sources
			cookie.save("test", "test", 1);
			if (cookie.get("test") === null){
				cookiesEnabled = false;
			} else {
				cookie.delete("test");
				cookiesEnabled = true;				
			}

		}
		var storage = new dataStorage();
		this.storage = storage;


		function cartControl(){
			var itemCart = new Array();
			const tax = 0.06;
			const shippingTax = 0.03;

			//add an item to the cart and save
			this.add = function(ID, count){
				try {
					itemCart[ID] = count;
					storage.save(ID,count);
				} catch(e){
					alert("cannot add item" + ID + count + "\n error: " + e);	
				}
			}
	
			//remove the item from the cart check if cart is empy afterward
			this.remove = function(ID){
				try {
					delete itemCart[ID];	
					storage.delete(ID);
					if (itemCart.length === 0){
					}
				} catch(e){
					document.log("cannot remove item" + ID + "\n error: " + e);
				}
			}
	
			this.getItem = function(ID){
				return itemCart[ID];
			}

			//update the item count
			this.update = function(ID, count){
				if (count > 0){
					try {
						itemCart[ID] = count;
						storage.update(ID,count);	
					} catch(e){
						document.log("cannot update cart item" + ID + count + "\n error: " + e);	
					}	
				} else {
					this.remove(ID);
				}
			}
				
			//retrieve cart contents
			this.getCart = function(){
				return itemCart;
			}

			this.getItemCount = function(){
				var counter = 0;
				for (itm in itemCart){
					counter += parseFloat(itemCart[itm]);
				}
				return counter;
			}

			this.emptyCart = function(){
				delete itemCart;
				var itemCart = new Array();
			}
			
			//find subtotal of cart contents
			this.subTotal = function(){
				var subTotal = 0.00;
				for (itm in itemCart){
					var theItem = model.item.view(itm);
					var price = theItem.price;
					var count = itemCart[itm];
					subTotal += price * count;	
				}
				return parseFloat(subTotal).toFixed(2);
			}
			
			//find tax amount of cart contents
			this.cartTax = function(){
				return (this.subTotal() * tax).toFixed(2);
			}

			//the tax number
			this.taxAmount = function(){
				return tax;
			}

			//return shipping cost based on subtotal
			this.shipping = function(){
				return (this.subTotal() * shippingTax).toFixed(2);
			}
			
			//total price of cart contents with tax
			this.total = function(){
				return (parseFloat(this.shipping()) + parseFloat(this.cartTax())).toFixed(2);
			}

			this.cartEmpty = function(){
				if (itemCart.length === 0) {
					return true;
				}
				else {
					return false;
				}
			}

		 	function __construct(){
		 		var temp = storage.getAll();
		 		if (temp){
		 			for (itm in temp){
		 				if (model.item.view(itm)){
		 					itemCart[itm] = temp[itm]; //could not call this.add();	
		 				}
			 		}
		 		}
		 	}
		 	__construct();

		}
		this.cart = new cartControl();
		var cart = this.cart;
		
		function formControl(){
			this.addItem2Cart = function(obj){

				if (model.item.view(obj.id)){
					if (cart.getItem(obj.id)){
						cart.update(obj.id, obj.value);
					} else {
						cart.add(obj.id, obj.value);
					}
				} else {
					console.log("item not found: " + obj.id);
				}
			}

			this.update = function(form){
				var itemInputs = document.getElementsByName("itmInput");
				for (itm in itemInputs){
					console.log(itemInputs[itm]);
					if (itemInputs[itm].value != cart.getItem(itemInputs[itm].id)){
						cart.update(itemInputs[itm].id, itemInputs[itm].value);
					}
				}
				location.reload();
			}

			this.remove = function(form){
				var chckboxes = document.getElementsByName("itmChkBx");
				for (itm in chckboxes){
					if (chckboxes[itm].checked){
						cart.remove(chckboxes[itm].id);
					}
				}
				location.reload();
			}

			this.processForm = function(form){
				prompt();
				var customerID = model.customer.newCustomer(form.First_Name.value, form.Last_Name.value, form.Address1.value, form.Address2.value, form.City.value, form.State.value, form.Zip.value, form.Home_Phone.value, form.creditCard.value, form.creditCardType.selected, form.cardCSC.value, form.creditCard.value.substring(12));
				window.location = "invoice.htm";
			}

			this.toUpper = function(obj){
				var str = obj.value;
				obj.value = str.toUpperCase();
			}

			this.checkZip = function(obj){
				var zip10 = /(^\d{5}$)|(^\d{5}-\d{4}$)/i; //##### | #####-####
					if (!zip10.test(obj.value)){
						alert("Please enter a valid Zip code, \n 12345 or 12345-6789");
						obj.focus();
						obj.select();
					}
			}

			this.isNumber = function(str) {
				return (!isNaN(str));
			}

			this.checkPhone = function(obj) { 
				if (obj.value > 1){
					var regex = /^[(]\d{3}[)][\s?-]\d{3}[\s?-]\d{4}$/i; // (###) ###-#### and (###)-###-####
						if (!regex.test(obj.value)){
							alert("Please enter phone number in the\n(123) 456-7890 format.");
							obj.focus();
						}
				}
			}

			this.checkEmail = function(obj){
				var regex = /^[\w-\._]+@[\w]+\.\w{2,4}$/i;  //test_test.test-test152@test45.com passes
				if (!regex.test(obj.value)){
					alert("Please enter a valid email address");
					obj.focus();	
				}
			}

			this.properCase = function(obj){
				var str = obj.value;
				obj.value = str.substring(0,1).toUpperCase() + str.slice(1);
			}
		}
		this.form = new formControl();

	}	
	this.control = new storeControl();
	var control = this.control; //needed for view function to access control

	//view layer
	function viewControl(){

		//format the items to display the cart
		this.displayCart = function(){
			if (control.cart.getItemCount() > 0){
				var cart = control.cart.getCart();
				document.write("<table><tr><th></th><th>Item</th><th>Price</th><th>Amount</th><th>Total</th></tr>");
			 	for (cartItem in cart){
				 	document.write(printCartItem(cartItem, cart[cartItem]));
				}
				document.write("<tr><td colspan='3'></td><td>Subtotal: </td><td>$" + control.cart.subTotal() + "</td></tr>");
				document.write("<tr><td colspan='3'></td><td>Tax: </td><td>$" + control.cart.cartTax() + "</td></tr>");
				document.write("<tr><td colspan='3'></td><td>Shipping: </td><td>$" + control.cart.shipping() + "</td></tr>");
				document.write("<tr><td colspan='3'></td><td>total: </td><td>$" + control.cart.total() + "</td></tr>");
				document.write('</table>');
			} else {
				document.write("your cart appears to be empty, please visit our <a href=\"store.htm\"> Store</a>");
			}
		}

		//formatter for invoice page
		this.displayInvoice = function(){
			document.write("<h6 style=\"text-align: center;\">MC Cameras<br />5555 someplace rd.<br />cityplace, thatstate, 55555</h6>");
			//used local storage as work around ran out of time
			document.write("<h4 style=\"text-align: left;\">" + localStorage.firstName + " " + localStorage.lastName + "<br />" + localStorage.address + "<br />" + localStorage.city + ", " + localStorage.state + " " + localStorage.zip + "</h4>");
		 	
		 	var cart = control.cart.getCart();
			document.write("<table><tr><th></th><th>Item</th><th>Price</th><th>Amount</th><th>Total</th></tr>");
		 	for (cartItem in cart){
			 	document.write(printCartItem(cartItem, cart[cartItem]));
			}

			document.write("<tr><td colspan='3'></td><td>Subtotal: </td><td>$" + control.cart.subTotal() + "</td></tr>");
			document.write("<tr><td colspan='3'></td><td>Tax: </td><td>$" + control.cart.cartTax() + "</td></tr>");
			document.write("<tr><td colspan='3'></td><td>Shipping: </td><td>$" + control.cart.shipping() + "</td></tr>");
			document.write("<tr><td colspan='3'></td><td>total: </td><td>$" + control.cart.total() + "</td></tr>");
			document.write('</table>');
			control.cart.emptyCart();
			for (itm in cart){
				control.cart.add(itm, cart[itm]);
			}
			delete localStorage;
		}

		//format the items to siplay in the store
		this.printItems = function(){
			var itemList = model.item.IDList(); 
			for (itm in itemList){
				document.writeln(printItem(itemList[itm]))
			}
	 	}

	 	//get random item for feature
	 	this.featureItem = function(){
	 		var itemList = model.item.IDList();
	 		var rand = itemList[Math.floor(Math.random() * itemList.length)];
 			document.write(printItem(rand, true));
	 	}

	 	//displays link to cart in nav bar if cart has items
	 	this.displayCartLink = function(){
			if(!control.cart.cartEmpty()){
				document.write("<a href=\"cart.htm\">Cart(" + control.cart.getItemCount() + ") - $" + control.cart.total() + "</a>");
			}
	 	}

	 	//item formatting horizontal(item-single) or vertical box(item) styles
		function printItem(ID, style){
		 	if (!style) {
		 		var style = "item";
		 	} else {
		 		var style = "item-single";
		 	}
			var itemData = model.item.view(ID);
			var itemHtml = "<div class=\"" + style + "\">";
			itemHtml += "<p><a href=\"#\" onClick=\"window.open('" + itemData.picture + "', '" + itemData.name + "', \'width=300,height=300')\"><img src=\"" + itemData.picture + "\"/></a></p>"; //add picture
			itemHtml += "<div class=\"center\"><h3>" + itemData.name + "</h3><p>" + itemData.description + "</p></div>"; //add description
			itemHtml += "<div class=\"right\"><p>$" + itemData.price.toFixed(2) + "</p><form><input type=\"text\" id=\"" + itemData.ID + "\" maxlength=\"3\" size=\"3\" onChange=\"data.control.form.addItem2Cart(this)\"/><input type=\"button\" name=\"ItemSubmit\" value=\"Add to Cart\" onClick=\"window.location = 'cart.htm'\" /></form></div>"; //add to cart form with price
			itemHtml += "</div>";
			return itemHtml;
		}

		//item formatting for cart page, similar to printItem
		function printCartItem(ID, count){
		 	var itemData = model.item.view(ID);
			var itemHtml = "<tr>";
			itemHtml += "<td><input type=\"checkbox\" id=\"" + ID + "\" name=\"itmChkBx\"></td>"
			itemHtml += "<td>" + itemData.name + "</td>"; //name
			itemHtml += "<td>$" + itemData.price.toFixed(2) + "</td>";//price
			itemHtml += "<td><input type=\"text\" id=\"" + ID + "\" maxlength=\"3\" size=\"3\" value=\"" + count + "\" name=\"itmInput\" /></td>"; //input field
			itemHtml += "<td>$" + (itemData.price * count).toFixed(2)  + "</td>";
			itemHtml += "</tr>";
			return itemHtml;
	 	}

	 	//similar to car item missing the checkbox
	 	function printInvoiceItem(ID, count){
		 	var itemData = model.item.view(ID);
			var itemHtml = "<tr>";
			itemHtml += "<td>" + itemData.name + "</td>"; //name
			itemHtml += "<td>$" + itemData.price.toFixed(2) + "</td>";//price
			itemHtml += "<td><input type=\"text\" id=\"" + ID + "\" maxlength=\"3\" size=\"3\" value=\"" + count + "\" name=\"itmInput\" /></td>"; //input field
			itemHtml += "<td>$" + (itemData.price * count).toFixed(2)  + "</td>";
			itemHtml += "</tr>";
			return itemHtml;
	 	}
	}
	this.view = new viewControl();
}
var data = new MVC();

