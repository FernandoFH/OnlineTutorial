const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3'
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites'
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`
const spanError = document.getElementById('error')

async function loadRandomMichis(){
    const res  = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log("Random")
    console.log(data)

    if(res.status !== 200)
    {
        spanError.innerHTML = "Hubo un error: " +data.message;
    } else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');

        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        const btn3 = document.getElementById('btn3');
    
        img1.src = data[0].url
        img2.src = data[1].url
        img3.src = data[2].url

        btn1.onclick = () => saveFavorite(data[0].id);
        btn2.onclick = () => saveFavorite(data[1].id);
        btn3.onclick = () => saveFavorite(data[2].id);
    }
}

async function loadFavoritesMichis(){
    const res  = await fetch(API_URL_FAVORITES, {
        method: 'GET', 
        headers: {
            'X-API-KEY': 'live_AfPmcxJ9DwwZd8tRxUnjaoVdCFPs3reW4E8SJmx3Hn09Ej3UJLIIRtbnBktKU5dw'
        },
    });
    const data = await res.json();
    console.log("Favorites")
    console.log(data)

    if(res.status !== 200)
    {
        spanError.innerHTML = "Hubo un error: " +data.message;
    } else {
        const section = document.getElementById('favoritesMichis');
        section.innerHTML = "";

        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Favoritos');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(michi => {
           const article = document.createElement('article');
           const img = document.createElement('img');
           const btn = document.createElement('button');
           const btnText = document.createTextNode('Sacar de Favorites');
        
           btn.appendChild(btnText);
           img.src = michi.image.url

           btn.onclick = () => deleteFavorite(michi.id);
           article.appendChild(img);
           article.appendChild(btn);
           section.appendChild(article);
        });
    }
}

async function saveFavorite(id){
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'live_AfPmcxJ9DwwZd8tRxUnjaoVdCFPs3reW4E8SJmx3Hn09Ej3UJLIIRtbnBktKU5dw'
        },
        body: JSON.stringify({
                image_id: id
            }),
    });
    const data = await res.json();

    console.log("SAVE");
    console.log(data)
    if(res.status !== 200)
    {
        spanError.innerHTML = "Hubo un error: " +data.message;
    } else {
        console.log('Agregado a Favoritos')
        loadFavoritesMichis();
    }
}

async function deleteFavorite(id){
    const res = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: 'DELETE', 
        headers: {
            'X-API-KEY': 'live_AfPmcxJ9DwwZd8tRxUnjaoVdCFPs3reW4E8SJmx3Hn09Ej3UJLIIRtbnBktKU5dw'
        },
    });
    const data = await res.json();

    console.log("DELETE");
    console.log(data)

    if(res.status !== 200)
    {
        spanError.innerHTML = "Hubo un error: " +data.message;
    } else {
        console.log('Sacado de Favorites')
        loadFavoritesMichis();
    }
}

loadRandomMichis();
loadFavoritesMichis();