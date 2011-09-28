// http://stackoverflow.com/questions/4576724/dotted-stroke-in-canvas
// To draw dashed / dotted lines on a canvas
var CP = window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype;
if(CP && CP.lineTo) CP.dashedLine = function(x, y, x2, y2, dashArray){
    if(! dashArray) dashArray=[10,5];
    var dashCount = dashArray.length;
    var dx = (x2 - x);
    var dy = (y2 - y);
    var xSlope = (Math.abs(dx) > Math.abs(dy));
    var slope = (xSlope) ? dy / dx : dx / dy;
    this.moveTo(x, y);
    var distRemaining = Math.sqrt(dx * dx + dy * dy);
    var dashIndex = 0;
    while(distRemaining >= 0.1){
        var dashLength = Math.min(distRemaining, dashArray[dashIndex % dashCount]);
        var step = Math.sqrt(dashLength * dashLength / (1 + slope * slope));
        if(xSlope){
            if(dx < 0) step = -step;
            x += step
            y += slope * step;
        }else{
            if(dy < 0) step = -step;
            x += slope * step;
            y += step;
        }
        this[(dashIndex % 2 == 0) ? 'lineTo' : 'moveTo'](x, y);
        distRemaining -= dashLength;
        dashIndex++;
    }
}
// To draw dashed / dotted circles on a canvas
if(CP && CP.lineTo) CP.dashedArc = function (x, y, r, startAngle, endAngle, antiClockwise, dashArray) {
    if(! dashArray) dashArray=[10,5];

    var dashCount = dashArray.length;
    var distRemaining = (endAngle - startAngle) * (r - 1);
    var dashIndex = 0;

    stepStartAngle = 0;
    
    while(distRemaining >= 0.1){
        var dashLength = Math.min(distRemaining, dashArray[dashIndex % dashCount]);
        var stepEndAngle = stepStartAngle + (dashLength / r);

        if(dashIndex % 2 == 0){
            this.arc(x,y,r,stepStartAngle,stepEndAngle,antiClockwise);
        }else{
            this.moveTo(x + (Math.cos(stepEndAngle) * r), y + (Math.sin(stepEndAngle) * r));
        }
        
        stepStartAngle = stepEndAngle;

        distRemaining -= dashLength;
        dashIndex++;
    }
}
// To draw text on a circle
if(CP && CP.lineTo) CP.fillTextCircle = function(text,x,y,radius,startRotation){
    this.save();
    this.translate(x,y);
    this.rotate(startRotation);
    
    var distance = 0;

    for(var i=0;i<text.length;i++){
        this.save();
        var letter_distance = (this.measureText(text.substr(0,(i + 1))).width - this.measureText(text.substr(0,i)).width);
        this.rotate((distance + (letter_distance / 2)) / radius);
        this.fillText(text[i],-(0.5*letter_distance),-radius);
        distance += letter_distance;
        this.restore();
    }
    
    this.restore();
}

var factor = 30;
var baseSize = factor;

var cnvs = null;
var ctx = null;
var width = null;
var height = null;
var words = null;


function setBaseSize () {
    baseSize = $('#wrapper').width() / factor;
   
    $('body').css('font-size', baseSize);
    $('body').css('line-height', baseSize);
}

function calcSize (original) {
    return (original * baseSize);
}


function drawTextStickers () {
    drawTextCircle ([width * 0.05 + Math.random() * width * 0.85, Math.random() * width * 0.2], 'Free');
    drawTextCircle ([width * 0.05 + Math.random() * width * 0.85, Math.random() * width * 0.2], 'Libre');
    drawTextCircle ([width * 0.05 + Math.random() * width * 0.85, Math.random() * width * 0.2], 'Open');
    drawTextCircle ([width * 0.05 + Math.random() * width * 0.85, Math.random() * width * 0.2], 'Source');
    drawTextCircle ([width * 0.05 + Math.random() * width * 0.85, Math.random() * width * 0.2], 'Software');
    drawTextCircle ([width * 0.05 + Math.random() * width * 0.85, Math.random() * width * 0.2], 'Arts-lab');
}

function randomWord() {
    return $(words[Math.floor(Math.random() * words.length)]).html();
}

function getColor() {
  var colors = ["rgb(255,136,0)","rgb(255,255,255)","rgb(78,232,255)"];
  return colors[Math.floor(Math.random() * (colors.length))];
}

function getEmptySticker() {
  var stickers = [empty_rounded_rectangle, empty_circle, empty_circle];
  return stickers[Math.floor(Math.random() * (stickers.length))];
}


function drawGrid () {;
    width = $("body").width();
    height = $(document).height();
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    
    for (i=0; i < Math.floor(Math.random() * 300); i++) {
        var position = [Math.random() * width, Math.random() * height];
        var sticker = getEmptySticker();
        sticker(position);
    }
}

function empty_rectangle(position) {
    ctx.fillStyle = "rgb(255,255,0)";
    ctx.fillRect(position[0] - 5, position[1] - 5, 150, 350);
    ctx.fillStyle = "rgb(0,0,0)";
}

function empty_rounded_rectangle(position) {
    ctx.fillStyle = getColor();
    ctx.save();
    //ctx.translate((width/2), (height/2));
    var x = position[0];
    var y = position[1];
    var radius = calcSize (0.133333333);
    var width = calcSize(4.166666667);
    var height = calcSize(8.2);
    ctx.rotate(Math.PI*2 * Math.random());
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.dashedLine(x + radius, y, x + width - radius, y, [calcSize(0.5),calcSize(0.5)]);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.dashedLine(x + width, y + radius, x + width, y + height - radius, [calcSize(0.5),calcSize(0.5)]);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.dashedLine(x + width - radius, y + height, x + radius, y + height, [calcSize(0.5),calcSize(0.5)]);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.dashedLine(x, y + height - radius, x, y + radius, [calcSize(0.5),calcSize(0.5)]);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.lineWidth = calcSize(0.03);
    ctx.strokeStyle = "rgb(50,50,50)";
    ctx.stroke();
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.restore();
}

function empty_circle(position) {
    var radius = calcSize(2);
    ctx.fillStyle = getColor();
    ctx.beginPath();
    ctx.dashedArc(position[0], position[1], radius, 0, Math.PI * 2, false, [calcSize(0.5),calcSize(0.5)]);
    ctx.closePath();
    ctx.lineWidth = calcSize(0.03);
    ctx.strokeStyle = "rgb(50,50,50)";
    ctx.stroke();
    ctx.fillStyle = "rgb(0,0,0)";
}

function drawTextCircle (position, text) {
    ctx.fillStyle = getColor();
    ctx.beginPath();
    ctx.arc(position[0], position[1], calcSize(2), 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.font = "bold " + calcSize (0.6) + " 'propcouriersans'";
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillTextCircle (text.toUpperCase(), position[0], position[1], calcSize(1.3), Math.random() * Math.PI * 2)
}

$(document).ready(function () {
    cnvs = document.getElementById("drawing_surface");
    ctx = cnvs.getContext("2d");
    width = $("body").width();
    height = $(document).height();

    setBaseSize ();

    words = $('span.key')
    words.hide();

    $("div.label").draggable();
    $("div.logo").draggable();

    $(window).resize(function() {
        setBaseSize ();
        drawGrid ();
        drawTextStickers ();
    });

    drawGrid ();
    
    ctx.font = "bold " + calcSize (0.6) + " 'propcouriersans'";
    // Force the browser to load the font    
    ctx.fillText('', 0, 0);    

    $(document).bind ('readystatechange', function() {
        if (document.readyState == 'complete') {
            drawTextStickers ();
            $(document).unbind ('readystatechange');
        }
    });
});
