export type Product = ProductInfo & Reviews;

type ProductInfo = {
    id:number,
    title:string,
    description:string,
    category:string,
    price:number,
    discountPercentage : number,
    rating:number,
    stock: number,
    thumbnail: string,
    image:string,
    
}

export type Reviews ={
    rating:number,
    comment:string,
    date:string,
    reviewerName:string,
    reviewerEmail:string
}