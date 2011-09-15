$(function() {
$( "div" ).draggable();

var cnvs = document.getElementById("drawing_surface");
var ctx = cnvs.getContext("2d");
var width = window.innerWidth;
var height = window.innerHeight;

var words = $('span');
words.hide();

function randomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function getColor() {
  var colors = ["rgb(255,255,0)","rgb(0,255,0)","rgb(255,0,0)"];
  return colors[Math.floor(Math.random() * (colors.length))];
}

function getSticker() {
  var stickers = [rounded_rectangle, circle];
  return stickers[Math.floor(Math.random() * (stickers.length))];
}

function draw() {;
    width = window.innerWidth;
    height = window.innerHeight;
    ctx.canvas.width = width;
    ctx.canvas.height = height;
}

function update() {
    var word = randomWord()
    var position = [Math.random() * width, Math.random() * height];
    ctx.font = "normal 36px 'League Gothic Extended'";
    var sticker = getSticker();
    ctx.save();
    ctx.rotate(Math.PI*2 * Math.random());
    sticker(word, position);
    ctx.restore();
}

function rectangle(word, position) {
    ctx.fillStyle = "rgb(255,255,0)";
    ctx.fillRect(position[0] - 5, position[1] - 5, $(word).width() + 10, $(word).height() + 10);
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.textBaseline = "top";
    ctx.fillText($(word).text(), position[0], position[1]);
}

function rounded_rectangle(word, position) {
    ctx.fillStyle = getColor();
    var x = position[0];
    var y = position[1];
    var radius = 4;
    var width = $(word).width() + 10;
    var height = $(word).height() + 10;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.textBaseline = "top";
    ctx.fillText($(word).text(), position[0] + 5, position[1] + 5);
}

function circle(word, position) {
    var radius = $(word).width() / 2+ $(word).height() / 2 + 2;
    ctx.fillStyle = getColor();
    ctx.beginPath();
    ctx.arc(position[0], position[1], radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.textBaseline = "top";
    ctx.fillText($(word).text(), position[0] - $(word).width() / 2, position[1] - $(word).height() / 2);    
}

$(window).resize(function() {
    draw();
});

draw();
update();
setInterval(update, 200);
});