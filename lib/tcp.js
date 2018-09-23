const net = require('net');
let clients = 0;

const server = net.createServer(function(client) {
    clients++;
    const clientId = clients;
    console.log('Client connected: ', clientId);

    client.on('end', function() {
        console.log('Client disconnected:', clientId);
    });

    client.write('welcome client: ', clientId + 'rn');
    client.pipe(client);
});

server.listen(8000, () => {
    console.log('Serve is running at port 8000');
});