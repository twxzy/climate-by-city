// Evento Keydown quando apertar Enter dentro do input ele executa todo o código
document.getElementById("inputCity").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Evita a página recarregar
    btnSearch() // Chama a função ao apertar o Enter dentro do Input
  }
});

function principal() {

  // CRIAÇÃO DA URL

// Key Api OpenWeatherMap
const API_KEY = 'faea237a24275522787fd81ea5f25497';

// Url Api
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'; 

// DEFINE COORDENADAS

const lat = 40.7127281 ; //Latitude
const lon = -74.0060152; //Longitude

// COMPLEMENTOS DA URL DA API

const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`;

// FAZ UMA REQUISIÇÃO À API USANDO FETCH

fetch(url)
  .then(response => {

    // Converte a resposta para JSON
    return response.json();
  })
  .then(data => {
    let temp = document.getElementById('temp')
    temp.textContent = parseFloat(data.main.temp).toFixed(0)
    console.log(data)

    function toTitleCase(str) {
      return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
    let texto = data.weather[0].description
    let textoEmTitleCase = toTitleCase(texto);

    //Descrição
    let descriptionClima = document.getElementById('description-clima')
    descriptionClima.textContent = textoEmTitleCase

    //Min
    let tempMin = document.getElementById('description-min')
    tempMin.textContent = 'Min: ' + parseFloat(data.main.temp_min).toFixed(0) + '°C'
  
    //Max
    let tempMax = document.getElementById('description-max')
    tempMax.textContent = 'Max: ' + parseFloat(data.main.temp_max).toFixed(0) + '°C'
    
  })
  .catch(error => {
    // Caso ocorra um erro, exibe-o no console
    console.error('Erro ao obter os dados:', error);
  });

  console.log(url)

}

setTimeout(principal, 1);



// Evento Keydown quando apertar Enter dentro do input ele executa todo o código
document.getElementById("inputCity").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Evita a página recarregar
    btnSearch() // Chama a função ao apertar o Enter dentro do Input
  }
});



async function btnSearch() {

  // Obtendo o valor do input
  const inputValue = document.getElementById('inputCity').value;

  // Separando cidade e estado
  const partes = inputValue.split(' '); // Divide o texto em partes
    
  // Assumindo que o estado é a última parte
  const estado = partes.pop(); // Remove a última parte (estado)
  const cidade = partes.join(' '); // Junta o restante como cidade

  let inputCity = document.getElementById('inputCity')

  inputCity.value = '' // Limpa o input

  // Busca a Latitude e Longitude
  const apiKey = 'faea237a24275522787fd81ea5f25497'; //API Key
  const cityName = cidade // Nome da cidade
  const stateCode = estado; // Código do estado (opcional)
  const countryCode = ''; // Código do país
  const limit = 1; // Número máximo de resultados

  const urlCoord = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}`;

  try {
    const response = await fetch(urlCoord);
    if (!response.ok) {
      throw new Error('Erro ao buscar dados da API');
    }
    const data = await response.json();

    const latitude = data[0].lat;
    const longitude = data[0].lon;
    const country = data[0].country

    console.log(latitude);
    console.log(longitude);
    console.log(country);
    console.log(data)

    // CRIAÇÃO DA URL 

    // Key Api OpenWeatherMap
    const API_KEY = 'faea237a24275522787fd81ea5f25497';

    // Url Api
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'; 

    // DEFINE COORDENADAS

    const lat = latitude;
    const lon = longitude;

    // COMPLEMENTOS DA URL DA API

    const urlClima = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`;

    // FAZ UMA REQUISIÇÃO À API USANDO FETCH

    const climaResponse = await fetch(urlClima);
    if (!climaResponse.ok) {
      throw new Error('Erro ao obter os dados da API de clima');
    }
    const climaData = await climaResponse.json();
    console.log(climaData);

    //Temperatura
    let temp = document.getElementById('temp')
    temp.textContent = parseFloat(climaData.main.temp).toFixed(0)

    //Cidade
    let city = document.getElementById('city')
    city.textContent = climaData.name

    //País
    let pais = document.getElementById('pais')
    pais.textContent = country


    //Min
    let tempMin = document.getElementById('description-min')
    tempMin.textContent = 'Min: ' + parseFloat(climaData.main.temp_min).toFixed(0) + '°C'


    function toTitleCase(str) {
      return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
    let texto = climaData.weather[0].description
    let textoEmTitleCase = toTitleCase(texto);

    //Descrição
    let descriptionClima = document.getElementById('description-clima')
    descriptionClima.textContent = textoEmTitleCase

    //Max
    let tempMax = document.getElementById('description-max')
    tempMax.textContent = 'Max: ' + parseFloat(climaData.main.temp_max).toFixed(0) + '°C'
    
  } catch (error) {
    console.error('Erro:', error);
  }
}