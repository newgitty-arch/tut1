
let submit = document.getElementById("add");
submit.onclick = addReview;

function addReview(){
	let review = document.getElementById("review").value;

	body = {review}

	let req = new XMLHttpRequest();
	req.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			window.location.href = window.location.href;
		}
	}

	req.open("POST", `${window.location.href}/reviews`);
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify(body));
}
