
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, 'Request', function (response) {
        document.getElementById('count').innerText = response.count;
        document.getElementById('ratio').innerText = response.ratio;
        document.getElementById('image').src = response.path;       
        
        
        for(var key in response.words){
            var newBullet = document.createElement('LI');
            var textNode = document.createTextNode(key + " : " + response.words[key]);
            newBullet.appendChild(textNode);
            document.getElementById('response').appendChild(newBullet);
        }
        
        
    });
});







