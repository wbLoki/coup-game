from fastapi import FastAPI, WebSocket, WebSocketDisconnect

from db import config as _  # noqa: F401
from db import client  # noqa: F401

from services.manager import ConnectionManager


app = FastAPI()


manager = ConnectionManager()


@app.websocket("/ws/{playerId}")
async def websocket_endpoint(websocket: WebSocket, playerId: str, gameId: str = "default_game"):
    
    await manager.connect(websocket, gameId, playerId)

    try:
        while True:
            data = await websocket.receive_json()
            message_type = data.get("type", None)

            if message_type == "action":
                action = data.get("action", "Boom")
                await manager.handle_action(gameId, playerId, action)
            elif message_type == "reaction":
                reaction = data.get("reaction", "Boom")
                manager.handle_reaction(gameId, playerId, reaction)
            elif message_type == "command":
                command = data.get("command", "Boom")
                await manager.handle_command(gameId, playerId, command)
            

    except WebSocketDisconnect:
        manager.disconnect(websocket, gameId)
        await manager.broadcast("Player Left", gameId)
