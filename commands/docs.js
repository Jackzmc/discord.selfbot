//code for discord.js docs. Used for selfbot (using evie.selfbot's code). It will automatically cache (and update) the docs.
//Can easily convert it to other code ;) 
const request = require('snekfetch');
const moment = require('moment');

var docsCache = {
    master:{lastUpdated: moment('1970-01-01T00:00:00Z'),data:{}}, //set to unix epoch, for diff to work
    stable:{lastUpdated: moment('1970-01-01T00:00:00Z'),data:{}},
   
}

async function updateDocCache(docType) {
    const link = `https://raw.githubusercontent.com/hydrabolt/discord.js/docs/${docType}.json`;
    const {text} = await request.get(link);
    const json = JSON.parse(text);
    docsCache[docType].data = json;
    docsCache[docType].lastUpdated = moment();
    return new Promise((resolve,reject) => { //promise, to make sure docs updated BEFORE searching
        resolve(json);
    });
}

function searchDocs(msg,version,query) {
    query = query.toLowerCase().split(/[#.]/); //setup query. query[0]#query[1]
    
    var defaultOutput = {
        author: {
            name: `Discord.js Docs (${version})`,
            icon_url: `https://cdn.discordapp.com/icons/222078108977594368/bc226f09db83b9176c64d923ff37010b.webp`
        }
    }; //data for embed
    function formatProps(props) {
        var names = [];
        for(var i=0;i<props.length;i++) {
            names.push(props[i].name);
        }
        return names.join(" ");
    }
    function formatMethods(methods) {
        var names = [];
        for(var i=0;i<methods.length;i++) {
            names.push(methods[i].name);
        }
        return names.join(" ");
    }
    function formatEvents(events) {
        var names = [];
        for(var i=0;i<events.length;i++) {
            names.push(events[i].name);
        }
        return names.join(" ");
    }
    function formatReturn(input) {
        var string = "";
        for(var i=0;i<input.length;i++) {
            string += input[i].join("");
        }
        return string;
    }
    function makeOptional(input) {
        return `[${input}]`
    }
    function getLower(msg,prop,query,type) {
        for(var class_key in prop) { //Loop the class
            for(var class_lowerkey in prop[class_key]) { //Loop all the classes
                //if(prop[class_key] === "meta");
                var subClass = prop[class_key][class_lowerkey];
                if(subClass.name && subClass.name.toLowerCase() === query[1]) { //If looped class's name === query[1]
                    
                    var outputFields = [];
                    if(subClass.type) outputFields.push({name:"Type",value:`\`\`${formatReturn(subClass.type[0])}\`\``}); //for Client
                    if(subClass.returns && typeof subClass.returns == "array") outputFields.push({name:"Returns",value:formatReturn(subClass.returns[0])});
                    subClass.description = subClass.description.replace(/<.+>/g, '').replace(/\n/g,' ').trim();
        
                    if(subClass.params) { //If there is parameters, loop them and list them.
                        var params = "";
                        for(var d=0;d<subClass.params.length;d++) { 
                            if(subClass.params[d].optional) params += "``" + makeOptional(subClass.params[d].name) + ": "; //Is optional? [optional] not-optional
                            if(!subClass.params[d].optional) params += "``" + subClass.params[d].name + ": ";
                            var types = [];
                            for(var t=0;t<subClass.params[d].type.length;t++) { //put in array to easily join them
                                types.push(subClass.params[d].type[t][0]);
                            }
                            params += types.join(" | ") + "``\n";
                            params += subClass.params[d].description + "\n\n";
        
        
                        }
                        outputFields.push({name:"Parameters",value:params}); 
                    }
                    if(subClass.returns && typeof(subClass.returns === 'object')) { 
                        if(subClass.returns.types) {
                            outputFields.push({name:"Returns",value:`${subClass.returns.description.replace(/<.+>/g, '').replace(/\n/g,' ')}\n\`\`=> ${formatReturn(subClass.returns.types[0])}\`\``});
                        }else {
                            outputFields.push({name:"Returns",value:`\`\`${formatReturn(subClass.returns[0])}\`\``});
                        }
                        
                    }
                    if(subClass.examples && subClass.examples.length > 0) outputFields.push({name:'Example',value:`\`\`\`js\n${subClass.examples[0]}\`\`\``})
                    var outputData = {
                        title:`${prop.name}#${subClass.name}`,
                        url:`https://discord.js.org/#/docs/main/${version}/${type}/${prop.name}?scrollTo=${subClass.name}`, 
                        description:subClass.description,
                        fields:outputFields
                    }
                    
        
                    Object.assign(outputData,defaultOutput); //merge defaultOutput object with outputData
                    return msg.channel.send({embed: outputData}).catch(err => {
                        msg.channel.send(`An error occurred while sending: \`\`${err.message}\`\``);
                        console.log(err);
                    });
                }
               
            }
           
        }
        return msg.channel.send(`Couldn't find anything for \`\`${query[0]}${(query[1] ? `#${query[1]}`:'')}\`\``); //dont even know where to put this
    }
    const cache = docsCache[version].data;
    //instead of looping object or something, just manually doing it 
    for(let i=0;i<cache.classes.length;i++) {
        for(var key in cache.classes[i]) {
            if(cache.classes[i].name.toLowerCase() === query[0]){ //if classes's name === query
                var prop = cache.classes[i];
                if(query[1]) {
                    return getLower(msg,prop,query,'class');
                }   
               
                var outputFields = [];
                if(prop.props) outputFields.push({name:"Properties",value:'``' + formatProps(prop.props) + '``'})
                if(prop.methods) outputFields.push({name:"Methods",value:'``' + formatProps(prop.methods) + '``'})
                if(prop.events) outputFields.push({name:"Events",value:'``' + formatProps(prop.events) + '``'})
                var outputData = {
                    title:`**${prop.name} ` + ((prop.extends) ? `(extends ${prop.extends.join(" ,")})` : '') + `**`,
                    url:`https://discord.js.org/#/docs/main/${version}/class/${prop.name}`,
                    description:prop.description,
                    fields:outputFields
                }
                Object.assign(outputData,defaultOutput); //merge defaultOutput object with outputData
                return msg.channel.send({embed: outputData}).catch(err => {
                    msg.channel.send(`An error occurred while sending: \`\`${err.message}\`\``);
                });
            }
        }
    }
    for(let i=0;i<cache.interfaces.length;i++) {
        for(var key in cache.interfaces[i]) {
            if(cache.interfaces[i].name.toLowerCase() === query[0]){ //if interfaces's name === query
                var prop = cache.interfaces[i];
                if(query[1]) {
                    return getLower(msg,prop,query,'interfaces');
                }  
                var prop = cache.interfaces[i];
                var outputFields = [];
                if(prop.props) outputFields.push({name:"Properties",value:'``' + formatProps(prop.props) + '``'})
                if(prop.methods) outputFields.push({name:"Methods",value:'``' + formatProps(prop.methods) + '``'})
                if(prop.events) outputFields.push({name:"Events",value:'``' + formatProps(prop.events) + '``'})
                var outputData = {
                    title:`**${prop.name} ` + ((prop.extends) ? `(extends ${prop.extends.join(" ,")}))` : '') + `**`,
                    url:`https://discord.js.org/#/docs/${version}/interfaces/${prop.name}`,
                    description:prop.description,
                    fields:outputFields
                }
                Object.assign(outputData,defaultOutput); //merge defaultOutput object with outputData
                return msg.channel.send({embed: outputData}).catch(err => {
                    msg.channel.send(`An error occurred while sending: \`\`${err.message}\`\``);
                })
            }
        }
    }
    for(let i=0;i<cache.typedefs.length;i++) {
        for(var key in cache.typedefs[i]) {
            if(cache.typedefs[i].name.toLowerCase() === query[0]){ //if typedefs's name === query
                var prop = cache.typedefs[i];
                if(query[1]) {
                    if(prop.props) { //Loop all the porperties of the typedef
                        for(var d=0;d<prop.props.length;d++) {
                            if(prop.props[d].name.toLowerCase() === query[1]) {
                                var outputData = {
                                    title:`${prop.name}#${prop.props[d].name}`,
                                    url:`https://discord.js.org/#/docs/main/${version}/typedef/${prop.name}?scrollTo=${prop.props[d].name}`,
                                    description:prop.props[d].description,
                                    fields:[
                                        {
                                            name:"Type",
                                            value:"``" + formatReturn(prop.props[d].type[0]) + "``"
                                        }
                                    ]
                                }
                                Object.assign(outputData,defaultOutput); //merge defaultOutput object with outputData
                                return msg.channel.send({embed: outputData}).catch(err => {
                                    msg.channel.send(`An error occurred while sending: \`\`${err.message}\`\``);
                                })
                            }
                        }
                    }else return msg.channel.send(`There is no properties for \`\`${query[0]}\`\``);

                    return msg.channel.send(`Couldn't find anything for \`\`${query[0]}${(query[1] ? `#${query[1]}`:'')}\`\``);
                }  
                var prop = cache.typedefs[i];
                var outputFields = [];
                if(prop.props) outputFields.push({name:"Properties",value:'``' + formatProps(prop.props) + '``'})
                if(prop.methods) outputFields.push({name:"Methods",value:'``' + formatProps(prop.methods) + '``'})
                if(prop.events) outputFields.push({name:"Events",value:'``' + formatProps(prop.events) + '``'})
                var outputData = {
                    title:`**${prop.name} ` + ((prop.extends) ? `(extends ${prop.extends.join(" ,")}))` : '') + `**`,
                    url:`https://discord.js.org/#/docs/main/${version}/typedef/${prop.name}`,
                    description:prop.description,
                    fields:outputFields
                }
                Object.assign(outputData,defaultOutput); //merge defaultOutput object with outputData
                return msg.channel.send({embed: outputData}).catch(err => {
                    msg.channel.send(`An error occurred while sending: \`\`${err.message}\`\``);
                })
            }
        }
    }
    
    
    return msg.channel.send(`Couldn't find anything for \`\`${query[0]}${(query[1] ? `#${query[1]}`:'')}\`\``); 
    //return msg.channel.send("Okay, looking for class ``" + searchQuerySub[0] + "`` and method ``" + searchQuerySub[1] + "``");
    
}

exports.run = async (client, msg, args) => {
    var usersPref = "stable";
    switch(args[1]) {
        case "master":
            usersPref = "master"
            break;
        case "stable":
            usersPref= "stable"
            break;
        case "dev":
            usersPref = "master"
            break;
        case "development":
            usersPref = "master"
            break;
        default:
            usersPref = "stable"
            break;
    }
    var userDocLastUpdated = moment(docsCache[usersPref].lastUpdated); //storage usersPref for easier usage, and get the last updated cache
    if(moment().diff(userDocLastUpdated,'hours') > 2) { //If cache's last update was >2hrs ago, then update
        await updateDocCache(usersPref).then(() => {
            return searchDocs(msg,usersPref,args[0]);
        });
    }else return searchDocs(msg,usersPref,args[1]); //Cache doesn't need to be updated, just search
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['dsjs','d.js','djs']
};

exports.help = {
  name: 'docs',
  description: 'Fetches discord.js documentation',
  usage: 'docs <query>'
};