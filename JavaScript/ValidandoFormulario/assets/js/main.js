class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const camposValidos = this.camposSaoValidos();
        const senhasValidas = this.senhasSaoValidas();

        if (camposValidos && senhasValidas) {
            alert("Formulário enviado!")
            this.formulario.submit();
        }
    }

    senhasSaoValidas(){
        let valido = true;
        
        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetir-senha');
        if (senha.value !== repetirSenha.value) {
            valido = false;
            this.criaErro(senha, 'Campos "Senha" e "Repetir Senha" precisam ser iguais!');
            this.criaErro(repetirSenha, 'Campos "Senha" e "Repetir Senha" precisam ser iguais!');
        }

        if (senha.value.length < 6 || senha.value.length > 12) {
            valido = false;
            this.criaErro(senha, 'Senha precisa ser maior que 6 e maior que 12 caracteres!');
        }
        return valido;
    }

    camposSaoValidos(){
        let valido = true;

        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for (let campo of this.formulario.querySelectorAll('.validar')) {
            let label = campo.previousElementSibling.innerHTML;
            if (!campo.value) {
                this.criaErro(campo,`Campo "${label}" não pode estar em branco!`);
                valido = false;
            }

            if (campo.classList.contains('cpf')) {
                if (!this.validaCPF(campo)) valido = false; 
            }

            if (campo.classList.contains('usuario')) {
                if (!this.validaUsuario(campo)) valido = false; 
            }

        }
        return valido;
    }

    validaCPF(campo){
        const cpf = new ValidaCPF(campo.value);

        if(!cpf.valida()){
            this.criaErro(campo, "CPF Invalido!");
            return false;
        }
        return true;
    }

    validaUsuario(campo){
        const usuario = campo.value;
        let valid = true;
        if (usuario.length < 3 || usuario.length > 12) {
            this.criaErro(campo, "Usuario precisa ter entre 3 e 12 caracteres!");
            valid = false;
        }
        if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.criaErro(campo, "Usuario precisa conter apenas letras e(ou ) números!");
            valid = false;
        }

        return valid;
    }

    criaErro(campo, mensagem){
        const div = document.createElement('div');
        div.innerHTML = mensagem;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }
}

const valida = new ValidaFormulario();
