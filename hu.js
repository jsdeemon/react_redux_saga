
// console.log(2 && 1 && null && 0 && undefined);

// a = [1, 2, 3];
// b = [1, 2, 3];

// console.log(a == b); // false

// console.log(true + false); // 1
// break me;// выход на метку me
 
// let user = {
//     sayHi: function() {
//       alert(this);
//     }
//   };
  
//   (user.sayBye = user.sayHi)(); // в коде шибка alert is undefined  



// "use strict";
// a = null + undefined;
// alert(a); // a is undefined - error 

// sayHi();

// function sayHi() {
//   alert("Hello");
// } // сработает


// let a = 1;
// let b = { toString() {return '1'} };
// let c = 1;

// console.log(a + b + c); // 111

// console.log([] + 1 + 2); // 12 

// let x = 5;
// console.log(x++); // 5

// let arr = [];
// arr[1] = 1;
// arr[3] = 33;
// console.log(arr.length); // 4 

// let str = "Hello";
// str.something = 5;
// console.log(str.something); // undefined 

// console.log( "1"[0] ); // 1 

// let y = 1;
// let x = y = 2;

// console.log(x); // 2 

// let apple = '1';
// let Apple = '2';
// console.log(apple); // 1
// console.log(Apple); // 2 

function User() { }
User.prototype = { admin: false };

let user = new User();
console.log(user.admin); // false 