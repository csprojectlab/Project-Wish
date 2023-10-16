let rockets = [];
let guidedRockets = [];
let guidingIndex = 0;
let pointingIndex = 0;
let gravity; 
let font;
let points = [];
let vehicles = [];
let wishingText = "Soniya Madam"
let explosionSound = null;

function preload () {
    font = loadFont('AvenirNextLTPro-Demi.otf');
    console.log("Fonts loaded.");
    explosionSound = loadSound('explosion.wav', () => { console.log ("Sound loaded") });
}

function setup () {
    createCanvas (700, 450);
    colorMode (HSB);
    gravity = createVector (0, 0.2);
    stroke (255)
    strokeWeight (4);
    
    let temp = font.textToPoints ("HAPPY", 20, 100, 92);
    temp.push (-1);
    points = temp.slice();
    guidedRockets.push (new Rocket (true, temp.length - 1));

    temp = [];
    temp = font.textToPoints ("BIRTHDAY", 210, 230, 92);
    temp.push (-1);
    temp.forEach (p => points.push(p))
    guidedRockets.push (new Rocket (true, temp.length - 1));

    temp = [];
    temp = font.textToPoints (wishingText, 30, 360, 92);
    temp.push (-1)
    temp.forEach (p => points.push(p))
    guidedRockets.push (new Rocket (true, temp.length - 1));

}

function draw () {
    colorMode (RGB)
    background (0, 0, 0, 25);
    simpleRockets ();
    if (guidingIndex < guidedRockets.length && random (1) < 0.005) {
        rockets.push (guidedRockets[guidingIndex])
        guidingIndex++;
        if (guidingIndex == guidedRockets.length) {
            setTimeout (() => {
                reboot ();
            }, 15000);
        }
    }
    for (let i = rockets.length - 1; i >= 0; i--) {
        if (rockets[i].done ()) {
            if (rockets[i].guided) {
                rockets[i].finalShellPositions.forEach (v => {
                    vehicles.push (new Vehicle (v.x, v.y, points[pointingIndex].x, points[pointingIndex].y, rockets[i].hu))
                    pointingIndex++;
                });
                pointingIndex++;   // Compensate -1
            }
            rockets.splice (i, 1)
        }
    }
    vehicles.forEach (v => {
        v.behavior();
        v.update();
        v.show();
    })
}

function simpleRockets () {
    if (random (1) < 0.03)
        rockets.push (new Rocket ());
    for (let i = rockets.length - 1; i >= 0; i--) {
        rockets[i].update ();
        rockets[i].show ();
    }
}

function reboot () {
    guidedRockets = [];
    guidingIndex = 0;
    pointingIndex = 0;
    points = [];
    vehicles = [];
    setup ();
}
