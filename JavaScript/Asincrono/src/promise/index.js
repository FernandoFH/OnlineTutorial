const promise = new Promise(function (resolve, reject){
    resolve('Ok')
});

const cows = 7;
const countCows = new Promise(function(resolve, reject){
    if(cows > 10) {
        resolve(`We have ${cows} on the farm`);
    } else {
        reject("There is no cows on the farm");
    }
});

countCows.then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
}).finally(() => console.log('Finally'));

