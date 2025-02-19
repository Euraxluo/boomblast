import {IsIn, IsString} from "class-validator";

import {Card} from "../../lib/typings";
import {deck} from "../../lib/deck";

export class AlterFutureCardsDto {
  @IsString({
    message: "Match id must be a type of string",
  })
  matchId: string;

  @IsIn(deck.cards, {
    each: true,
    message: "Card must be valid",
  })
  order: Card[];
}
