kandidat = 1
loops = 0
maximum = 100
truth = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]

def isprime(kandidat):
    for divisor in range(2,int(kandidat/2+1)):
        if kandidat%divisor == 0:
            return 0
    return 1

def findprimes(maximum):
    """Finds primes up to maximum and returns list"""
    list = [2]
    for kandidat in range(3,maximum,2):
        if isprime(kandidat):
            list.append(kandidat)
    return (list)

try:
    while True:
        if findprimes(maximum) == truth:
            loops += 1
        #print(loops)
except KeyboardInterrupt:
    print(loops)