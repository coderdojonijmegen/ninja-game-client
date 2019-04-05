class Game {
    constructor(api_) {
        this.api = api_;

        this.width = $(window).width();
        this.height = $(window).height();

        this.players = []
        
        //The viewport indicates how much of the current playing area the user can see. If the width is equal to the server the entire field is in view.
        //Coordinates are mapped based on this size, the viewport can be moved to view other area's of the play area. 
        this.viewport = new Viewport(5000, 5000, 0, 0);
    }

    //Update existing players, and add new players.
    update() {
        let newPlayers = this.api.fetchPlayers();
        newPlayers.forEach(player => {
            var current_player = this.players.find(p => {
                return p.id == player.id;
            })
            if (current_player != null) {
                current_player.Update(player, this.viewport)
            } else {
                this.players.push(new Player(
                    player.id,
                    player.posX,
                    player.posY,
                    player.name,
                ))
            }
        });

        let self = this;
        let index = 0;
        this.players.forEach(player => {
            var current_player = newPlayers.find(p => {
                return p.id == player.id;
            })
            if (current_player == null) {
                $("#"+player.id).remove();
                self.players.splice(index, 1);
            }
            index++;
        });
    }
}
