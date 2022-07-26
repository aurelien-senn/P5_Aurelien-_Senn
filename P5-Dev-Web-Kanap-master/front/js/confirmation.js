

var urlOrderId = document.location.href;
var urlId = new URL(urlOrderId);
var idUrl = urlId.searchParams.get("id");

var nodeId = document.getElementById("orderId");
nodeId.textContent = idUrl;