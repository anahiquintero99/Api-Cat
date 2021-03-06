// URLS TO API
const API_URL_RANDOM = new URL('https://api.thecatapi.com/v1/images/search?limit=2');
const API_URL_FAVOURITES = new URL('https://api.thecatapi.com/v1/favourites');
const API_URL_FAVOURITES_DELETE = (id) =>
  new URL(
    `https://api.thecatapi.com/v1/favourites/${id}?api_key=f098c277-9d2a-44ef-b00e-9135d244716e`,
  );

// ERROR
const spanError = document.getElementById('error');

async function loadRandomCats() {
  try {
    const response = await fetch(API_URL_RANDOM);
    const data = await response.json();
    console.log('Random Cats');
    console.log(data);

    if (response.status !== 200) {
      spanError.innerHTML = 'Hubo un error ' + response.status + data.message;
    } else {
      // Image to section of cats
      const imgCat1 = document.getElementById('img1');
      const imgCat2 = document.getElementById('img2');

      //Bouttons
      const btn1 = document.getElementById('btn1');
      const btn2 = document.getElementById('btn2');

      imgCat1.src = data[0].url;
      imgCat2.src = data[1].url;

      btn1.onclick = () => saveFavouriteCat(data[0].id);
      btn2.onclick = () => saveFavouriteCat(data[1].id);
    }
  } catch (error) {
    console.log(error);
  }
}

async function loadFavouritesCat() {
  try {
    const response = await fetch(API_URL_FAVOURITES, {
      method: 'GET',
      headers: {
        'X-API-KEY': 'f098c277-9d2a-44ef-b00e-9135d244716e',
      },
    });
    const data = await response.json();
    console.log('Favourites Cats');
    console.log(data);

    if (response.status !== 200) {
      spanError.innerHTML = 'HUbo un error ' + response.status + data.message;
    } else {
      const section = document.getElementById('favouriteCat');
      section.innerHTML = '';
      const h2 = document.createElement('h2');
      const h2Text = document.createTextNode('Favourite cats');
      h2.appendChild(h2Text);
      section.appendChild(h2);

      data.forEach((cat) => {
        const article = document.createElement('article');
        const img = document.createElement('img');
        const btn = document.createElement('button');
        const btnText = document.createTextNode('Out favourites cats');

        img.src = cat.image.url;
        btn.appendChild(btnText);
        btn.onclick = () => deleteFavouriteCat(cat.id);
        article.appendChild(img);
        article.appendChild(btn);
        section.appendChild(article);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function saveFavouriteCat(id) {
  try {
    const response = await fetch(API_URL_FAVOURITES, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': 'f098c277-9d2a-44ef-b00e-9135d244716e',
      },
      body: JSON.stringify({
        image_id: id,
      }),
    });
    const data = await response.json();

    console.log('Save');
    console.log(response);

    if (response.status !== 200) {
      spanError.innerHTML = 'Hubo un error ' + response.status + data.message;
    } else {
      console.log('Save in favourites');
      loadFavouritesCat();
    }
  } catch (error) {}
}

async function deleteFavouriteCat(id) {
  const response = await fetch(API_URL_FAVOURITES_DELETE(id), {
    method: 'DELETE',
    headers: {
      'X-API-KEY': 'f098c277-9d2a-44ef-b00e-9135d244716e',
    },
  });
  const data = await response.json();

  if (response.status !== 200) {
    spanError.innerHTML = 'Hubo un error: ' + response.status + data.message;
  } else {
    console.log('Delete of favourites');
    loadFavouritesCat();
  }
}

loadRandomCats();
loadFavouritesCat();
