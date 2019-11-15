$(document).ready(function() {
    if(typeof(eBookConfig) != "undefined" && "imagesDir" in eBookConfig) {
        Sk.imgPath = eBookConfig.imagesDir;
        basePath = eBookConfig.staticDir + "pygamelib/";
    }
    else {
        Sk.imgPath = "/_images/";
        basePath = "/_static/pygamelib/";
    }

    Sk.externalLibraries = Sk.externalLibraries || {};
    Sk.externalLibraries = {
        'pygame': {
            path: basePath + '__init__.js',
        },
        'pygame.display': {
            path: basePath + 'display.js',
        },
        'pygame.draw': {
            path: basePath + 'draw.js',
        },
        'pygame.event': {
            path: basePath + 'event.js',
        },
        'pygame.font': {
            path: basePath + 'font.js',
        },
        'pygame.image': {
            path: basePath + 'image.js',
        },
        'pygame.key': {
            path: basePath + 'key.js',
        },
        'pygame.mouse': {
            path: basePath + 'mouse.js',
        },
        'pygame.time': {
            path: basePath + 'time.js',
        },
        'pygame.transform': {
            path: basePath + 'transform.js',
        },
        'pygame.version': {
            path: basePath + 'version.js',
        },
    }; 
});


