
    let listLocalStorage = JSON.parse(localStorage.getItem('objetL'));
    let quantityCart =0;
    if (listLocalStorage){
        
        for (let i in listLocalStorage){
            quantityCart = quantityCart + parseInt(listLocalStorage[i].quantityItem);
        }
    }
    const li =document.getElementsByTagName('li');
   
    li[4].textContent =`Panier (${quantityCart})`;