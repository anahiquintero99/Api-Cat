const API_URL_RANDOM = new URL("https://api.thecatapi.com/v1/images/search");

async function loadRandomCats() {
  try {
    const response = await fetch(API_URL_RANDOM);
    const data = await response.data();

    console.log(data);
  } catch (error) {}
}
