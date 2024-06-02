const Cuenta = require("./Cuenta");

class CuentaCorriente extends Cuenta{
    constructor(){
        super();
        this.cantidadMaximaExtracciones = 100;
        this.extraccion = 0;
    }

    extraer(monto){
        if(monto <= this.saldo && this.extraccion < this.cantidadMaximaExtracciones){
            this.saldo -= monto;
            this.extraccion += 1;
        }
        return this.saldo;
    }
}

module.exports = CuentaCorriente;