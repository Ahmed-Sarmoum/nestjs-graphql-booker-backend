/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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

    @Query(() => User, {name: 'user'})
    async getUser(@Args() getUserArgs: GetUserArgs) {
        return this.userService.getUser(getUserArgs)
    }


}
