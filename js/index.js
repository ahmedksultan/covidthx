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
                alert("Your message cannot contain profanity");
                return false;
            } else {
                document.createCardForm.submit();
                return true;
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
