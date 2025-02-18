from fastapi import WebSocket
from typing import Dict
from collections import defaultdict


import services.utils as utils
from services.game import CoupeGame


class ConnectionManager:
    def __init__(self):
        self.games: Dict[str, Dict] = defaultdict(
            lambda: {"players": {}, "game_instance": CoupeGame()}
        )
        self.default_game = {"players": defaultdict()}

    async def connect(self, websocket: WebSocket, gameId: str, player_id: str):
        await websocket.accept()

        if gameId not in self.games:
            self.games[gameId] = {
                "players": {},
                "game_instance": CoupeGame(),
            }

        game_instance: CoupeGame = self.games[gameId]["game_instance"]
        game_instance.id = gameId
        game_instance.manager = self
        game_instance.add_player(player_id)

        self.games[gameId]["players"][player_id] = {
            "websocket": websocket,
        }

        await websocket.send_json(
            {
                "type": "init",
                "message": "new game",
                "player": game_instance.players[player_id],
                "gameId": gameId,
            }
        )

        await game_instance.perform_command("tabla")
        # self.games[gameId].append(websocket)

    async def handle_action(self, gameId, player_id, action, target=None):
        game_instance: CoupeGame = self.games[gameId]["game_instance"]
        await game_instance.perform_action(player_id, action, target, self)

    def handle_reaction(self, gameId, player_id, reaction):
        game_instance: CoupeGame = self.games[gameId]["game_instance"]
        game_instance.perform_reaction(player_id, reaction)

    async def handle_command(self, gameId, player_id, command=None):
        game_instance: CoupeGame = self.games[gameId]["game_instance"]
        manager_player: Dict[str, WebSocket] = self.games[gameId]["players"][player_id]
        if command == "me":
            game_player = game_instance.get_player(player_id)
            await manager_player["websocket"].send_json(game_player)
            return
        await game_instance.perform_command(command)
        return 

    def disconnect(self, websocket: WebSocket, gameId):
        self.games[gameId].remove(websocket)

    async def broadcast(self, message: str, gameId: str):
        players_list = list(self.games[gameId]["players"].keys())
        for player in players_list:
            connection: Dict[str, WebSocket] = self.games[gameId]["players"][player]
            await connection["websocket"].send_json(message)
        # for connection in self.games[gameId]:
        # await connection.send_json(message)
        # client.set_cache(gameId, message)
