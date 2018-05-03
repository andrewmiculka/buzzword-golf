
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, 'Request', function (response) {
        document.getElementById('count').innerText = response.count;
        document.getElementById('ratio').innerText = response.ratio;
        document.getElementById('image').src = response.path;




        var sortedWords = [];
        for(var key in response.words)
          sortedWords.push([key, response.words[key]]);
        sortedWords.sort(function(a, b) { return b[1] - a[1]; });

        if(sortedWords.length > 0){
          for(var i = 0; i < sortedWords.length; i++){
              var newBullet = document.createElement('LI');
              var textNode = document.createTextNode(sortedWords[i][0] + " : " + sortedWords[i][1]);
              newBullet.appendChild(textNode);
              document.getElementById('response').appendChild(newBullet);
          }
        }

    });
});
