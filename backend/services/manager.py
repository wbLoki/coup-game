from fastapi import WebSocket
from typing import Dict
from collections import defaultdict


from services.game import CoupeGame
from factory.actions import ActionFactory


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

        await game_instance.perform_command("tabla")

    async def handle_action(self, gameId, player_id, action, target=None):
        game_instance: CoupeGame = self.games[gameId]["game_instance"]
        await ActionFactory.create_action(game_instance, player_id, action, target)

    async def handle_reaction(self, gameId, player_id, reaction):
        game_instance: CoupeGame = self.games[gameId]["game_instance"]
        await game_instance.perform_reaction(player_id, reaction)

    async def handle_command(self, gameId, player_id, command=None):
        game_instance: CoupeGame = self.games[gameId]["game_instance"]
        manager_player: Dict[str, WebSocket] = self.games[gameId]["players"][player_id]
        if command == "me":
            game_player = game_instance.get_player(player_id)
            await manager_player["websocket"].send_json(game_player)
            return
        await game_instance.perform_command(command)
        return

    async def disconnect(self, websocket: WebSocket, gameId, player_id=None):
        self.games[gameId]["players"].pop(player_id)
        game_instance: CoupeGame = self.games[gameId]["game_instance"]
        game_instance.remove_player(player_id)

        if len(self.games[gameId]["players"]) == 0:
            del self.games[gameId]
            return
        await game_instance.perform_command("tabla")
        await self.broadcast(f"{player_id.upper()} Left", gameId)

    async def broadcast(self, message: str, gameId: str):
        players_list = list(self.games[gameId]["players"].keys())
        for player in players_list:
            connection: Dict[str, WebSocket] = self.games[gameId]["players"][player]
            await connection["websocket"].send_json(
                {"type": "message", "message": message}
            )
