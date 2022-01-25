export const mock = {
    playerNum: "P1",
    cardsMap: {
        "P1": [
            "8S",
            "7S",
            "AH",
            "KC",
            "KD",
            "5S",
            "4D",
            "3H",
            "6S",
            "2H",
            "6C",
            "JC",
            "AD"
        ],
        "center": [],
        "P2": 13,
        "P3": 13,
        "P4": 13
    },
    winnedCards: { P1: ["8S","7S"], P2: [], P3: [], P4: [] },
    turn: "P1",
    isSuitBetting: true,
    isNumBetting: false,
    suitBet: {
        "P1": null,
        "P2": null,
        "P3": null,
        "P4": null
    },
    numBets: {
        "P1": null,
        "P2": null,
        "P3": null,
        "P4": null
    },
    sliceingSuit: null,
    minBet: null,
    scoreMap: null
}