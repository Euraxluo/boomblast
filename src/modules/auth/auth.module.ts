import {Module} from "@nestjs/common";

import {UploadModule} from "../upload";
import {UserModule} from "../user";
import {AuthController} from "./auth.controller";

@Module({
  imports: [UserModule, UploadModule],
  controllers: [AuthController],
})
export class AuthModule {}
