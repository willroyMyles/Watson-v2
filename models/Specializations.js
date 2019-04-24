class Specializations {
    constructor() {
        // values added based off model
        this.ComputerScience = [5, 3, 5, 2];
        this.Networking = [1, 4, 2, 1];
        this.InformationSystems = [5, 5, 3, 2];
        this.EnterpriseSystems = [5, 5, 3, 1];
        this.Multimedia = [5, 3, 2, 2];
        this.Animation = [5, 3, 2, 1];
    }

    getInfo(specialization, callabck) {
        var request = require('request');
        var cheerio = require('cheerio');
        const options = {
            method: 'GET',
            url: 'https://www.payscale.com/college-salary-report/majors-that-pay-you-back/bachelors?orderBy=MajorName&search=' + specialization + '',
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/18.17763",
            }
        }
        request(options, (err, res, body) => {
            var $ = cheerio.load(body);
            var tableBody = $('tbody');
            var tableRow = tableBody.find('tr');
            var counter = 0;
            var array = [];
            tableRow.each(function(i, elem) {
                if (counter == 2 || counter == 4 || counter == 5 || counter == 6) array.push($(this).children().children().text());
                counter++;
                if (counter >= 7) counter = 0;
            });

            callabck(array);
        });
    }
}

module.exports = Specializations;