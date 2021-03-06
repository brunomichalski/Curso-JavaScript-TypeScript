function validaCPF(cpf) {
    Object.defineProperty(this, 'cpfLimpo',{
        enumerable:true,
        get: function () {
            return cpf.replace(/\D+/g, '');
        }
    });
}

validaCPF.prototype.valida = function () {
    if (typeof this.cpfLimpo === 'undefined') return false;
    if (this.cpfLimpo.length !== 11)return false;
    if (this.isSequencia()) return false;

    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.criaDigito(cpfParcial);
    const digito2 = this.criaDigito(cpfParcial + digito1);
    const novoCpf = cpfParcial + digito1 + digito2
    console.log(novoCpf);
    return novoCpf === this.cpfLimpo;
}

validaCPF.prototype.criaDigito = function (cpfParcial) {
    const cpfArray =  Array.from(cpfParcial);
    let regressivo = cpfArray.length + 1;
    let total = cpfArray.reduce((ac, val)=>{
        ac += (regressivo * Number(val));
        regressivo--;
        return ac;
    },0);
    const digito = 11 - (total % 11);
    return digito > 9 ? '0' : String(digito);
};

validaCPF.prototype.isSequencia = function () {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo;
};

const cpf = new validaCPF('111.111.111-11');
if (cpf.valida()) {
    console.log("CPF Válido")
}else{
    console.log("CPF Inválido")
}