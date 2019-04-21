var Specialization = require('./Specializations');

class Contextmanager {

    constructor() {
        this.contexts = ['test'];
        this.values = [];
        this.contexts.pop();
    }

    add(obbj) {
        for (var prop in obbj) {
            if (obbj.hasOwnProperty(prop)) {
                var val = 0;
                if (typeof obbj[prop] !== 'number') {
                    switch (obbj[prop]) {
                        case "extremley":
                            val = 5;
                            break;
                        case "very":
                            val = 4;
                            break;
                        case "moderately":
                            val = 3;
                            break;
                        case "slightly":
                            val = 2;
                            break;
                        case "not very":
                            val = 1;
                            break;
                        default:
                            break;
                    }


                    this.PushIfNotPresentInArray(prop, val);
                    // this.contexts.push({ prop, val });
                    // this.values.push(val);
                } else {
                    var keyValue = obbj[prop];
                    this.PushIfNotPresentInArray(prop, keyValue);
                    // this.contexts.push({ prop, keyValue });
                    // this.values.push(keyValue);
                }
            }
        }
    }

    PushIfNotPresentInArray(obj1, obj2) {
        var status = false;

        for (var i = 0; i < this.contexts.length; i++) {
            if (this.contexts[i] === obj1) status = true;
        }

        console.log(status);

        if (!status) {
            //didnt find object
            this.contexts.push(obj1);
            this.values.push(obj2);
        }

    }

    compareResults(personsArray) {
        personsArray = this.values;
        var sp = new Specialization();
        var resultsHolder = new Specialization();
        var res;

        console.log(this.contexts);
        console.log(this.values);

        resultsHolder.computerScience = this.compareSpecific(personsArray, sp.computerScience);
        resultsHolder.networking = this.compareSpecific(personsArray, sp.networking);
        resultsHolder.informationSystems = this.compareSpecific(personsArray, sp.informationSystems);
        resultsHolder.enterpriseSystems = this.compareSpecific(personsArray, sp.enterpriseSystems);
        resultsHolder.multimedia = this.compareSpecific(this.values, sp.multimedia);
        resultsHolder.animation = this.compareSpecific(this.values, sp.animation);


        console.log(resultsHolder);

    }

    compareSpecific(personArray, specializationArray) {
        var total = 0;
        for (var i = 0; i < personArray.length; i++) {

            var ans = personArray[i] / specializationArray[i];
            if (ans >= 1) ans = 1;
            total = total + ans;

        }

        total = total * (100 / personArray.length);
        return total;
    }
}

module.exports = Contextmanager;