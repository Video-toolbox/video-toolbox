
import {InitStoryboard,CreateSlide,updateSlideImage,LoadSlideImage,LoadStoryboard} from "./modules/storyboard_module.js";

export class DrawEngine {
  constructor(myCanvas) {
    this.canvas = document.getElementById(myCanvas);
    this.ass = myCanvas;
    this.ctx = this.canvas.getContext("2d");
    this.isDrawing = false;
    this.points = [];
    this.lastPt;
    this.myDraw = this.draw.bind(this);
    this.currentTool = "pencil";
    this.selectedColor = [0, 0, 0, 1];
    this.currentImageData=null
    this.updateSlideFunction=updateSlideImage

    this.initialize();
  }

  initialize() {
    //let offset = getOffset(this.canvas);

    if (window.PointerEvent) {
      //this.canvas.addEventListener("pointermove", this.draw.bind(this));

      this.canvas.addEventListener(
        "pointerdown",
        this.startPointer.bind(this),
        false
      );

      this.canvas.addEventListener(
        "pointerup",
        this.endPointer.bind(this),
        false
      );
    } else {
      this.points = [];
      //Provide fallback for user agents that do not support Pointer Events
      //this.canvas.addEventListener("mousemove", this.draw.bind(this));

      this.canvas.addEventListener(
        "mousedown",
        this.startPointer.bind(this),
        false
      );
      this.canvas.addEventListener("mouseup", this.endPointer.bind(this));
    }

    this.currentImageData=this.canvas.toDataURL()
  }

  draw(e) {
    //console.log(e);
    /*
    https://stackoverflow.com/questions/57711515/javascript-eventlistener-pointermove-points-per-second

    https://developer.mozilla.org/en-US/docs/Web/API/Element/hasPointerCapture
    */

    if (!this.isDrawing) {
      console.log("nope");
      return;
    }

    let bounds = this.canvas.getBoundingClientRect();

    if (this.lastPt != null) {
      // palm rejection with e.width

      if (e.width > 2) {
        alert("too fat");
      }

      let base = 10;
      let pressure = e.pressure;

      

      if (pressure <= 0) {
        pressure = 0.009;
      }

      let penWidth = base * (pressure * 4);

      var r_a =1;

      //this.ctx.strokeStyle = `rgba(10, 10, 10, ${r_a})`;

      this.ctx.strokeStyle = `rgba(${this.selectedColor[0]}, ${this.selectedColor[1]}, ${this.selectedColor[2]}, ${r_a})`;

      this.ctx.lineWidth = penWidth;
      this.ctx.lineCap = "round";
      this.ctx.beginPath();

      // Start at previous point

      this.ctx.moveTo(this.lastPt.x, this.lastPt.y);
      // Line to latest point

      this.ctx.lineTo(e.pageX - bounds.left, e.pageY - bounds.top);
      // Draw it!
      this.ctx.stroke();

      this.ctx.shadowOffsetX = 0;
      this.ctx.shadowOffsetY = 0;
      this.ctx.shadowBlur = 2;

      this.ctx.shadowColor = `rgba(${this.selectedColor[0]}, ${this.selectedColor[1]}, ${this.selectedColor[2]}, 1)`;

      this.ctx.shadowColor = `rgba(${this.selectedColor[0]}, ${this.selectedColor[1]}, ${this.selectedColor[2]}, ${r_a})`;

      //  ctx.beginPath();

      //ctx.ellipse(e.pageX, e.pageY, penWidth, penWidth, Math.PI / 4, 0, 2 * Math.PI);
      //ctx.fill();
    }

    //Store latest pointer
    this.lastPt = { x: e.pageX - bounds.left, y: e.pageY - bounds.top };
  
  }

  getOffset(obj) {
    //...
  }

  toggleDraw() {
    this.isDrawing = this.isDrawing ? false : true;
    //console.log(this.isDrawing);
  }

  startPointer(e) {
    this.isDrawing = true;
    this.canvas.addEventListener("pointermove", this.myDraw, false);
    this.canvas.addEventListener("mousemove", this.myDraw, false);
    //console.log('start pointer');
  }

  endPointer(e) {
    //Stop tracking the pointermove (and mousemove) events

    this.canvas.removeEventListener("pointermove", this.myDraw, false);
    this.canvas.removeEventListener("mousemove", this.myDraw, false);

    //console.log('end pointer');

    this.lastPt = null;
    this.isDrawing = false;
    this.points = [];
    this.currentImageData=this.canvas.toDataURL()
    this.updateSlideFunction( this.currentImageData)
  }

  midPointBtw(p1, p2) {
    return {
      x: p1.x + (p2.x - p1.x) / 2,
      y: p1.y + (p2.y - p1.y) / 2,
    };
  }

  SaveSLide() {
    return this.currentImageData
    //localStorage.setItem("testImage", canvas.toDataURL());
  }

  LoadSlide(slideData) {
    //var dataURL = localStorage.getItem("testImage");

   
    var img = new Image();

    //img.src = dataURL;
    img.src=slideData;

    let myCtx = this.ctx;
    this.ClearCanvas();

    img.onload = function () {
      myCtx.drawImage(img, 0, 0);
    };
    this.currentImageData=slideData

   
    this.updateSlideFunction( this.currentImageData)
  }

  ClearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.points = [];
    this.lastPt = null;
    this.currentImageData=this.canvas.toDataURL()
    this.updateSlideFunction( this.currentImageData)
  }

  SetColor(myColArray) {
    this.selectedColor = myColArray;
  }
}

/* 


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

    // palm rejection with e.width

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

                ctx.beginPath();
ctx.ellipse(e.pageX, e.pageY, penWidth, penWidth, Math.PI / 4, 0, 2 * Math.PI);
ctx.fill(); 

    
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
