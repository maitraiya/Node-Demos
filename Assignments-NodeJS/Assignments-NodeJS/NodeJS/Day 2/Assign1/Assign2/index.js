module.exports.add = function(a,b){
    return a+b
}
module.exports.sub = function(a,b){
    return a-b
}
module.exports.mul = function(a,b){
    return a*b
}
module.exports.div = function(a,b){
	if(b!=0)
    return a/b
	else
	return 'please put denominator as non-zero number';
}
