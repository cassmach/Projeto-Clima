     // Previne que envie o formulário e perca as informações
document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();

            // Pegar o valor do submit
    let input = document.querySelector('#searchInput').value
    // Criar uma condição caso  use o Search
            if (input !=- '' ) {
                clearInfo();
               showWarning('Carregando...')

            }else {

            };


                            // Puxar API
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=1bedb6cc2d0131884318647a7ce04a58&units=metric&lang=pt_br`;
    // Pegar resultado
    let results = await fetch(url);
    let json = await results.json();

    // Condição caso não encontre a informação
    if(json.cod === 200) {
        showInfo({   // Só as info que iram aparecer
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            windAngle: json.wind.deg
        })
    }else {
        clearInfo();
        showWarning('Não encontramos essa localização.');
    }

});


        // Monstar as info
    function showInfo (json) {
       showWarning('');
                    
                // mostrar cidade/pais
       document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
                // mostrar temperatura
       document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>°C</sup>`;
                // Velocidade do Vento
       document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span> `;
                // trocar imagem de acordo com a cidade
       document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
                // Seta de direção do vento
       document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
                // alterar css de 'none' para aparecer as info
       document.querySelector('.resultado').style.display = 'block';

    };
        // limpar resultado
    function clearInfo(){
        showWarning('');
        document.querySelector('.resultado').style.display = 'none';
    }
            // mensagem de pre-carregamento
function showWarning (msg) {
    document.querySelector('.aviso').innerHTML = msg
}