const { MessageEmbed } = require('discord.js');

const { bot: { reply }, configResponsePrefix: prefix, responseNumber, responseSum } = require('../config/config.json');

const numberHandler = async (client, message) => {
    const numbers = message.content.match(/\d+/g);
    if (!numbers) return;

    for (const number of numbers) {
        if (!responseNumber[prefix.concat(number)]) continue;

        const charIndex = message.content.indexOf(number);
        const response = `*\`${message.content.substring(charIndex - 5, charIndex + number.length + 5)}\`* ${responseNumber[prefix.concat(number)]}`;
        
        if (reply) message.reply(response);
        else message.channel.send(response);

        await new Promise(resolve => setTimeout(resolve, 1250));
    }
    
    if (numbers.length == 1) return;

    //sum of all numbers
    const sum = numbers.reduce((acc, curr) => acc + Number(curr), 0);
    
    if (!responseSum[prefix.concat(sum)]) return;

    const response = {
        content: responseSum[prefix.concat(sum)],
        embeds: [ new MessageEmbed()
            .setColor(0x3399FF)
            .setDescription( numbers.map((number, index) => `${index == 0 ? ' ' : '+'} ${number}`).join('\n')  + `\n= **${sum}**`)
            .setFooter({
                text: 'https://github.com/EnhancedMind/LuckyNumbersBot',
                iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })
            })
        ]
    }

    if (reply) message.reply(response);
    else message.channel.send(response);
}

module.exports = numberHandler;
