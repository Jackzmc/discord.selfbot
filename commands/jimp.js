const Jimp = require("jimp");
const webshot = require('webshot');
const getUrls = require('get-urls');
const fs = require('fs');
const {Attachment} = require('discord.js');
const moment = require('moment');

const memes = [
    {
        name:"jackoff",
        img_name:"jackoff.png",
        aliases:['fap'],
        effects:[
            {
                rotate:0,
                stretch:[410,330],
                coords:[33,142],
            }
        ]
    },
    {
        name:"gunshot",
        img_name:"gunshot.png",
        aliases:[],
        effects:[
            {
                rotate:0,
                stretch:[312,290],
                coords:[0,333],
            }
        ]
    },
    {
        name:"beautiful",
        img_name:"beautiful.jpg",
        aliases:['beauty'],
        effects:[
            {
                rotate:0,
                stretch:[88,99],
                coords:[256,27],
            },
            {
                rotate:0,
                stretch:[89,102],
                coords:[256,227],
            }
        ]
    },
    {
        name:"eclipse",
        img_name:"eclipse.jpg",
        aliases:['trump'],
        effects:[
            {
                rotate:0,
                stretch:[345,309],
                coords:[0,281],
            }
        ]
    },
    {
        name:"fbi",
        img_name:"fbi.png",
        aliases:[],
        effects:[
            {
                rotate:0,
                inverse:false, //Inverse -> put template on top of image
                inverse_stretch:false,  //Inverse-Stretch -> Stretch the template, instead of the image?
                stretch:[600,186],
                coords:[0,158],
            }
        ]
    },
    {
        name:"16",
        img_name:"16k.png",
        aliases:['16k'],
        effects:[
            { rotate:0,stretch:[169,94], coords:[324,19] }, 
            { rotate:0,stretch:[169,96], coords:[498,20]}, 
            { rotate:0,stretch:[171,98], coords:[670,18]}, 
            { rotate:0,stretch:[173,102], coords:[846,16]}, 
            { rotate:0,stretch:[169,94], coords:[324,120]}, 
            { rotate:0,stretch:[169,96], coords:[498,120]}, 
            { rotate:0,stretch:[171,98], coords:[670,120]}, 
            { rotate:0,stretch:[173,102], coords:[846,124]}, 
            { rotate:0,stretch:[169,94], coords:[324,223]}, 
            { rotate:0,stretch:[169,96], coords:[498,223]}, 
            { rotate:0,stretch:[171,98], coords:[670,223]}, 
            { rotate:0,stretch:[173,102], coords:[846,223]}, 
            { rotate:0,stretch:[169,94], coords:[324,325]}, 
            { rotate:0,stretch:[169,96], coords:[498,325]}, 
            { rotate:0,stretch:[171,98], coords:[668,325]}, 
            { rotate:0,stretch:[173,102], coords:[840,325]}
        ]
    }
];


exports.run = async (client,msg,args) => {
    //var attachments;
    //var top_attachments;
    return msg.channel.fetchMessages({limit: 1,before: msg.id}).then(async (messages) => {
        var attachments = messages.array()[0].attachments.array();
        var urls = getUrls(messages.array()[0].content);
        urls = [...urls];
        //if(!attachments[0]) attachments = [...urls]; //spread if urls not defined
        //return console.log("==FUCKEND===")
        const query = args.join(" ").replace(args[0] + " ","");
        if(args[0] === "screenshot" || args[0] === "sh") {
            await msg.edit(`Screenshotting ${query}...`);
            await webshot(query,{windowSize:{width:1600,height:900},streamType:"png",renderDelay:2500,userAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.78 Safari/537.36 OPR/47.0.2631.34 (Edition beta)"}, (err,render) => {
                if(err) return msg.edit(`Error! ${err.message}`);
                msg.channel.send(`Screenshot for ${query}`,new Attachment(render,'screenshot.png')).then(m => msg.delete()).catch(err => {
                    msg.edit(`Error! ${err.message}`);
                })
            });
        }else if(args[0] === "blur") {
            if(!attachments[0] && !urls[0]) return msg.edit("Couldn't find any attachments").then(m => m.delete(10000));
            var readURL = (attachments[0]) ? attachments[0].url : urls[0];
            msg.edit("Okay... generating");
            Jimp.read(readURL, async (err,image) => {
                if(err) return msg.edit(`Error! ${err.message}`);
                var amount = parseInt(args[1]);
                if(isNaN(amount)) amount = 5;
                image.blur(amount);

                sendImage(image,msg);
               
            })
        }else if(args[0] === "win" || args[0] === "wouldwin") {
            if(!attachments.length < 2 && urls.length < 2) return msg.edit(`Only found ${attachments.length} attachments, ${urls.length} urls. 2 required`).then(m => m.delete(10000));
            var readURL = (attachments[0]) ? attachments[0].url : urls[0];
            var readURL2 = (attachments[1]) ? attachments[1].url : urls[1];
            msg.edit("Okay... generating");
            Jimp.read(`./memes/win.png`, (err,template) => {
                if(!template) return msg.edit("Invalid meme setup").then(m => m.delete(10000));
                Jimp.read(readURL, (err,image) => {
                    Jimp.read(readURL2, (err,image2) => {
                        image.cover(162,160)
                        template.composite(image,0,37);

                        image2.cover(150,160);
                        template.composite(image2,166,37);
                        /*image.contain(meme.stretch[0],meme.stretch[1]);
                        template.composite(image,meme.coords[0],meme.coords[1]);*/
                        sendImage(template,msg);
                    })
                })
            })
        }else if(args[0] === "butthurt" || args[0] === "bhurt") {
            msg.edit("Okay... generating");
            Jimp.read(`./memes/butthurt.jpg`, (err,template) => {
                if(err) return msg.edit(err.message).then(m => m.delete(10000));
                Jimp.loadFont(Jimp.FONT_SANS_32_BLACK, (err,font) => {
                    if(err) return msg.edit(err.message).then(m => m.delete(10000));
                    if(args[1] === "!get") return sendImage(template,msg);
                    args.shift();
                    const choices = args.join(" ").split("|");
                    if(choices.length  < 4) return msg.edit("uh, need 5 stuffs");
                    template.print(font,283,106,moment().format("YYYY/MM/DD"));
                    template.print(font,544,106,moment().format("hh:mm A"));
                    if(isNaN(choices[3])) return msg.edit("not a number for reasons");
                    (choices[0] === "true") ? template.print(font,13,208,"Y") : template.print(font,279,205,"Y");
                    (choices[1] === "true") ? template.print(font,12,289,"Y") : template.print(font,123,294,"Y");
                    (choices[2] === "notsure" || choices[3] === "ns") ? template.print(font,220,373,"Y") : (choices[2] === "true") ? template.print(font,13,369,"Y") : template.print(font,121,373,"Y");
                    const reason = parseInt(choices[3])
                    if(reason === 1) {
                        template.print(font,17,447,"")
                    }else if(reason === 2){
                        template.print(font,17,483,"Y")
                    }else if(reason === 3){
                        template.print(font,17,518,"Y")
                    }else if(reason === 4){
                        template.print(font,17,553,"Y")
                    }else if(reason === 5){
                        template.print(font,17,590,"Y")
                    }else if(reason === 6){
                        template.print(font,17,625,"Y")
                    }else if(reason === 7){
                        template.print(font,352,447,"Y")
                    }else if(reason === 8){
                        template.print(font,352,483,"Y")
                    }else if(reason === 9){
                        template.print(font,352,518,"Y")
                    }else if(reason === 10){
                        template.print(font,352,553,"Y")
                    }else if(reason === 11){
                        template.print(font,352,590,"Y")
                    }else if(reason === 12){
                        template.print(font,352,625,"Y")
                    }else{
                        return msg.edit("invalid number for last checkboxes");
                    }

                    sendImage(template,msg)
                    //template.print(font,30,210,query,442); //30,210    442/46
                }) 
            });
        }else if(args[0] === "attak" || args[0] === "attac" || args[0] === "protec") {
            if(!attachments.length < 2 && urls.length < 2) return msg.edit(`Only found ${attachments.length} attachments, ${urls.length} urls. 2 required`).then(m => m.delete(10000));
            var readURL = (attachments[0]) ? attachments[0].url : urls[0];
            var readURL2 = (attachments[1]) ? attachments[1].url : urls[1];
            msg.edit("Okay... generating");
            Jimp.read(`./memes/attac.png`, (err,template) => {
                if(!template) return msg.edit("Invalid meme setup").then(m => m.delete(10000));
                Jimp.read(readURL, (err,image) => {
                    Jimp.read(readURL2, (err,image2) => {
                        image.cover(134,85)
                        template.composite(image,107,0);

                        image2.cover(135,70);
                        template.composite(image2,107,85);
                        /*image.contain(meme.stretch[0],meme.stretch[1]);
                        template.composite(image,meme.coords[0],meme.coords[1]);*/
                        sendImage(template,msg);
                    })
                })
            })
        }else if(args[0] === "opaque") {
            if(!attachments[0] && !urls[0]) return msg.edit("Couldn't find any attachments").then(m => m.delete(10000));
            var readURL = (attachments[0]) ? attachments[0].url : urls[0];
            msg.edit("Okay... generating");
            Jimp.read(readURL, async (err,image) => {
                if(err) return msg.edit(`Error! ${err.message}`);
                image.opaque();
                sendImage(image,msg);
               
            })
        }else if(args[0] === "opacity") {
            if(!attachments[0] && !urls[0]) return msg.edit("Couldn't find any attachments").then(m => m.delete(10000));
            var readURL = (attachments[0]) ? attachments[0].url : urls[0];
            msg.edit("Okay... generating");
            Jimp.read(readURL, async (err,image) => {
                if(err) return msg.edit(`Error! ${err.message}`);
                var amount = parseInt(args[1]);
                amount = parseFloat(amount / 100);
                if(isNaN(amount)) amount = 0.90;

                image.opacity(amount);
                sendImage(image,msg);
               
            })
        }else if(args[0] === "fbi") {
            msg.edit("Okay... generating");
            Jimp.read('./memes/fbi_google.png', async (err,image) => {
                if(err) return msg.edit(`Error! ${err.message}`);
                Jimp.loadFont(Jimp.FONT_SANS_32_BLACK, (err,font) => {
                    image.print(font,30,210,query,442); //30,210    442/46
                    sendImage(image,msg);
                }) 
            })
        }else if(args[0] === "greyscale" || args[0] === "grey"){
            if(!attachments[0] && !urls[0]) return msg.edit("Couldn't find any attachments").then(m => m.delete(10000));
            var readURL = (attachments[0]) ? attachments[0].url : urls[0];
            msg.edit("Okay... generating");
            Jimp.read(readURL, async (err,image) => {
                if(err) return msg.edit(`Error! ${err.message}`);
                image.greyscale();
                sendImage(image,msg);
                
               
            })
        }else if(args[0] === "pixelate") {
            if(!attachments[0] && !urls[0]) return msg.edit("Couldn't find any attachments").then(m => m.delete(10000));
            var readURL = (attachments[0]) ? attachments[0].url : urls[0];
            msg.edit("Okay... generating");
            Jimp.read(readURL, async (err,image) => {
                if(err) return msg.edit(`Error! ${err.message}`);
                var amount = parseInt(args[1]);
                if(isNaN(amount)) amount = 5;
                image.pixelate(amount);
                sendImage(image,msg);
                
               
            })
        }else if(args[0] === "quality" || args[0] === "jpeg") {
            if(!attachments[0] && !urls[0]) return msg.edit("Couldn't find any attachments").then(m => m.delete(10000));
            var readURL = (attachments[0]) ? attachments[0].url : urls[0];
            msg.edit("Okay... generating");
            Jimp.read(readURL, async (err,image) => {
                if(err) return msg.edit(`Error! ${err.message}`);
                var amount = parseInt(args[1]);
                if(isNaN(amount)) amount = 5;
                image.quality(amount);
                sendImage(image,msg);
            })
        }else if(args[0] === "brightness"){
            if(!attachments[0] && !urls[0]) return msg.edit("Couldn't find any attachments").then(m => m.delete(10000));
            var readURL = (attachments[0]) ? attachments[0].url : urls[0];
            msg.edit("Okay... generating");
            Jimp.read(readURL, async (err,image) => {
                if(err) return msg.edit(`Error! ${err.message}`);

                var amount = parseInt(args[1]);
                amount = parseFloat(amount / 100);
                if(isNaN(amount)) amount = 0.90;
                if(amount < -1 || amount > -1) return msg.edit("Invalid number. -1 to +1");

                image.brightness(amount);
                sendImage(image,msg);
                
               
            })
        }else if(args[0] === "contrast"){
            if(!attachments[0] && !urls[0]) return msg.edit("Couldn't find any attachments").then(m => m.delete(10000));
            var readURL = (attachments[0]) ? attachments[0].url : urls[0];
            msg.edit("Okay... generating");
            Jimp.read(readURL, async (err,image) => {
                if(err) return msg.edit(`Error! ${err.message}`);

                var amount = parseInt(args[1]);
                amount = parseFloat(amount / 100);
                if(isNaN(amount)) amount = 0.90;

                image.contrast(amount);
                sendImage(image,msg);
                
               
            })
        }else if(args[0] === "rotate"){
            if(!attachments[0] && !urls[0]) return msg.edit("Couldn't find any attachments").then(m => m.delete(10000));
            var readURL = (attachments[0]) ? attachments[0].url : urls[0];
            msg.edit("Okay... generating");
            Jimp.read(readURL, async (err,image) => {
                if(err) return msg.edit(`Error! ${err.message}`);

                var amount = parseInt(args[1]);
                if(isNaN(amount)) amount = 45;

                image.rotate(amount);
                sendImage(image,msg);
                
               
            })
        }else if(args[0] === "dither"){
            if(!attachments[0] && !urls[0]) return msg.edit("Couldn't find any attachments").then(m => m.delete(10000));
            var readURL = (attachments[0]) ? attachments[0].url : urls[0];
            msg.edit("Okay... generating");
            Jimp.read(readURL, async (err,image) => {
                if(err) return msg.edit(`Error! ${err.message}`);

                image.dither565();
                sendImage(image,msg);
                
               
            })
        }else if(args[0] === "normalize" || args[0] === "normal"){
            if(!attachments[0] && !urls[0]) return msg.edit("Couldn't find any attachments").then(m => m.delete(10000));
            var readURL = (attachments[0]) ? attachments[0].url : urls[0];
            msg.edit("Okay... generating");
            Jimp.read(readURL, async (err,image) => {
                if(err) return msg.edit(`Error! ${err.message}`);

                image.normalize();
                sendImage(image,msg);
                
               
            })
        }else if(args[0] === "watermark" || args[0] === "wmark" || args[0] === "wm") {
            if(!attachments[0] && !urls[0]) return msg.edit("Couldn't find any attachments").then(m => m.delete(10000));
            if(!args[1]) return msg.edit("What matermark? 9gag, ifunny, shutterstock, bandicam").then(m => m.delete(10000));
            var readURL = (attachments[0]) ? attachments[0].url : urls[0];
            Jimp.read(readURL, async (err,image) => {
                if(err) return msg.edit(`Error! ${err.message}`);
                if(args[1] === "bandicam" || args[1] === "bandicam.com" || args[1] === "bandicam.png") {
                    Jimp.read(`./memes/bandicam.png`, async(err,template) => {

                        sendImage(template,msg);
                    });
                }else if(args[1] === "ifunny" || args[1] === "ifunny.png") {
                    Jimp.read(`./memes/ifunny.png`, async(err,template) => {

                        sendImage(template,msg);
                    });
                }else if(args[1] === "9gag" || args[1] === "9gag.png") {
                    Jimp.read(`./memes/9gag.png`, async(err,template) => {
                        
                        sendImage(template,msg);
                    });
                }else{
                    if(!args[1]) return msg.edit("not a watermark; 9gag, ifunny, shutterstock, bandicam").then(m => m.delete(10000));
                }
                
               
            })

        }else if(args[0] === "invert"){
            if(!attachments[0] && !urls[0]) return msg.edit("Couldn't find any attachments").then(m => m.delete(10000));
            var readURL = (attachments[0]) ? attachments[0].url : urls[0];
            msg.edit("Okay... generating");
            Jimp.read(readURL, async (err,image) => {
                if(err) return msg.edit(`Error! ${err.message}`);

                image.invert();
                sendImage(image,msg);
                
               
            })
        }else if(args[0] === "meme" || args[0] === "m") {
            if(!attachments[0] && !urls[0]) return msg.edit("Couldn't find any attachments").then(m => m.delete(10000));
            var readURL = (attachments[0]) ? attachments[0].url : urls[0];
            for (var i = 0; i < memes.length; i++) {
                if(memes[i].name.toLowerCase() === args[1].toLowerCase()) {
                    var meme = memes[i];
                    msg.edit("Okay... generating");
                    return Jimp.read(`./memes/${meme.img_name}`, (err,template) => {
                        if(!template) return msg.edit("Invalid meme setup").then(m => m.delete(10000));
                        Jimp.read(readURL, (err,image) => {
                            for (var e = 0; e < meme.effects.length; e++) {
                                var element = meme.effects[e];
                                if (element.rotate !== 0) image.rotate(element.rotate);
                                (element.inverse_stretch) ?  template.cover(element.stretch[0],element.stretch[1]) : image.cover(element.stretch[0],element.stretch[1]);
                                (element.inverse) ? image.composite(template,element.coords[0],element.coords[1]) : template.composite(image,element.coords[0],element.coords[1]);
                            }
                            /*image.contain(meme.stretch[0],meme.stretch[1]);
                            template.composite(image,meme.coords[0],meme.coords[1]);*/
                            sendImage(template,msg);
                        })
                    })
                }
                for (var d = 0; d < memes[i].aliases.length; d++) {
                    if(memes[i].aliases[d] === args[1].toLowerCase()) {
                        var meme = memes[i];
                        msg.edit("Okay... generating");
                        return Jimp.read(`./memes/${meme.img_name}`, (err,template) => {
                            if(!template) return msg.edit("Invalid meme setup").then(m => m.delete(10000));
                            Jimp.read(readURL, (err,image) => {
                                for (var e = 0; e < meme.effects.length; e++) {
                                    var element = meme.effects[e];
                                    if (element.rotate !== 0) image.rotate(element.rotate);
                                    (element.inverse_stretch) ?  template.cover(element.stretch[0],element.stretch[1]) : image.cover(element.stretch[0],element.stretch[1]);
                                    (element.inverse) ? image.composite(template,element.coords[0],element.coords[1]) : template.composite(image,element.coords[0],element.coords[1]);
                                }
                                sendImage(template,msg);
                            })
                        })
                    }
                }
            }
            return msg.edit("unknown meme idiot").then(m => m.delete(10000));
        }else if(args[0] === "mlist" || args[0] === "memelist" || args[0] === "template" || args[0] === "tpl" || args[0] === "memes") {
            if(!args[1]) {
                msg.delete();
                var memeArray = [];
                for(var i=0;i<memes.length;i++) {
                    memeArray.push(memes[i].img_name);
                }
                return msg.channel.send(`Images: ${memeArray.join(", ")}`);
            }
            for (var i = 0; i < memes.length; i++) {
                if(memes[i].name.toLowerCase() === args[1].toLowerCase() || memes[i].img_name.toLowerCase() === args[1].toLowerCase()) {
                    var meme = memes[i];
                    msg.edit("Okay... uploading template");
                    return msg.channel.send(new Attachment(`./memes/${meme.img_name}`)).then(m => msg.delete()).catch(err => {
                        return msg.edit(`Error! ${err.message}`);
                    })
                }
                for (var d = 0; d < memes[i].aliases.length; d++) {
                    if(memes[i].aliases[d] === args[1].toLowerCase()) {
                        var meme = memes[i];
                        msg.edit("Okay... uploading template");
                        return msg.channel.send(new Attachment(`./memes/${meme.img_name}`)).then(m => msg.delete()).catch(err => {
                            return msg.edit(`Error! ${err.message}`);
                        })
                        
                    }
                }
            }
            return msg.edit("unknown meme idiot").then(m => m.delete(10000));
        }else{
            msg.delete();
            return msg.channel.send("Invalid image command idiot! ```meme(s), invert, attac, watermark, noramlize, dither, rotatecontrast, brightness, pixelate, greyscale, fbi, opacity, opaque, win, blur, screenshot```").then(m => m.delete(10000));
        }
    }).catch(err => {
        return console.log(`why?: ${err}`);
    })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['iedit','imgedit','ie'],
};

exports.help = {
  name: 'jimp',
  description: 'Image processing',
  usage: 'jimp '
};

function sendImage(image,msg) {
    image.getBuffer(Jimp.MIME_PNG,(err,result) => {
        if(err) return msg.edit(`Error: ${err.message}`)
        var sending = new Attachment(result,'screenshot.png');
        return msg.channel.send(sending).then(m => msg.delete()).catch(err => {
            msg.edit(`Error! ${err.message}`);
        })
    });
}
