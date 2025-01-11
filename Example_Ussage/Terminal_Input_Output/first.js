function addition(num1, num2) {
  return num1 + num2;
}
function subtraction(num1, num2) {
  return num1 - num2;
}
function multiplication(num1, num2) {
  return num1 * num2;
}
function division(num1, num2) {
  return num1 / num2;
}
function modulus(num1, num2) {
  return num1 % num2;
}

let input1 = Number(process.argv[2]);
let input2 = Number(process.argv[3]);

let result;

console.log(result);

// calling the function addition

result = addition(input1, input2);
console.log(result);

// calling the subtraction function

result = subtraction(input1, input2);

console.log(result);

// calling the multiplication

result = multiplication(input1, input2);
console.log(result);

// calling the function for division
result = division(input1, input2);
console.log(result);

// calling the function to get the reminder

result = modulus(input1, input2);
console.log(result);
