// server.js
// where your node app starts
//glitc cookie-wrinkle
// init project
const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');
var stringSimilarity = require('string-similarity');

var textBuilder = "Sorry miaw don`t have any information about that :(\nMaybe you wrote it wrong, try again";

var bannRoll = [];
var bannLuck = [];

var timestampFirst = null;
var timestampFirst2 = null;

var listhero = null;
var listart = null;
var listitem = null;
var camps = [];

const config = {
  channelAccessToken: "",
  channelSecret: "",
};

// create LINE SDK client
const client = new line.Client(config);
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((e)=>{
      console.log(e);
    });
});

function handleEvent(event) {
  console.log(event);
  if (event.message.text != null){
    var cmd = event.message.text.toLowerCase();      
    var textBuilder = "Sorry miaw don`t have any information about that :(";
    try{
      if(cmd == "kitty"){       
        var kittyResponse = ["Nyaa?", "Miaw?", "Miaw Miaw Miiaaww :3", "APASIH PANGGIL2 >:(", "Nyaa nyaaa :3", "UwU"];
        const echo = { type: 'text', text: kittyResponse[Math.floor(Math.random() * (+kittyResponse.length-1 - +0)) + +0] };
        return client.replyMessage(event.replyToken, echo);
      }
      else if(cmd == "kitty cute" || cmd == "kitty imut" || cmd == "kitty imud"){       
        var kittyResponse = [":3", "Aww :3", "woyadong", "Makasih UwU", "Nyaa nyaaa :3", "Miaw miaw :3", "UwU"];
        const echo = { type: 'text', text: kittyResponse[Math.floor(Math.random() * (+kittyResponse.length-1 - +0)) + +0] };
        return client.replyMessage(event.replyToken, echo);
      }
      else if(cmd == "kitty help"){
        //show list command
        var textBuilder = "Miaw miaaw u can ask meaw about: \n";
        textBuilder = textBuilder+"|-> kitty news \n";  
        textBuilder = textBuilder+"|-> kitty luck \n";
        textBuilder = textBuilder+"|-> kitty roll \n";   
        textBuilder = textBuilder+"|-> info location [Catalyst Name] \n";
        textBuilder = textBuilder+"|-> info hero [Hero Name] \n";
        textBuilder = textBuilder+"|-> info artifact [Artifact Name] \n";
        textBuilder = textBuilder+"|-> info morale [Heroes Name1],[Heroes Name2],[Heroes Name3],[Heroes Name4] \n\n";
        textBuilder = textBuilder+"Meaw hope meaw can help u :3 \n";
        textBuilder = textBuilder+"|-> KittyUwU dev @Line: @irfananda00 \n";
        const echo = { type: 'text', text: textBuilder };
        return client.replyMessage(event.replyToken, echo);
      }
      else if(cmd == "kitty bye" || cmd == "bye kitty"){        
        // if(event.source.type == 'group'){
        //   return client.leaveGroup(event.source.groupId);
        // }else if(event.source.type == 'room'){          
        //   return client.leaveRoom(event.source.roomId);
        // }
        var kittyResponse = ["DIH APAAN SIH USIR-USIR >:(", "No, no!!", "Gamau :(", "Miaaww"];        
        const echo = { type: 'text', text: kittyResponse[Math.floor(Math.random() * (+kittyResponse.length-1 - +0)) + +0] };
        return client.replyMessage(event.replyToken, echo);
      }
      else if(cmd.includes("apakah ")){
        var kittyResponse = ["Iyaaaaa", "No, no!!", "Mungkin :3", "Miaaww"];
        const echo = { type: 'text', text: kittyResponse[Math.floor(Math.random() * (+kittyResponse.length-1 - +0)) + +0] };
        return client.replyMessage(event.replyToken, echo);
      }
      else if(cmd.includes("kapan ")){
        var kittyResponse = ["Besok", "Ntar", "Minggu depan", "Tahun depan, nyahahaha", "Miaaww"];
        const echo = { type: 'text', text: kittyResponse[Math.floor(Math.random() * (+kittyResponse.length-1 - +0)) + +0] };
        return client.replyMessage(event.replyToken, echo);
      }
      else if(cmd.includes("menurut aku") || cmd.includes("menurut gw") || cmd.includes("menurut gua") || cmd.includes("menurutku")){
        var kittyResponse = ["Sok Tauuuuu!", "Sotoy deh", "PRET!", "Miaaww"];
        const echo = { type: 'text', text: kittyResponse[Math.floor(Math.random() * (+kittyResponse.length-1 - +0)) + +0] };
        return client.replyMessage(event.replyToken, echo);
      }
      else if(cmd == "bacot kitty" || cmd == "bacod kitty" || cmd == "kitty bacod" || cmd == "kitty bacot" || cmd == "kitty brisik"){
        var kittyResponse = [":(", "Nyehehehe", ":'(", "Ya maap :(", "Lalalala~", "Miaaww"];
        const echo = { type: 'text', text: kittyResponse[Math.floor(Math.random() * (+kittyResponse.length-1 - +0)) + +0] };
        return client.replyMessage(event.replyToken, echo);
      }
      else if((cmd.includes("bohong") && cmd.includes("kitty")) || (cmd.includes("kitty") && cmd.includes("penipu"))){
        var kittyResponse = ["Salah sendiri percaya sama kitty :3", "Tertypu kamu bangshad :*", "Jiahahahaha", "Nyahahaha!", "Miaaww"];
        const echo = { type: 'text', text: kittyResponse[Math.floor(Math.random() * (+kittyResponse.length-1 - +0)) + +0] };
        return client.replyMessage(event.replyToken, echo);
      }
      else if(cmd.includes("kitty roll")){           
        return roll(event)     
      }
      else if(cmd.includes("kitty luck")){           
        return luck(event)     
      }
      else if(cmd == "admin00 reset bannroll"){
        bannRoll = [];
        bannLuck = [];
        const echo = { type: 'text', text: "bannroll and bannluck reset done" };
        return client.replyMessage(event.replyToken, echo);
      }
      else if(cmd == "admin00 reload dataset"){
        getListItem();
        getListHero();
        getListArtifact();
        const echo = { type: 'text', text: "dataset reloaded" };
        return client.replyMessage(event.replyToken, echo);
      }
      else if(cmd == "admin00 reload moraleset"){
        reloadMoraleDataset();
        const echo = { type: 'text', text: "moraleset reloaded" };
        return client.replyMessage(event.replyToken, echo);
      }
      // else if(cmd == "admin00 tes kick"){
      //   if(event.source.type == 'group'){
      //     client.leaveGroup(event.source.groupId);
      //   }else if(event.source.type == 'room'){          
      //     client.leaveRoom(event.source.roomId);
      //   }
      // }
      else if(cmd.includes("info morale ")){        
        var cmd = cmd.toLowerCase().replace("info morale ","").replace(/\& /g, '').replace(/\s+/g, '-');
        var heroes = cmd.split(',');
        console.log(heroes);
        return getBestMorale(event, heroes);
      }
      else if(cmd == "kitty news"){
        //show list command      
        var request = require('request');
        request('https://epicsevendb-apiserver.herokuapp.com/api/latest', function (error, response, body) {        
          var res = JSON.parse(body);             
          if(res.results.length>0){
            textBuilder = "Miaw miaaw! Here is what meaw found \n";
            textBuilder = textBuilder+"Newest Heroes: \n";
            for (let i = 0; i < res.results[0].hero.length; i++) {
              var hero = res.results[0].hero[i];
              textBuilder = textBuilder+"("+(i+1)+") "+hero.name+" ("+hero.rarity+"*)"+"\n";
            }       
            textBuilder = textBuilder+"Newest Artifact: \n";
            for (let i = 0; i < res.results[0].artifact.length; i++) {
              var art = res.results[0].artifact[i];
              textBuilder = textBuilder+"("+(i+1)+") "+art.name+" ("+art.rarity+"*)"+"\n";
            }
          }
          const echo = { type: 'text', text: textBuilder };
          return client.replyMessage(event.replyToken, echo);                        
        });
      }
      else if(cmd.includes("info location ") && cmd.length>14){       
        // location of item
        return showLocationItem(event, cmd)
      }
      else if(cmd.includes("info hero ") && cmd.length>10){       
        // detail info about hero
        return detailHero("info", event, cmd)
      }
      else if(cmd.includes("stat hero ") && cmd.length>10){       
        // detail stat about hero
        return detailHero("stat",event, cmd)
      }
      else if(cmd.includes("skill hero ") && cmd.length>11){       
        // detail skill about hero
        return detailHero("skill",event, cmd)
      }
      else if(cmd.includes("info artifact ") && cmd.length>14){       
        // detail info about hero
        return detailArtifact(event, cmd)
      }
    }catch(err){    
      console.log("error ",err);
      const echo = { type: 'text', text: "Meaw don`t feel so good :'(" };
      return client.replyMessage(event.replyToken, echo);                              
    }
  }
}

function getBestMorale(event, heroes){
  var moralePoints = new Map();
  if(heroes.length == 4){
      var request = require('request');  
      // console.log('id: ', heroes[0]);    
      request('https://epicsevendb-apiserver.herokuapp.com/api/hero/'+heroes[0], function (error, response, body) {        
        var res1 = JSON.parse(body);          
        // console.log(res1.results[0].camping);
        
      console.log('id: ', heroes[1]);    
      request('https://epicsevendb-apiserver.herokuapp.com/api/hero/'+heroes[1], function (error, response, body) {        
        var res2 = JSON.parse(body);          
        // console.log(res2.results[0].camping);
          
      console.log('id: ', heroes[2]);              
      request('https://epicsevendb-apiserver.herokuapp.com/api/hero/'+heroes[2], function (error, response, body) {        
        var res3 = JSON.parse(body);          
        // console.log(res3.results[0].camping);    
      
      console.log('id: ', heroes[3]);              
      request('https://epicsevendb-apiserver.herokuapp.com/api/hero/'+heroes[3], function (error, response, body) {        
        var res4 = JSON.parse(body);          
        // console.log(res4.results[0].camping);
      
      var res = [res1,res2,res3,res4];
      for (let i = 0; i < 4; i++) {
        for (let opt = 0; opt < 2; opt++) {
          var option = res[i].results[0].camping.options[opt]; 
          var key = heroes[i]+" "+option;
          var count = 0;
          for (let j = 0; j < 4; j++) {
            if(res[j].results[0]._id != heroes[i]){
              var value = res[j].results[0].camping.reactions[option];
              count = count + value;
            }
          }
          moralePoints.set(key,count);
        }        
      }
      // console.log('original moralePoints: ', moralePoints);   
      moralePoints[Symbol.iterator] = function* () {
        yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
      }
      // console.log('sorted moralePoints: ', moralePoints);  
      textBuilder = "";      
      var c = 0;
      var totVal = 0;
      for (const [k, v] of moralePoints) {
        textBuilder = textBuilder+k+" ("+v+")";
        totVal = totVal + v;
        c++;
        if(c == 2){
          break;
        }else{
          textBuilder = textBuilder+"\n";
        }
      }    
      textBuilder = "Best morale: "+totVal+"\n"+textBuilder;
      const echo = { type: 'text', text: textBuilder };
      return client.replyMessage(event.replyToken, echo); 
        
      });
      });
      });
      });
  }else{
    const echo = { type: 'text', text: 'The number of heroes must be 4\nEx: info morale sez,vildred,fallen cecilia,angelica' };
    return client.replyMessage(event.replyToken, echo);
  }
}

function getListHero(){
  if(listhero == null){
    var request = require('request');    
    request('https://epicsevendb-apiserver.herokuapp.com/api/hero', function (error, response, body) {        
      var res = JSON.parse(body);             
      listhero = res;
    });
  }
}

function searchHero(name){
  if(listhero == null){
    getListHero();
  }
  var heroes = [];
  if(listhero != null){    
    for (let i = 0; i < listhero.results.length; i++) {      
      if(stringSimilarity.compareTwoStrings(listhero.results[i].name.toLowerCase(), name)>0.4){
        heroes.push(listhero.results[i].name);
      }
    }
  }
  return heroes;
}

function getListArtifact(){
  if(listart == null){
    var request = require('request');    
    request('https://epicsevendb-apiserver.herokuapp.com/api/artifact', function (error, response, body) {        
      var res = JSON.parse(body);             
      listart = res;
    });
  }
}

function searchArt(name){
  if(listart == null){
    getListArtifact();
  }
  var art = [];
  if(listart != null){    
    for (let i = 0; i < listart.results.length; i++) {
      if(stringSimilarity.compareTwoStrings(listart.results[i].name.toLowerCase(), name)>0.4){
        art.push(listart.results[i].name);
      }
    }
  }
  return art;
}

function getListItem(){
  if(listitem == null){
    var request = require('request');    
    request('https://epicsevendb-apiserver.herokuapp.com/api/item', function (error, response, body) {        
      var res = JSON.parse(body);          
      listitem = res;
    });
  }  
}

function searchItem(name){
  if(listitem == null){
    getListItem();    
  }  
  var item = [];
  if(listitem != null){        
    for (let i = 0; i < listitem.results.length; i++) {      
      if(stringSimilarity.compareTwoStrings(listitem.results[i].name.toLowerCase(), name)>0.4){
        item.push(listitem.results[i].name);
      }
    }
  }
  return item;
}

function detailArtifact(event, cmd){
  var request = require('request');
    var id = cmd.toLowerCase().replace("info artifact ","").replace(/\s+/g, '-');                  
    request('https://epicsevendb-apiserver.herokuapp.com/api/artifact/'+id, function (error, response, body) {        
      var res = JSON.parse(body);             
      if(res.results != null && res.results.length>0){
        textBuilder = '['+res.results[0].name+']\n';
        textBuilder = textBuilder+'Star: '+res.results[0].rarity+' \n';
        textBuilder = textBuilder+'Exclusive: '+res.results[0].exclusive[0]+' \n';
        textBuilder = textBuilder+'Skill Desc (base): '+res.results[0].skillDescription.base+' \n';
        textBuilder = textBuilder+'Skill Desc (max): '+res.results[0].skillDescription.max;        
      }else{
        var searchRes = searchArt(id.replace('-', ' '));      
        if(listart==null){      
          textBuilder = "You wrote it wrong, try again\n";
        }else{
          if(searchRes.length == 0){
            textBuilder = "Sorry meaw don`t have any information about that :(\nMaybe you wrote it wrong, try again";  
          }else{
            textBuilder = "Maybe you mean one of these?\n";
          }
        }
        for (let i = 0; i < searchRes.length; i++) {        
          textBuilder = textBuilder+searchRes[i]+"\n";
        }
      }
      const echo = { type: 'text', text: textBuilder };
      return client.replyMessage(event.replyToken, echo);                        
    });
}

function detailHero(detType, event, cmd){
  if(detType == "info"){
    var request = require('request');
    var id = cmd.toLowerCase().replace("info hero ","").replace(/\& /g, '').replace(/\s+/g, '-');                  
    request('https://epicsevendb-apiserver.herokuapp.com/api/hero/'+id, function (error, response, body) {        
      var res = JSON.parse(body);             
      if(res.results != null && res.results.length>0){
        textBuilder = '['+res.results[0].name+']\n';
        textBuilder = textBuilder+'Star: '+res.results[0].rarity+' \n';
        textBuilder = textBuilder+'Class: '+res.results[0].classType+' \n';
        textBuilder = textBuilder+'Element: '+res.results[0].element+' \n';
        textBuilder = textBuilder+'Zodiac: '+res.results[0].zodiac+' \n';
        textBuilder = textBuilder+'Imprint: '+res.results[0].memoryImprintAttribute+' \n\n';
        textBuilder = textBuilder+'About '+res.results[0].name+' stat, ask me: \n|-> stat hero '+res.results[0].name+' \n';
        textBuilder = textBuilder+'About '+res.results[0].name+' skill set, ask me: \n|-> skill hero '+res.results[0].name+' \n';
        textBuilder = textBuilder+'More detail information: \nhttps://epicsevendb.com/hero/'+res.results[0]._id+'\n';
        textBuilder = textBuilder+'https://epic7x.com/character/'+res.results[0]._id+'\n';
      }else{
        var searchRes = searchHero(id.replace('-', ' '));      
        if(listhero==null){      
          textBuilder = "You wrote it wrong, try again\n";
        }else{
          if(searchRes.length == 0){
            textBuilder = "Sorry meaw don`t have any information about that :(\nMaybe you wrote it wrong, try again";  
          }else{
            textBuilder = "Maybe you mean one of these?\n";
          }
        }
        for (let i = 0; i < searchRes.length; i++) {        
          textBuilder = textBuilder+searchRes[i]+"\n";
        }
      }
      const echo = { type: 'text', text: textBuilder };
      return client.replyMessage(event.replyToken, echo);                        
    });
  }
  else if(detType == "stat"){
    var request = require('request');
    var id = cmd.toLowerCase().replace("stat hero ","").replace(/\s+/g, '-');                  
    request('https://epicsevendb-apiserver.herokuapp.com/api/hero/'+id, function (error, response, body) {        
      var res = JSON.parse(body);              
      if(res.results != null && res.results.length>0){        
        textBuilder = 'Base Stat max level and awakened of '+res.results[0].name+': \n';
        textBuilder = textBuilder+'CP: '+res.results[0].stats.lv60SixStarFullyAwakened.cp+' \n';
        textBuilder = textBuilder+'ATK: '+res.results[0].stats.lv60SixStarFullyAwakened.atk+' \n';
        textBuilder = textBuilder+'HP: '+res.results[0].stats.lv60SixStarFullyAwakened.hp+' \n';
        textBuilder = textBuilder+'SPD: '+res.results[0].stats.lv60SixStarFullyAwakened.spd+' \n';
        textBuilder = textBuilder+'DEF: '+res.results[0].stats.lv60SixStarFullyAwakened.def+' \n';
        textBuilder = textBuilder+'CHC: '+(res.results[0].stats.lv60SixStarFullyAwakened.chc*100)+'% \n';
        textBuilder = textBuilder+'CHD: '+(res.results[0].stats.lv60SixStarFullyAwakened.chd*100)+'% \n';
        textBuilder = textBuilder+'EFF: '+(res.results[0].stats.lv60SixStarFullyAwakened.eff*100)+'% \n';
        textBuilder = textBuilder+'EFR: '+(res.results[0].stats.lv60SixStarFullyAwakened.efr*100)+'% \n';
        textBuilder = textBuilder+'DAC: '+(res.results[0].stats.lv60SixStarFullyAwakened.dac*100)+'% \n';
      }else{
        var searchRes = searchHero(id.replace('-', ' '));      
        if(listhero==null){      
          textBuilder = "You wrote it wrong, try again\n";
        }else{
          if(searchRes.length == 0){
            textBuilder = "Sorry meaw don`t have any information about that :(\nMaybe you wrote it wrong, try again";  
          }else{
            textBuilder = "Maybe you mean one of these?\n";
          }
        }
        for (let i = 0; i < searchRes.length; i++) {        
          textBuilder = textBuilder+searchRes[i]+"\n";
        }
      }
      const echo = { type: 'text', text: textBuilder };
      return client.replyMessage(event.replyToken, echo);                        
    });
  }
  else if(detType == "skill"){
    var request = require('request');
    var id = cmd.toLowerCase().replace("skill hero ","").replace(/\s+/g, '-');                  
    request('https://epicsevendb-apiserver.herokuapp.com/api/hero/'+id, function (error, response, body) {        
      var res = JSON.parse(body);              
      if(res.results != null && res.results.length>0){        
        textBuilder = 'Skill set of '+res.results[0].name+': \n';
        textBuilder = textBuilder+'| Skill 1: '+res.results[0].skills[0].name+' \n';
        textBuilder = textBuilder+'|-> '+res.results[0].skills[0].description+' \n';
        textBuilder = textBuilder+'| Skill 2: '+res.results[0].skills[1].name+' \n';
        textBuilder = textBuilder+'|-> '+res.results[0].skills[1].description+' \n';
        textBuilder = textBuilder+'| Skill 3: '+res.results[0].skills[2].name+' \n';
        textBuilder = textBuilder+'|-> '+res.results[0].skills[2].description+' \n';
      }else{
        var searchRes = searchHero(id.replace('-', ' '));      
        if(listhero==null){      
          textBuilder = "You wrote it wrong, try again\n";
        }else{
          if(searchRes.length == 0){
            textBuilder = "Sorry meaw don`t have any information about that :(\nMaybe you wrote it wrong, try again";  
          }else{
            textBuilder = "Maybe you mean one of these?\n";
          }
        }
        for (let i = 0; i < searchRes.length; i++) {        
          textBuilder = textBuilder+searchRes[i]+"\n";
        }
      }
      const echo = { type: 'text', text: textBuilder };
      return client.replyMessage(event.replyToken, echo);                        
    });
  }
  
}

function showLocationItem(event, cmd){
    var request = require('request');
    var id = cmd.toLowerCase().replace("info location ","").replace(/\s+/g, '-');                      
    request('https://epicsevendb-apiserver.herokuapp.com/api/item/'+id, function (error, response, body) {        
    var res = JSON.parse(body);     
    if(res.results != null && res.results.length>0){
      textBuilder = "["+res.results[0].name+']\n'; 
      textBuilder = textBuilder+res.results[0].description;     
      if(res.results[0].type == 'catalyst'){
        //ap shops
        textBuilder = textBuilder+"\nAP Shops: \n";
        for (let i = 0; i < res.results[0].apShops.length; i++) {
          var ap = res.results[0].apShops[i];
          textBuilder = textBuilder+"("+(i+1)+") "+ap.chapter+"\n";
        }
        //map
        var textBuilder = "\n"+textBuilder+"Adventure: \n";
        for (let i = 0; i < res.results[0].locations.length; i++) {
          var loc = res.results[0].locations[i];
          textBuilder = textBuilder+"("+(i+1)+") "+loc.node+" ("+loc.mobcount+" monsters)"+"\n";
        }
      }
    }else{
      var searchRes = searchItem(id.replace('-', ' '));      
      if(listitem==null){      
        textBuilder = "You wrote it wrong, try again\n";
      }else{
        if(searchRes.length == 0){
          textBuilder = "Sorry meaw don`t have any information about that :(\nMaybe you wrote it wrong, try again";  
        }else{
          textBuilder = "Maybe you mean one of these?\n";
        }        
      }
      for (let i = 0; i < searchRes.length; i++) {        
        textBuilder = textBuilder+searchRes[i]+"\n";
      }
    }
        
    const echo = { type: 'text', text: textBuilder };
    return client.replyMessage(event.replyToken, echo);                        
    });
}

function roll(event){
  if(timestampFirst==null){
    timestampFirst = event.timestamp;
  }else if(new Date(event.timestamp-timestampFirst).getHours()>=12){
    bannRoll = [];
    timestampFirst = event.timestamp;
  }     
  console.log('Roll length: ',new Date(event.timestamp-timestampFirst).getHours())
  var allowRoll = true;       
  if(bannRoll.length == 0){
    bannRoll.push(event.source.userId);
    allowRoll = true;
    console.log('bannroll empty');
  }else if(bannRoll.indexOf(event.source.userId) == -1){
    bannRoll.push(event.source.userId)          
    allowRoll = true;
    console.log('userid not found');
  }else{
    allowRoll = false;
    console.log('userid found');
  }        
  if (allowRoll){
    if(listhero==null){
      getListHero();
    }
    if(listhero != null && listhero.results.length>0){
      var kittyResponse = ["Umm,", "I hope u will get", "Congrats u got", "UwU"];
      var kittyResponse2 = ["?", ":3", "!", "UwU"];
      var rand = (Math.floor(Math.random() * (+listhero.results.length-1 - +0)) + +0);        
      var resp = (Math.floor(Math.random() * (+kittyResponse.length-1 - +0)) + +0);
      textBuilder = kittyResponse[resp]+" "+listhero.results[rand].name+kittyResponse2[resp];
      const echo = { type: 'text', text: textBuilder };
      return client.replyMessage(event.replyToken, echo);
    }
  }
}

function luck(event){
  if(timestampFirst2==null){
    timestampFirst2 = event.timestamp;
  }else if(new Date(event.timestamp-timestampFirst2).getHours()>=12){
    bannLuck = [];
    timestampFirst2 = event.timestamp;
  }     
  console.log('Luck length: ',new Date(event.timestamp-timestampFirst2).getHours())
  var allowRoll = true;       
  if(bannLuck.length == 0){
    bannLuck.push(event.source.userId);
    allowRoll = true;
    console.log('bannLuck empty');
  }else if(bannLuck.indexOf(event.source.userId) == -1){
    bannLuck.push(event.source.userId)          
    allowRoll = true;
    console.log('userid not found');
  }else{
    allowRoll = false;
    console.log('userid found');
  }        
  if (allowRoll){
    var maxRate = 99;
    var rand = (Math.floor(Math.random() * (+maxRate - +0)) + +0);
    var textBuilder = "Your LUCK: "+rand + "%\n";
    if(rand<20){
      textBuilder = textBuilder+"AMPAS! Nyahahaha XD"          
    }
    const echo = { type: 'text', text: textBuilder };
    return client.replyMessage(event.replyToken, echo);
  }
}

// listen on port
const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});


