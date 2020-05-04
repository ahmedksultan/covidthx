function updateLocation() {
    var json = "http://ip-api.com/json/?fields=status,city,region";
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.status !== "success") {
                console.log("query failed: " + response.message);
                return;
            }
            console.log(response.city);
            document.getElementById("location").value =
                response.city + ", " + response.region;
        }
    };

    xhr.open("GET", json, true);
    xhr.send();
}

function checkProfanity() {
	event.preventDefault();
    console.log(document.createCardForm.message.value);
    axios
        .get(
            `https://www.purgomalum.com/service/containsprofanity?text=${document.createCardForm.message.value}`
        )
        .then(function (response) {
            if (response.data == true) {
                alert("Your message cannot contain profanity");
                return false;
            } else {
				document.createCardForm.submit();
				return true;
			}
        });
}
