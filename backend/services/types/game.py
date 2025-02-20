from enum import Enum
from pydantic import BaseModel


class TypeEnum(str, Enum):
    ACTION = "action"
    REACTION = "reaction"
    COMMAND = "command"
    NOTIFICATION = "notification"


class SubTypeEnum(str, Enum):
    BOOM = "boom"
    TAX = "tax"


class Message(BaseModel):
    type: TypeEnum
    subtype: SubTypeEnum
    message: str
    cards: list
    turn: int
    player_id: str


class Player(BaseModel):
    player_id: str
    credit: int
    turn: int
    cards: list[str]
