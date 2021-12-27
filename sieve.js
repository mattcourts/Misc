/**
 * Created by matt on 5/16/2015.
 * Calculates primes up to a limit set as argument(int)
 * uses sieve of eratosthenes
 */

function Sieve(max) {
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


