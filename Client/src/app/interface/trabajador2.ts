import { Administativo } from "./administrativo";
import { Chofer } from "./chofer";

export interface TrabajadorFull{
  id: string;
  ci: string;
  sexo: string;
  telefono: string;
  direccion_particular: string;
  nombre: string;
  anios_experiencia: number;
  nivel_escolar: string;
  salario_basico: number;
  chofer: Chofer;
  administrativo: Administativo;
}
