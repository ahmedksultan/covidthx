function deleteCard(id) {
    axios
        .post("/cards/delete", {
            id: id,
        })
        .then(function (res) {
            window.location.reload();
        });
}

function approveCard(id) {
    axios
        .post("/cards/approve", {
            id: id,
        })
        .then(function (res) {
            window.location.reload();
        });
}
