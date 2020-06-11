const { Client, RichEmbed } = require('discord.js')

const bot = new Client()

const ms = require("ms");

const version = 1.0;

const cheerio = require('cheerio');

const request = require('request');



//const token = 'NzE1NTI0MzM0NTU0MzE2ODYw.XuIJ7Q.DJGcH4q0XOoNcIKcJZ9qMs2_Y2Y'

const PREFIX = '!'


var servers = {};

bot.on('ready',  () => {
    console.log('Bot has come online.')
    bot.user.setActivity('buscando fotos en google. | '+version+'.0 | para fotos !photo {foto}');
    

})

    

bot.on('message', async message => {

    let args = message.content.substring(PREFIX.length).split(' ')


    
    switch (args[0]) {

        

      

        case 'photo':
            image(message, args[1]);

            break;

   
    }

    



})

function image(message, argsT) {

    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + argsT ,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };





    request(options, function (error, response, responseBody) {
        if (error) {
            return;
        }


        $ = cheerio.load(responseBody);


        var links = $(".image a.link");

        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

        console.log(urls);

        if (!urls.length) {

            return;
        }

        // Send result
        message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
    });








}

bot.login(process.env.token)
