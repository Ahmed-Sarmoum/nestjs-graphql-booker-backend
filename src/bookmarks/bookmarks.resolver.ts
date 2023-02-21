/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import GqlAuthGuard from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/users/models/user.model';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkInput } from './dto/input/create-bookmark-input.dto';
import { Bookmark } from './models/bookmark.model';

@Resolver(() => Bookmark)
export class BookmarksResolver {
    constructor(private readonly bookmarksService: BookmarksService) {}
    
    @UseGuards(GqlAuthGuard)
    @Mutation(() => Bookmark)
    async createBookmark(@Args('createBookmarkData') createbookmarkData: CreateBookmarkInput,
        @CurrentUser() user: User) {
            return this.bookmarksService.createBookmark(createbookmarkData, user._id)

    }
}
