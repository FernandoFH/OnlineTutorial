const Cuenta = require("./Cuenta");

class CajadeAhorro extends Cuenta {
    constructor() {
        super();
        this.descubierto = 100;
    }

    extraer(monto){
        if (monto <= this.saldo + this.descubierto){
                this.saldo -= monto;
        }
        return this.saldo;
    }
}

module.exports = CajadeAhorro;