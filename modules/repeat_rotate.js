function Rectangle(x, y, width, height, speed) {
    this.x = width / -2
    this.y = height / -2
    this.width = width
    this.height = height
    this.speed = speed || 1
    this.rotation = 45
    this.translateX = x + width / 2
    this.translateY = y + height / 2
    this.dir = 1
}

Rectangle.prototype.draw = function(ctx) {
    ctx.save()
    ctx.beginPath()
    ctx.translate(this.translateX, this.translateY)
    ctx.rotate(this.rotation * Math.PI / 180)
    ctx.strokeStyle = '#fff'
    ctx.rect(this.x, this.y, this.width, this.height)
    ctx.stroke()
    ctx.restore()
}

Modules.set('repeatRotate', function(canvas, ctx) {
    var width = canvas.width,
        height = canvas.height,
        sw = width / 2,
        sh = height / 2,
        sx = sw / 2,
        sy = sh / 2,
        len = 4,
        speed = 1,
        initRotation = 45,
        maxRotation = 100,
        rects = []

    for (var i = 0; i < len; i++) {
        var rate = i * (maxRotation - initRotation) / len
        var count = (maxRotation - initRotation) / speed
        var rect = new Rectangle(sx, sy, sw, sh)
        rect.maxRotation = maxRotation - rate
        rect.minRotation = initRotation - (rect.maxRotation - initRotation)
        rect.speed = (rect.maxRotation - initRotation) / count
        rects.push(rect)
    }

    function rotate(rect) {
        if (rect.rotation >= rect.maxRotation) {
            rect.dir = -1
        } else if (rect.rotation <= rect.minRotation) {
            rect.dir = 1
        }
        rect.rotation += rect.speed * rect.dir
    }

    return {
        draw: function() {
            ctx.clearRect(0, 0, width, height)
            var rect = new Rectangle(sx, sy, sw, sh, speed)
            rect.draw(ctx)
            rects.forEach(function(item) {
                item.draw(ctx)
                rotate(item)
            })
        }
    }
})
