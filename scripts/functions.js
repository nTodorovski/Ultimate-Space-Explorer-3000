function createShip(ship) {
    let ships = $("#ships1");
    ships.append(`
    <div class="col">
        <div class="card" style="width: 18rem;">
            <img src="${ship.img}" class="card-img-top" alt="${ship.name}">
            <div class="card-header">
                <h2>${ship.name}</h2>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Crew: ${ship.crew}</li>
                <li class="list-group-item">Fuel: ${ship.fuel}</li>
                <li class="list-group-item">Hull: ${ship.hull}</li>
                <li class="list-group-item">Speed: ${ship.speed}</li>
            </ul>
            <div class="card-body">
                <button id="${ship.name}" type="button" class="btn btn-primary">Select Ship</button>
            </div>
        </div>
    </div>`)
}

function createPlanet(planet, ship) {
    let planets = $("#planets1");
    planets.append(`
    <div class="col">
        <div class="card" style="width: 18rem;">
            <img src="${planet.img}" class="card-img-top" alt="${planet.name}">
            <div class="card-header">
                <h2>${planet.name}</h2>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Size: ${planet.size}</li>
                <li class="list-group-item">Population: ${planet.population}</li>
                <li class="list-group-item">Distance: ${planet.distance}</li>
                <li class="list-group-item">Development: ${planet.development}</li>
            </ul>
            <div class="card-body">
                <button id="goTo${planet.name}" type="button" class="btn btn-primary">Go To</button>
                <button id="repair${planet.name}" type="button" class="btn btn-primary">Repair</button>
                <button id="refuel${planet.name}" type="button" class="btn btn-primary">Refuel</button>
                <button id="hireCrew${planet.name}" type="button" class="btn btn-primary">Hire Crew Member</button>
            </div>
        </div>
    </div>`)
    $(`#goTo${planet.name}`).click(function () {
        ship.start(planet);
    })
    $(`#repair${planet.name}`).click(function () {
        planet.repair(ship);
    })
    $(`#refuel${planet.name}`).click(function () {
        planet.refuel(ship);
    })
    $(`#hireCrew${planet.name}`).click(function () {
        planet.hireCrewMember(ship);
    })
}

function disableButtons() {
    let buttons = $("button");
    for (const button of buttons) {
        $(button).attr("disabled", true)
    }
}
function enableBUttons() {
    let buttons = $("button");
    for (const button of buttons) {
        $(button).attr("disabled", false)
    }
}
function showShips() {
    createShip(starFighter);
    createShip(crushinator);
    createShip(scouter);
}

function showPlanets(ship) {
    $("#ships").remove();
    createPlanet(rubicon9, ship);
    createPlanet(r7, ship);
    createPlanet(magmus, ship);
    createPlanet(dextriaey, ship);
    createPlanet(b18, ship);
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkShip(ship) {
    if (ship.fuel <= 0) {
        $("#planets").remove();
        $("body").append(`<div class="row">
        <div id="gameover" class="col"><img id="continue" src="./img/gameover.gif" class="img-fluid" alt="gameover"></div>
        </div>`);

        $("#continue").click(() => {
            location.reload();
        })
        console.log("GAME OVER!!! You lost your fuel during the flight.");
        return true;
    }
    if (ship.hull <= 0) {
        $("#planets").remove();
        $("body").append(`<div class="row">
        <div id="gameover" class="col"><img id="continue" src="./img/gameover.gif" class="img-fluid" alt="gameover"></div>
        </div>`);

        $("#continue").click(() => {
            location.reload();
        })
        console.log("GAME OVER!!! You lost your hull during the flight.");
        return true;
    }
    if (ship.crew <= 0) {
        $("#planets").remove();
        $("body").append(`<div class="row">
        <div id="gameover" class="col" ><img id="continue" src="./img/gameover.gif" class="img-fluid" alt="gameover"></div>
        </div>`);

        $("#continue").click(() => {
            location.reload();
        })
        console.log("GAME OVER!!! You lost your crew during the flight.");
        return true;
    }
}