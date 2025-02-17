import redis

Redis_CLIENT = redis.Redis(host="localhost", port=6379, password="password", decode_responses=True)
