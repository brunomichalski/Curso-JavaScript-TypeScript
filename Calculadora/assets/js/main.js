function criaCalculadora() {
    return {
        display: document.querySelector('.display'),
        btnClear: document.querySelector('.btn-clear'),


        inicia() {
            this.cliqueBotoes();
        },

        cliqueBotoes() {
            document.addEventListener('click', e => {
                const el = e.target;

                if (el.classList.contains('btn-num')) {
                    this.btnParaDisplay(el.innerText);
                }
                if (el.classList.contains('btn-clear')) {
                    this.clearDisplay();
                }
                if (el.classList.contains('btn-del')) {
                    this.apagaUm();
                }
                if (el.classList.contains('btn-eq')) {
                    this.realizaConta();
                }
            });
        },

        btnParaDisplay(valor) {
            this.display.value += valor;
        },

        clearDisplay(){
            this.display.value = '';
        },

        apagaUm(){
            this.display.value = this.display.value.slice(0, -1);
        },

        realizaConta(){

            try {
                let conta = this.display.value;
                if (!conta) {
                    alert('Conta Inválida!');
                    return;
                }
                this.display.value = eval(conta);
            } catch (error) {
                alert('Conta Inválida!');
                return;
            }

        },
    };
}

const calculadora = criaCalculadora();
calculadora.inicia();