import {IsIn, IsString} from "class-validator";

import {LobbyModeType} from "../../lib/typings";
import {LOBBY_MODES} from "../../lib/modes";

export class SetModeDto {
  @IsString({
    message: "Lobby id must be a type of string",
  })
  lobbyId: string;

  @IsIn(LOBBY_MODES)
  type: LobbyModeType;
}
