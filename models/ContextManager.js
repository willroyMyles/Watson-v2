class Contextmanager {
    constructor() {
        this.values = [{}];
    }

    add(obbj) {
        for (var prop in obbj) {
            if (obbj.hasOwnProperty(prop)) {
                console.log(prop);
                console.log(obbj[prop]);
                var val = 0;
                if (typeof obbj[prop] !== 'number') {
                    switch (obbj[prop]) {
                        case "extremely":
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
                    this.values.push({ prop, val });
                } else {
                    var value = obbj[prop];
                    this.values.push({ prop, value });
                }
            }
        }
    }
}

module.exports = Contextmanager;