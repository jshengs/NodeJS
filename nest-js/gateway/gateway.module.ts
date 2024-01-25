import { Module } from "@nestjs/common";
import { MyGateway } from "src/socket/gateway";


@Module({
    providers: [MyGateway],
})
export class GatewayModule{}