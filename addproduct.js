let submit = document.getElementById("submit");
submit.onclick = submitProduct;


function submitProduct(){
	let name = document.getElementById("name").value;
	let price = document.getElementById("price").value;
    let dimensions = {"x": document.getElementById("xdimension").value, "y": document.getElementById("ydimension").value, "z": document.getElementById("zdimension").value};
    let stock = document.getElementById("stock").value;
    if(name.length == 0 || price.length == 0){
		alert("You must enter name and price.");
		return;
	}

	let product = {name, price, dimensions, stock};

	let req = new XMLHttpRequest();
	req.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 201){
			window.location.href = "/products/" + JSON.parse(this.responseText).id;
		}
	}

	req.open("POST", "http://localhost:3000/products");
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify(product));
}
