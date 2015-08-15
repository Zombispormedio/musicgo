function range(x){
    return Array.apply(null, Array(x)).map(function (_, i) {return i;});
}

function $id(id){
    return document.getElementById(id);
}
