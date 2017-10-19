export class Contrato{
   constructor (
      public id_contrato: string,
      public nombreEmpresa: string,
      public valor:number,
      public zona: string,
      public telefono:number,
      public servicios:string
   ){}
}
