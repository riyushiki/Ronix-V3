export interface GetDataOptions {
  length?: number;
  factor?: number;
}

export abstract class Shape1D {
  public abstract height: number;
  public abstract fwhm: number;

  abstract fwhmToWidth(fwhm: number): number;
  abstract widthToFWHM(width: number): number;
  abstract fct(x: number): number;
  abstract getArea(): number;
  abstract getFactor(area?: number): number;
  abstract getData(options: GetDataOptions): Float64Array;
}
