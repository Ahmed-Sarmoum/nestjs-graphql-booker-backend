/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './models/user.model';
import { UserSchema } from './models/user.schema';
import { UsersRepository } from './users.repository';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/booker'),
  MongooseModule.forFeature([
      { 
        name: User.name, 
        schema: UserSchema
      }
    ])
  ],
  providers: [UsersService, UsersResolver, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {}
