var async = require('async');

async.waterfall([
    function (done) {
        console.log(1)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
               done(null, 1)
            }, 2000)
        })
    },
    function (value1, done) {
        console.log(2)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                done(null, 2)
            }, 2000)
        })
    }, function (value2, done) {
        console.log(3)
        done(null, 'done');
    }
  ], function (err) {
    if (err) throw new Error(err);
  });

  