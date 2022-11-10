// Variaveis e elementos
const apiKey = '76aa465ac2f032f4649377a3e8626635';
const apiPais = 'https://www.countryflagicons.com/FLAT/64/';

const cidadeInput = document.querySelector('#cidade-input');
const botaoPesquisar = document.querySelector('#pesquisar');

const cidadeElemento = document.querySelector('#cidade');
const tempElemento = document.querySelector('#temperatura span');
const descElemento = document.querySelector('#descricao');
const climaIconElemento = document.querySelector('#icone-clima');
const paisElemento = document.querySelector('#pais');
const umidadeElemento = document.querySelector('#umidade span');
const ventoElemento = document.querySelector('#vento span');
const climaContainer = document.querySelector('#dados-clima');

// Funções
const getDadosClima = async(cidade) => {
    const apiClimaURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`;
        
        const res = await fetch (apiClimaURL)
        const data = await res.json()

        return data;
}
const mostrarDadosClima = async (cidade) => {
    const data = await getDadosClima(cidade);
    cidadeElemento.innerText = data.name;
    tempElemento.innerText = parseInt(data.main.temp);
    descElemento.innerText = data.weather[0].description;

    climaIconElemento.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);

    paisElemento.setAttribute("src", `https://www.countryflagicons.com/FLAT/64/${data.sys.country}.png`);

    umidadeElemento.innerText = `${data.main.humidity}%`;
    ventoElemento.innerText = `${data.wind.speed}km/h`;

    climaContainer.classList.remove('hide');
};
// Eventos

botaoPesquisar.addEventListener('click', (e) =>{
    e.preventDefault();
        const  cidade = cidadeInput.value;

    mostrarDadosClima(cidade);

});

cidadeInput.addEventListener('keyup', (e) =>{
    if(e.code === 'Enter'){
        const cidade = e.target.value;

        mostrarDadosClima(cidade);
    }
})