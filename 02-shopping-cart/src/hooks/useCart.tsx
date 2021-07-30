import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

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

  const addProduct = async (productId: number) => {
    try {
      const productIndexInCart = cart.findIndex(product => product.id === productId);
      let newAmount = productIndexInCart === -1 ? 1 : cart[productIndexInCart].amount + 1;

      const productStock = (await api.get<Stock>(`stock/${productId}`)).data;
      
      if(productStock.amount >= newAmount) {
        let updatedCart = [...cart];
        if (productIndexInCart === -1) {
          const selectedProduct = (await api.get<Product>(`products/${productId}`)).data;
          updatedCart.push({...selectedProduct, amount: newAmount});
        } else {
          updatedCart[productIndexInCart].amount++;
        }
        setCart(updatedCart);
        localStorage.setItem("@RocketShoes:cart", JSON.stringify(updatedCart));
      } else {
        toast.error('Quantidade solicitada fora de estoque');
      }
    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const productIndexInCart = cart.findIndex(product => product.id === productId);
      if(productIndexInCart === -1) {
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
      
      const productStock = (await api.get<Stock>(`stock/${productId}`)).data;
      
      if(productStock.amount >= amount) {
        let updatedCart = [...cart];
        if (productIndexInCart === -1) {
          const selectedProduct = (await api.get<Product>(`products/${productId}`)).data;
          updatedCart.push({...selectedProduct, amount: amount});
        } else {
          updatedCart[productIndexInCart].amount = amount;
        }
        setCart(updatedCart);
        localStorage.setItem("@RocketShoes:cart", JSON.stringify(updatedCart));
      } else {
        toast.error('Quantidade solicitada fora de estoque');
      }
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
