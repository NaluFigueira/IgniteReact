import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface UpdateProductInCartWithAmountParams {
  productId: number;
  productIndex: number;
  amount: number;
}

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem("@RocketShoes:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const getProductAmountInStock = async (productId: number) => {
    const productStock = await api.get<Stock>(`stock/${productId}`);
    const productAmountInStock = productStock.data.amount;

    return productAmountInStock;
  }

  const updateProductInCartWithAmount = async ({
    productId, 
    amount, 
    productIndex
  }:UpdateProductInCartWithAmountParams) => {
    let updatedCart = [...cart];
    const productExists = productIndex > -1;
    if (productExists) {
      updatedCart[productIndex].amount = amount;
    } else {
      const newProduct = await api.get<Product>(`products/${productId}`);
      updatedCart.push({...newProduct.data, amount});
    }
    setCart(updatedCart);
    localStorage.setItem("@RocketShoes:cart", JSON.stringify(updatedCart));
  }

  const addProduct = async (productId: number) => {
    try {
      const productIndexInCart = cart.findIndex(product => product.id === productId);
      const productExists = productIndexInCart > -1;
      const currentProductAmount = productExists ? cart[productIndexInCart].amount : 0;
      let newAmount = currentProductAmount + 1;

      const productAmountInStock = await getProductAmountInStock(productId);

      if(productAmountInStock < newAmount) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }
      
      await updateProductInCartWithAmount({
        productId,
        amount: newAmount,
        productIndex: productIndexInCart,
      })
    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const productIndexInCart = cart.findIndex(product => product.id === productId);
      const productDoesNotExist = productIndexInCart === -1;
      
      if(productDoesNotExist) {
        throw new Error;
      }

      let updatedCart = [...cart];
      updatedCart.splice(productIndexInCart, 1);
      setCart(updatedCart);
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(updatedCart));
    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    if(amount <= 0) return;
    try {
      const productIndexInCart = cart.findIndex(product => product.id === productId);

      const productAmountInStock = await getProductAmountInStock(productId);

      if(productAmountInStock < amount) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      await updateProductInCartWithAmount({
        productId,
        amount,
        productIndex: productIndexInCart,
      })
    } catch {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
