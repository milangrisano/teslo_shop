import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";



export class PaginationDTO {
    
    @ApiProperty({
        default: 10, description: 'How many rows you have to show'
    })
    @IsOptional()
    @IsPositive()
    @Type( () => Number ) //Si insertamos en el app.module enableImplicitConversions: true sustituye esta linea
    limit?: number;

    @ApiProperty({
        default: 0, description: 'How many rows do you wants to skip'
    })
    @IsOptional()
    @Type( () => Number )
    @Min(0)
    offset?: number;
}