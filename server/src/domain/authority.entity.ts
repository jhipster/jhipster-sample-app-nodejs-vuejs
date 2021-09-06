import { Entity, Column } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseEntity } from './base/base.entity';

@Entity('nhi_authority')
export class Authority extends BaseEntity {
    @ApiModelProperty({ example: 'ROLE_USER', description: 'User role' })
    @Column({ unique: true })
    name: string;
}
