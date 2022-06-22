function goMain() {
    location.href="./main.html";
}

function goCase1() {
    location.href="./case1.html";
}

function goCase2() {
    location.href="./case2.html";
}

function goCase3() {
    location.href="./case3.html";
}

function goCase4() {
    location.href="./case4.html";
}

if(document.body.classList.contains('main') == false) {
    document.querySelector('#btn_setting').addEventListener('click', goMain);
    document.querySelector('.go_main').addEventListener('click', goMain);
}

document.querySelector('#btn-case1').addEventListener('click', goCase1);
document.querySelector('#btn-case2').addEventListener('click', goCase2);
document.querySelector('#btn-case3').addEventListener('click', goCase3);
document.querySelector('#btn-case4').addEventListener('click', goCase4);
