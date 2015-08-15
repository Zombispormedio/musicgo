module.exports={


    range: function (x){
        return Array.apply(null, Array(x)).map(function (_, i) {return i;});

    },
    offAll:function(leds){
        Object.keys(leds).forEach(function(a){
            leds[a].off();
        });
    },

    onSecuence:function(seq, leds){
        var elems=seq.split(" ");
        console.log(seq);
        var slice= elems.slice(2, elems.length);

        if(slice.length>0 && slice[0]!==""){
            slice.forEach(function(a){

                if(a<8){

                    leds[a].on();
                }

            });
        }
    }

};
