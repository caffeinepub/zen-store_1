import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    featured: boolean;
    name: string;
    description: string;
    stock: bigint;
    imageUrl: string;
    category: string;
    priceCents: bigint;
}
export interface backendInterface {
    addProduct(name: string, priceCents: bigint, description: string, category: string, imageUrl: string, stock: bigint, featured: boolean): Promise<bigint>;
    addSampleProducts(): Promise<void>;
    getAllCategories(): Promise<Array<string>>;
    getAllProducts(): Promise<Array<Product>>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getProduct(productId: bigint): Promise<Product>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    removeProduct(productId: bigint): Promise<void>;
    updateProduct(productId: bigint, name: string, priceCents: bigint, description: string, category: string, imageUrl: string, stock: bigint, featured: boolean): Promise<void>;
}
