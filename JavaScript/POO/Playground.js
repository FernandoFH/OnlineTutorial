const Cuenta = require('./Cuenta');
const CajadeAhorro = require('./CajadeAhorro');
const Titular = require('./Titular');

const cuenta = new Cuenta();
const otracuenta = new CajadeAhorro();

cuenta.depositar(1000);
cuenta.extraer(500);

console.log(cuenta.getTitular().nombre);
console.log('Cuenta ', cuenta.saldo);

//otracuenta.depositar(200);
console.log(otracuenta.extraer(50));
console.log(otracuenta.extraer(100));

console.log(otracuenta.getTitular().nombre);
console.log('Otra Cuenta ', otracuenta.saldo);

const titular = new Titular('Juan');