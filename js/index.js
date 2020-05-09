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
    var check =
        document.createCardForm.message.value +
        document.createCardForm.location.value +
        document.createCardForm.name.value;
    axios
        .get(
            `https://www.purgomalum.com/service/containsprofanity?text=${check}`
        )
        .then(function (response) {
            if (response.data == true) {
                alert("Your message cannot contain profanity!");
                return false;
            } else {
                return true;
            }
        });
}

function checkImage() {
    event.preventDefault();
    // getting info from img field
    var check = document.createCardForm.img.value;
    console.log(check)
    if (!check) {
        return true;
    }
    // checking for https://
    if (check.substring(0, 7) != 'https://') {
        alert("Hmmm... that image link doesn't look right. Make sure to include https:// and an image extension in your address.");
        return false;
    }
    axios
        .get(check)
        .then(function (response) {
            return true;
        })
        .catch(function (error) {
            alert("This doesn't look like a valid link. Try again.");
            return false;

        })
}

function check() {
    console.log("checkign...");
    console.log(checkProfanity());
    console.log(checkImage());
    if (checkProfanity() && checkImage()) {
        document.createCardForm.submit();
        return true;
    } else {
        alert("Something went wrong. Try again.");
        return false;
    }
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
