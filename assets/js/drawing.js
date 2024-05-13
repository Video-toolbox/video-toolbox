import {
  InitStoryboard,
  CreateSlide,
  updateSlideImage,
  LoadSlideImage,
  LoadStoryboard,
} from "./modules/storyboard_module.js";

export class DrawEngine {
  constructor (myCanvas, myToolBar) {
    this.canvas = document.getElementById(myCanvas);
    this.toolbarElement = document.getElementById(myToolBar);
    this.ass = myCanvas;
    this.ctx = this.canvas.getContext("2d");
    this.isDrawing = false;
    this.points = [];
    this.lastPt;
    this.myDraw = this.draw.bind(this);
    this.currentTool = "pencil";
    this.selectedColor = [0, 0, 0, 1];
    this.currentWidth = 5;
    this.widthSlider = null;
    this.pressurSense = true;
    this.currentImageData = null;
    this.updateSlideFunction = updateSlideImage;
    this.tools = ["pencil", "pen", "marker", "eraser", "clear"];
    this.colorSelectorContainer = null;

    this.CreateToolMenu();
    this.initialize();
  }

  CreateToolMenu() {
    // Create a tool menu for the drawing canvas
    // This could include options for different drawing tools (pencil, eraser, etc.)
    // and color selection


    window.addEventListener('keyup', (e) => {

      if(e.metaKey){
        alert('meta key pressed')
      }

      if (e.ctrlKey == true  && e.key == 'z') {

        this.undoDraw()

      }
    });


    this.toolbarElement.innerHTML = "";

    let myToolbar = document.createElement("section");

    this.toolbarElement.appendChild(myToolbar);

    this.tools.forEach((element, index) => {
      let myTool = document.createElement("div");
      myTool.innerText = element;
      myTool.style.height = "50px";
      myTool.style.width = "50px";
      myTool.style.backgroundColor = "rgb(100,100,100)";

      myTool.addEventListener("pointerdown", (e) => {
        this.CahngeTool(index);
        e.stopPropagation();
      });
      myToolbar.appendChild(myTool);
    });

    let mySettings = document.createElement("section");

    this.toolbarElement.appendChild(mySettings);

    // settings
    let mySlider = document.createElement("input");
    mySlider.type = "range";
    mySlider.id = "strokeWidth";
    mySlider.name = "strokeWidth";
    mySlider.min = "1";
    mySlider.max = "80";
    mySlider.value = this.currentWidth;

    mySlider.addEventListener("input", (e) => {
      e.stopPropagation();
      this.currentWidth = mySlider.value;
    });

    this.widthSlider = mySlider;

    mySettings.appendChild(mySlider);

    // colors

    let myColorBox = document.createElement("section");

    this.toolbarElement.appendChild(myColorBox);



    let colorSelector = document.createElement("input");
    colorSelector.type = "color";
    colorSelector.id = "colorSelector";

    colorSelector.addEventListener("input", (e) => {
      e.stopPropagation();
      let color = e.target.value;

      let rgb = this.hexToRgb(color);
      //  console.log(color, rgb);

      let arr = rgb
        .substring(4, rgb.length - 1)
        .replace(/ /g, "")
        .split(",");


      arr.push('1')
      this.selectedColor = arr.map((element) => {
        return parseInt(element, 10);
      });
    });

    myColorBox.appendChild(colorSelector);
  }

  hexToRgb(str) {
    if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/gi.test(str)) {
      var hex = str.substr(1);
      hex = hex.length == 3 ? hex.replace(/(.)/g, "$1$1") : hex;
      var rgb = parseInt(hex, 16);
      return (
        "rgb(" +
        [(rgb >> 16) & 255, (rgb >> 8) & 255, rgb & 255].join(",") +
        ")"
      );
    }

    return false;
  }

  CahngeTool(myToolIndex) {
    //console.log("change to: " + this.tools[myToolIndex]);
    this.currentTool = this.tools[myToolIndex];

    //['pencil','pen','marker','eraser']
    switch (this.currentTool) {
      case "pencil":
        //this.SetColor([20,20,20,0.5])
        this.currentWidth = 2;

        this.pressurSense = false;
        break;

      case "pen":
        //this.SetColor([0,0,0,1])
        this.currentWidth = 5;
        this.pressurSense = true;
        break;

      case "marker":
        // this.SetColor([100,100,100,1])
        this.currentWidth = 30;
        this.pressurSense = false;
        break;

      case "eraser":
        this.currentWidth = 10;
        this.pressurSense = false;
        break;

      case "clear":
        this.ClearCanvas();
        this.updateSlideFunction(this.currentImageData);
        break;

      default:
        break;
    }
    this.widthSlider.value = this.currentWidth;
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



     /*  this.canvas.addEventListener(
        "touchstart",
        this.startPointer.bind(this),
        false
      ); */

      this.canvas.addEventListener(
        "touchend",
        this.endTouch.bind(this),
        false
      );

    /*   this.canvas.addEventListener(
        "pointerleave",
        this.endPointer.bind(this),
        false
      ); */

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

    this.currentImageData = this.canvas.toDataURL();
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
        //alert("too fat");
      }

      let penWidth = this.currentWidth;
      let r_a = 1;

      if (this.pressurSense) {
        let pressure = e.pressure;
        if (pressure <= 0) {
          pressure = 0.009;
        }

        // improve opacity
        //r_a =pressure*0.5;

        penWidth = this.currentWidth * (pressure * 3);
      }



      //this.ctx.strokeStyle = `rgba(10, 10, 10, ${r_a})`;

      if (this.currentTool === "eraser") {
        this.ctx.strokeStyle = `rgba(255,255,255,1)`;
        this.ctx.shadowColor = `rgba(255,255,255,${r_a})`;
      } else {
        this.ctx.strokeStyle = `rgba(${this.selectedColor[0]}, ${this.selectedColor[1]}, ${this.selectedColor[2]}, ${r_a})`;
        this.ctx.shadowColor = `rgba(${this.selectedColor[0]}, ${this.selectedColor[1]}, ${this.selectedColor[2]}, ${r_a})`;
      }

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

  endTouch(e){

    e.preventDefault();
   
    if (e.touches.length > 1) {

      this.undoDraw()
    }

  }

  endPointer(e) {
    //Stop tracking the pointermove (and mousemove) events

  /*   if (e.touches.length > 1) {

      this.undoDraw()
    }
 */

   


    this.canvas.removeEventListener("pointermove", this.myDraw, false);
    this.canvas.removeEventListener("mousemove", this.myDraw, false);

    //console.log('end pointer');

    this.lastPt = null;
    this.isDrawing = false;
    this.points = [];
    this.currentImageData = this.canvas.toDataURL();
    this.updateSlideFunction(this.currentImageData);
  }

  midPointBtw(p1, p2) {
    return {
      x: p1.x + (p2.x - p1.x) / 2,
      y: p1.y + (p2.y - p1.y) / 2,
    };
  }

  SaveSLide() {
    return this.currentImageData;
    //localStorage.setItem("testImage", canvas.toDataURL());
  }

  LoadSlide(slideData) {
    //var dataURL = localStorage.getItem("testImage");

    var img = new Image();

    //img.src = dataURL;
    img.src = slideData;

    let myCtx = this.ctx;
    this.ClearCanvas();

    img.onload = function () {
      myCtx.drawImage(img, 0, 0);
    };
    this.currentImageData = slideData;

    this.updateSlideFunction(this.currentImageData);
  }

  ClearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.points = [];
    this.lastPt = null;
    this.currentImageData = this.canvas.toDataURL();
    //this.updateSlideFunction( this.currentImageData)
  }

  SetColor(myColArray) {
    this.selectedColor = myColArray;
  }

  undoDraw() {
    alert('undo')
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
