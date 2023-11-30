var lastPt = null;
var canvas;
var ctx;

var isDrawing,
  points = [];

init();

function init() {
  canvas = document.getElementById("canvas");

  ctx = canvas.getContext("2d");
  console.log(ctx);
  let offset = getOffset(canvas);

  if (window.PointerEvent) {
    points = [];
    canvas.addEventListener(
      "pointerdown",
      function () {
        canvas.addEventListener("pointermove", draw, false);
      },
      false
    );
    canvas.addEventListener("pointerup", endPointer, false);
  } else {
    points = [];
    //Provide fallback for user agents that do not support Pointer Events
    canvas.addEventListener(
      "mousedown",
      function () {
        canvas.addEventListener("mousemove", draw, false);
      },
      false
    );
    canvas.addEventListener("mouseup", endPointer, false);
  }
}

// Event handler called for each pointerdown event:
function draw(e) {
  if (lastPt != null) {
    let base =10;
    let penWidth = base+ (e.pressure*10);


    var r_a =0.05//e.pressure;
ctx.strokeStyle = `rgba(32, 255, 21, ${r_a})`;

    ctx.lineWidth = penWidth;
    ctx.lineCap = "round";
               ctx.beginPath();
        
            // Start at previous point
            
            ctx.moveTo(lastPt.x, lastPt.y);
            // Line to latest point
            ctx.lineTo(e.pageX, e.pageY);
            // Draw it!
            ctx.stroke();  

    /*             ctx.beginPath();
ctx.ellipse(e.pageX, e.pageY, penWidth, penWidth, Math.PI / 4, 0, 2 * Math.PI);
ctx.fill(); */

    
  }

  //Store latest pointer
  lastPt = { x: e.pageX, y: e.pageY };
}

function getOffset(obj) {
  //...
}

function endPointer(e) {
  //Stop tracking the pointermove (and mousemove) events
  canvas.removeEventListener("pointermove", draw, false);
  canvas.removeEventListener("mousemove", draw, false);

  //Set last point to null to end our pointer path
  lastPt = null;

  points = [];
}

function midPointBtw(p1, p2) {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2,
  };
}
/*


this method, but record pressure at every point as well

        function getPattern() {
          return ctx.createPattern(img, 'repeat');
        }
        
        
        var el = document.getElementById('c');
        var ctx = el.getContext('2d');
        
        ctx.lineWidth = 25;
        ctx.lineJoin = ctx.lineCap = 'round';
        
        var img = new Image;
        img.onload = function() {
          ctx.strokeStyle = getPattern();
        };
        img.src = 'https://i.imgur.com/huy6X9t.png';
        


        var isDrawing, points = [ ];
        
        el.onmousedown = function(e) {
          isDrawing = true;
          points.push({ x: e.clientX, y: e.clientY });
        };
        
        el.onmousemove = function(e) {
          if (!isDrawing) return;
          
          points.push({ x: e.clientX, y: e.clientY });
        
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          
          var p1 = points[0];
          var p2 = points[1];
          
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
        
          for (var i = 1, len = points.length; i < len; i++) {
            var midPoint = midPointBtw(p1, p2);
            ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
            p1 = points[i];
            p2 = points[i+1];
          }
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        };
        
        el.onmouseup = function() {
          isDrawing = false;
          points.length = 0;
        }; */
