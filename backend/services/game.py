import random

from services.utils import ConnectionManagerInterface


class CoupeGame:
    ROLES = ["CP", "DU", "AM", "ASS", "CO"]

    def __init__(self):
        self.id = None
        self.players = {}
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

    async def perform_command(self, command: str):
        if command == "tabla":
            all_players_with_no_cards = [
                {
                    "player_id": player,
                    "credit": details["credit"],
                    "turn": details["turn"],
                }
                for player, details in self.players.items()
            ]

            await self.manager.broadcast(
                {
                    "type": "command",
                    "command": "tabla",
                    "players": all_players_with_no_cards,
                },
                self.id,
            )
            return 
        
    
    def perform_reaction(self, player_id, reaction):
        if reaction == "allow":
            self.turns[self.turn]["reaction"]["allow"] = True
        elif reaction == "challenge":
            self.turns[self.turn]["reaction"]["challenge"] = True
            self.turns[self.turn]["reaction"]["player_id"] = player_id
            self.handle_challenge()
        self.turn = (self.turn + 1) % len(self.players)

    def handle_challenge(self):
        action = self.turns[self.turn]["action"]
        challengee_player_id = self.turns[self.turn]["reaction"]["player_id"]
        challenged_player_id = list(self.players.keys())[self.turn]

        challengee_cards = self.players[challengee_player_id]["cards"]
        challenged_cards = self.players[challenged_player_id]["cards"]

        if action == "tax":
            if "DU" in challenged_cards:
                challengee_cards.pop()
                self.players[challengee_player_id]["credit"] += 3
                print(f"{challenged_player_id} won the challenge")
            else:
                challenged_cards.pop()
                print(f"{challengee_player_id} won the challenge")

    async def perform_action(
        self, player_id, action, target=None, manager: ConnectionManagerInterface = None
    ):
        players_list = list(self.players.keys())
        player_index = players_list.index(player_id)

        if player_index != self.turn:
            print("Not your turn")
            return

        self.turns[self.turn] = {
            "action": None,
            "reaction": {"challenge": False, "allow": False, "player_id": None},
            "status": "pending",
        }

        if action == "tax":
            self.turns[self.turn]["action"] = "tax"
            # send request to all players see who will [challenge, allow]
            await manager.broadcast(
                {
                    "type": "action",
                    "action": "tax",
                    "player_id": player_id,
                    "next": "reaction",
                    "turn": self.turn,
                },
                self.id,
            )
            # self.turn = (self.turn + 1) % len(self.players)

        elif action == "challenge":
            self.turns[self.turn]["reaction"] = "challenge"
            # send request to the player to check if he has the card required for that action
            ...
