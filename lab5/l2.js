let image = document.getElementById("trafficLight");
let turnOn = false;
let index = 0;
let goBack = false;
let change;
let blink1;
let blink2;

let red = 7000;
let yellow = 3000;
let green = 5000;

let arr = [
    "red.png",
    "yellow.png",
    "green.png"
];


function turnOnOff(){
    clearTimeout(change);
    turnOn = !turnOn;
    trafficLight();
    index = 0;

    setInterval(() => {
        let color;
        (index <= 1) ? color = "Червоний" : (index == 2) ? color = "Жовтий" : (index == 3) ? color = "Зелений" : color = "помилка";
        if(!turnOn){
            color = "Немає";
        }
        document.getElementById("colorNow").textContent = color;
    }, 50);
}

function changeLight(){
    if(turnOn){

        if(index > 2){
            goBack = true;
        }
        if(goBack){
            index = index - 2;
        }
        if(index < 0){
            goBack = false;
            index  = index + 2;
        }
        if(goBack == true && index == 1){
            blinking();
        }

        image.src = arr[index];
        index++;

        trafficLight();
    }
}

function blinking(){
    setTimeout(() => {
        clearInterval(blink1);
        clearInterval(blink2);
    }, yellow);

    blink1 = setInterval(() => {image.src = "yellow.png"}, 1000);
    setTimeout(() => {image.src = "close2.png"}, 500);
    setTimeout(() => {blink2 = setInterval(() => {image.src = "close2.png"}, 1000)}, 500);
}

function trafficLight(){
    if(turnOn){
        if(index == 0){
            change = setTimeout(() => changeLight(), 0);
        }
        else if(index == 1){
            change = setTimeout(() => changeLight(), red);
        }
        else if(index == 2){
            change = setTimeout(() => changeLight(), yellow);
        }
        else{
            change = setTimeout(() => changeLight(), green);
        }
    }
    else{
        image.src = "close2.png";
    }
}

function changeDuration(){
    let colorToChange = prompt("Який колір хочете змінити?");
    let duration = parseInt(prompt("Встановіть тривалість: "));
    while(colorToChange != "зелений" &&
          colorToChange != "червоний" &&
          colorToChange != "жовтий"){
        colorToChange = prompt("Який колір хочете змінити?");
    }

    while(!(Number.isFinite(duration))){
        duration = parseInt(prompt("Встановіть тривалість: "));
    }

    switch(colorToChange){
        case "зелений":
            green = duration * 1000;
            break;
        case "червоний":
            red = duration * 1000;
            break;
        case "жовтий":
            yellow = duration * 1000;
            break;
    }
}

function changeColor(colorToChange){
    index = colorToChange;
    clearTimeout(change);
    clearInterval(blink1);
    clearInterval(blink2);
    changeLight();
}







