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

Modules.set('repeatMove', function(canvas, ctx) {
    var width = canvas.width,
        height = canvas.height,
        sw = width / 2,
        sh = height / 2,
        sx = sw / 2,
        sy = sh / 2,
        len = 4,
        speed = 2.5,
        centerRect = new Rectangle(sx, sy, sw, sh, speed),
        maxDistance = width * 2,
        initDistance = centerRect.translateX,
        rects = []

    for (var i = 0; i < len; i++) {
        var rate = i * (maxDistance - initDistance) / len
        var count = (maxDistance - initDistance) / speed
        var rect = new Rectangle(sx, sy, sw, sh)
        rect.maxDistance = maxDistance - rate
        rect.minDistance = initDistance - (rect.maxDistance - initDistance)
        rect.speed = (rect.maxDistance - initDistance) / count
        rects.push(rect)
    }

    function move(rect) {
        if (rect.translateX >= rect.maxDistance) {
            rect.dir = -1
        } else if (rect.translateX <= rect.minDistance) {
            rect.dir = 1
        }
        rect.translateX += rect.speed * rect.dir
    }

    return {
        draw: function() {
            ctx.clearRect(0, 0, width, height)
            centerRect.draw(ctx)
            rects.forEach(function(item) {
                item.draw(ctx)
                move(item)
            })
        }
    }
})
