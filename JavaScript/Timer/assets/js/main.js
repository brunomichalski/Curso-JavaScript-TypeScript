function formataHora(segundos) {
    const data = new Date(segundos * 1000);
    return data.toLocaleTimeString('pt-BR', {
        hour12: false,
        timeZone: 'GMT'
    })
}

const relogio = document.querySelector('.relogio');
const iniciar = document.querySelector('.iniciar');
const parar = document.querySelector('.parar');
const zerar = document.querySelector('.zerar');
let segundos = 0;
let timer;
function IniciaRelogio() {
    timer = setInterval(function () {
        segundos++
        relogio.innerHTML = formataHora(segundos);
    }, 1000);
}

iniciar.addEventListener('click', function (event) {
    relogio.classList.remove('pausado');
    clearInterval(timer)
    IniciaRelogio();
});

parar.addEventListener('click', function (event) {
    relogio.classList.add('pausado');
    clearInterval(timer)
});

zerar.addEventListener('click', function (event) {
    clearInterval(timer)
    relogio.innerHTML = "00:00:00";
    segundos = 0;
});