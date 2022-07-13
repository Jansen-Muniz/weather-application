const errorMessage = document.querySelector('.error-message')

const APIKey = 'soogqiATcUZymZpv0VhTRzwSTti1HZaF'

const baseUrl = 'http://dataservice.accuweather.com'

const getCityUrl = cityName => `${baseUrl}/locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`

const getCityWeatherUrl = key => `${baseUrl}/currentconditions/v1/${key}?apikey=${APIKey}&language=pt-br`

const getRequest = async url => await fetch(url)

const getCityData = async cityName => {
  try {
    const cityUrl = getCityUrl(cityName)
    const response = await getRequest(cityUrl)

    if (!response.ok) {
      throw new Error('Não foi possível obter os dados.')
    }

    const [cityData] = await response.json()
    return cityData
  } catch ({ name, message }) {
    errorMessage.textContent = `${name}: ${message}`
  }
}

const getCityWeather = async cityName => {
  try {
    const { Key } = await getCityData(cityName)
    const cityWeatherUrl = getCityWeatherUrl(Key)
    const response = await getRequest(cityWeatherUrl)

    if (!response.ok) {
      throw new Error('Não foi possível obter os dados.')
    }

    const [cityWeatherData] = await response.json()
    return cityWeatherData
  } catch ({ name, message }) {
    errorMessage.textContent = `${name}: ${message}`
  }
}



