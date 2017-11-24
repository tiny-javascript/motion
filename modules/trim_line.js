Modules.set('trimLine', function(canvas, ctx) {
    var baseline = canvas.height / 2,
        width = 0,
        height = 10,
        x = 0,
        y = baseline - height / 2,
        spreed = 2,
        level = 1

    function getLevel() {
        if (width <= canvas.width) {
            return 1
        }
        if (x <= canvas.width && width >= canvas.width) {
            return 2
        }
        return 3
    }
    function calc() {
        level = getLevel()
        switch (level) {
            case 1:
                width += spreed
                break
            case 2:
                x += spreed
                break
            case 3:
                x = 0
                width = 0
                break
        }
    }
    return {
        draw: function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.save()
            ctx.fillStyle = '#fff'
            ctx.fillRect(x, y, width, height)
            ctx.restore()
            calc()
        }
    }
})
