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
    this.scale = 1
    this.virtualScale = 1
}

Rectangle.prototype.draw = function(ctx) {
    ctx.save()
    ctx.beginPath()
    ctx.translate(this.translateX, this.translateY)
    ctx.rotate(this.rotation * Math.PI / 180)
    ctx.scale(this.scale, this.scale)
    ctx.strokeStyle = '#fff'
    ctx.rect(this.x, this.y, this.width, this.height)
    ctx.stroke()
    ctx.restore()
}

Modules.set('repeatScale', function(canvas, ctx) {
    var width = canvas.width,
        height = canvas.height,
        sw = width / 2,
        sh = height / 2,
        sx = sw / 2,
        sy = sh / 2,
        rectCount = 4,
        speed = 0.05,
        init = 1,
        max = 3,
        rects = []

    for (var i = 0; i < rectCount; i++) {
        var rate = i * (max - init) / rectCount
        var count = (max - init) / speed
        var rect = new Rectangle(sx, sy, sw, sh)
        rect.scale = init
        rect.virtualScale = init
        rect.max = max - rate
        rect.min = init - (rect.max - init)
        rect.speed = (rect.max - init) / count
        rects.push(rect)
    }

    function scale(rect) {
        if (rect.virtualScale >= rect.max) {
            rect.dir = -1
        } else if (rect.virtualScale <= rect.min) {
            rect.dir = 1
        }
        rect.virtualScale += rect.speed * rect.dir
        rect.scale = (rect.virtualScale > 0 && rect.virtualScale) || 0
    }

    return {
        draw: function() {
            ctx.clearRect(0, 0, width, height)
            var rect = new Rectangle(sx, sy, sw, sh, speed)
            rect.draw(ctx)
            rects.forEach(function(item) {
                item.draw(ctx)
                scale(item)
            })
        }
    }
})
