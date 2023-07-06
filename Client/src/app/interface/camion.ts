import { Antiguo } from "./antiguo";
import { Moderno } from "./moderno";

export interface Camion{
  id: string;
  chapa: string;
  marca: string;
  antiguo: object;
  moderno: object;
}
