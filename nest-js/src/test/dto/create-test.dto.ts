import { ApiProperty } from "@nestjs/swagger";
export class CreateTestDto{
    // @IsNotEmpty()
    username: string;

    @ApiProperty()
    name: string

    // @ApiProperty({required: false})
    // age?: number;
}