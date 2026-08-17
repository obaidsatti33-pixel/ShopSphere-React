let age = 20;
let city = "New York";

const country = "USA";

console.log("Age:", age);
console.log("City:", city);
console.log("Country:", country);

age = 25;
console.log("Updated Age:", age);

function greet() {
    console.log("Hello, Ali!");
}
    greet();


    function square(num) {
        return num * num;
    }
    console.log("Square of 5:", square(5));


    function calculateTotal(price, quantity) {
        return price * quantity;
    }
    console.log("Total for 2 items at $10 each:", calculateTotal(10, 2));
