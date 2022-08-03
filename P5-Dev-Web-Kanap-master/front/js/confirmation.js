var urlOrderId = document.location.href;
var urlId = new URL(urlOrderId);
var idUrl = urlId.searchParams.get("id");
if (idUrl) {

    var nodeId = document.getElementById("orderId");
    nodeId.textContent = idUrl;
    var listLocalStorage = [];
    localStorage.setItem("objetL", JSON.stringify(listLocalStorage));
} else {
    
//    displaynone aucune commande n a ete passe veulliez retourner a l accueil
//    innerhtml ==>accueil.html
}
