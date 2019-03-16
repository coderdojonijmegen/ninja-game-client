class Player {
    constructor(id_, posX_, posY_, name_) {
        this.id = id_;
        
        this.posX = 0;
        this.posY = 0;

        this.dX = 0;
        this.dY = 0;

        this.name = name_;

        $("#drawing").append("<div id='"+this.id+"' class='player'><div>")
        console.log("got here")
    }

    Update(data) {
        this.posX = data.posX
        this.posY = data.posY
        let self = this
        $("#"+self.id).css(data.styles);

    }

    Draw(viewport) {
        var newX = ((this.posX-0)/(5000-this.posX) * (0-viewport.width) + viewport.width) + viewport.posX
        var newY = ((this.posY-0)/(5000-this.posY) * (0-viewport.height) + viewport.height) + viewport.posY

        // $("#"+this.id).css('left', newX);
        // $("#"+this.id).css('top', newY);
    }
}