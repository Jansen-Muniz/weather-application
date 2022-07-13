const cityForm = document.querySelector('[data-js="change-location"]')
const cityCard = document.querySelector('[data-js="city-card"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTemperatureContainer = document.querySelector('[data-js="city-temperature"]')
let timeImg = document.querySelector('[data-js="time"]')
const timeIconContainer = document.querySelector('[data-js="time-icon"]')

const insertWeatherIcon = icon => timeIconContainer.innerHTML = `<img src=./src/icons/${icon}.svg />`

const checkDNoneClass = () => {
  const dNoneContainsInCityCard = cityCard.classList.contains('d-none')

  if (dNoneContainsInCityCard) {
    cityCard.classList.remove('d-none')
  }
}

const insertTexts = (local, text, temperature) => {
  cityNameContainer.textContent = local
  cityWeatherContainer.textContent = text
  cityTemperatureContainer.textContent = temperature
}

const getSvgDayOrSvgNight = (isDayTime, svgDay, svgNight) => isDayTime ? timeImg.src = svgDay : timeImg.src = svgNight

cityForm.addEventListener('submit', async event => {
  event.preventDefault()

  const inputValue = event.target.city.value
  const { Key, LocalizedName } = await getCityData(inputValue)
  const { WeatherText, Temperature, IsDayTime, WeatherIcon } = await getCityWeather(inputValue)

  getSvgDayOrSvgNight(IsDayTime, './src/day.svg', './src/night.svg')
  checkDNoneClass()
  insertWeatherIcon(WeatherIcon)
  insertTexts(LocalizedName, WeatherText, Temperature.Metric.Value)

  cityForm.reset()
})