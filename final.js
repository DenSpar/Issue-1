/*
README
программа получает матрицу 3-мя способами:
1) если при запуске указать количество строк и столбцов, программа создаст матрицу указанного размера и заполнит ее рандомными значениями 1 или 0
например 'node final.js 4 5'
2) если при запуске указан путь до файла с матрицей
например 'node final.js C://Desktop/matrix.txt'
  2*) при этом матрица в файле может быть записана в виде
    0,1,1
    1,0,1
    1,1,0

    или в виде [[0,0,1],[0,1,0],[1,1,0]]
3) в остальных случаях будет создана матрица размером 3х3, заполненная рандомными значениями 1 или 0
*/

//функция рандома для объявления клетки - живая\мертвая
var deadOrAlive = function () {
  return Math.floor(Math.random() * 2);
};

// фунцкия для создания рандомного массива заданного размера
var makeField = function (rows,columns) {
  let field = [];
  for (let i = 0; i < rows; i++) {
    field[i] = [];
    for (let j = 0; j < columns; j++) {
      field[i][j] = deadOrAlive();      
    };
  };
  return field;
};

//функция для получение массива в виде строки из файла
var getArrayFromFile = function () {
    const fs = require('fs');
    let strArr = '';
    try {
        strArr = fs.readFileSync(process.argv[2], 'utf8')
    } catch (err) {
        console.error(err)
    };
    return strArr
};

//если массив однострочный и начинается с [
    var makeArrayFromMonoString = function(str) {
        var arr = str.split(/\D/);
        //тут костыли, не придумал как без них обойтись
        arr.shift();
        arr.pop();
        return arr
    };

//если массив многострочный и начинается с [[
var makeArrayFromPolyString = function(str) {
    var arr = str.split(/\D{2,3}/).map(function(x){return x.split(",")});
    //тут костыли, не придумал как без них обойтись
    arr.shift();
    arr.pop();
    return arr
};

//если массив в виде матрицы
var makeArrayFromMatrix = function (str) {
    var arr = str.split("\r\n").map(function(x){return x.split(",")});
    return arr
};

//проверка в каком виде записан массив в файле
var stringOrMatrix = function (str) {
    if (str[1] === "[") {
        return makeArrayFromPolyString(str);
    } else {
        if (str[0] === "[") {
            return makeArrayFromMonoString(str);
        } else {
            return makeArrayFromMatrix(str);
        };        
    };
};

//переработка массива-строк в массив из чисел
var makeNumberArray = function (arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr[i] = [];
      for (let j = 0; j < arr[i].length; j++) {
        newArr[i][j] = + arr[i][j];      
      };
    };
    return newArr;
};

//функция определения способа создания массива
var fromFileOrRandom = function () {
  if (process.argv.length === 4) {
    let N = process.argv[2];
    let M = process.argv[3];
    return makeField(N,M)
  } else {
    if (process.argv.length === 3) {
      return makeNumberArray(stringOrMatrix(getArrayFromFile()))
    } else {
      return makeField(3,3)
    };
  };
};

//функция однократной переработки матрицы
var rewriteField = function(inputField) {
  let targetField = [];
  let nullRow = [];
  for (let i = 0; i < inputField[0].length; i++) {
    nullRow[i] = 0;
  };  
  targetField.push(nullRow);
  for (let i = 0; i < inputField.length; i++) {
    targetField.push(inputField[i]);
  };
  targetField.push(nullRow);
  
   let newField = [];
  for (let i = 1; i <= inputField.length; i++) {
    newField[i-1] = [];
    for (let j = 0; j < inputField[0].length; j++) {
      let aliveNeighbours = 0;
      if (targetField[i-1][j-1]) {aliveNeighbours++};
      if (targetField[i-1][j]) {aliveNeighbours++};
      if (targetField[i-1][j+1]) {aliveNeighbours++};
      if (targetField[i][j-1]) {aliveNeighbours++};
      if (targetField[i][j+1]) {aliveNeighbours++};
      if (targetField[i+1][j-1]) {aliveNeighbours++};
      if (targetField[i+1][j]) {aliveNeighbours++};
      if (targetField[i+1][j+1]) {aliveNeighbours++};
      
      if (targetField[i][j]) {
        if (aliveNeighbours === 2 || aliveNeighbours === 3) {
          newField[i-1][j] = 1;
        } else {newField[i-1][j] = 0}
      } else {
      if (aliveNeighbours === 3) {
        newField[i-1][j] = 1;
      } else {newField[i-1][j] = 0}
      };      
    };
  };
   return newField
 };

//функция для бесконечного перерабатывания матрицы
var beginLoop = function () {
  let startMatrix = fromFileOrRandom();
  console.log("start array");
  console.log(startMatrix);
  let nextArr = startMatrix;
  let t = 1;

  setInterval(function() {
    nextArr = rewriteField(nextArr);
    console.log(t + ' change');
    console.log(nextArr);
    t++;
  },1000);
};

beginLoop();