Modules.set('scale', function(canvas, ctx) {
    var width = 0,
        height = 0,
        centerWidth = canvas.width * 0.4,
        centerHeight = canvas.height * 0.4,
        maxWidth = canvas.width * 0.8,
        maxHeight = canvas.height * 0.8,
        centerX = canvas.width / 2,
        centerY = canvas.height / 2,
        spreed = 1,
        level = 1

    /**
     * 获取阶段
     * 1：同时扩大
     * 2：宽扩大，高不变
     * 3：宽不变，高扩大
     * 4：同时缩小
     */
    function getLevel() {
        if ((level != 4 && width < centerWidth) || (level == 4 && width <= 0 && height <= 0)) {
            return 1
        }
        if (level != 4 && width >= centerWidth && width < maxWidth) {
            return 2
        }
        if (level != 4 && width >= maxWidth && height < maxHeight) {
            return 3
        }
        return 4
    }
    function calc() {
        level = getLevel()
        switch (level) {
            case 1:
                width += spreed
                height += spreed
                break
            case 2:
                width += spreed
                break
            case 3:
                height += spreed
                break
            case 4:
                width -= spreed * 3
                height -= spreed * 3
                break
        }
    }
    return {
        draw: function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.save()
            ctx.fillStyle = '#fff'
            ctx.translate(centerX, centerY)
            ctx.fillRect(width / -2, height / -2, width, height)
            ctx.restore()
            calc()
        }
    }
})
