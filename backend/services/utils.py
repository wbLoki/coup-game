from abc import ABC, abstractmethod
from fastapi import WebSocket

def generate_random_string(length):
    import string
    import random
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))


class ConnectionManagerInterface(ABC):
    @abstractmethod
    async def connect(self, websocket: WebSocket, gameId: str):
        pass

    @abstractmethod
    async def disconnect(self, websocket: WebSocket, gameId: str):
        pass

    @abstractmethod
    async def broadcast(self, message: str, gameId: str):
        pass
