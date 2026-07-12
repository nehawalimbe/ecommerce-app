import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Product } from "../types/Product";
type ProductState = {
  products: Product[];
  error: string | null;
  loading: boolean;
};
const initialState: ProductState = {
  products: [],
  error: null,
  loading: false,
};
export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const productRes = await fetch("https://fakestoreapi.com/products");
    if (!productRes.ok) {
      throw Error("Error while fetching products");
    }
    const productApiData: Product[] = await productRes.json();
    return productApiData;
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state) =>{
        state.loading = true;
        state.error = null;
    });
     builder.addCase(fetchProducts.fulfilled, (state, action) =>{
        state.loading = false;
        state.error = null;
        state.products = action.payload
    });
     builder.addCase(fetchProducts.rejected, (state, action) =>{
        state.loading = false;
        state.error = action.error.message ?? 'Error occured';
    });
  },
});

export default productSlice.reducer;