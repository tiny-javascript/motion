var Modules = (function() {
    var modules = {}
    function createCanvas(name) {
        var wrapper = document.getElementById(name)
        var canvas = document.createElement('canvas')
        var context = canvas.getContext('2d')
        canvas.width = canvas.height = wrapper.offsetWidth
        wrapper.appendChild(canvas)
        return [canvas, context]
    }
    return {
        set: function(name, fn) {
            var args = createCanvas(name)
            modules[name] = fn.apply(null, args)
            console.log('load module:', name)
            modules[name].draw()
        },
        get: function(name) {
            return modules[name]
        }
    }
})()
var Loader = (function(W, D) {
    var currentRunModuleName = ''
    var runStatus = false
    var runId = 0

    function draw() {
        if (!runStatus) {
            return
        }
        runId = requestAnimationFrame(draw)
        Modules.get(currentRunModuleName).draw()
    }
    function run() {
        runStatus = true
        draw()
    }
    function stop() {
        runStatus = false
        cancelAnimationFrame(runId)
    }
    return {
        handle: function(name) {
            if (currentRunModuleName != name) {
                currentRunModuleName = name
                stop()
                run()
            } else {
                if (runStatus) {
                    stop()
                } else {
                    run()
                }
            }
        }
    }
})(window, document)
