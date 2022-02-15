const SHA256 = require('crypto-js/sha256');

function calcularHash(block) {
    return SHA256(
        block.index + 
        block.previousHash + 
        block.timestamp + 
        JSON.stringify(block.data) + 
        block.nonce
    ).toString();
}

class Block {
    constructor(index, timestamp, data, previousHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.previousHash = previousHash; 
        this.data = data;
        this.nonce = 0; 
        this.hash = calcularHash(this);
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = calcularHash(this);
        }
    console.log("Bloque Minado: " + this.hash + " en " + this.nonce + " intentos");
    }
}

class Blockchain {
    constructor() {
        this.difficulty = 4;
        const genesisBlock = new Block(0, new Date().getTime, "Genesis Block", null);
        genesisBlock.mineBlock(this.difficulty);
        this.chain = [genesisBlock];
    }

    getUltimoBloque() {
        return this.chain[this.chain.length - 1];
    }

    crearNuevoBloque(data) {
        const ultimoBloque = this.getUltimoBloque();
        const nuevoBloque = new Block(
            ultimoBloque.index + 1, 
            new Date().getTime(), 
            data,
            ultimoBloque.hash
            );
        nuevoBloque.mineBlock(this.difficulty);
        this.agregarBloque(nuevoBloque);
    }

    agregarBloque(nuevoBloque) {
        const ultimoBloque = this.getUltimoBloque();

        if (ultimoBloque.index + 1 !== nuevoBloque.index) {
            console.log("index no valido");
        } else if (ultimoBloque.hash !== nuevoBloque.previousHash) {
            console.log("hash anterior no valido ");
        } else if (calcularHash(nuevoBloque) !== nuevoBloque.hash) {
            console.log("No minaste el bloque");
        } else {
            this.chain.push(nuevoBloque);
        }
    }
            

    imprimir() {
        this.chain.forEach((block) => 
            console.log(`${JSON.stringify(block)} \n`));
        }
}

const blockchain = new Blockchain();

blockchain.crearNuevoBloque({de:"Juan", a:"Pedro", cantidad:10});
blockchain.crearNuevoBloque({de:"Anna", a:"Luis", cantidad:23});
blockchain.crearNuevoBloque({de:"Tincho", a:"Julio", cantidad:30});
blockchain.crearNuevoBloque({de:"Pablo", a:"Tina", cantidad:40});

/*
const bloackHackeado = new Block(
    5, 
    new Date().getTime(),
    {de:"Tina", a:"Hacker", cantidad:40},
    blockchain.getUltimoBloque().hash
    );
    bloackHackeado.hash = "00003c4ad68281c6434cb89185910fda5c44d616d7e57e1c18950ebfdcdc9515";

    blockchain.agregarBloque(bloackHackeado);
*/

blockchain.imprimir();