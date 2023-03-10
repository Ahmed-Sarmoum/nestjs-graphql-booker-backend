/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */

import { Logger, NotFoundException } from "@nestjs/common";
import { FilterQuery, Model, Types } from "mongoose";
import { AbstractDocument } from "./abstract.schema";

export abstract class AbstractRepository<TDocument extends AbstractDocument> {

    protected abstract readonly logger: Logger

    constructor(protected readonly model: Model<TDocument>) {}
    
    async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
        const createdDocument = new this.model({
            ...document,
            _id: new Types.ObjectId()
        })

        return (await createdDocument.save()).toJSON() as unknown as TDocument
    }

    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOne(filterQuery, {}, { lean: true })
        console.log("document >>", document);

        if (!document) {
            this.logger.warn("Document not found with filterQuery:", filterQuery)
            throw new NotFoundException("Document not found!")
        }

        return document
    }
}