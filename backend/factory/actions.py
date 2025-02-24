class ActionFactory:
    @staticmethod
    async def create_action(game, player_id, action, target=None):
        players_list = list(game.players.keys())
        player_index = players_list.index(player_id)

        if player_index != game.turn:
            print("Not your turn")
            return

        game.turns[game.turn] = {
            "action": None,
            "reaction": {"challenge": False, "allow": False, "player_id": None},
            "status": "pending",
        }

        if action == "tax":
            return await ActionFactory._handle_tax(game, player_id)
        elif action == "income":
            return await ActionFactory._handle_income(game, player_id)

    @staticmethod
    async def _handle_tax(game, player_id):
        game.turns[game.turn]["action"] = "tax"
        for player, details in game.manager.games[game.id]["players"].items():
            if player == player_id:
                continue
            await details["websocket"].send_json(
                {
                    "type": "reaction",
                    "subtype": "tax",
                    "player_id": player_id,
                    "next": "reaction",
                    "turn": game.turn,
                }
            )

    @staticmethod
    async def _handle_income(game, player_id):
        game.turns[game.turn]["action"] = "income"
        game.players[player_id]["credit"] += 1
        game.turn = (game.turn + 1) % len(game.players)
        await game.perform_command("tabla")
