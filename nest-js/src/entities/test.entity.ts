import { ApiProperty } from "@nestjs/swagger";

export class Test{
    @ApiProperty()
    id: number;
    
    @ApiProperty()
    name: string;
}