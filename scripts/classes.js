let price = {
    fuel: 50,
    repair: 60,
    crew: 80
}

class Ship {
    constructor(name, crew, fuel, hull, speed, img) {
        this.name = name;
        this.crew = crew;
        this.fuel = fuel;
        this.maxFuel = fuel;
        this.hull = hull;
        this.maxHull = hull;
        this.speed = speed;
        this.img = img;
        this.credits = 500;
        this.isWorking = false;
        this.isDamaged = false;
        this.isDestroyed = false;
        this.dockedPlanet = null;
    }

    async start(planet) {
        if (this.dockedPlanet === planet) {
            console.log("You are already on this planet.");
            return;
        }

        if (!(planet instanceof Planet)) {
            console.log("This is not a planet.");
            return;
        }

        if (planet.shipDocked.length > 0) {
            console.log("There is a ship docked at this planet.");
            return;
        }

        if (this.isDamaged === true && this.isDestroyed === true && this.crew === 0) {
            console.log("The ship is damaged,destroyed or has no crew.");
            return;
        }

        let calculateFuel = planet.distance * 20;

        if (this.fuel < calculateFuel) {
            console.log("You have no fuel to reach the planet.");
            return;
        } else {
            console.log(`${this.name} is ready to go.`);
        }

        if (this.dockedPlanet !== null) {
            this.dockedPlanet.shipDocked.pop();
        }
        this.isWorking = true;
        disableButtons();
        this.fuel = this.fuel - calculateFuel;

        let calculateTime = (planet.distance * 1000) / this.speed;

        let eventsArr = SpaceEvent.generateEvents(calculateTime,events);

        console.log(`${this.name} started it's journey to ${planet.name}.`);
        this.stats();
        for (const event of eventsArr) {
            await event.startEvent(this);
        }


        setTimeout(() => {
            console.log(`${this.name} arrived on ${planet.name}.`)
            console.log(`${this.name} started it's docking on ${planet.name}.`);
            this.dock(planet);
        }, calculateTime);
    }

    stats() {
        console.log("------- SHIP STATS -------");
        console.log(`CREW: ${this.crew}`);
        console.log(`FUEL: ${this.fuel}/${this.maxFuel}`);
        console.log(`HULL: ${this.hull}/${this.maxHull}`);
        console.log(`CREDITS: ${this.credits}`);
    }

    dock(planet) {
        setTimeout(() => {
            planet.shipDocked.push(this)
            this.isWorking = false;
            this.dockedPlanet = planet;
            console.log(`${this.name} docked on ${planet.name}.`);
            this.stats();
            enableBUttons();
        }, 2000);
    }
}

class Planet {
    constructor(name, size, population, distance, development, img) {
        this.name = name;
        this.size = size;
        this.population = population;
        this.distance = distance;
        this.development = development;
        this.img = img;
        this.shipDocked = [];
    }

    getMarketPrice(price) {
        price = this.development * price - Math.floor(this.population / this.size);
        return price;
    }

    repair(ship) {
        if (!(ship instanceof Ship)) {
            console.log("This is not a ship.");
            return;
        }

        if (!this.shipDocked.includes(ship)) {
            console.log(`${ship.name} is not at this planet. You can't repair it.`);
            return;
        }

        let hullPrice = this.getMarketPrice(price.repair);
        if (ship.hull === ship.maxHull) {
            console.log("Hull is already at max strength. You can't repair it.");
            return;
        } else {
            ship.hull = ship.maxHull;
            ship.credits = ship.credits - hullPrice;
            console.log("You repaired the ship.");
            ship.stats();
        }
    }

    refuel(ship) {
        if (!(ship instanceof Ship)) {
            console.log("This is not a ship.");
            return;
        }

        if (!this.shipDocked.includes(ship)) {
            console.log(`${ship.name} is not at this planet. You can't refuel it.`);
            return;
        }

        if (ship.fuel === ship.maxFuel) {
            console.log("Fuel is already at max capacity. You can't refuel it.");
            return;
        }

        let fuelPrice = this.getMarketPrice(price.fuel);

        if (ship.credits < fuelPrice) {
            console.log("You don't have enough credits.");
            return;
        } else {
            ship.fuel = ship.maxFuel;
            ship.credits = ship.credits - fuelPrice;
            console.log("You refueled the ship.");
            ship.stats();
        }
    }

    hireCrewMember(ship) {
        if (!(ship instanceof Ship)) {
            console.log("This is not a ship.");
            return;
        }

        if (!this.shipDocked.includes(ship)) {
            console.log(`${ship.name} is not at this planet. You can't hire new crew members.`);
            return;
        }

        let crewPrice = this.getMarketPrice(price.crew);
        if (ship.credits < crewPrice) {
            console.log("You don't have enough credits.");
            return;
        } else {
            ship.crew += 1;
            ship.credits = ship.credits - crewPrice;
            console.log("You hired new crew member.");
            ship.stats();
        }
    }
}

class SpaceEvent {
    constructor(name, description, crewModifier, fuelModifier, hullmodifier) {
        this.name = name;
        this.description = description;
        this.crewModifier = crewModifier;
        this.fuelModifier = fuelModifier;
        this.hullmodifier = hullmodifier;
    }

    startEvent(ship) {
        return new Promise((resolve, reject) =>{
            if (!(ship instanceof Ship)) {
                console.log("This is not a ship.");
                reject();
            }
            let that = this;
            setTimeout(() => {
                console.log(that.name,that.description);
                if(that.crewModifier !== 0){
                    if(that.crewModifier > 0){
                        ship.crew = ship.crew + that.crewModifier;
                        console.log(`You have new a crew member. SHIP CREW: ${ship.crew}`);
                    } else {
                        ship.crew = ship.crew + that.crewModifier;
                        console.log(`You lost a crew member. SHIP CREW: ${ship.crew}`);
                    }
                }
                if(that.fuelModifier !== 0){
                    if(that.fuelModifier > 0){
                        ship.fuel = ship.fuel + that.fuelModifier;
                        console.log(`You have now extra ${that.fuelModifier} fuel in the tank. SHIP FUEL: ${ship.fuel}`);
                    } else {
                        ship.fuel = ship.fuel + that.fuelModifier;
                        console.log(`You lost ${that.fuelModifier} fuel in the tank. SHIP FUEL: ${ship.fuel}`);
                    }
                }
                if(that.hullmodifier !== 0){
                    if(that.hullmodifier > 0){
                        ship.hull = ship.hull + that.hullmodifier;
                        console.log(`You have extra ${that.hullmodifier} hull earned. SHIP HULL: ${ship.hull}`);
                    } else {
                        ship.hull = ship.hull + that.hullmodifier;
                        console.log(`You lost ${that.hullmodifier} hull strength. SHIP HULL: ${ship.hull}`);
                    }
                }
                if(checkShip(ship)){
                    return;
                };
                resolve();
            }, 4000);

        })
    }

    static generateEvents(time, arr) {
        let eventsHappened = [];

        if(time > 0 && time <= 8000) {
            let number = randomIntFromInterval(0,arr.length-1);
            eventsHappened.push(arr[number]);
        }
        if (time > 8000 && time <= 18000) {
            for(let i=0;i<2;i++){
                let number = randomIntFromInterval(0,arr.length-1);
                eventsHappened.push(arr[number]);
            }
        }
        if (time > 18000 && time <= 26000) {
            for(let i=0;i<3;i++){
                let number = randomIntFromInterval(0,arr.length-1);
                eventsHappened.push(arr[number]);
            }
        }
        if (time > 26000) {
            for(let i=0;i<4;i++){
                let number = randomIntFromInterval(0,arr.length-1);
                eventsHappened.push(arr[number]);
            }
        }
        return eventsHappened;
    }
}