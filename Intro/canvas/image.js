const canvas = document.getElementById("canvas");

// const dataURL = canvas.toDataURL();
const btnDisplay = document.querySelector("#btnDisplay");
const btnDownload = document.querySelector("#btnDownload");
const imgConverted = document.querySelector("#imgConverted");
const myCanvas = document.querySelector("#myCanvas");
const ctx = myCanvas.getContext("2d");

ctx.font = "50px, Roboto";
ctx.fillStyle = "red";
// console.log(dataURL);

btnDisplay.addEventListener("click", function(){
    const dataURL = myCanvas.toDataURL();
    console.log(dataURL);
});


// function copyImageCanvas(){
//     var image = document.querySelector("img");
//     var canvas = document.querySelector("canvas");

//     var ctx = canvas.getContext("2d");
//     ctx.drawImage(image,
//         0, 0, // title sheet x, y (top left corner of the grab). ie. x-coordinate, y-coordinate
//         250, 250, // how big of a grab
//         100, 100, // where you want the crop to be placed. ie. Position of the image in X-axis Y-axis
//         100, 300 ); // size of placement of what was grabbed . ie. width, height
// }


// setTimeout(() => {
//     copyImageCanvas();
// }, 300)

