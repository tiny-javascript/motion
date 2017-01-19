Modules.set('lineWeight', function(canvas, ctx) {
    var centerX = canvas.width / 2,
        centerY = canvas.height / 2,
        raduis = canvas.width * 0.3,
        weight = 1,
        dir = 1,
        minWeight = 0,
        maxWeight = 5,
        speed = 0.1;

    function drawFrame() {
        window.requestAnimationFrame(drawFrame, canvas);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(centerX, centerY, raduis, 0, 2 * Math.PI);
        ctx.lineWidth = weight;
        ctx.strokeStyle = '#fff';
        ctx.stroke();
        if (weight >= maxWeight) {
            dir = -1;
        } else if (weight <= minWeight) {
            dir = 1;
        }
        weight += speed * dir;
    }
    return {
        draw: drawFrame
    }
});
