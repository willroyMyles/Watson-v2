exports = class{
    constructor(){
        this.array[{context,value}];
    }

    insert(context,value){
//if its already in array, return,
        if(this.array.find(context)!==undefined) return;

        var val =0 ;
        switch(value){
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
        
        add(context, val);
    }

    add(context,value){
        this.array.push({context,value});
    }
}