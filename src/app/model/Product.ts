export interface Product {

  id: string;
  name: string;
  price:number;
  promotion:boolean;
}

export class ProductPage {

  Size: number;
  page: number;
  productsPage: Product[];
  totalPages: number;


  constructor(Size: number, page: number, productsPage: Product[], totalPages: number) {
    this.Size = Size;
    this.page = page;
    this.productsPage = productsPage;
    this.totalPages = totalPages;
  }
}
