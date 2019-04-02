class API {
    constructor(canvas_) {
        this.name = "";
        this.canvas = canvas_;
        this.socket = io("ws://"+IP_ADDRESS)

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
            $("#name").text("Gebruikersnaam: " + data)
            self.name = data;
        })

        //Enable test styling
        let styles = {
            "background-color": "black",
            "border-radius": "20px",
            "width": "20px"
        }

        this.socket.emit('set_styles', styles)

        //* Temporary way of listening for controls */
        $("#left").click(function () {
            self.move_left();
        })

        $("#right").click(function () {
            self.move_right();
        })

        $("#down").click(function () {
            self.move_down();
        })

        $("#up").click(function () {
            self.move_up();
        })
    }

    move_up() {
        this.socket.emit('move_up')
    }

    move_left() {
        this.socket.emit('move_left')
    }

    move_right() {
        this.socket.emit('move_right')
    }

    move_down() {
        this.socket.emit('move_down')
    }

    set_styles(styles) {
        this.socket.emit("set_styles", styles)
    }

    set_name(name) {
        this.socket.emit("set_name", name)
    }

    //Asynchronously update player information
    updatePlayers(data) {
        this.players = [];
        for (var i = 0; i < data.length; i++) {
            let p = data[i]
            if(p.name == this.name) {
                $("#color").css('background-color', p.styles["background-color"]);
                p.is_self = true;
            }
            if(p.tagger) {
                $("#tagger").text("Tikker: " + p.name)
            }
            this.players.push({
                id: p.id,
                posX: p.position.x,
                posY: p.position.y,
                width: p.position.width,
                height: p.position.height,
                name: p.name,
                tagger: p.tagger,
                styles: p.styles,
                is_self: p.is_self
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
