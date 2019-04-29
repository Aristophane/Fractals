var maxIteration = 100;

function computeValue(x, y){

    var c = math.complex(x, y);

    var z_initial = math.complex(0,0);   
    var z_previous = z_initial;

    function recurrence(z_next){
        var z_next = math.add(math.multiply(z_previous, z_previous), c);
        z_previous = z_next;
        return z_next;
    }
    var n = 0;

    while(n < maxIteration){
        var result = recurrence(z_previous);
        if(complexModulo(result) > 16){
            break;
        }
        n++;
    }

    return n;
}

function plot(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;


    var complexW = 2;
    var complexH = (complexW * height) / width;
    var xmin = -complexW/2;
    var ymin = -complexH/2;
    // x goes from xmin to xmax
    var xmax = xmin + complexW;
    // y goes from ymin to ymax
    var ymax = ymin + complexH;

    // Calculate amount we increment x,y for each pixel
    var dx = (xmax - xmin) / (width);
    var dy = (ymax - ymin) / (height);

    var monImageData = ctx.createImageData(width, height);
    var data = monImageData.data;
    console.log(data.length);
    var x = xmin;
    for(i= 0; i < height; i++)
    {
        var y = ymin;
        for(j=0; j < width; j++)
        {
            var result = computeValue(x , y);
            if(result == maxIteration)
            {
            setPixel(monImageData, i, j, 255, 255, 255, 255);
            }
            else{
                var value = Math.floor(result*255/maxIteration);
                setPixel(monImageData, i, j, value, 0, 0, 255);
            }
            y += dy;
        }
        x += dx;
    }
    ctx.putImageData(monImageData, 0, 0);
}

function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}

var pointValue = function(point, value){
    this.point = point;
    this.value = value;
}

function complexModulo(complexNumber){
    return math.sqrt(complexNumber.re*complexNumber.re + complexNumber.im*complexNumber.im);
}

plot();
