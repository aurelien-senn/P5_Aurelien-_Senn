fetch("http://localhost:3000/api/products")
.then(function(data){
    if(data.ok) {
        return data.json();
    }
})

.then(function(productList){
    console.log(productList);
    console.log(productList[0].imageUrl);
    for(productList of productList){
       

        document.querySelector(".items").innerHTML +=
            `<a href="#">
                <article>
                    <img src="${productList.imageUrl}" alt="${productList.altText}">
                    <h3 class="productName">${productList.name}</h3>
                    <p class="productDescription">${productList.description}</p>
                </article>
            </a>`;
       

    }
})
