// recuperation id dans url
var urlProduct = document.location.href;
var url = new URL(urlProduct);
var idUrl = url.searchParams.get("id");


console.log('ok');

//recupere array d un produit
async function fetchProductJSON() {
    var response = await fetch("http://localhost:3000/api/products/" + idUrl);
    var productList = await response.json();
    return productList;
  }


    fetchProductJSON().then(productList => {
    //insere le produit dans la page
    console.log(productList);
        //add balise <img>
        let imageProduct = document.createElement('img');
        const classProductImgHtml = document.querySelector('.item__img');
        classProductImgHtml.prepend(imageProduct);
        //add attribut src and alt
        const baliseImage = classProductImgHtml.childNodes[0];
        baliseImage.setAttribute("src", productList.imageUrl);
        baliseImage.setAttribute("alt", productList.altTxt);
        //add option+color
        const classProductcolorsHtml = document.querySelector('#colors');
        let i = 1
        for (productList.colors of productList.colors) {
            //add balise options
            let colorsProduct = document.createElement('option');
            classProductcolorsHtml.append(colorsProduct);
            // add values colors in balise option
            let baliseOption = document.getElementsByTagName('option');
            baliseOption[i].setAttribute("value", productList.colors);
            //add color in list
            baliseOption[i].innerHTML = productList.colors;
            i++;
        }
        function addElementById(variable1, variable2) {
            document.getElementById(variable1).textContent = variable2;
        }
        addElementById('title', productList.name);
        addElementById('description', productList.description);
        addElementById('price', productList.price);
})


//////////////////////
//     add cart     //
//////////////////////


const elt = document.getElementById('addToCart');

elt.addEventListener('click', function () {
    let quantityChoose = document.getElementById('quantity').value;
    let colorChoose = document.getElementById('colors').value;

    //array 
    let objetJson = {
        idProduct: idUrl,
        quantityItem: quantityChoose,
        colorItems: colorChoose
    };

    //conversion json ==> javascript
    let listLocalStorage = JSON.parse(localStorage.getItem('objetL'));
    

    //verification si cart dans localStorage et ajout produit dans localStorage
    if (objetJson.quantityItem != 0 && objetJson.colorItems) {
       
        let lengthCart = listLocalStorage.length;
        console.log(lengthCart);
        if (listLocalStorage && lengthCart!=0) {
            
            console.log('ok5');
            
            for (let i = 0; i + 1 <= lengthCart; i++) {
                console.log('ok2');
                if (listLocalStorage[i].idProduct == idUrl && listLocalStorage[i].colorItems == colorChoose) {
                   
                    listLocalStorage[i].quantityItem = Number(listLocalStorage[i].quantityItem) + Number(objetJson.quantityItem);
                    localStorage.setItem("objetL", JSON.stringify(listLocalStorage));
                    break;
                }
                else if (i +1 == lengthCart) {
                    console.log('ok2');
                    // add new item
                    console.log('ok5');
                    listLocalStorage.push(objetJson);
                    localStorage.setItem("objetL", JSON.stringify(listLocalStorage));
                }

            }
        }
        else {
            //create objet
            console.log('ok3');
            listLocalStorage = [];
            listLocalStorage.push(objetJson);
            localStorage.setItem("objetL", JSON.stringify(listLocalStorage));

        }
        console.log('ok4');
    }
    else {
        alert('veuillez selectionner une quatité et une couleur');

    }

})
