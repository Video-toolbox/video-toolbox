
        var lastPt = null;
        var canvas;
        var ctx;

        init();

        function init() {
          canvas = document.getElementById("canvas");
          ctx = canvas.getContext("2d");
          console.log(ctx);
          var offset  = getOffset(canvas);

          if(window.PointerEvent) {
            canvas.addEventListener("pointerdown", function() {
              canvas.addEventListener("pointermove", draw, false);
            }
            , false);
            canvas.addEventListener("pointerup", endPointer, false);
          }
          else {
            //Provide fallback for user agents that do not support Pointer Events
            canvas.addEventListener("mousedown", function() {
              canvas.addEventListener("mousemove", draw, false);
            }
            , false);
            canvas.addEventListener("mouseup", endPointer, false);
          }
        }




        // Event handler called for each pointerdown event:
        function draw(e) {
          if(lastPt!=null) {

            let base=2;
            let penWidth=base+(e.pressure*10);

           ctx.lineWidth=penWidth;
            ctx.beginPath();
            // Start at previous point
            
           /*  ctx.moveTo(lastPt.x, lastPt.y);
            // Line to latest point
            ctx.lineTo(e.pageX, e.pageY);
            // Draw it!
            ctx.stroke(); */

            ctx.beginPath();
ctx.ellipse(e.pageX, e.pageY, penWidth, penWidth, Math.PI / 4, 0, 2 * Math.PI);
ctx.stroke();

          }
          

          //Store latest pointer
          lastPt = {x:e.pageX, y:e.pageY};
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
        }

