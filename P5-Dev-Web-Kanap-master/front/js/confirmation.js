var urlOrderId = document.location.href;
var urlId = new URL(urlOrderId);
var idUrl = urlId.searchParams.get("id");
if (idUrl) {
    var nodeId = document.getElementById("orderId");
    nodeId.textContent = idUrl;
    var listLocalStorage = [];
    localStorage.setItem("objetL", JSON.stringify(listLocalStorage));
} else {
    alert('Erreur 404')
    document.location.href = `index.html`;
}
