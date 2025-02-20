from abc import ABC, abstractmethod
from collections import defaultdict
from typing import Dict
from fastapi import WebSocket


def generate_random_string(length):
    import string
    import random

    letters = string.ascii_lowercase
    return "".join(random.choice(letters) for i in range(length))


class ConnectionManagerInterface(ABC):
    def __init__(self):
        self.games: Dict[str, Dict] = defaultdict(
            lambda: {"players": {}, "game_instance": self.create_game_instance()}
        )
        self.default_game = {"players": defaultdict()}

    @abstractmethod
    async def connect(self, websocket: WebSocket, gameId: str):
        pass

    @abstractmethod
    async def disconnect(self, websocket: WebSocket, gameId: str):
        pass

    @abstractmethod
    async def broadcast(self, message: str, gameId: str):
        pass
