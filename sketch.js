p5.disableFriendlyErrors = true;

var ITERATIONS = 100;
var ZOOM = 200; //the bigger number the bigger the ZOOM
//−1.401155      + 0
//−0.1528        + 1.0397
var X_OFFSET = -0.5;
var Y_OFFSET = 0;
var FRACTAL_MODE = "mandelbrot";
//Interesting Julia sets
//0,285           0,01
//0.3             0.5
//-1.417022285618 0
//0.285           0.013
//0               0
var juliaCX = -0.874;
var juliaCY = 0.05198;

function setup() {
  createCanvas(512,512);
  pixelDensity(4);
  noLoop();
}

function draw() {
  loadPixels();
  var d = pixelDensity();
  for (var i = 0; i < d; i++) {
    for (var j = 0; j < d; j++) {
      for (var x = 0; x<width;x++) {
        for (var y =0;y<height;y++) {
          index = 4 * ((y * d + j) * width * d + (x * d + i));
          lx = ((x-(width/2))/ZOOM) + X_OFFSET;
          ly = (((height/2)-y)/ZOOM)+ Y_OFFSET;
          var col = map(isMandelBrot(lx,ly),0,ITERATIONS,0,255);
          var red = col;
          var green = col;
          var blue = col;

          pixels[index] = red;
          pixels[index+1] = green;
          pixels[index+2] = blue;
          pixels[index+3] = 255;

        }
      }
    }
  updatePixels();
  }
}

function isMandelBrot(x,y) {
  var nzr = 0;
  var nzi = 0;
  var ozr = 0;
  var ozi = 0;
    //math magic
  for (var i = 0; i < ITERATIONS; i++) {
    nzr = (ozr*ozr) - (ozi*ozi) + x;
    nzi = 2*ozi*ozr + y;
    ozr = nzr;
    ozi = nzi;
    if (nzr > 2) {
      return i;
    }
  }
}


////////////////////////////////////////////////

//// TODO:
// Implement a new isMandelBrot function



function randomJulia() {
  juliaCX = 1-(2*Math.random());
  juliaCY = 1-(2*Math.random());
  drawFractal(0);
}

function isPartofSet(x,y){
  switch (FRACTAL_MODE) {
    case "mandelbrot":
      return dto255(isMandelBrot(x,y));
      break;
    case "julia":
      return dto255(isJulia(x,y,juliaCX,juliaCY));
      break;
    default:

  }
}

//The mandelbrot generator function
//points de Feigenbaum
//−1.401155      + 0
//−0.1528        + 1.0397

function dto255(d) {
  var colour = Math.abs(d);
  if (colour <=2) {
    colour = colour*256.0*256.0*256.0/2.0;
  } else {
    if (d<0) {
      colour = 0;
    } else {
      colour = 0;
    }
  }
  return Math.ceil(colour);
}

//converts a float d to a color if |d| < 2, so if its in the mandelbrot set
function dtoHex(d) {

  var colour = Math.abs(d);
  var colorString = '';
  if (colour <= 2) {
    colour = ((colour)*256.0*256.0*256.0/2);

    colour = Math.ceil(colour);
    colorString = colour.toString(16);
    while (colorString.length < 6) {
      colorString = "0" + colorString;
    }
    colorString = "#" + colorString;
  } else {
    if (d>0) {
      colorString = '#000000';
    } else {
      colorString = '#222222';
    }
  }

  return colorString;
}


function isMandelBrot(x,y) {
  var nzr = 0;
  var nzi = 0;
  var ozr = 0;
  var ozi = 0;
    //math magic
  for (var i = 0; i < ITERATIONS; i++) {
    nzr = (ozr*ozr) - (ozi*ozi) + x;
    nzi = 2*ozi*ozr + y;
    ozr = nzr;
    ozi = nzi;
    if (nzr > 2) {
      return i;
    }
  }
  return ITERATIONS;
}

//same as isMandelBrot but ^5 instaed of ^2
function isMandelCube(x,y) {
  var nzr = 0;
  var nzi = 0;
  var ozr = 0;
  var ozi = 0;
    //math magic
  for (var i = 0; i < ITERATIONS; i++) {
    nzr = (ozr*ozr*ozr*ozr*ozr) - (10*ozr*ozr*ozr*ozi*ozi) + 5*ozr*ozi*ozi*ozi*ozi + x;
    nzi = 5*ozr*ozr*ozr*ozr*ozi - (10*ozr*ozr*ozi*ozi*ozi) + (ozi*ozi*ozi*ozi*ozi) + y;
    ozr = nzr;
    ozi = nzi;
    if (nzr > 2) {
      break;
    }
  }
  return nzr;
}

function isJulia (x,y,cx,cy) {
  var nzr = 0;
  var nzi = 0;
  var ozr = x;
  var ozi = y;
    //math magic
  for (var i = 0; i < ITERATIONS; i++) {
    nzr = (ozr*ozr) - (ozi*ozi) + cx;
    nzi = 2*ozi*ozr + cy;
    ozr = nzr;
    ozi = nzi;
    if (nzr > 2) {
      break;
    }
  }
  return nzr;
}

//Interesting Julia sets
//0,285           0,01
//0.3             0.5
//-1.417022285618 0
//0.285           0.013
//0               0
function Julia() {
    var cx = 0.15;
    var cy = 0.15;
    for (var x = 1;x < SIZEX;x++) {
      for (var y = 1; y < SIZEY; y++) {
      range.getCell(y,x).setBackground(dtoHex(isJulia(((x-(SIZEX/2))/ZOOM)  ,(((SIZEY/2)-y)/ZOOM), cx, cy)));
      }
    }
}
