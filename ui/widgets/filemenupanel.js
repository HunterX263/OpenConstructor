'use strict'

// FILEMENUPANEL is the WIDGET at the left of the screen that contains the
// new/save/load buttons, which only appears when the 'file' button is clicked.
var FILEMENUPANEL = FILEMENUPANEL || {};

// Creates the panel, with top-left corner at the specified coordinates (x, y)
// and with the specified width and height (w, h), measured in pixels from the
// top-left corner of the browser's client.
FILEMENUPANEL.create = (function(x, y, w, h)
{
// private
    var _x = x;
    var _y = y;
    var _w = w;
    var _h = h;
    // FILEMENUPANEL needs children in order to work.
    var _children = [
		// The new button
        BUTTON.create(x, y, w, 22,
            function(mouseButton) {
                MODEL.instance.masses.length = 0;
				MODEL.instance.springs.length = 0;
				
				// TODO: Reset sliders?
				
				UI.instance.rootPanel().fileMenuOpen(false);
            },
            function() {return "new"}),
        // The save button
        BUTTON.create(x, y + 22, w, 22,
            function(mouseButton) {
                MODEL.instance.exportModelToURL();
				if (UI.instance.rootPanel().fileMenuOpen() == false)
				{
					UI.instance.rootPanel().fileMenuOpen(true);
				}
				else
				{
					UI.instance.rootPanel().fileMenuOpen(false);
				}
				
				UI.instance.rootPanel().fileMenuOpen(false);
            },
            function() {return "save"})
    ];
// public
    // Accessors
    function __x(x)
    {
        if (x !== undefined)
        {
            _x = x;
        }
        return _x;
    }
    function __y(y)
    {
        if (y !== undefined)
        {
            _y = y;
        }
        return _y;
    }
    function __w(w)
    {
        if (w !== undefined)
        {
            _w = w;
        }
        return _w;
    }
    function __h(h)
    {
        if (h !== undefined)
        {
            _h = h;
        }
        return _h;
    }
    // Draw the g/f/k sliders.  Called once per frame.
    function _draw(ctx)
    {
        // Draw self
        UTIL.drawBoundingRectangle(ctx, _x, _y, _w, _h);
        // Draw children
        _children.forEach(function(child) {
            child.draw(ctx);
        });
    }
    function _signal(e, exy)
    {
        _children.forEach(function(child) {
            child.signal(e, exy);
        });
    }
    return {
        x: __x,
        y: __y,
        w: __w,
        h: __h,
        draw: _draw,
        signal: _signal
    };
});
