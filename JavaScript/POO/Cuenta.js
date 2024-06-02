const Titular = require('./Titular')

class Cuenta{
    constructor() {
        this.saldo = 0;
        this.titular = new Titular('Fer');
    }

    depositar(monto){
        this.saldo += monto;
        return this.saldo;
    }

    extraer(monto){
        this.saldo -= monto;
        return this.saldo;
    }

    saldo() {
        return this.saldo;
    }

    getTitular() {
        return this.titular;
    }

}

module.exports = Cuenta;