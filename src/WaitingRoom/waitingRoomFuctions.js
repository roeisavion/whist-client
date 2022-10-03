export const nicknameList = (clients) => {
    const nicknamesMap = {}
    Object.values(clients).forEach((client) => {
        nicknamesMap[client.playerNum] = client.nickname
    })
    return nicknamesMap ;
}