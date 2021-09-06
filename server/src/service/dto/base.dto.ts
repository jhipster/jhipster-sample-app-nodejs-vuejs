import { Transform } from 'class-transformer';

/**
 * A DTO base object.
 */
export class BaseDTO {
    @Transform(id => (id?.toHexString ? id?.toHexString() : id), { toPlainOnly: true }) id?: string;

    createdBy?: string;

    createdDate?: Date;

    lastModifiedBy?: string;

    lastModifiedDate?: Date;
}
