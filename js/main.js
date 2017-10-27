/* Object Constructor */
function Item(name, price, image, descript, quantity) {
	this.name = name;
	this.price = price;
	this.image = image;
	this.descript = descript;
	this.quantity = quantity;
}

/* Document Load */
$(document).ready( function() {
	// this function is called every time user edits storedItems (add/remove)
	function updateList() {
		var storedItems = JSON.parse(localStorage.getItem("items"));
		if (storedItems != null) {
			$(".badge").text(storedItems.length);
			storedItems.forEach( function(storedItem) {
				// calculate cart total from price and quantity
				var total = (parseInt(storedItem.quantity) * parseFloat(storedItem.price)).toFixed(2);
				// dynamically add html based on number of storedItems
				var cartItem = `<div class="cart-item">
									<img src="` + storedItem.image + `" alt="" class="item-img" id="cart-image"/>
									<div class="item-description">
										<div class="left-descript">
											<h3 id="cart-name">` + storedItem.name + `</h3>
											<p> Price: $<span id="cart-price">` + storedItem.price + `</span> each </p>
											<p> Quantity &nbsp; <span id="cart-quantity">` + storedItem.quantity + `</span></p>
										</div>
										<div class="right-descript">
											<p>Total: $<span id="cart-total">` + total + `</span></p>
											<h3 class="remove"> <span class="small-button hover-fill"> <a href="javascript:void(0);" class="pink "> Remove</a></span></h3>
										</div>
									</div> 
								</div> `;
				$(".cart-products").append(cartItem);
			});
		}
	}

	// button hover animation
	$(".hover-fill").hover( 
		function() {
			$(this).children().css({"color": "#ffffff"});
		}, function() {
			$(this).children().css({"color": "#ffa79b"});
	});

	$(".hover-fill").click( function() {
		$(".hover-fill").on("mouseenter mouseleave");
		$(this).off("mouseenter mouseleave");
		$(".hover-fill").removeClass("active");
		$(".hover-fill").children().css({"color": "#ffa79b"});
		$(this).addClass("active");
		$(this).children().css({"color": "#ffffff"});
	});


	var origDescription = "Our original cinnamon rolls have won the hearts of many across the nation. A soft, buttery dough is baked to perfection with cinnamon sugar, topped with a simple glaze."
	// change product info based on user's selection
	$("#single").click( function() {
		$("#product-name").text("ORIGINAL (single)"); 
		$("#bun-price").text("1.50");
		$("#bun-img").attr("src", "images/original.png");
		$("#bun-descript").text(origDescription);
		$(".add-flavor").css({"display": "none"});
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

	// store product info to shopping cart
	$("#add-to-cart").click( function() {
		var name = $("#product-name").text();
		var price = $("#bun-price").text();
		var image = $("#bun-img").attr("src");
		var descript = $("#bun-descript").text();
		var quantity = $("#quantity").val();
		// construct an item with these attributes
		var item = new Item(name, price, image, descript, quantity);
		var itemArray = JSON.parse(localStorage.getItem("items"));
		console.log(itemArray);
		// first time adding to array
		if (itemArray === null) {
			itemArray = [];
		}
		itemArray.push(item);
		var jsonItems = JSON.stringify(itemArray);
		// store item in localStorage so shopping cart can access it
		localStorage.setItem("items", jsonItems);
		console.log(localStorage.getItem("items"));
	});
	

	$(".remove").click( function() {
		console.log("hi");
		var itemToRemove = $(this).closest(".cart-item");
		console.log(itemToRemove);
		var itemArray = JSON.parse(localStorage.getItem("items"));
		itemArray = $.grep(itemArray, function(value) {
			return value != itemToRemove;
		});
		var jsonItems = JSON.stringify(itemArray);
		localStorage.setItem("items", jsonItems);
	});

	// var storedItems = JSON.parse(localStorage.getItem("items"));
	// $(".badge").text(storedItems.length);
	// storedItems.forEach( function(storedItem) {
	// 	// calculate cart total from price and quantity
	// 	var total = (parseInt(storedItem.quantity) * parseFloat(storedItem.price)).toFixed(2);
	// 	// dynamically add html based on number of storedItems
	// 	var cartItem = `<div class="cart-item">
	// 						<img src="` + storedItem.image + `" alt="" class="item-img" id="cart-image"/>
	// 						<div class="item-description">
	// 							<div class="left-descript">
	// 								<h3 id="cart-name">` + storedItem.name + `</h3>
	// 								<p> Price: $<span id="cart-price">` + storedItem.price + `</span> each </p>
	// 								<p> Quantity &nbsp; <span id="cart-quantity">` + storedItem.quantity + `</span></p>
	// 							</div>
	// 							<div class="right-descript">
	// 								<p>Total: $<span id="cart-total">` + total + `</span></p>
	// 								<h3 id="remove"> <span class="small-button hover-fill"> <a href="javascript:void(0);" class="pink "> Remove</a></span></h3>
	// 							</div>
	// 						</div> <br/>
	// 					</div> `;
	// 	console.log("add");
	// 	$(".cart-products").append(cartItem);
	// });

	updateList();

	
	


});
