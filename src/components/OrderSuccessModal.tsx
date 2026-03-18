import { Check, Download, Share2, Home } from 'lucide-react';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

export default function OrderSuccessModal({ isOpen, onClose, orderId }: OrderSuccessModalProps) {
  if (!isOpen) return null;

  const orderDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const orderTime = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      <div className="relative bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Success Header */}
        <div className="bg-gradient-to-br from-[#E31B23] to-[#c41820] p-8 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in">
            <Check className="w-10 h-10 text-[#E31B23]" />
          </div>
          <h2 className="font-display text-2xl text-white mb-2">ORDER PLACED!</h2>
          <p className="text-white/80">Your fuel is being prepared</p>
        </div>

        {/* Order Details */}
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-500 text-sm">Order ID</span>
              <span className="font-mono font-semibold text-[#0B0B0D]">#{orderId.slice(-8).toUpperCase()}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-500 text-sm">Date & Time</span>
              <span className="text-sm">{orderDate}, {orderTime}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Payment ID</span>
              <span className="font-mono text-sm">{orderId}</span>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="flex items-start gap-3 mb-6 p-4 bg-[#FFD900]/10 rounded-lg">
            <div className="w-10 h-10 bg-[#FFD900] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🚚</span>
            </div>
            <div>
              <h4 className="font-semibold text-[#0B0B0D]">Estimated Delivery</h4>
              <p className="text-gray-600 text-sm">25-35 minutes</p>
              <p className="text-xs text-gray-500 mt-1">Andheri West, Mumbai</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button 
              onClick={onClose}
              className="w-full py-3 bg-[#FFD900] text-[#0B0B0D] font-bold rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              BACK TO HOME
            </button>
            
            <div className="flex gap-3">
              <button 
                onClick={() => alert('Receipt download coming soon!')}
                className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                RECEIPT
              </button>
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'My Alpino Order',
                      text: `Just ordered from Alpino Protein Cafe! Order #${orderId.slice(-8).toUpperCase()}`,
                    });
                  } else {
                    alert('Share feature coming soon!');
                  }
                }}
                className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                SHARE
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              Questions? Call us at <span className="text-[#E31B23]">+91 XXXXX XXXXX</span>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes bounce-in {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
