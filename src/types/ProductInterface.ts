/* eslint-disable @typescript-eslint/no-explicit-any */
export interface productsInterface {
  id: number;
  title: string;
  brand: string;
  thumbnail: string;
  price: any;
  quantity: number;
  idProduct?: string;
}

export interface productsQueryInterface {
  limit: number;
  page: number;
}

export interface payloadAddtoCardInterface {
  id: number;
  quantity: number;
}
