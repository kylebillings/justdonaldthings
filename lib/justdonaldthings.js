'use strict';

var gm = require('../node_modules/gm'),
    dir = __dirname + '/imgs';

// eventually get this from twitter
var tweet = 'Stock Market hit another all-time high yesterday - despite the Russian hoax story! Also, jobs numbers are starting to look very good!';

// picks a random image to use
var image = String(Math.floor(Math.random() * 7)) + '.jpg';

// function for adding line breaks to the tweet
var wordwrap = function wordwrap(str, width, brk, cut) {

  if (!str) {
    return str;
  }

  var regex = '.{1,' + width + '}(\s|$)' + (cut ? '|.{' + width + '}|.+$' : '|\S+?(\s|$)');

  return str.match(RegExp(regex, 'g')).join(brk);
};

// create formatted tweet
var wrappedTweet = wordwrap(tweet, 36, '\n', false);
console.log(wrappedTweet);

// let's do this shit
gm(dir + '/' + image).resize(2772, 2100).gravity("Center")
// .extent(1386, 1050)
.contrast(2).colorize(19, 19, 19).fill("#ffffff").font("Times-Italic", 124).drawText(0, 0, wrappedTweet).write(dir + '/results/gravity1.jpg', function (err) {
  if (err) return console.dir(arguments);
  console.log(this.outname + " created  ::  " + arguments[3]);
});