import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useShop, getProductById } from "@/context/ShopContext";

export default function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    cart,
    setQty,
    removeFromCart,
    cartSubtotal,
  } = useShop();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full sm:w-105 bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <p className="text-sm font-medium">
                  Your Bag ({cart.length})
                </p>
              </div>

              <button onClick={() => setCartOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-12 h-12 mb-4 text-gray-400" />

                  <h2 className="text-xl font-semibold mb-2">
                    Your cart is empty
                  </h2>

                  <p className="text-gray-500">
                    Add products to continue shopping.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {cart.map((item) => {
                    const product = getProductById(item.id);

                    if (!product) return null;

                    return (
                      <div
                        key={item.id}
                        className="flex gap-4 border-b pb-4"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-24 object-cover rounded-lg"
                        />

                        <div className="flex-1">
                          <p className="text-xs uppercase text-gray-400">
                            {product.category}
                          </p>

                          <h3 className="font-medium text-lg">
                            {product.name}
                          </h3>

                          <p className="text-yellow-700 font-semibold mt-1">
                            ₹ {(product.price * item.qty).toLocaleString()}
                          </p>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border rounded-full">
                              <button
                                onClick={() =>
                                  setQty(item.id, item.qty - 1)
                                }
                                className="p-2"
                              >
                                <Minus className="w-3 h-3" />
                              </button>

                              <span className="px-3">
                                {item.qty}
                              </span>

                              <button
                                onClick={() =>
                                  setQty(item.id, item.qty + 1)
                                }
                                className="p-2"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Subtotal
                  </p>

                  <p className="text-2xl font-semibold text-yellow-700">
                    ₹ {cartSubtotal.toLocaleString()}
                  </p>
                </div>

                <button
                  className="w-full bg-black text-white py-4 rounded-full uppercase text-sm hover:bg-gray-800 transition"
                >
                  Secure Checkout
                </button>

                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full text-center border border-black py-4 rounded-full uppercase text-sm hover:bg-black hover:text-white transition"
                >
                  Order on WhatsApp
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>

)
    