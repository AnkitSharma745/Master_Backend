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
let operation = process.argv[4];

let result;

result = Calculate(input1, input2, operation);

console.log(result);
