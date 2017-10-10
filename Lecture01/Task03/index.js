// Declare used classes for chain of responsibility pattern
class Chain {
    constructor() {
        this.nextInChain = undefined;
    }
    setNextInChain(nextInChain) {
        this.nextInChain = nextInChain;
    }
    process() {}
}

class RentSkiingClass extends Chain {
    process(params, avaliableMoney, processingResult) {
        const cost = 20;

        const {
            personInfo: {
                age,
                gender
            }
        } = params;

        let skiing = '';
        if (avaliableMoney.value >= cost) {
            skiing =
                (age < 15 ? 'Child' : 'Mature') + '_' +
                (gender === 'male' ? 'male' : 'female') + '_skiing';

            avaliableMoney.value = avaliableMoney.value - cost;
            processingResult.cheque.push('Rent_skiing_cheque');
            processingResult.items.push(skiing);
        } else {
            processingResult.messages.push('Not enouph money rent skiing');
        }

        if (this.nextInChain) {
            return this.nextInChain.process(params, avaliableMoney, processingResult);
        } else {
            return Object.assign({}, processingResult, {
                cashback: avaliableMoney.value
            });
        }
    }
}

class BuyTicketToSkyLiftClass extends Chain {
    process(params, avaliableMoney, processingResult) {
        const cost = 10;

        const ticket = 'Ticket_to_sky_lift'
        if (avaliableMoney.value >= cost) {
            avaliableMoney.value = avaliableMoney.value - cost;
            processingResult.cheque.push('Ticket_to_sky_lift_cheque');
            processingResult.items.push(ticket);
        } else {
            processingResult.messages.push('Not enouph money to buy ticket to sky lift');
        }

        if (this.nextInChain) {
            return this.nextInChain.process(params, avaliableMoney, processingResult);
        } else {
            return Object.assign({}, processingResult, {
                cashback: avaliableMoney.value
            });
        }
    }
}

class RentAppartmentClass extends Chain {
    process(params, avaliableMoney, processingResult) {
        const cost = 100;

        const {
            personInfo: {
                height,
                age,
                gender
            }
        } = params;

        const key = 'Appartment_key';
        if (avaliableMoney.value >= cost) {
            // Some logic to find appartment based on person height, age and gender

            avaliableMoney.value = avaliableMoney.value - cost;
            processingResult.cheque.push('Appartment_rent_cheque');
            processingResult.items.push(key);
        } else {
            processingResult.messages.push('Not enouph money to rent appartment');
        }

        if (this.nextInChain) {
            return this.nextInChain.process(params, avaliableMoney, processingResult);
        } else {
            return Object.assign({}, processingResult, {
                cashback: avaliableMoney.value
            });
        }
    }
}

// Init chaining logic
const rentSkiing = new RentSkiingClass();
const buyTicketToSkyLift = new BuyTicketToSkyLiftClass();
const rentApprtment = new RentAppartmentClass();

rentSkiing.setNextInChain(buyTicketToSkyLift);
buyTicketToSkyLift.setNextInChain(rentApprtment);

// Fasade
const skyResportTerminal = (params) =>
    rentSkiing.process(params, {
        value: params.money
    }, {
        cheque: [],
        items: [],
        messages: []
    });

// Different input params to check logic

const params1 = {
    personInfo: {
        height: 160,
        age: 30,
        gender: 'female'
    },
    money: 140
};

const params2 = {
    personInfo: {
        height: 100,
        age: 10,
        gender: 'female'
    },
    money: 25
};

const params3 = {
    personInfo: {
        height: 180,
        age: 45,
        gender: 'male'
    },
    money: 100
};

// Check logic
const paramArray = [params1, params2, params3];
const testFunc = (params) => {
    console.log('******************');

    console.log('PARAMS: ', params);
    const processingResult = skyResportTerminal(params);
    console.log('PROCESSING RESULT', processingResult);

};

console.log('=== Lecture01 - Task 03');
paramArray.forEach(testFunc);