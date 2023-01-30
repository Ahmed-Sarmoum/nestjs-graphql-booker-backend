/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { GetUserArgs } from './DTO/args/get-user-args.dto';
import { CreateUserInput } from './DTO/input/create-user-input.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt'
import { UserDocument } from './models/user.schema';
import { User } from './models/user.model';

@Injectable()
export class UsersService {

    constructor(private readonly usersRepository: UsersRepository) {}

    async getUser(getUserArgs: GetUserArgs) {
        console.log("getUserArgs >>",getUserArgs);
        
        const userDocument = await this.usersRepository.findOne(getUserArgs)

        return this.toModel(userDocument)
    }
    
    async createUser(createUserData: CreateUserInput) {
        await this.validateCreateUserData(createUserData)
        const userDocument = await this.usersRepository.create({
            ...createUserData,
            password: await bcrypt.hash(createUserData.password, 10)
        })

        return this.toModel(userDocument)
    }

    async validateUser(email: string, password: string) {
        const userDocument = await this.usersRepository.findOne({ email })
        const passwordIsValid = await bcrypt.compare(password, userDocument.password)

        if(!passwordIsValid) {
            throw new UnauthorizedException('Credentials are not valid!')
        }
        return this.toModel(userDocument)
    }


    private async validateCreateUserData(createUserData: CreateUserInput) {
        try {
            await this.usersRepository.findOne({ email: createUserData.email })
            throw new UnprocessableEntityException("Email already exists!")
        } catch(err) {

        }
    }



    private toModel(userDocument: UserDocument): User {
        return {
            _id: userDocument._id.toHexString(),
            email: userDocument.email
        }
    }
}
