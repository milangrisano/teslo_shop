import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";



export class PaginationDTO {
    
    @IsOptional()
    @IsPositive()
    @Type( () => Number ) //Si insertamos en el app.module enableImplicitConversions: true sustituye esta linea
    limit?: number;

    @IsOptional()
    @Type( () => Number )
    @Min(0)
    offset?: number;
}