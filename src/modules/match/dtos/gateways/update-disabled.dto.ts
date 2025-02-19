import {IsIn, IsString} from "class-validator";

import {deck} from "../../lib/deck";
import {Card} from "../../lib/typings";

export class UpdateDisabledDto {
  @IsString({
    message: "Lobby id must be a type of string",
  })
  lobbyId: string;

  @IsIn(deck.cards, {
    message: "Cards must be valid",
  })
  cards: Card[];
}
