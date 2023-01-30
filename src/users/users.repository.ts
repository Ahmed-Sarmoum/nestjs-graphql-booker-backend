/* eslint-disable prettier/prettier */
import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AbstractRepository } from "src/database/abstract.repository";
import { User } from "./models/user.model";
import { UserDocument } from "./models/user.schema";

@Injectable()
export class UsersRepository extends AbstractRepository<UserDocument>{
    protected readonly logger = new Logger(UserDocument.name);
    
    constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
        super(userModel)
    }
}