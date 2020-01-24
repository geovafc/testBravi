import { Sys } from './sys';
import { Clouds } from './clouds';
import { Wind } from './wind';
import { Main } from './main';
import { Weather } from './weather';
import { Coord } from "./coord";

export class Climate {
  id: number;
  coord: Coord;
  weather: Weather;
  base: string;
  main: Main;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  name: string;
  cod: number;
  }