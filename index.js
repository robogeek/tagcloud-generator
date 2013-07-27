
/**
 * Supply an array of { tagName: "...", count: ## }
 * It annotates the array items with { ... fontSize: "nnn%" }
 **/
module.exports.generateFontSizes = function(wordVector) {
    //var sum = 0;
    //var count = 0;
    var min = 99999;
    var max = 0;
    for (var i = 0; i < wordVector.length; i++) {
        //sum += wordVector[i].count;
        //count++;
        if (wordVector[i].count < min) min = wordVector[i].count;
        if (wordVector[i].count > max) max = wordVector[i].count;
    }
    //var avg = sum / count;
    var tenth = (max - min) / 10;
    
    for (var i = 0; i < wordVector.length; i++) {
        var relsize = Math.floor((wordVector[i].count - min) / tenth);
        wordVector[i].fontSize = (70+ (relsize * 10)) + "%";
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
    for (var i = 0; i < wordVector.length; i++) {
        res += '<a href="'+
            urlFunc(wordVector[i].tagName) +'"'+
            (cssClass ? "class="+cssClass : "")
            +" style='font-size: "+ wordVector[i].fontSize +"'"+'>'+
            wordVector[i].tagName +'</a> ';
    }
    return res;
}