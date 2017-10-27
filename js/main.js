/* Object Constructor */
function Item(name, price, image, descript, quantity, firstFlavor, secFlavor, id) {
	this.id = id;
	this.name = name;
	this.price = price;
	this.image = image;
	this.descript = descript;
	this.quantity = quantity;
	this.firstFlavor = firstFlavor;
	this.secFlavor = secFlavor;
}

/* Functions */

// find the next ID in the sequence (for Item constructor)
function getNextId() {
	var storedItems = JSON.parse(localStorage.getItem("items"));
	if (storedItems != null) {
		if (storedItems.length == 0) {
			return 0;
		} else {
			var lastItem = storedItems.pop();
			return lastItem.id + 1;
		}
	} else {
		return 0;
	}
}

// this function is called every time user edits storedItems (add/remove)
function updateList() {
	$(".cart-products").empty();
	var cartTotal = 0.00;
	var storedItems = JSON.parse(localStorage.getItem("items"));
	// update number of items in cart in badge icon
	if (storedItems != null) {
		$(".badge").text(storedItems.length);
		storedItems.forEach( function(storedItem) {
			// calculate cart total from price and quantity
			var total = (parseInt(storedItem.quantity) * parseFloat(storedItem.price)).toFixed(2);
			cartTotal += parseFloat(total);
			// dynamically add html based on number of storedItems
			var cartItem = `<div class="cart-item">
								<img src="` + storedItem.image + `" alt="" class="item-img" id="cart-image"/>
								<div class="item-description">
									<div class="left-descript">
										<h3 id="cart-name">` + storedItem.name + `</h3>
										<span id="cart-flavors"> Additional Flavors: ` + storedItem.firstFlavor + " , " + storedItem.secFlavor +  `</span>
										<p id="price-row"> Price: $<span id="cart-price">` + storedItem.price + `</span> each </p>
										<p id="quantity-row"> Quantity: &nbsp; <span id="cart-quantity">` + storedItem.quantity + `</span></p>
									</div>
									<div class="right-descript">
										<p>Total: $<span id="cart-total">` + total + `</span></p>
										<h3> <span class="small-button hover"> <a href="javascript:void(0);" class="pink" id="remove"><span id="remove-id">` + storedItem.id + `</span> Remove</a></span></h3>
									</div>
								</div> 
							</div>
							<span class="divider" ><hr/></span>`;
			$(".cart-products").append(cartItem);
		});
		
		// dynamically calculate checkout information
		cartTotal = cartTotal.toFixed(2);
		var tax = (cartTotal * 0.085).toFixed(2);
		var shipping = (cartTotal * 0.15).toFixed(2);
		$("#total").text(cartTotal);
		$("#tax").text(tax);
		$("#shipping").text(shipping);
		var grandTotal = parseFloat(cartTotal) + parseFloat(shipping) + parseFloat(tax);
		$("#grand-total").text(grandTotal.toFixed(2));
	}
}


/* Document Load */
$(document).ready( function() {
	
	// button hover animations
	$(".hover").hover( 
		function() {
			$(this).css({"background-color": "#ffa79b"});
			$(this).children().css({"color": "#ffffff"});
		}, function() {
			$(this).css({"background-color": "#ffffff"});
			$(this).children().css({"color": "#ffa79b"});
	});

	$(".fill").click( function() {
		$(".fill").on("mouseenter mouseleave");
		$(this).off("mouseenter mouseleave");
		$(".fill").css({"background-color": "#ffffff"});
		$(".fill").children().css({"color": "#ffa79b"});
		$(this).css({"background-color": "#ffa79b"});
		$(this).children().css({"color": "#ffffff"});
	});


	// change product info based on user's selection
	var origDescription = "Our original cinnamon rolls have won the hearts of many across the nation. A soft, buttery dough is baked to perfection with cinnamon sugar, topped with a simple glaze."
	$("#single").click( function() {
		$("#product-name").text("ORIGINAL (single)"); 
		$("#bun-price").text("1.50");
		$("#bun-img").attr("src", "images/Original.png");
		$("#bun-descript").text(origDescription);
		$(".add-flavor").css({"display": "none"});
		$(".flavors").text("");
	});
	$("#6-pack").click( function() {
		$("#product-name").text("ORIGINAL (6-pack)");
		$("#bun-price").text("8.00"); 
		$("#bun-img").attr("src", "images/6-pack.png");
		$("#bun-descript").text(origDescription + " This pack is perfect for dinner!");
		$(".add-flavor").css({"display": "block"});
	});
	$("#12-pack").click( function() {
		$("#product-name").text("ORIGINAL (12-pack)");
		$("#bun-price").text("15.00");
		$("#bun-img").attr("src", "images/12-pack.png");
		$("#bun-descript").text(origDescription + " This pack is great for parties!");
		$(".add-flavor").css({"display": "block"});
	});

	// additional flavors
	$("#first-flavor").change( function() {
		$("#product-name").css({"margin-bottom": "10px"});
		$("#bun-descript").css({"margin-top": "0"});
		var firstValue = $("#first-flavor").val();
		var secValue = $("#second-flavor").val();
		if (firstValue === "Bacon") {
			$("#first-flavor-img").attr("src", "images/Bacon AddFlavor.png");
		} else {
			$("#first-flavor-img").attr("src", "");
		}
		$(".flavors").text("Additional flavors: " + firstValue + ", " + secValue); 
	});

	$("#second-flavor").change( function() {
		$("#product-name").css({"margin-bottom": "10px"});
		$("#bun-descript").css({"margin-top": "0"});
		var firstValue = $("#first-flavor").val();
		var secValue = $("#second-flavor").val();
		$(".flavors").text("Additional flavors: " + firstValue + ", " + secValue); 
	});

	// store product info to shopping cart
	$("#add-to-cart").click( function() {
		var name = $("#product-name").text();
		var price = $("#bun-price").text();
		var image = $("#bun-img").attr("src");
		var descript = $("#bun-descript").text();
		var quantity = $("#quantity").val();
		var firstFlavor = $("#first-flavor").val();
		var secFlavor = $("#second-flavor").val();
		// construct an item with these attributes
		var id = getNextId();
		var item = new Item(name, price, image, descript, quantity, firstFlavor, secFlavor, id);
		var itemArray = JSON.parse(localStorage.getItem("items"));
		// first time adding to array
		if (itemArray === null) {
			itemArray = [];
		}
		itemArray.push(item);
		var jsonItems = JSON.stringify(itemArray);
		// store item in localStorage so shopping cart can access it
		localStorage.setItem("items", jsonItems);
		// clear quantity after user adds to cart
		$("#quantity").val("");
		updateList();
	});

	updateList();

});

// for dynamically created html
$(document).on("click", "#remove", function() {

	// create word array from text (i.e. "8 Remove") and only save first element which is the ID
	var itemToRemove = $(this).text().split(" ")[0];
	var itemArray = JSON.parse(localStorage.getItem("items"));
	// filter itemArray and remove item that matches ID to remove
	var newArray = itemArray.filter( function(item) {
		return item.id != itemToRemove;
	});
	var jsonItems = JSON.stringify(newArray);
	// reset storedItems to newArray
	localStorage.setItem("items", jsonItems);
	updateList();
});





