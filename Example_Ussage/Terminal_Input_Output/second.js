function Calculate(num1, num2, operation) {
  switch (operation) {
    case "add":
      return num1 + num2;
    case "sub":
      return num1 - num2;
    case "div":
      return num1 / num2;
    case "mul":
      return num1 * num2;
    case "rem":
      return num1 % num2;
    default:
      return "Invalid operator";
  }
}

let input1 = Number(process.argv[2]);
let input2 = Number(process.argv[3]);

let result;

console.log(result);

// calling the function for addition

result = Calculate(input1, input2, "add");
console.log(result);

// calling the subtraction  for function

result = Calculate(input1, input2, "sub");

console.log(result);

// calling the function for multiplication

result = Calculate(input1, input2, "mul");
console.log(result);

// calling the function for division
result = Calculate(input1, input2, "div");
console.log(result);

// calling the function to get the reminder

result = Calculate(input1, input2, "rem");
console.log(result);
