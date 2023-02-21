/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { AuthGuard } from "@nestjs/passport";

export default class JwtAuthGuard extends AuthGuard('jwt'){}