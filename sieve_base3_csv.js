var fs = require('fs');

if(process.argv <= 4 || isNaN(process.argv[2])){
  console.log("node sieve_base3_csv.js number_limit where_to_save_csv");
  process.exit(-1);
}

var limit = process.argv[2];

exports.generate_csv = function(input){
  if (input.headers.length != input.data[0].length){
    console.log("error headers and data do not match");
    process.exit(-1);
  }


  var output = "";
  output += input.headers.reduce(function(p,c){
    return p += "\"" + c + "\","
  },"").slice(0, -1) + "\n";
  output += input.data.reduce(function(p,c){
    return p+= c.reduce(function(x,y){
      return x += "\"" + y + "\",";
    }, "").slice(0, -1) + "\n";
  },"");
  return output;
}

exports.SieveErath = function(max) {
    var array = [],
        primes = [],
        upperLimit = Math.sqrt(max);

    for (var i = 0; i < max; i++)
    {
        array.push(true);
    }

    for (var i = 2; i<= upperLimit; i++)
    {
        if (array[i])
        {
            for (var z = i * i; z < max; z += i)
            {
                array[z] = false;
            }
        }
    }

    for (var i = 2; i < max; i++)
    {
        if (array[i])
        {
            primes.push(i);
        }
    }

    return primes;
}


fs.writeFile(
  process.argv[3] + 'base3_primes.csv',
  this.generate_csv(
    {
      headers: ['Prime Number', 'Base 3', 'Base 3 last digit'],
      data: this.SieveErath(limit).map(function(p){
        var b3 = (p).toString(3);
        var lc = b3.substring(b3.length - 1);
        return [p, b3, lc]
      })
    }
  ),
  function(err){
    if(err)
      console.log(err);
    console.log("file base3_primes.csv saved!");
  }
);
