function Lecture01_Task02() {
    class Game {
        constructor(props) {
            this.name = props.name;
            this.koef = props.koef;

            this.playersInfo = [];

            this.isStarted = false;
            this.isFnished = false;
            this.result = undefined;
        }

        bet(player, amount) {
            if (this.isStarted || this.isFnished) {
                return;
            }
            this.playersInfo.push({
                player: player,
                amount: amount
            });
        }

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

        start() {
            if (this.isStarted || this.isFnished) {
                return;
            }
            this.isStarted = true;
        }
    }

    class Player {
        constructor(name) {
            this.name = name;
        }

        notify(gameName, gain) {
            console.log(`${this.name}'s gain in game ${gameName} is ${gain}$`);
        }
    }

    // Games
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

    // Players
    const player1 = new Player('Petya');
    const player2 = new Player('Vasya');
    const player3 = new Player('Egor');
    const player4 = new Player('Masha');
    const player5 = new Player('Max');
    const player6 = new Player('Tony');

    // Players make bets
    game1.bet(player1, 100);
    game1.bet(player2, 50);

    game3.bet(player1, 70);
    game3.bet(player3, 150);

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