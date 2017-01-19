function Ball(raduis, color) {
    raduis = raduis && raduis || 40;
    color = color && color || '#f00';
    this.x = 0;
    this.y = 0;
    this.raduis = raduis;
    this.ratation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.color = color;
    this.lineWidth = 1;
}

Ball.prototype.draw = function(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.scale(this.scaleX, this.scaleY);
    context.lineWidth = this.lineWidth;
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(0, 0, this.raduis, 0, (Math.PI * 2), true);
    context.closePath();
    context.fill();
    if (this.lineWidth > 0) {
        context.stroke();
    }
    context.restore();
};

Modules.set('orbit', function(canvas, ctx) {
    var ball = new Ball(8, '#fff'),
        angle = 0,
        centerX = canvas.width / 2,
        centerY = canvas.height / 2,
        raduis = canvas.width * 0.35,
        speed = 0.05;

    function drawFrame() {
        window.requestAnimationFrame(drawFrame, canvas);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(centerX, centerY, raduis, 0, 2 * Math.PI);
        ctx.strokeStyle = '#fff';
        ctx.stroke();
        ball.x = centerX + Math.sin(angle) * raduis;
        ball.y = centerY + Math.cos(angle) * raduis;
        angle += speed;
        ball.draw(ctx);
    }
    return {
        draw: drawFrame
    }
});
