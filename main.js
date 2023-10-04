const apiKey = '9ab38fc6ee3445fe8ab120343230310';

const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');
const header = document.querySelector('.header');

form.addEventListener('submit', async function(event) {
    event.preventDefault();
    let city = input.value.trim(); 
    const data = await getWeather(city);

    if(data.error) {
        removeLastCard();
        showErrorMessage(data.error.message);
        clearInput();
    }else {
        removeLastCard();
        const weatherData = {
            name: data.location.name,
            country: data.location.country,
            temp: data.current.temp_c,
            condition: data.current.condition.text,
            icon: data.current.condition.icon
        }
        showCard(weatherData);
        clearInput();
    }
});

// fetch(query)
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//     if (data.error) {
//       removeLastCard();
//       showErrorMessage(data.error.message);
//       clearInput();
//     } else {
//       removeLastCard();
//       showCard(
//         data.location.name,
//         data.location.country,
//         data.current.temp_c,
//         data.current.condition.text
//       );
//       clearInput();
//     }
//   })
//   .catch((error) => {
//     console.error(data.error.message, error);
//   });


async function getWeather(city) {
    const query = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no&lang=de`;
    const response = await fetch(query);
    const data = await response.json();
    console.log(data);
    return data;
}

function removeLastCard() {
    const prevCard = document.querySelector('.card');
    if(prevCard) prevCard.remove();
};

function clearInput() {
    input.value = '';
    input.focus();
}

function showErrorMessage(message) {
    const card = `<main class="card">${message}</main>`;
    header.insertAdjacentHTML('afterend', card);
}

function showCard(weatherData) {
    const card = `
    <main class="card">
    <h2 class="card__card-city">${weatherData.name}<span>${weatherData.country}</span></h2>
    <div class="card__weather">
      <div class="card__weather__value">${weatherData.temp}<sup>°c</sup></div>
      <img
        class="card__weather__img"
        src="${weatherData.icon}"
        alt="weather_icon"
      />
    </div>
    <div class="card__card-description">${weatherData.condition}</div>
    </main>
    `;
    header.insertAdjacentHTML('afterend', card);
};
