let async = require('async')
let model = require("../models/vip.js");

// ///////////////////////// R E P E R T O I R E    D E S     S T A R S

module.exports.Repertoire = 	function(request, response){
    response.title = 'Répertoire des stars';
    model.getFirstLetters(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.firstVipLet = result;
        response.render('repertoireVips', response);
    });
}

module.exports.Search = function (request, response) {
    response.title = 'Répertoire des stars';
    let letter = request.params.letter;
    async.parallel( [
            function (callback) {
                model.getFirstLetters(function (err, result) {
                    callback(null, result);
                });
            } ,
            function (callback) {
                model.findVipByLetter(function (errE, resE) {
                    callback(null,resE);
                }, letter);
            },
        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.firstVipLet = result[0];
            response.vips = result[1];
            response.render('repertoireVips', response);
        })
}
module.exports.Show = function (request, response) {
    response.title = 'Répertoire des stars';
    let num = request.params.num;
    async.parallel( [
            function (callback) {
                model.getFirstLetters(function (err, result) {
                    callback(null, result);
                });
            } ,
            function (callback) {
                model.getVipInfo(function (errE, resE) {
                    callback(null,resE);
                }, num);
            },
            function(callback) {
                model.getVipJob(function (errA, resA) {
                    callback(null, resA)
                }, num);
            },
            function (callback) {
                model.listFilm(num, function (errB, resB) {
                    callback(null, resB)
                })
            },
            function (callback) {
                model.listDefileDans(num, function (errC, resC) {
                    callback(null, resC)
                })
            },
            function (callback) {
                model.listChansons(num, function (errD, resD) {
                    callback(null, resD)
                })
            },
            function (callback) {
                model.mariages(num, function (errF, resF) {
                    callback(null, resF)
                })
            },
            function (callback) {
                model.liaisons(num, function (errG, resG) {
                    callback(null, resG)
                })
            },
            function (callback) {
                model.images(num, function (errH, resH) {
                    callback(null, resH)
                })
            },
        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.firstVipLet = result[0];
            response.vipInfos = result[1][0];
            response.professions = result[2];
            response.films = result[3];
            response.defile = result[4];
            response.albums = result[5];
            response.mariages = result[6];
            response.liaisons = result[7];
            response.images = result[8];
            response.render('repertoireVips', response);
        })
}