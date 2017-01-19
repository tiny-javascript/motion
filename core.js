var Modules = (function() {
    var modules = {};

    function createCanvas(name) {
        var wrapper = document.getElementById(name);
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d')
        canvas.width = canvas.height = wrapper.offsetWidth;
        wrapper.appendChild(canvas);
        return [canvas, context];
    }

    function set(name, fn) {
        var args = createCanvas(name);
        modules[name] = fn.apply(null, args);
    }

    function get(name) {
        return modules[name];
    }
    return {
        set: set,
        get: get
    }
})();
var Loader = (function(W, D) {
    var modulePath = 'modules/';

    function loadScript(mod, loaded) {
        var script = document.createElement('script');
        script.src = modulePath + mod + '.js';
        script.onload = loaded;
        script.onerror = function() {
            console.log('[load]', mod + 'is not defined');
        }
        document.body.appendChild(script);
    }

    return {
        load: function(mod) {
            console.log('[load]', mod);
            var module = Modules.get(mod);
            if (!module) {
                loadScript(mod, function() {
                    module = Modules.get(mod);
                    module.draw();
                });
            } else {
                module.draw();
            }
        }
    }
})(window, document);
