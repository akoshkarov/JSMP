const transportArray = [];

// We assume that each package occupies one place
class Package {
    constructor(name, owner, transportType) {
        this.name = name;
        this.owner = owner;
        this.transportType = transportType;
        this.isPlaced = false;

        console.log(`Created package '${this.name}' with owner ${this.owner} and choosed transport type ${this.transportType}`);
    }

    placeToTransport() {
        if (this.isPlaced === true) {
            return;
        }
        const transport = getTranport(this.transportType);
        transport.addPackage();
        this.isPlaced = true;
        
        console.log(`Package '${this.name}' with owner ${this.owner} placed in transport ${transport.transportType} named ${transport.name}`);
    }
}

// Basic class for all transport types
class Transport {
    constructor(transportType, capacity, speed, price) {
        this.transportType = transportType;
        this.capacity = capacity;
        this.speed = speed;
        this.price = price;

        this.placedPackages = [];
        this.isFilled = false;

        this.name = (new Date).toLocaleTimeString().replace(/:/g, '-') + '_' + Math.floor(Math.random()*100).toString();

        console.log(`New transport '${transportType}' with name ${this.name} created`);
    }

    addPackage(pkg) {
        if (this.isFilled) {
            return;
        }
        this.placedPackages.push(pkg);
        if (this.placedPackages.length === this.capacity) {
            this.isFilled = true;
        }
    }

    prepareForTrip() {}
}

// Specific transport types
class Car extends Transport {
    constructor() {
        super('car', 3, 90, 10);
    }
    prepareForTrip() {
        // specific logic for this transport type
    }
}

class Ship extends Transport {
    constructor() {
        super('ship', 5, 60, 7);
    }
    prepareForTrip() {
        // specific logic for this transport type
    }
}

// New transport type
class Plane extends Transport {
    constructor() {
        super('plane', 4, 600, 20);
    }
    prepareForTrip() {
        // specific logic for this transport type
    }
}

/////////////////
const getTranport = (transportType) => {
    console.log(`Called getTranport with transport type '${transportType}'`);
    const avaialableTransport = transportArray
        .filter(transport => transport.transportType === transportType && transport.isFilled === false);
    if (avaialableTransport && avaialableTransport.length > 0) {
        console.log(`Found available transport ${avaialableTransport[0].transportType} with name ${avaialableTransport[0].name}`);
        return avaialableTransport[0];
    } else {
        console.log(`Creating new transport type '${transportType}'`);
        const newTransport = transportFactory(transportType);
        transportArray.push(newTransport);
        return newTransport;
    }
};

// Factory
const transportFactory = (transportType) => {
    console.log(`Call factory method`);
    switch (transportType) {
        case 'car':
            return new Car();

        case 'ship':
            return new Ship();

        case 'plane':
            return new Plane();

        default:
            return null;
    }
};

// User selects which type of transport he wants to use
const carPackage1 = new Package('TV_package', 'Tommy_owner', 'car');
const carPackage2 = new Package('Radio_package', 'Jessy_owner', 'car');
const carPackage3 = new Package('Byke_package', 'Jessy_owner', 'car');
const carPackage4 = new Package('Bottle_package', 'Jessy_owner', 'car');

const shipPackage1 = new Package('Thing_package', 'Kate_owner', 'ship');

const planePackage1 = new Package('Something_package', 'Jack_owner', 'plane');
const planePackage2 = new Package('Something_good_package', 'Jack_owner', 'plane');
const planePackage3 = new Package('Something_bad_package', 'Nick_owner', 'plane');

let packages = [
    carPackage1, carPackage2, carPackage3, carPackage4,
    shipPackage1,
    planePackage1, planePackage2, planePackage3
];

console.log('=== Lecture01 - Task 04');
// Test
packages.forEach((pkg) => pkg.placeToTransport());