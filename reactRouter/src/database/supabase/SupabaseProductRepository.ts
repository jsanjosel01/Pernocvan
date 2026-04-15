import type { Product } from "../../interfaces/Product";
import type { ProductRepository } from "../repositories/ProductRepository";
import { supabase } from "../supabase/Client";

export class SupabaseProductRepository implements ProductRepository {

	async createProduct(data: Partial<Product>) {
    const { data: productData, error } = await supabase
      .from("Products")
      .insert({
        nombre: data.nombre,
        precio: data.precio,
        descripcion: data.descripcion,
      });
    if (error) {
      console.error("Error createProduct:", error);
      return { error };
    }
    return { productData };
  }

  async getAllProducts(){
    const {data, error} = await supabase
    .from("Products")
    .select("*")
    .order("nombre", {ascending: true})
    
    return {data: data as Product[] | [], error}
  }
}
