// Resize Image for 1080p on iPad 3 Screen

// Remember current unit settings and then set units to
// the value expected by this script
var originalUnit = preferences.rulerUnits
preferences.rulerUnits = Units.PIXELS

// 1080p on iPad 3 screen size
var iPad3_1080p_ht = 1080
var iPad3_1080p_wd = 1440
var iPad3_1080p_ppi = 264

var screen_ht = iPad3_1080p_ht
var screen_wd = iPad3_1080p_wd

// some JS syntax from http://coffeeshopped.com/2008/11/conditional-image-resizing-with-photoshop-and-javascript

// get a reference to the current (active) document and store it in a variable named "doc"
doc = app.activeDocument;  

// change the color mode to RGB.  Important for resizing GIFs with indexed colors, to get better results
doc.changeMode(ChangeMode.RGB);  

var d_ht = doc.height
var d_wd = doc.width
var temp = 0
var d_landscape = false
if (d_ht < d_wd) {
    d_landscape = true
}

if (!d_landscape) {  // treat as landscape: d_ht <-> d_wd
    temp = d_ht
    d_ht = d_wd
    d_wd = temp
}

// Determine new image size
var new_ht = 0
var new_wd = 0
var d_resize = false
if (d_ht > screen_ht) {
    d_resize = true
    new_ht = screen_ht
    new_wd = Math.ceil(d_wd * screen_ht / d_ht)
}

if (!d_landscape) {  // back to portrait: d_ht <-> d_wd, new_ht <-> new_wd
    temp = d_ht
    d_ht = d_wd
    d_wd = temp
    temp = new_ht
    new_ht = new_wd
    new_wd = temp
}

if (d_resize) {
    doc.resizeImage(new_wd,new_ht,null,ResampleMethod.BICUBICSHARPER)
}

// Restore original ruler unit setting
app.preferences.rulerUnits = originalUnit
