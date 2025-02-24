import random
from typing import Dict

from services.utils import ConnectionManagerInterface
from services.types.game import Player


class CoupeGame:
    ROLES = ["CP", "DU", "AM", "ASS", "CO"]

    def __init__(self):
        self.id = None
        self.players: Dict[str, Player] = {}
        self.cards = self.ROLES
        self.turn = 0
        self.turns = {}
        self.manager: ConnectionManagerInterface | None = None

    @staticmethod
    def get_random_cards():
        cards = CoupeGame.ROLES.copy()
        return random.sample(cards, 2)

    def get_player(self, player_id):
        return self.players[player_id]

    def add_player(self, player_id):
        if player_id not in self.players:
            self.players[player_id] = {
                "player_id": player_id,
                "cards": CoupeGame.get_random_cards(),
                "credit": 2,
                "turn": self.turn,
            }

    def remove_player(self, player_id):
        self.players.pop(player_id)

    async def perform_command(self, command: str, **kwargs):
        if command == "tabla":
            all_players_with_no_cards = [
                {
                    "player_id": player,
                    "credit": details["credit"],
                    "turn": details["turn"],
                }
                for player, details in self.players.items()
            ]
            for player, details in self.manager.games[self.id]["players"].items():
                all_players_with_no_cards = [
                    {
                        "player_id": _player,
                        "credit": details["credit"],
                        "player_turn": list(self.players.keys()).index(_player),
                        "cards": details["cards"]
                        if _player == player
                        else ["XX", "XX"],
                    }
                    for _player, details in self.players.items()
                ]

                await details["websocket"].send_json(
                    {
                        "type": "command",
                        "subtype": "tabla",
                        "turn": self.turn,
                        "message": None,
                        "players": all_players_with_no_cards,
                    }
                )
        elif command == "notfication":
            await self.manager.broadcast(
                {
                    "type": "notification",
                    "message": kwargs["message"],
                },
                self.id,
            )
            return

    async def perform_reaction(self, player_id, reaction):
        if reaction == "allow":
            self.turns[self.turn]["reaction"]["allow"] = True
            challenged_player_id = list(self.players.keys())[self.turn]
            self.players[challenged_player_id]["credit"] += 3
        elif reaction == "challenge":
            self.turns[self.turn]["reaction"]["challenge"] = True
            self.turns[self.turn]["reaction"]["player_id"] = player_id
            await self.handle_challenge()
        self.turn = (self.turn + 1) % len(self.players)
        await self.perform_command("tabla")

    async def handle_challenge(self):
        action = self.turns[self.turn]["action"]
        challengee_player_id = self.turns[self.turn]["reaction"]["player_id"]
        challenged_player_id = list(self.players.keys())[self.turn]

        challengee_cards = self.players[challengee_player_id]["cards"]
        challenged_cards = self.players[challenged_player_id]["cards"]

        if action == "tax":
            if "DU" in challenged_cards:
                if challengee_cards[0] == "XX":
                    challengee_cards[1] = "XX"
                challengee_cards[0] = "XX"
                self.players[challenged_player_id]["credit"] += 3
                await self.perform_command("notfication", message="Tax challenge won")
            else:
                if challenged_cards[0] == "XX":
                    challenged_cards[1] = "XX"
                challenged_cards[0] = "XX"
                await self.perform_command("notfication", message="Tax challenge lost")
