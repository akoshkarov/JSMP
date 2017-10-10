function Lecture01_Task03() {
    const rentSkiing = ({
        height,
        age,
        gender
    }, money, days) => {
        /* Some functionality */
        console.log('Rent skiing.');
        return {
            balance: money - 20 * days,
            cheque: 'Rent_skiing_cheque',
            skiing: {
                name: 'skiing'
            }
        };
    };
    const buyTicketToSkyLift = (money, quantity) => {
        /* Some functionality */
        console.log('Buy ticket to sky lift.');
        return {
            balance: money - 10 * quantity,
            cheque: 'Sky_lift_cheque',
            tickets: {
                quantity: quantity
            }
        };
    };
    const rentApprtment = ({
        height,
        age,
        gender
    }, money, days) => {
        console.log('Rent an appartment.');
        return {
            balance: money - 100 * days,
            cheque: 'Appartment_rent_check',
            keys: 1
        };
    };

    // Fasade
    const skiResortTerminal = (personParams, money) => {
        if (money < 130) {
            return {
                result: false,
                message: 'you do not have enouph money'
            }
        }
        let rentSkiingResult = rentSkiing(personParams, money, 1);
        let buyTicketToSkyLiftResult =
            buyTicketToSkyLift(rentSkiingResult.balance, 1);
        let rentApprtmentResult = rentApprtment(personParams,
            buyTicketToSkyLiftResult.balance, 1);
        return {
            result: true,
            balance: rentApprtmentResult.balance,
            check: `
            ${rentSkiingResult.cheque}
            ${buyTicketToSkyLiftResult.cheque}
            ${rentApprtmentResult.cheque}
        `,
            items: [
                buyTicketToSkyLiftResult.tickets
            ]
        };
    };

    // Person info
    const personInfo = {
        height: 160,
        age: 30,
        gender: 'female'
    };

    // Use terminal and check result
    console.log('=== Lecture01 - Task 03');
    console.log(skiResortTerminal(personInfo, 125), '', '');
    console.log(skiResortTerminal(personInfo, 140), '');
}