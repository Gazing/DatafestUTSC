const fs = require('fs-extra');
const ncp = require('ncp');

function copy() {
    console.log("Copying build to production folders.");

    return new Promise(function (resolve, reject) {

        Promise.all([

            new Promise(function(res, rej) {
                ncp( "./build/static/js/", "../public/js/", function (err) {
                    if (err) return rej(err);
                    console.log("Copied js files");
                    res();
                })
            }),
			
        ]).then(function () {
            resolve();
        }).catch(function (err) {
            reject(err);
        });
    });

}

module.exports = copy;
