function updateLocation() {
    var json = "https://freegeoip.app/json/";
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log(response.city + "!");
            document.getElementById("location").value =
                response.city + ", " + response.region_code;
        }
    };

    xhr.open("GET", json, true);
    xhr.send();
}

function check() {
    event.preventDefault();
    const text =
        document.createCardForm.message.value +
        document.createCardForm.location.value +
        document.createCardForm.name.value;
    axios
        .get(
            `https://www.purgomalum.com/service/containsprofanity?text=${text}`
        )
        .then(function (response) {
            if (response.data == true) {
                alert("Your message cannot contain profanity");
                return false;
            } else {
                var img = document.createCardForm.img.value;
                if (!img) {
                    document.createCardForm.submit();
                    return true;
                }
                if (img.substring(0, 8) != "https://") {
                    alert(
                        "Hmmm... that image link doesn't look right. Make sure to include https:// and an image extension in your address."
                    );
                    return false;
                } else {
                    axios
                        .get(img)
                        .then(function (response) {
							document.createCardForm.submit();
                            return true;
                        })
                        .catch(function (error) {
                            alert(
                                "This doesn't look like a valid link. Try again."
                            );
                            return false;
                        });
                }
            }
        });
}

function reportCard(id) {
    axios
        .post("/cards/report", {
            id: id,
        })
        .then(function (res) {
            window.location.reload();
        });
}

function heartCard(id) {
    axios
        .post("/cards/heart", {
            id: id,
        })
        .then(function (res) {
            window.location.reload();
        });
}
