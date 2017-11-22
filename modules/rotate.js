Modules.set('rotate', function(canvas, ctx) {
    var width = canvas.width * 0.5,
        height = canvas.width * 0.5,
        centerX = canvas.width / 2,
        centerY = canvas.height / 2,
        x = width / 2 - centerX,
        y = height / 2 - centerY,
        rotate = 0,
        spreed = 2

    return {
        draw: function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.save()
            ctx.strokeStyle = '#fff'
            ctx.lineWidth = 6
            ctx.translate(centerX, centerY)
            ctx.rotate(rotate * Math.PI / 180)
            ctx.strokeRect(x, y, width, height)
            ctx.restore()
            rotate += spreed
            rotate = rotate >= 360 ? 0 : rotate
        }
    }
})
