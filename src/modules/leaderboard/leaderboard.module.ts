import {Module} from "@nestjs/common";

import {UserModule} from "../user";
import {MatchModule} from "../match";
import {LeaderboardController} from "./leaderboard.controller";

@Module({
  imports: [UserModule, MatchModule],
  controllers: [LeaderboardController],
})
export class LeaderboardModule {}
