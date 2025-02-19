import {Controller, Get, Session, UseGuards} from "@nestjs/common";
import {SessionWithData} from "express-session";

import {IsAuthenticatedViaHttpGuard} from "../auth";
import {UserService} from "../user";

import {LobbyService} from "./services";

@UseGuards(IsAuthenticatedViaHttpGuard)
@Controller("/lobbies")
export class LobbyController {
  constructor(
    private readonly userService: UserService,
    private readonly lobbyService: LobbyService,
  ) {}

  @Get("/current")
  async getCurrentLobby(@Session() session: SessionWithData) {
    const interim = await this.userService.getInterim(session.user.id);

    const lobby = await this.lobbyService.get(interim.activity?.lobbyId);

    return {
      lobby: lobby ? lobby.public : null,
    };
  }
}
