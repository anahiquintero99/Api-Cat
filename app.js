const API_URL_RANDOM = new URL(
  "https://api.thecatapi.com/v1/images/search?limit=3&api_key=f098c277-9d2a-44ef-b00e-9135d244716e"
);

const imgCat1 = document.getElementById("img1");
const imgCat2 = document.getElementById("img2");
const imgCat3 = document.getElementById("img3");

async function loadRandomCats() {
  try {
    const response = await fetch(API_URL_RANDOM);
    const data = await response.json();

    imgCat1.src = data[0].url;
    imgCat2.src = data[1].url;
    imgCat3.src = data[2].url;
  } catch (error) {
    console.log(error);
  }
}

loadRandomCats();
