class Specializations {
    constructor() {
        // values added based off model


        //0 job opportunities
        //1 potential income
        //2 passion
        //3 logical reasoning
        //4 math aptitude
        //5 english aptitude
        //6 programming aptitube
        //7 networks aptitude
        //8 concrete thinker
        //9 conceptual thinker
        //10 organizational skills
        //11 analytical skills


        this.ComputerScience = [4.67, 4.67, 4.33, 5.0, 4.67, 3.33, 5.00, 2.67, 2.67, 5, 3.67, 5.0];
        this.Networking = [3.67, 3.33, 3.67, 3.67, 5, 3, 3.33, 3.67, 3.0, 3.0, 2.67, 3.33];
        this.InformationSystems = [2.67, 3.67, 3.0, 3.0, 2.33, 4.33, 2.33, 4.0, 4.33, 3.33, 4.33, 3.33];
        this.EnterpriseSystems = [3.0, 3.0, 3.67, 3.33, 3.0, 4.0, 3.67, 3.33, 3.67, 3.67, 4.33, 3.67];
        this.Multimedia = [3.33, 3.67, 4.33, 2.67, 2.67, 4.00, 2.33, 3.00, 2.67, 3.0, 3.0, 3.0];
    }

    getSpecializations(callback) {
        callback(this);
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