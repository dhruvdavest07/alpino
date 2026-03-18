import { useState } from 'react';
import { X, Check, Loader2, CreditCard, User, Mail, Phone, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import OrderSuccessModal from './OrderSuccessModal';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Razorpay test key - in production, this comes from backend
// const RAZORPAY_KEY_ID = 'rzp_test_YourTestKeyHere'; // Replace with actual test key

// Load Razorpay script
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'details' | 'payment' | 'processing'>('details');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  const finalAmount = Math.round(totalPrice * 1.05); // Including 5% tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return formData.name && formData.email && formData.phone && formData.address && formData.city && formData.pincode;
  };

  const handleProceedToPayment = () => {
    if (isFormValid()) {
      setStep('payment');
    }
  };

  const handlePayment = async () => {
    setStep('processing');
    
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert('Failed to load payment gateway. Please try again.');
      setStep('payment');
      return;
    }

    // In a real app, you'd call your backend to create an order
    // For demo, we'll simulate the order creation
    // const mockOrderId = 'order_' + Date.now();
    
    // Razorpay options configuration (for when you have a real key)
    // const options = {
    //   key: RAZORPAY_KEY_ID,
    //   amount: finalAmount * 100,
    //   currency: 'INR',
    //   name: 'Alpino Protein Cafe',
    //   description: 'High-protein meals order',
    //   order_id: mockOrderId,
    //   handler: function (response: any) {
    //     setOrderId(response.razorpay_payment_id || 'pay_' + Date.now());
    //     setOrderSuccess(true);
    //     clearCart();
    //   },
    //   prefill: {
    //     name: formData.name,
    //     email: formData.email,
    //     contact: formData.phone,
    //   },
    //   theme: { color: '#E31B23' },
    // };

    // For demo purposes - simulate payment success after 2 seconds
    setTimeout(() => {
      const demoPaymentId = 'pay_' + Date.now();
      setOrderId(demoPaymentId);
      setOrderSuccess(true);
      clearCart();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[180] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-white w-full max-w-lg max-h-[90vh] overflow-auto rounded-xl shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFD900] rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-[#0B0B0D]" />
              </div>
              <div>
                <h3 className="font-display text-lg text-[#0B0B0D]">CHECKOUT</h3>
                <p className="text-xs text-gray-500">Secure payment by Razorpay</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center px-6 py-4 bg-gray-50">
            <div className={`flex items-center gap-2 ${step === 'details' ? 'text-[#E31B23]' : 'text-green-600'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step === 'details' ? 'bg-[#E31B23] text-white' : 'bg-green-100'
              }`}>
                {step === 'details' ? '1' : <Check className="w-4 h-4" />}
              </div>
              <span className="text-sm font-medium">Details</span>
            </div>
            <div className="flex-1 h-px bg-gray-300 mx-4" />
            <div className={`flex items-center gap-2 ${step === 'payment' || step === 'processing' ? 'text-[#E31B23]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step === 'payment' || step === 'processing' ? 'bg-[#E31B23] text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="text-sm font-medium">Payment</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {step === 'details' && (
              <div className="space-y-4">
                <h4 className="font-semibold text-[#0B0B0D] mb-4">Delivery Details</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#E31B23]"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#E31B23]"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#E31B23]"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <textarea 
                        name="address"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        rows={2}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#E31B23]"
                        placeholder="Enter your full address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input 
                        type="text" 
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#E31B23]"
                        placeholder="Mumbai"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                      <input 
                        type="text" 
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#E31B23]"
                        placeholder="400001"
                      />
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-semibold text-sm mb-3">Order Summary</h5>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Items ({items.reduce((a, b) => a + b.quantity, 0)})</span>
                      <span>₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Taxes (5%)</span>
                      <span>₹{Math.round(totalPrice * 0.05)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span className="text-[#E31B23]">₹{finalAmount}</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleProceedToPayment}
                  disabled={!isFormValid()}
                  className="w-full py-4 bg-[#FFD900] text-[#0B0B0D] font-bold text-lg rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  PROCEED TO PAYMENT
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-[#FFD900] rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-10 h-10 text-[#0B0B0D]" />
                  </div>
                  <h4 className="font-display text-xl text-[#0B0B0D] mb-2">Complete Your Payment</h4>
                  <p className="text-gray-600">You'll be redirected to Razorpay's secure payment page</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Amount to Pay</span>
                    <span className="font-display text-2xl text-[#E31B23]">₹{finalAmount}</span>
                  </div>
                  <p className="text-xs text-gray-500">Including all taxes and fees</p>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={handlePayment}
                    className="w-full py-4 bg-[#E31B23] text-white font-bold text-lg rounded-lg hover:bg-[#c41820] transition-colors flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    PAY WITH RAZORPAY
                  </button>
                  
                  <button 
                    onClick={() => setStep('details')}
                    className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back to Details
                  </button>
                </div>

                <div className="flex items-center justify-center gap-4 text-gray-400">
                  <img src="https://razorpay.com/assets/razorpay-logo.svg" alt="Razorpay" className="h-6 opacity-50" />
                  <span className="text-xs">PCI DSS Compliant · 256-bit SSL</span>
                </div>
              </div>
            )}

            {step === 'processing' && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-[#FFD900] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Loader2 className="w-10 h-10 text-[#0B0B0D] animate-spin" />
                </div>
                <h4 className="font-display text-xl text-[#0B0B0D] mb-2">Processing Payment...</h4>
                <p className="text-gray-600">Please do not close this window</p>
                
                <div className="mt-8 p-4 bg-gray-50 rounded-lg max-w-xs mx-auto">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Order ID</span>
                    <span className="font-mono">ORD-{Date.now().toString().slice(-8)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Amount</span>
                    <span className="font-semibold">₹{finalAmount}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Success Modal */}
      <OrderSuccessModal 
        isOpen={orderSuccess} 
        onClose={() => {
          setOrderSuccess(false);
          onClose();
        }} 
        orderId={orderId}
      />
    </>
  );
}
