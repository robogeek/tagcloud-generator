
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
}

/**
 * This generates a simple tag cloud that's just a block of links, with HTML styling
 * to manipulate the size.
 * TBD: Option to add a count?
 **/
module.exports.generateSimpleCloud = function(wordVector, urlFunc, cssClass) {
    var res = "";
    var tagnames = [];
    for (var tagnm in wordVector) {
        tagnames.push(tagnm);
    }
    tagnames.sort(function(a, b) {
        // http://stackoverflow.com/questions/8996963/how-to-perform-case-insensitive-sorting-in-javascript
        // return a.toLowerCase().localeCompare(b.toLowerCase());
        // if (a.toLowerCase() < b.toLowerCase()) return -1;
        // if (a.toLowerCase() > b.toLowerCase()) return 1;
        // return 0;
        var alc = a.tagName.toLowerCase();
        var blc = b.tagName.toLowerCase();
        if (alc < blc) return -1;
        if (alc === blc) return 0;
        return 1;
        /*if (a < b) return -1;
        else if (a === b) return 0;
        else return 1;*/
    });
    for (var i = 0; i < tagnames.length; i++) {
        var tagnm = tagnames[i];
        var tagData = wordVector[tagnm];
        res += '<a href="'+
            urlFunc(tagData.tagName) +'"'+
            (cssClass ? "class="+cssClass : "")
            +" style='font-size: "+ tagData.fontSize +"'"+'>'+
            tagData.tagName +'</a> ';
    }
    return res;
}
