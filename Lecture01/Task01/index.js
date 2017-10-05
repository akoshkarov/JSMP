class PowerSocket {
    constructor(props) {
        this.type = props.type;
        this.pins = props.pins;
        this.voltage = props.voltage;
    }

    getElectricity(powerPlug) {
        if (!powerPlug) {
            return {
                result: false,
                reason: 'no power plug'
            };
        } else if (powerPlug.pins > this.pins) {
            return {
                result: false,
                reason: 'incompatible pins number'
            }
        } else if (powerPlug.consumeVoltage !== this.voltage) {
            return {
                result: false,
                reason: 'incompatible voltage'
            }
        }
        return {
            voltage: powerPlug.consumeVoltage,
            result: true
        };
    }
}

class PowerPlug {
    constructor(props) {
        this.type = props.type;
        this.pins = props.pins;
        this.consumeVoltage = props.consumeVoltage;
    }
}

class OldAdapter {
    constructor(powerPlug) {
        this.type = 'Old';
        this.powerPlug = powerPlug;

        switch (this.powerPlug.type) {
            case 'USA':
                this.pinsCoef = 1;
                this.voltageCoef = 2;
                break;
            case 'China':
                this.pinsCoef = 2/3;
                this.voltageCoef = 1;
                break;
            default:
                this.pinsCoef = 1;
                this.voltageCoef = 1;
                break;
        }
    }

    get pins() {
        return this.powerPlug.pins * this.pinsCoef;
    }

    get consumeVoltage() {
        return this.powerPlug.consumeVoltage * this.voltageCoef;
    }
}

// create old power socket
const oldPowerSocket = new PowerSocket({
    type: 'Old',
    pins: 2,
    voltage: 220
});

// create different power plugs
const powerPlugUSA = new PowerPlug({
    type: 'USA',
    pins: 2,
    consumeVoltage: 110
});
const powerPlugChina = new PowerPlug({
    type: 'China',
    pins: 3,
    consumeVoltage: 220
});
const powerPlugOld = new PowerPlug({
    type: 'Old',
    pins: 2,
    consumeVoltage: 220
});

// create adapters for different power plugs to connect to old power socket
const oldAdapterUSA = new OldAdapter(powerPlugUSA);
const oldAdapterChina = new OldAdapter(powerPlugChina);

// TEST
const resultWithoutPlug = oldPowerSocket.getElectricity();

const resultForUsaPlug = oldPowerSocket.getElectricity(powerPlugUSA);
const resultForChinaPlug = oldPowerSocket.getElectricity(powerPlugChina);
const resultForOldPlug = oldPowerSocket.getElectricity(powerPlugOld);

const resultForUsaPlugWithAdapter = oldPowerSocket.getElectricity(oldAdapterUSA);
const resultForChinaPlugWithAdapter = oldPowerSocket.getElectricity(oldAdapterChina);

// RESULT
console.log('=== Lecture01 - Task 01');

console.log('resultWithoutPlug: ', resultWithoutPlug);

console.log('resultForUsaPlug: ', resultForUsaPlug);
console.log('resultForChinaPlug: ', resultForChinaPlug);
console.log('resultForOldPlug: ', resultForOldPlug);

console.log('resultForUsaPlugWithAdapter: ', resultForUsaPlugWithAdapter);
console.log('resultForChinaPlugWithAdapter: ', resultForChinaPlugWithAdapter);
