/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import GqlAuthGuard from 'src/auth/guards/gql-auth.guard';
import { GetUserArgs } from './DTO/args/get-user-args.dto';
import { CreateUserInput } from './DTO/input/create-user-input.dto';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
    
    constructor(private readonly userService: UsersService) {}

    @Mutation(() => User)
    async createUser(@Args('createUserData') createUserData: CreateUserInput) {
        return this.userService.createUser(createUserData)
    } 

    @UseGuards(GqlAuthGuard)
    @Query(() => User, {name: 'user'})
    async getUser(@Args() getUserArgs: GetUserArgs) {
        return this.userService.getUser(getUserArgs)
    }




}
