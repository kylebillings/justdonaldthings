
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var gm = require('../node_modules/gm')
  , dir = __dirname + '/imgs'

gm(dir + '/original.jpg')
  .resize(1386,1050)
  .gravity("Center") // Be sure to use gravity BEFORE extent
  .extent(300, 300)
  .write(dir + '/gravity.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + " created  ::  " + arguments[3])
  }
)
