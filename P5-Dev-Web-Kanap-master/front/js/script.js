fetch("http://localhost:3000/api/products")
    .then(function (data) {
        if (data.ok) {
            return data.json();
        
        }
       
    })
 
    .then(function (productList) {
        
       
        for (productList of productList) {



            
            document.querySelector(".items").innerHTML +=
                `<a href="product.html?id=${productList._id }">
                <article>
                    <img src="${productList.imageUrl}" alt="${productList.altText}">
                    <h3 class="productName">${productList.name}</h3>
                    <p class="productDescription">${productList.description}</p>
                </article>
            </a>`;
        }
    })

