import './index.css';

const loading = createLoadingElement();

const searchForm = document.querySelector('.header_search-form');
const searchInput = document.querySelector('.header__search-input');
const locationNameBlock = document.querySelector('.header__location-name');

const currentWindBlock = document.querySelector('.main__current-weather-additional-wind');
const currentPressureBlock = document.querySelector('.main__current-weather-additional-pressure');
const currentHumidityBlock = document.querySelector('.main__current-weather-additional-humidity');
const currentTemperatureBlock = document.querySelector('.main__current-weather-temperature');
const currentWeatherIcon = document.querySelector('.main__current-weather-icon');
const currentWeatherConditionBlock = document.querySelector('.main__current-weather-description');
const currentTemperatureFeelsLikeBlock = document.querySelector('.main__current-weather-feels-like');

const additionalInfoBlock = document.querySelector('.additional-info-block');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  validateSearchInput(searchInput.value);
  searchForm.reset();
});

validateSearchInput('Saransk');

async function getWeatherData(cityName) {
  const forecastResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4f889e1d89284a96bd475947232311&q=${cityName}&days=3`, { mode: 'cors' });
  if (!forecastResponse.ok) return false;
  return await forecastResponse.json();
}

async function validateSearchInput(inputValue) {
  if (inputValue.length > 1 && inputValue.length < 50) {
    document.body.appendChild(loading);
    const weatherData = await getWeatherData(inputValue);
    if (weatherData) processWeatherData(weatherData);
  }
}

function processWeatherData(weatherData) {
  additionalInfoBlock.innerHTML = '';

  const currentConditions = {
    location: weatherData.location.name,
    windSpeed: weatherData.current.wind_kph,
    windDir: weatherData.current.wind_dir,
    pressure: weatherData.current.pressure_mb,
    humidity: weatherData.current.humidity,
    temperature: weatherData.current.temp_c,
    weatherIcon: weatherData.current.condition.icon,
    weatherCondition: weatherData.current.condition.text,
    temperatureFeelsLike: weatherData.current.feelslike_c
  }

  const nextDaysForecasts = weatherData.forecast.forecastday;

  fillCurrentConditionsOnPage(currentConditions);
  populatePageWithHourlyForecast(nextDaysForecasts);
  populatePageWithNextDaysForecast(nextDaysForecasts.slice(1));

  document.body.removeChild(loading);
}

function fillCurrentConditionsOnPage(currentConditions) {
  locationNameBlock.textContent = currentConditions.location;
  currentWindBlock.textContent = currentConditions.windSpeed.toFixed(0)
    + ' km/h, ' + currentConditions.windDir;
  currentPressureBlock.textContent = currentConditions.pressure + ' mb';
  currentHumidityBlock.textContent = currentConditions.humidity + '%';
  currentTemperatureBlock.textContent = currentConditions.temperature.toFixed(0)
    + '°';
  currentWeatherIcon.src = currentConditions.weatherIcon;
  currentWeatherConditionBlock.textContent = currentConditions.weatherCondition;
  currentTemperatureFeelsLikeBlock.textContent = 'Feels like '
    + currentConditions.temperatureFeelsLike.toFixed(0) + '°';
}

function getArrayOf24HourForecast(daysForecasts) {
  const currentHour = (new Date()).getHours();
  if (23 - currentHour === 0) return daysForecasts[1].hour;

  const forecastFor24Hours = daysForecasts[0].hour.slice(currentHour + 1);
  for (let i = 0; i < currentHour + 1; i++) {
    forecastFor24Hours.push(daysForecasts[1].hour[i]);
  }
  return forecastFor24Hours;
}

function populatePageWithHourlyForecast(daysForecasts) {
  const hourlyForecastBlock = document.createElement('div');
  hourlyForecastBlock.classList.add('today-hourly-forecast-block');

  const forecastFor24Hours = getArrayOf24HourForecast(daysForecasts);

  for (let i = 0; i < 24; i++) {
    hourlyForecastBlock.append(createOneHourForecastBlock(forecastFor24Hours[i]));
  }

  additionalInfoBlock.append(hourlyForecastBlock);
}

function createLoadingElement() {
  const container = document.createElement('div');
  container.classList.add('loadingContainer');

  const loading = document.createElement('div');
  loading.classList.add('loading');

  container.append(loading);
  return container;
}

function createOneHourForecastBlock(forecastForAnHour) {
  const forecastBlock = document.createElement('div');
  forecastBlock.classList.add('hour-forecast-block');

  const forecastTimeSpan = document.createElement('span');
  forecastTimeSpan.classList.add('hour-forecast-time');
  forecastTimeSpan.textContent = forecastForAnHour.time.slice(-5);

  const forecastIcon = createForecastWeatherIcon(forecastForAnHour.condition.icon, 'main__current-weather-icon');

  const forecastTemperatureSpan = document.createElement('span');
  forecastTemperatureSpan.classList.add('hour-forecast-temperature');
  forecastTemperatureSpan.textContent = forecastForAnHour.temp_c.toFixed(0);

  forecastBlock.append(forecastTimeSpan);
  forecastBlock.append(forecastIcon);
  forecastBlock.append(forecastTemperatureSpan);

  return forecastBlock;
}

function populatePageWithNextDaysForecast(nextDaysForecasts) {
  for (let i = 0; i < nextDaysForecasts.length; i++) {
    const date = nextDaysForecasts[i].date;
    const windSpeed = nextDaysForecasts[i].day.maxwind_kph.toFixed(0);
    const weatherIcon = nextDaysForecasts[i].day.condition.icon;
    const dayTemp = nextDaysForecasts[i].day.maxtemp_c.toFixed(0);
    const nightTemp = nextDaysForecasts[i].day.mintemp_c.toFixed(0);
    additionalInfoBlock.append(createNextDayForecastBlock(date, windSpeed, weatherIcon, dayTemp, nightTemp));
  }
}

function createNextDayForecastBlock(date, windSpeed, weatherIcon, dayTemp, nightTemp) {
  const additionalInfoBlock = document.createElement('div')
  additionalInfoBlock.classList.add('next-day-forecast-block');

  additionalInfoBlock.append(createFutureForecastDateBlock(date));
  additionalInfoBlock.append(createFutureForecastDetailsBlock(windSpeed, weatherIcon, dayTemp, nightTemp));

  return additionalInfoBlock;
}

function createFutureForecastDateBlock(dateString) {
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const days = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'
  ];

  const date = new Date(dateString);

  const dateBlock = document.createElement('div');
  dateBlock.classList.add('next-day-forecast__date-block');

  const dateNameSpan = document.createElement('span');
  dateNameSpan.classList.add('next-day-forecast__date');
  dateNameSpan.textContent = `${months[date.getMonth()]}, ${date.getDate()}`;

  const dayNameSpan = document.createElement('span');
  dayNameSpan.classList.add('next-day-forecast__day');
  dayNameSpan.textContent = `${days[date.getDay()]}`;

  dateBlock.append(dateNameSpan);
  dateBlock.append(dayNameSpan);

  return dateBlock;
}

function createFutureForecastDetailsBlock(windSpeed, weatherIcon, dayTemp, nightTemp) {
  const detailsBlock = document.createElement('div');
  detailsBlock.classList.add('next-day-forecast__details-block');

  detailsBlock.append(createFutureForecastWindBlock(windSpeed));
  detailsBlock.append(createForecastWeatherIcon(weatherIcon, 'next-day-forecast__image'));
  detailsBlock.append(createFutureForecastDayTempBlock(dayTemp));
  detailsBlock.append(createFutureForecastNightTempBlock(nightTemp));

  return detailsBlock;
}

function createFutureForecastDetailHeading(heading) {
  const headingSpan = document.createElement('span');
  headingSpan.classList.add('next-day-forecast__detail-heading');
  headingSpan.textContent = heading;
  return headingSpan;
}

function createFutureForecastWindBlock(windSpeed) {
  const windBlock = document.createElement('div');
  windBlock.classList.add('next-day-forecast__wind-block');

  const headingSpan = createFutureForecastDetailHeading('Wind');

  const windSpeedSpan = document.createElement('span');
  windSpeedSpan.classList.add('next-day-forecast__wind-speed');
  windSpeedSpan.textContent = windSpeed + ' km/h';

  windBlock.append(headingSpan);
  windBlock.append(windSpeedSpan);

  return windBlock;
}

function createForecastWeatherIcon(weatherIcon, className) {
  const img = document.createElement('img');

  img.classList.add(className);
  img.alt = 'Weather icon';
  img.src = weatherIcon;

  return img;
}

function createFutureForecastDayTempBlock(dayTemp) {
  const dayTempBlock = document.createElement('div');
  dayTempBlock.classList.add('next-day-forecast__day-temp-block');

  const headingSpan = createFutureForecastDetailHeading('Day');

  const dayTempSpan = document.createElement('span');
  dayTempSpan.classList.add('next-day-forecast__day-temp');
  dayTempSpan.textContent = dayTemp + '°';

  dayTempBlock.append(headingSpan);
  dayTempBlock.append(dayTempSpan);

  return dayTempBlock;
}

function createFutureForecastNightTempBlock(nightTemp) {
  const nightTempBlock = document.createElement('div');
  nightTempBlock.classList.add('next-day-forecast__night-temp-block');

  const headingSpan = createFutureForecastDetailHeading('Night');

  const nightTempSpan = document.createElement('span');
  nightTempSpan.classList.add('next-day-forecast__night-temp');
  nightTempSpan.textContent = nightTemp + '°';

  nightTempBlock.append(headingSpan);
  nightTempBlock.append(nightTempSpan);

  return nightTempBlock;
}
