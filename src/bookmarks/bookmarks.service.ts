/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { BookmarkRepository } from './bookmark.repository';
import { CreateBookmarkInput } from './dto/input/create-bookmark-input.dto';
import { BookmarkDocument } from './models/bookmark.schema';

@Injectable()
export class BookmarksService {
    constructor(private readonly bookmarksRepository: BookmarkRepository) {}
    async createBookmark(createbookmarkData: CreateBookmarkInput, userId: string) {
        const bookmarkDocument = await this.bookmarksRepository.create({
            ...createbookmarkData,
            links: [],
            userId
        })
        return this.toModel(bookmarkDocument)
    }

    private toModel(bookmarkDocument: BookmarkDocument) {
        return {
            _id: bookmarkDocument._id.toHexString(),
            ...bookmarkDocument
        }
    }
}
