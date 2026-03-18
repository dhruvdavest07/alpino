import { useCart } from '../context/CartContext';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import CheckoutModal from './CheckoutModal';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[160] animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[170] shadow-2xl animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-[#E31B23]" />
            <h2 className="font-display text-xl text-[#0B0B0D]">YOUR CART</h2>
            <span className="bg-[#E31B23] text-white text-xs font-bold px-2 py-1 rounded-full">
              {totalItems}
            </span>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium mb-2">Your cart is empty</p>
              <p className="text-gray-400 text-sm">Add some fuel to get started!</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="mt-6 px-6 py-3 bg-[#FFD900] text-[#0B0B0D] font-semibold rounded-lg hover:bg-yellow-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                BROWSE MENU
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  {/* Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#0B0B0D] text-sm truncate">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.protein}g Protein · {item.calories} Cal
                    </p>
                    <p className="font-display text-[#E31B23] mt-2">₹{item.price}</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-[#E31B23] transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-[#E31B23] transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-[#E31B23] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-6 space-y-4">
            {/* Price Breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes (5%)</span>
                <span>₹{Math.round(totalPrice * 0.05)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-100">
                <span>Total</span>
                <span className="text-[#E31B23]">₹{Math.round(totalPrice * 1.05)}</span>
              </div>
            </div>
            
            {/* Checkout Button */}
            <button 
              onClick={() => setCheckoutOpen(true)}
              className="w-full py-4 bg-[#FFD900] text-[#0B0B0D] font-bold text-lg rounded-lg hover:bg-yellow-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              PROCEED TO CHECKOUT <ArrowRight className="w-5 h-5" />
            </button>
            
            <p className="text-xs text-gray-400 text-center">
              Powered by Razorpay · Secure Payments
            </p>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>,
    document.body
  );
}
