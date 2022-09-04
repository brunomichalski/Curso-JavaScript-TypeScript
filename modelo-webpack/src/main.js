import GeraCpf from "./modules/GeraCPF";

import './assets/css/style.css';


(function () {
    const gera = new GeraCpf();
    const cpfGerado = document.querySelector(".cpf-gerado");
    cpfGerado.innerHTML = gera.geraNovoCPF();
})();