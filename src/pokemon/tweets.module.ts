import { Module } from "@nestjs/common";
import { PokemonService } from "./tweets.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  providers: [PokemonService],
})
export class TweetsModule {}
