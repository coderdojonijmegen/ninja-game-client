class MockAPI {
    constructor() {
        this.players = [
            {
                name: "Player_1",
                id: "21321"
            },
            {
                name: "Player_2",
                id: "bdqwdqw"
            },
        ]
    }

    fetchPlayers() {
        return this.players;
    }
}