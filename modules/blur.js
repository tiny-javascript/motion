Modules.set('blur', function(canvas, ctx) {
    var centerX = canvas.width / 2,
        centerY = canvas.height / 2,
        blur = 0,
        minBlur = 0,
        maxBlur = 120,
        stepBlur = 2,
        forward = 1,
        pause = false
    return {
        draw: function() {
            if (pause) return
            if (blur < minBlur) {
                pause = true
                setTimeout(function() {
                    blur = 0
                    forward = 1
                    pause = false
                }, 1000)
            }
            if (blur > maxBlur) {
                forward = -1
            } else if (blur < minBlur) {
                forward = 1
            }
            blur += stepBlur * forward
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.filter = 'blur(' + blur + 'px)'
            ctx.shadowColor = '#fff'
            ctx.shadowBlur = blur
            ctx.arc(centerX, centerY, canvas.width * 0.3, 0, 2 * Math.PI)
            ctx.fillStyle = '#fff'
            ctx.fill()
        }
    }
})
