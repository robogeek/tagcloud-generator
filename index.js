
/**
 * Supply an array of { tagName: "...", count: ## }
 * It annotates the array items with { ... fontSize: "nnn%" }
 **/
module.exports.generateFontSizes = function(wordVector) {
    //var sum = 0;
    //var count = 0;
    var min = 99999;
    var max = 0;
    for (tagnm in wordVector) {
        var tagData = wordVector[tagnm];
        //sum += wordVector[i].count;
        //count++;
        if (tagData.count < min) min = tagData.count;
        if (tagData.count > max) max = tagData.count;
    }
    //var avg = sum / count;
    var tenth = (max - min) / 10;
    
    for (tagnm in wordVector) {
        var tagData = wordVector[tagnm];
        var relsize = Math.floor((tagData.count - min) / tenth);
        tagData.fontSize = (70+ (relsize * 10)) + "%";
    }
    return wordVector;
};

/**
 * This generates a simple tag cloud that's just a block of links, with HTML styling
 * to manipulate the size.
 * TBD: Option to add a count?
 **/
module.exports.generateSimpleCloud = function(wordVector, urlFunc, cssClass) {
    wordVector = wordVector.sort((a, b) => {
        var tagA = a.tagName.toLowerCase();
        var tagB = b.tagName.toLowerCase();
        if (tagA < tagB) return -1;
        if (tagA > tagB) return 1;
        return 0;
    });
    var res = "";
    for (var i = 0; i < wordVector.length; i++) {
        var tagData = wordVector[i];
        res += '<a href="'+
            urlFunc(tagData.tagName) +'"'+
            (cssClass ? "class="+cssClass : "")
            +" style='font-size: "+ tagData.fontSize +"'"+'>'+
            tagData.tagName +'</a> ';
        
    }
    return res;
};
