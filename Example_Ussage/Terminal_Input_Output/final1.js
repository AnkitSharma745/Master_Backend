function Calculate(num1, num2, operation) {
  switch (operation) {
    case "add":
      return num1 + num2;
    case "sub":
      return num1 - num2;
    case "div":
      if (num2 === 0) {
        return "Error: Division by zero!";
      }
      return num1 / num2;
    case "mul":
      return num1 * num2;
    case "rem":
      return num1 % num2;
    case "pow":
      return Math.pow(num1, num2);
    case "sqrt":
      if (num1 < 0) {
        return "Error: Cannot compute the square root of a negative number!";
      }
      return Math.sqrt(num1);
    default:
      return "Invalid operator";
  }
}

let input1 = Number(process.argv[2]);
let input2 = Number(process.argv[3]);
let operation = process.argv[4];

let result;

if (isNaN(input1) || (isNaN(input2) && operation !== "sqrt")) {
  console.log("Error: Please provide valid numbers.");
} else {
  result = Calculate(input1, input2, operation);
  console.log(result);
}
