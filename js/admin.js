function deleteCard(id) {
    axios
        .post("/cards/delete", {
            id: id,
        })
        .then(function (res) {
            window.location.reload();
        });
}
