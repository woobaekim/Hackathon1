// main.js
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('fetchButton').addEventListener('click', fetchData);
});

async function fetchData() {
  const horoscope = document.getElementById('horoscopeType').value.toLowerCase();
  const apiKeyMap = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarious', 'capricorn', 'aquarius', 'pisces'];
  
  // Check if the entered horoscope name exists in the mapping
  if (apiKeyMap.includes(horoscope)) {
    const url = `https://horoscope-astrology.p.rapidapi.com/sign?s=${horoscope}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'db631c0141msh2bbd7a5b904b9bep10cfe2jsnaf5876dd1903', // Use the corresponding API key based on the zodiac name
        'X-RapidAPI-Host': 'horoscope-astrology.p.rapidapi.com'
      }
    };
  
    fetch(url, options)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        const array = ['name', 'symbol', 'strengths', 'compatibility', 'health', 'career', ]
        
        for (let i = 0; i < array.length; i++) {
          const listItem = document.getElementById(array[i]);
          listItem.innerHTML = array[i].toUpperCase() + ': ' + result[array[i]];
          listItem.classList.add('horoscope-item'); 
          // main.js

        }
  
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    console.log('Invalid Horoscope');
  }
}

