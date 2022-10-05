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
        "center": [["8S"],["7S"],["KD"]],
        "P2": 13,
        "P3": 13,
        "P4": 12
    },
    winnedCards: { P1: 2, P2: 4, P3: 6, P4: 6 },
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
    scoreMap: null,
    clients : {
        "a-123" : {
            playerNum : "P1",
            nickname : "aaa"
        },
        "b-123" : {
            playerNum : "P2",
            nickname : "bbb"
        },
        "c-123" : {
            playerNum : "P3",
            nickname : "ccc"
        },
        "d-123" : {
            playerNum : "P4",
            nickname : "ddd"
        }
    }
}