class Game {
    constructor(api_) {
        this.api = api_;

        this.width = $(window).width();
        this.height = $(window).height();

        this.canvas = SVG('drawing').size(this.width, this.height)
        
        this.players = [
            new Player("21321", this.canvas, 10, 10, "Player_1"),
         //   new Player("bdqwdqw", this.canvas, 200, 10, "Player_2"),
        ]

        this.viewport = new Viewport(this.width, this.height, 0, 0);
    }

    draw() {
        this.players.forEach(player => {
            player.Update();
            player.Draw(this.viewport);
        });
    }

    update() {
        this.api.fetchPlayers().forEach(player => {
            var current_player = this.players.find(p => {
                return p.id == player.id;
            })
            current_player.dX = 0.5;
            current_player.dY = 0;
        });
    }
}