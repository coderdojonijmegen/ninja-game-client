class API {

    constructor(canvas_) {
        this.canvas = canvas_;
        this.socket = io("ws://45.77.139.8:3000")

        this.socket.on('connection', function (socket) {
            console.log("Connnnnnnected")
        });

        this.data = "";

        this.players = [

        ]

        var self = this; //For working first first class functions

        //Asynchronously update player information
        this.socket.on('get_players', (data) => {
            self.updatePlayers(data)
        })

        this.socket.on('get_name', function (data) {
            $("#name").text("Username: " + data)
        })

        //Enable test styling
        self.socket.emit('set_styles', {
            "width": "500px",
        })

        //* Temporary way of listening for controls */
        $("#left").click(function () {
            self.socket.emit('move_right')
            console.log("right")
        })

        $("#right").click(function () {
            self.socket.emit('move_left')
            console.log("left")
        })

        $("#down").click(function () {
            self.socket.emit('move_up')
        })

        $("#up").click(function () {
            self.socket.emit('move_down')
        })
    }


    //Asynchronously update player information
    updatePlayers(data) {
        this.players = [];
        for (var i = 0; i < data.length; i++) {
            let p = data[i]
            this.players.push({
                id: p.id,
                posX: p.position.x,
                posY: p.position.y,
                name: p.name,
                styles: p.styles
            })
        }
    }

    updateTagger(data) {
        // this.players = data;
    }

    //Simply returns the list of all players with up to date information.
    fetchPlayers() {
        return this.players;
    }
}