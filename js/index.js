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

async function checkProfanity() {
    var input =
        document.createCardForm.message.value +
        document.createCardForm.location.value +
        document.createCardForm.name.value;
    axios
        .get(
            `https://www.purgomalum.com/service/containsprofanity?text=${input}`
        )
        .then(function (response) {
            if (response.data == true) {
                alert("Your message cannot contain profanity!");
                return false;
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            return true;
        });
}

async function checkImage() {
    // getting info from img field
    var img = document.createCardForm.img.value;
    if (!img) {
        return true;
    }
    // imging for https://
    if (img.substring(0, 8) != "https://") {
        alert(
            "Hmmm... that image link doesn't look right. Make sure to include https:// and an image extension in your address."
        );
        return false;
    } else {
        axios
            .get(img)
            .then(function (response) {
                return true;
            })
            .catch(function (error) {
                alert("This doesn't look like a valid link. Try again.");
                return false;
            });
    }
}

async function check() {
    event.preventDefault();
    const profanity = await checkProfanity();
    const image = await checkImage();
    console.log("profanity: " + profanity);
    console.log("image: " + image);
    if (profanity && image) {
        document.createCardForm.submit();
        return true;
    } else {
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
