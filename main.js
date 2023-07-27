document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('fetchButton').addEventListener('click', fetchData);
});

const dateToHoroscopeMap = [
  { sign: 'capricorn', startDate: '01-01', endDate: '01-19' },
  { sign: 'aquarius', startDate: '01-20', endDate: '02-18' },
  { sign: 'pisces', startDate: '02-19', endDate: '03-20' },
  { sign: 'aries', startDate: '03-21', endDate: '04-19' },
  { sign: 'taurus', startDate: '04-20', endDate: '05-20' },
  { sign: 'gemini', startDate: '05-21', endDate: '06-20' },
  { sign: 'cancer', startDate: '06-21', endDate: '07-22' },
  { sign: 'leo', startDate: '07-23', endDate: '08-22' },
  { sign: 'virgo', startDate: '08-23', endDate: '09-22' },
  { sign: 'libra', startDate: '09-23', endDate: '10-22' },
  { sign: 'scorpio', startDate: '10-23', endDate: '11-21' },
  { sign: 'sagittarius', startDate: '11-22', endDate: '12-21' },
  { sign: 'capricorn', startDate: '12-22', endDate: '12-31' }, 
];

async function fetchData() {
  const inputDate = document.getElementById('date').value;
  const horoscope = getHoroscopeFromInputDate(inputDate);

  if (horoscope) {
    const url = `https://horoscope-astrology.p.rapidapi.com/sign?s=${horoscope}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'db631c0141msh2bbd7a5b904b9bep10cfe2jsnaf5876dd1903', 
        'X-RapidAPI-Host': 'horoscope-astrology.p.rapidapi.com'
      }
    };

    fetch(url, options)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        const array = ['name', 'symbol', 'strengths', 'compatibility', 'health', 'career'];
        const horoscopeDataContainer = document.getElementById('horoscopeDataContainer');

        for (let i = 0; i < array.length; i++) {
          const listItem = document.getElementById(array[i]);
          listItem.innerHTML = array[i].toUpperCase() + ': ' + result[array[i]];
          listItem.classList.add('horoscope-item'); 
        }
        horoscopeDataContainer.style.display = 'block';
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    console.log('Invalid Date');
  }
}

function getHoroscopeFromInputDate(inputDate) {
  const dateParts = inputDate.split('-');
  const month = parseInt(dateParts[0]);
  const day = parseInt(dateParts[1]);

  // Find the horoscope sign based on the input date
  const matchedHoroscope = dateToHoroscopeMap.find((horoscope) => {
    const startDateParts = horoscope.startDate.split('-');
    const endDateParts = horoscope.endDate.split('-');
    const startMonth = parseInt(startDateParts[0]);
    const startDay = parseInt(startDateParts[1]);
    const endMonth = parseInt(endDateParts[0]);
    const endDay = parseInt(endDateParts[1]);

    if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
      return true;
    }
    return false;
  });

  return matchedHoroscope ? matchedHoroscope.sign : null;
}
