import time
from functools import wraps


def timer(f):
    @wraps(f)
    def calTime(*args, **kwargs):
        start = time.time()
        f(*args, **kwargs)
        end = time.time() - start
        print(f'Time elapsed: {end} seconds')

    return calTime
