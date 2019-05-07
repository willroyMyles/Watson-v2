var Specialization = require('./Specializations');

class Contextmanager {

    constructor() {
        this.contexts = [];
        this.values = [];
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

        if (!status) {
            //didnt find object
            if (obj1 === "passion_subject") return;
            console.log(obj1);
            this.contexts.push(obj1);
            this.values.push(obj2);
        }

    }

    getLineOfBestFit() {
        var independentVariable = new Specialization();

        //find the closest values
        for (let index = 0; index < this.values.length; index++) {
            const element = this.values[index];
            independentVariable.ComputerScience[index] = Math.abs(independentVariable.ComputerScience[index] - element);
            independentVariable.Multimedia[index] = Math.abs(independentVariable.Multimedia[index] - element);
            independentVariable.InformationSystems[index] = Math.abs(independentVariable.InformationSystems[index] - element);
            independentVariable.EnterpriseSystems[index] = Math.abs(independentVariable.EnterpriseSystems[index] - element);
            independentVariable.Networking[index] = Math.abs(independentVariable.Networking[index] - element);
        }

        var obj = [];
        var res = { ComputerScience: 0, Networking: 0, Multimedia: 0, InformationSystems: 0, EnterpriseSystems: 0 };
        var cs = 0;
        var net = 0;
        var mul = 0;
        var info = 0;
        var ent = 0;

        independentVariable.ComputerScience.forEach((item, index) => {
            cs = cs + item;
        });
        independentVariable.Networking.forEach((item, index) => {
            net = net + item;
        });
        independentVariable.Multimedia.forEach((item, index) => {
            mul = mul + item;
        });
        independentVariable.InformationSystems.forEach((item, index) => {
            info = info + item;
        });
        independentVariable.EnterpriseSystems.forEach((item, index) => {
            ent = ent + item;
        });

        res.ComputerScience = cs;
        res.Networking = net;
        res.Multimedia = mul;
        res.InformationSystems = info;
        res.EnterpriseSystems = ent;

        //res.sort();
        console.log(res);

        obj.push(res);
        return res;


    }

    compareResults(personsArray) {
        personsArray = this.values;
        var sp = new Specialization();
        var resultsHolder = new Specialization();


        resultsHolder.ComputerScience = this.compareSpecific(personsArray, sp.ComputerScience);
        resultsHolder.Networking = this.compareSpecific(personsArray, sp.Networking);
        resultsHolder.InformationSystems = this.compareSpecific(personsArray, sp.InformationSystems);
        resultsHolder.EnterpriseSystems = this.compareSpecific(personsArray, sp.EnterpriseSystems);
        resultsHolder.Multimedia = this.compareSpecific(this.values, sp.Multimedia);

        //TODO return results and display options for each

        return resultsHolder;
    }

    compareSpecific(personArray, specializationArray) {
        var total = 0;
        for (var i = 0; i < personArray.length; i++) {
            var ans = personArray[i] / specializationArray[i];
            if (ans >= 1) ans = 1;
            total = total + ans;
        }
        // total = total * (100 / personArray.length);
        // total = Math.ceil(total);
        return total;
    }
}

module.exports = Contextmanager;