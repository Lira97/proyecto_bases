export class Venta{
   constructor (
      public Nventa: number,
      public monto:number,
      public nombreVendedor:string,
      public comision:number,
      public cliente:string,
      public fecha:string,
      public tipo:string

   ){}
}
