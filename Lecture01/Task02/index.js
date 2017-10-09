function Lecture01_Task02() {
    // Observer
    class Game {
        constructor(props) {
            this.name = props.name;
            this.koef = props.koef;

            this.playersInfo = [];

            this.isStarted = false;
            this.isFnished = false;
            this.result = undefined;
        }

        // Subscribe
        bet(player, amount) {
            if (this.isStarted || this.isFnished) {
                return;
            }
            const playerInfo = {
                player: player,
                amount: amount
            };
            this.playersInfo.push(playerInfo);
            // Unsubscribe
            const unbet = () => {
                if (this.isStarted || this.isFnished) {
                    return false;
                }
                const playerIndex = this.playersInfo.indexOf(playerInfo);
                if (playerIndex !== -1) {
                    this.playersInfo.splice(playerIndex, 1);
                    return true;
                }
                return false
            };

            //return playersInfo.id;
            return {
                unbet: unbet
            };
        }

        // Publish
        finish(result) {
            if (this.isFnished || !this.isStarted) {
                return;
            }
            this.playersInfo.forEach((playerInfo) => {
                playerInfo.player.notify(
                    this.name,
                    (result === true ?
                        Math.floor(((this.koef - 1) * playerInfo.amount) * 100) / 100 :
                        (-1 * playerInfo.amount)
                    )
                );
            });
            this.result = result;
            this.isFnished = true;
        }

        // Start game simulation
        start() {
            if (this.isStarted || this.isFnished) {
                return;
            }
            this.isStarted = true;
        }
    }

    // Subscriber
    class Player {
        constructor(name) {
            this.name = name;
        }

        // Method called by Observable on Publish
        // Notifies player about result of game
        notify(gameName, gain) {
            console.log(`${this.name}'s gain in game ${gameName} is ${gain}$`);
        }
    }

    // Games (Observables, Subjects)
    const game1 = new Game({
        name: 'Game_1',
        koef: 1.2
    });
    const game2 = new Game({
        name: 'Gam_2',
        koef: 1.5
    });
    const game3 = new Game({
        name: 'Game_3',
        koef: 1.7
    });
    const game4 = new Game({
        name: 'Game_4',
        koef: 1.05
    });
    const game5 = new Game({
        name: 'Game_5',
        koef: 1.15
    });

    // Players (Subsribers)
    const player1 = new Player('Petya');
    const player2 = new Player('Vasya');
    const player3 = new Player('Egor');
    const player4 = new Player('Masha');
    const player5 = new Player('Max');
    const player6 = new Player('Tony');

    // Players make bets (make subscription)
    game1.bet(player1, 100);
    game1.bet(player2, 50);

    game3.bet(player1, 70);
    const gameSubscription = game3.bet(player3, 150);
    // Example of unsubscribing
    gameSubscription.unbet();

    game5.bet(player1, 200);
    game5.bet(player4, 300);
    game5.bet(player5, 400);

    // Start games
    [game1, game2, game3, game4, game5].forEach(game => game.start());

    // Finish games
    console.log('=== Lecture01 - Task 02');
    [game1, game2, game3].forEach(game => game.finish(true));
    [game4, game5].forEach(game => game.finish(false));

    console.log('');

    // All players should be notified about their gains and losses.
    // Check Console output. 
}