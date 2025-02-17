from db.config import Redis_CLIENT

def get_cache(key: str):
    value = Redis_CLIENT.get(key)
    return {"key": key, "value": value}

def set_cache(key: str, value: str):
    Redis_CLIENT.set(key, value)
    return {"status": "success", "message": f"Stored {key} -> {value}"}

# @app.get("/")
# def read_root(redis_client=Depends(get_redis)):
#     redis_client.set("message", "Hello from Redis!")
#     return {"message": redis_client.get("message")}

# @app.get("/cache/{key}")
# def get_cache(key: str, redis_client=Depends(get_redis)):
#     value = redis_client.get(key)
#     return {"key": key, "value": value}

# @app.post("/cache/{key}/{value}")
# def set_cache(key: str, value: str, redis_client=Depends(get_redis)):
#     redis_client.set(key, value)
#     return {"status": "success", "message": f"Stored {key} -> {value}"}
