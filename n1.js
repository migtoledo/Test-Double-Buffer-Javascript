// Screen dimensions
const WIDTH = 1024
const HEIGHT = 768

// Create the panel1 canvas and context
var panel1 = document.createElement('canvas');
var ctx1 = panel1.getContext('2d');
panel1.height = HEIGHT;
panel1.width = WIDTH;
document.body.appendChild(panel1);

// Create the back buffer and context
var panel2 = document.createElement('canvas');
var ctx2 = panel1.getContext('2d');
panel2.height = HEIGHT;
panel2.width = WIDTH;

function setAlpha(ctx, alpha) {
    ctx.globalAlpha = alpha;
}

var LEFT = 50;
var TOP = 50;

var OXX = WIDTH / 2;
var OYY = HEIGHT / 2;
// XY scale pixels/unit
var exy = 250;
var ex = exy;
var ey = exy;
/// From math space -> screenbuffer space
function xx(x) {
    return (OX + x * ex);
}
function yy(y) {
    return (OY - y * ey);
}
/// From screenbuffer space -> math space
function __x(xx) {
    return (xx - OXX) / ex;
}
function __y(yy) {
    return (OYY - yy) / ey;
}

var x0 = 0;
var y0 = 0;

var nloop = 0;
var t = 0;
var dt = 10;
var dts = dt / 1000;
var ts = 0;

function update_ts() {
    ts = t / 1000;
    return ts;
}

function _ts() {
    return update_ts();
}

function drawT(ctx, xx, yy) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText("n: " + nloop + " t: " + _ts() + " s ", xx, yy);
}

function drawMandelbrotSet(ctx) {
    ctx.fillStyle = "white";
    for (var yy = TOP; yy < HEIGHT - TOP; yy++) {
        for (var xx = LEFT; xx < WIDTH - LEFT; xx++) {
            convergency = 100;
            var s = 150;

            //ctx.fillStyle = "blue";
            //ctx.ctx.fillRect(xx, yy, 1, 1); // Draw a colorful pixel

            //ctx.fillStyle = "rgb(100, 10, " + convergency + ")";
            ctx.fillStyle = "hsl(" + h + "," + s + "%," + (convergency) + "%)";
            ctx.fillRect(xx, yy, 1, 1); // Draw a colorful pixel
        }
    }
}

/// MOUSE FUNCTIONS

var XXMouse = 0;
var YYMouse = 0;
var XMouse = 0;
var YMouse = 0;

// Get the position of the mouse relative to the canvas
function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        xx: mouseEvent.clientX - rect.left,
        yy: mouseEvent.clientY - rect.top
    };
}
function getmouseXXYY(event) {
    return getMousePos(panel1, event);
}
panel1.addEventListener('mousemove', e => {
    var pos = getmouseXXYY(e);

    XXMouse = pos.xx;
    YYMouse = pos.yy;

    XMouse = __x(pos.xx);
    YMouse = __y(pos.yy);

    showMouseXY(OXX, TOP - 10);
});

function showMouseXY(ctx, xx, yy) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText("XX: " + XXMouse + " YY: " + YYMouse, xx, yy);
}

function render(ctx) {
    // clear the canvas
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // render the squares

    var xx = LEFT;
    var yy = TOP - 10;

    drawT(ctx, xx, yy);
    showMouseXY(ctx, OXX - 100, TOP - 10);
}

function loop() {
    nloop++;
    t += dt;
    if (nloop == 1) t = 0;
    // render into back buffer
    render(ctx2);
    // flip buffers
    ctx1.drawImage(panel2, 0, 0);

    //loop();
    setTimeout(loop, dt);
}

function resetloops() {
    nloop = 0;
    t = 0;
    ts = 0;
}

function start() {
    loop();
}

start();