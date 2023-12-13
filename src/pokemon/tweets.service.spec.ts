import {  HttpService } from '@nestjs/axios';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './tweets.service';
import {DeepMocked, createMock} from '@golevelup/ts-jest'

describe('PokemonService', () => {
  let pokemonService: PokemonService;
  let httpService: DeepMocked<HttpService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonService,
     ],
    }).useMocker(createMock)
    .compile();

    pokemonService = module.get<PokemonService>(PokemonService);
    httpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(pokemonService).toBeDefined();
  });

  describe('getPokemon', () => {
    it('pokemon ID less than 1 should throw error', async () => {
      const getPokemon = pokemonService.getPokemon(0);

      await expect(getPokemon).rejects.toBeInstanceOf(BadRequestException);
    });

    it('pokemon ID greater than 151 should throw error', async () => {
      const getPokemon = pokemonService.getPokemon(152);

      await expect(getPokemon).rejects.toBeInstanceOf(BadRequestException);
    });

    it('valid pokemon ID to return the pokemon name', async () => {
      httpService.axiosRef.mockResolvedValueOnce({
        data: `Unexpected Data`,
        headers: {},
        config: { url: '' },
        status: 200,
        statusText: '',
      });
      const getPokemon = pokemonService.getPokemon(1);
      await expect(getPokemon).rejects.toBeInstanceOf(InternalServerErrorException)

    });
  });
});

