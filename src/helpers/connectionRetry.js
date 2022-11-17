
const MAX_RETRIES = 4;
export async function send(client , data, retries = 0) {
    try {
      client.send(data);
    } 
    catch (error) {
        if (retries < MAX_RETRIES && error.name === "InvalidStateError") {
            await waitForConnection();
            send(client,data, retries + 1);
        }else {
            throw error;
        }
    }

    let connection_resolvers = [];
    let waitForConnection = () => {
      return new Promise((resolve, reject) => {
        connection_resolvers.push({resolve, reject});
      });
    }
    client.onopen = () => {
      console.log('WebSocket Client Connected');
      connection_resolvers.forEach(r => r.resolve())
    }

}