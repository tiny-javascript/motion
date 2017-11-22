Modules.set('move', function(canvas, ctx) {
    var baseline = canvas.height / 2,
        width = 20,
        height = 20,
        x = 0,
        y = baseline - height / 2,
        spreed = 1

    return {
        draw: function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = '#fff'
            ctx.fillRect(x, y, width, height)
            if (x >= canvas.width) {
                x = 0
            }
            x += spreed
        }
    }
})
