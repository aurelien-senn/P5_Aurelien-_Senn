fetch("http://localhost:3000/api/products")
    .then(function (data) {
        if (data.ok) {
            return data.json();
        }

    })

    .then(function (productList) {
        

        for (productList of productList) {

            var items = document.querySelector(".items");
           
            var a = document.createElement('a');
            var article = document.createElement('article');
            var image = document.createElement('img');
            var h3 = document.createElement('h3');
            var p = document.createElement('p')
            a.setAttribute('href', `product.html?id=${productList._id}`);
            image.setAttribute('src', `${productList.imageUrl}`);
            image.setAttribute('alt', `${productList.altTxt}`);
            h3.setAttribute('class', "productName");
            p.setAttribute('class', "productDescription");

            h3.textContent = productList.name;
            p.textContent = productList.description;
            items.appendChild(a);
            a.appendChild(article);
            article.appendChild(image);

            article.appendChild(h3);
            article.appendChild(p);
        }
    })

    let listLocalStorage = JSON.parse(localStorage.getItem('objetL'));
    let quantityCart =0;
    if (listLocalStorage){
        
        for (let i in listLocalStorage){
            quantityCart = quantityCart + parseInt(listLocalStorage[i].quantityItem);
        }
    }
    const li =document.getElementsByTagName('li');
   
    li[4].textContent =`Panier (${quantityCart})`;