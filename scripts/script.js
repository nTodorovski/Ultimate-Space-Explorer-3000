let starFighter = new Ship("Starfighter", 3, 380, 500, 0.5, "img/StarFighter.png");
let crushinator = new Ship("Crushinator", 5, 540, 400, 0.2, "img/Crushinator.png");
let scouter = new Ship("Scouter", 1, 300, 300, 0.9, "img/Scouter.png");

let rubicon9 = new Planet("Rubicon9", 300000, 2000000, 4, 2, "img/Rubicon9.png");
let r7 = new Planet("R7", 120000, 4000000, 7, 3, "img/R7.png");
let magmus = new Planet("Magmus", 500000, 10000000, 6, 1, "img/Magmus.png");
let dextriaey = new Planet("Dextriaey", 50000, 500000, 9, 3, "img/Dextriaey.png");
let b18 = new Planet("B18-1", 250000, 4000000, 12, 2, "img/B18-1.png")

let events = [
    new SpaceEvent("Fuel Leak", "Due to low maintenance of the ship, the fuel tank leaked. The leak was patched, but we lost some fuel.", 0, -50, 0 ),
    new SpaceEvent("Pirates!", "Space pirates attacked the ship! We escaped, but our hull took some damage!", 0, -20, -150 ),
    new SpaceEvent("Unknown substance", "An unknown substance was found on the cargo ship. A crew member touched it and died on the spot.", -1, 0, 0 ),
    new SpaceEvent("Asteroid field", "We entered an asteroid field. It was hard, but our captain managed to go out of it.", 0, -30, -100 ),
    new SpaceEvent("Fire on deck", "The main system overheated and fire broke from one of the panels. The crew quickly extinguished it.", 0, 0, -70 ),
    new SpaceEvent("Bad stop", "You stop at a nearby station for a pit-stop. They give you repair supplies.", 0, -50, +50 ),
    new SpaceEvent("Captains Birthday", "It's the captain's birthday. Everybody got drunk. Nobody remembers what happened the last 12 hours.", -1, -60, -100 ),
    new SpaceEvent("Space Shark", "Your ship is attacked by a space shark. After killing it, you watch a tutorial on how to turn shark blood in to fuel.", 0, +80, -120 ),
    new SpaceEvent("Alien in need", "An alien is stranded on it's broken ship. It took some time and effort but you save him and board him on your ship.", 1, -50, -50 ),
    new SpaceEvent("Hail the federation", "A federation cruiser hails you. They help you with supplies and fuel.", 0, +100, +100 ),
    new SpaceEvent("Destroyed Transport Ship", "You encounter a destroyed transport ship. It's dangerous, but you try salvaging its fuel tank.", 0, +150, -80 ),
    new SpaceEvent("Angry Spider", "An angry spider appears on the deck. The captain stomps on it. Everything is fine", 0, 0, 0 )
];
//prikazuvanje na brodovite
showShips();
// selektiranje na brod i pokazuvanje na planetite
$("#Starfighter").click(function () {
    let ship = starFighter;
    showPlanets(ship);
});
$("#Crushinator").click(function () {
    let ship = crushinator;
    showPlanets(ship);
});
$("#Scouter").click(function () {
    let ship = scouter;
    showPlanets(ship);
});

