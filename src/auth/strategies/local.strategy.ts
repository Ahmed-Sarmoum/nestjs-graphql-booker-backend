/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-local"
import { UsersService } from "src/users/users.service"


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UsersService) {
        super({ usernameField: 'email' })
    }

    async validate(email: string, password: string) {
        this.userService.validateUser(email, password)
    }
}