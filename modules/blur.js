(function() {

function Animate(renderfn, opts) {
  this.renderfn = renderfn;
  this.opts = opts;
}

Animate.prototype.when = function(step, props) {
  this.steps.push(step, props);
}

Animate.prototype.start = function() {
  var self = this;
  var step = function() {
    window.requestAnomationFrame(step);
    this.renderfn({})
  }
  step();
}

function drawCircle(ctx, props) {

  var draw = function() {
    ctx.clearRect(0, 0, props.width, props.height);
    ctx.beginPath();
    ctx.arc(props.x, props.y, props.radius, 0, 2 * Math.PI);
    ctx.filter = 'blur(' + props.blur + 'px)';
    ctx.fillStyle = '#fff';
    ctx.fill();
  }

  draw();
  return {
    animate: function(opts) {
      return new Animate(draw, opts);
    }
  };
};

function module(canvas, ctx) {
    var centerX = canvas.width / 2,
        centerY = canvas.height / 2,
        radius = canvas.width * 0.35;

    function drawFrame() {
      drawCircle(ctx, {
        radius: radius,
        width: canvas.width,
        height: canvas.height,
        x: centerX,
        y: centerY,
        blur: radius
      }).animate({
        duration: 3500
      }).when(0, {
        blur: 0
      }).when(0.35, {
        blur: 0
      }).when(0.7, {
        blur: radius
      }).when(0.8, {
        blur: radius
      }).when(1, {
        blur: 0
      }).start()
    }

    return {
        draw: drawFrame
    }
}

Modules.set('blur', module);

})()