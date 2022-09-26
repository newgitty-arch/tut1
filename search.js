let submit = document.getElementById("submit");
submit.onclick = search;


function search(){
	let name = document.getElementById("name").value;
	let inStock = document.getElementById("inStock").checked;
    console.log(inStock)
    

	let req = new XMLHttpRequest();
	req.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			window.location.href = `products?name=${name}&inStock=${inStock}`;
		}
	}

	req.open("GET", `http://localhost:3000/products?name=${name}&inStock=${inStock}`);
	req.setRequestHeader("Content-Type", "application/json");
	req.send();
}
