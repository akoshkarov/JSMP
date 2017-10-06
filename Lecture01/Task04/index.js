function Lecture01_Task04() {

    class Transport {
        constructor(capacity, speed, price) {
            this.capacity = capacity;
            this.speed = speed;
            this.price = price;

            this.packages = [];
            this.filled = 0;
        }

        addPackage(package) {
            if (package.size + this.filled > this.capacity) {
                return false;
            }
            this.packages.push(package);
            this.filled += package.size;
            package.isPlaced = true;
            return true;
        }

        checkCanTransport() {
            return (Math.floor(this.filled / this.capacity) * 100) > 90;
        };
        prepareForTransporting() {};
        startTransporting() {};
        finishTransporting() {
            this.packages = [];
        }
    }

    class Car extends Transport {
        constructor() {
            super(100, 90, 10);
            // specific logic for this transport type
        }
    }

    class Ship {
        constructor() {
            super(600, 60, 7);
            // specific logic for this transport type
        }
    }

    // New transport type
    class Plane {
        constructor() {
            super(400, 600, 20);
            // specific logic for this transport type
        }
    }

    class Package {
        constructor(name, owner, transportOptions) {
            this.name = name;
            this.owner = owner;
            this.transportClass = transportOptions.transportClass;
            this.isPlaced = false;
        }
    }

    const company = (() => {
        const _packages = [];
        const _transport = [];
        const addPackage = (package) => {
            _packages.push(package);
        };

        const checkPrepareForTransporting = () => {
            _packages
                .filter(package => !package.isPlaced)
                .forEach(package => {
                    const transportClass = package.transportClass;
                    const transportUsed = _transport
                        .filter(transport => transport instanceof transportClass);
                    const transportCanBeUsed = [];
                    const useTransport;
                    if (transportUsed.length > 0) {
                        transportCanBeUsed = transportUsed
                            .reduce((canBeUsed, transport) => {
                                    if (!transport.checkCanTransport()) {
                                        canBeUsed.push(transport);
                                    }
                                },
                                ransportCanBeUsed);
                        if (transportCanBeUsed.length > 0) {
                            // perform transportCanBeUsed[i].addPackage(package);
                        }
                    }
                    if (!package.isPlaced) {
                        useTransport = new package.transportClass();
                        useTransport.addPackage(package);
                        _transport.push(useTransport);
                    }
                });

            const transportReady = _transport
                .filter(transport => transport.checkCanTransport());

            if (transportReady.length > 0) {
                return true;
            } else {
                return false;
            }
        };

        const startTransporting = () => {
            _transport.forEach(transport => {
                transport.prepareForTransporting();
                transport.startTransporting();
                transport.finishTransporting();
            });
        };
    })();

    company.addPackage('Package_1', 'Tommy', {
        transportClass: Car
    });
    company.addPackage('Package_2', 'Jennifer', {
        transportClass: Ship
    });
    company.addPackage('Package_3', 'Sam', {
        transportClass: Plane
    });

    if (company.checkPrepareForTransporting()) {
        company.startTransporting();
    }

    console.log('=== Lecture01 - Task 04');
    console.log('Just show code', '');
}