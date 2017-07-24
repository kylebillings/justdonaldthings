const gm = require('../node_modules/gm')
  , dir = __dirname + '/imgs'

// eventually get this from twitter
let tweet = 'Stock Market hit another all-time high yesterday - despite the Russian hoax story! Also, jobs numbers are starting to look very good!';

// picks a random image to use
let image = String(Math.floor(Math.random()*7)) + '.jpg';

// function for adding line breaks to the tweet
var wordwrap = function(long_string, max_char){

    var sum_length_of_words = function(word_array){
        var out = 0;
        if (word_array.length!=0){
            for (var i=0; i<word_array.length; i++){
                var word = word_array[i];
                out = out + word.length;
            }
        };
        return out;
    };


    var chunkString = function (str, length){
        return str.match(new RegExp('.{1,' + length + '}', 'g'));
    };

    var splitLongWord = function (word, maxChar){
        var out = [];
        if( maxChar >= 1){
            var wordArray = chunkString(word, maxChar-1);// just one under maxChar in order to add the innerword separator '-'
            if(wordArray.length >= 1){
                // Add every piece of word but the last, concatenated with '-' at the end
                for(var i=0; i<(wordArray.length-1); i++){
                    var piece = wordArray[i] + "-";
                    out.push(piece);
                }
                // finally, add the last piece
                out.push(wordArray[wordArray.length-1]);
            }
        }
        // If nothing done, just use the same word
        if(out.length == 0) {
            out.push(word);
        }
        return out;
    }

    var split_out = [[]];
    var split_string = long_string.split(' ');
    for(var i=0; i<split_string.length; i++){
        var word = split_string[i];

        // If the word itself exceed the max length, split it,
        if(word.length > max_char){
            var wordPieces = splitLongWord(word, max_char);
            for(var i=0;i<wordPieces.length;i++){
                var wordPiece = wordPieces[i];
                split_out = split_out.concat([[]]);
                split_out[split_out.length-1] = split_out[split_out.length-1].concat(wordPiece);
            }

        } else {
            // otherwise add it if possible
            if ((sum_length_of_words(split_out[split_out.length-1]) + word.length) > max_char){
              split_out = split_out.concat([[]]);
            }

            split_out[split_out.length-1] = split_out[split_out.length-1].concat(word);
        }
    }

    for (var i=0; i<split_out.length; i++){
        split_out[i] = split_out[i].join(" ");
    }

    return split_out.join('\n');
};

// create formatted tweet
let wrappedTweet = wordwrap(tweet, 35);

// let's do this shit
gm(dir + '/' + image)
  .resize(2772,2100)
  .gravity("Center")
  // .extent(1386, 1050)
  .contrast(2)
  .colorize(19,19,19)
  .fill("#ffffff")
  .font("Times-Italic", 124)
  .drawText(0, 0, wrappedTweet)
  .write(dir + '/results/gravity1.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + " created  ::  " + arguments[3])
  }
)