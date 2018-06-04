var wordMap = {};

var buzzwordReg = new RegExp(/accelerat|hybrid|dynam|kill|disrupt|synerg|paradigm|diverse|diversi|engag|passion|immers|solution|brillian|transmedia|mashup|enabl|runway|upsell|upcycl|mindshare|expand|framework|millenial|leverag|clutter|global|holistic|proactiv|streamlin|analy|p2p|peer|brand|best|super|content|cloud|creati|creator|create|startup|viral|converg|collab|revol|omnichannel|workflow|webinar|saas|paas|platform|scrum|zen|amplif|insight|entrepreneur|influence|clout|^hot|cool|utilize|robust|chang|monetiz|resonat|futur|bleeding|iot|data|agil|leader|centric|agnostic|empower|innovat|dream|doer/i);


function emptyFilter(text){
	return text != '';
}


function countBuzzwords(input){
    var buzzCount = 0;
	for (var i = 0; i < input.length; i++){
        if(buzzwordReg.test(input[i])){
            buzzCount+=1;
            if(input[i].toLowerCase() in wordMap)
                wordMap[input[i].toLowerCase()] = wordMap[input[i].toLowerCase()]+1 ;
            else   
                wordMap[input[i].toLowerCase()] = 1;
            
        }
    }
    return buzzCount;
}




var buzzCountResult = countBuzzwords(document.body.innerText.split(/[^a-zA-Z]/).filter(emptyFilter));
console.log(JSON.stringify(wordMap));
var buzzwordRatio = 0;
if(buzzCountResult>0)
    var buzzwordRatio = Math.round(buzzCountResult/document.body.innerText.split(/[^a-zA-Z]/).filter(emptyFilter).length * 100);
var imagePath;
if(buzzCountResult <= 5)
    imagePath = "images/gauge1.png";
else if(buzzCountResult <= 10)
    imagePath = "images/gauge2.png";
else if(buzzCountResult <= 20)
    imagePath = "images/gauge3.png";
else if(buzzCountResult <= 35)
    imagePath = "images/gauge4.png";
else
    imagePath = "images/gauge5.png";

var result = {
    
    count : buzzCountResult,
    ratio : buzzwordRatio.toString().concat('%'),
    path  : imagePath,
    words : wordMap
    
};
    
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    sendResponse(result);
  });


