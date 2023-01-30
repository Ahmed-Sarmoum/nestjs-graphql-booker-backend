/* eslint-disable prettier/prettier */

import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString, IsNotEmpty } from "class-validator";

@InputType()
export class CreateUserInput {
    @Field()
    @IsEmail()
    readonly email: string

    @Field()
    @IsNotEmpty()
    @IsString()
    readonly password: string
}