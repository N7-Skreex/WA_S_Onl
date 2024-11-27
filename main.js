// Discord bot template

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged to the client ${client.user.tag}\nPoehali!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});

// Ниже 

client.on('ready', () => {
    client.user.setActivity(client.config.app.playing);
    setInterval(() => {
        fetch ("https://api.alt-mp.com/servers", {
            method: "GET"
        }).then(response => {
            return (response.json());
        }).then(response => {
            let wa_server = (response.find(server => server.address.toLowerCase().includes('washington.majestic-files.com:443')));
            let wa_server_count = wa_server.playersCount;
            client.user.setActivity(`Washington: ${wa_server_count}`, { type: ActivityType.Playing });
        }).catch(error => {
            console.error(error);
            client.user.setActivity(`Washington: Offline`, { type: ActivityType.Watching });
        });
        
    }, 5000);
});

client.login(process.env.WA_BOT_TOKEN);