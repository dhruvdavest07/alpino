import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Menu, MapPin, Users, Coffee, ChevronRight, Instagram, Linkedin, 
  Mail, Phone, X, ArrowRight, Check, Flame, ShoppingBag, Gift
} from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import CartDrawer from './components/CartDrawer';

gsap.registerPlugin(ScrollTrigger);

// Color constants
const COLORS = {
  red: '#E31B23',
  black: '#0B0B0D',
  white: '#F6F7F6',
  yellow: '#FFD900',
};

// Menu items data — from Alpino High Protein Menu (final)
const menuItems = [
  // CLUB SANDWICHES / PITA POCKETS
  { id: '1', name: 'COTTAGE CHEESE PROTEIN', description: 'A high-protein, wholesome sandwich offering a balanced, satisfying and flavourful meal experience.', protein: 30, calories: 420, price: 299, image: '/club_sandwich.png', category: 'Club Sandwiches' },
  { id: '2', name: 'HUMMUS & TOFU', description: 'A clean, plant-powered sandwich packed with rich flavours and a healthy protein punch.', protein: 28, calories: 390, price: 299, image: '/club_sandwich.png', category: 'Club Sandwiches' },
  { id: '3', name: 'CALIFORNIA PROTEIN', description: 'A fresh, creamy, high-protein sandwich created for a hearty and nutritious bite.', protein: 26, calories: 410, price: 319, image: '/club_sandwich.png', category: 'Club Sandwiches' },
  { id: '4', name: 'TEX-MEX POWER', description: 'A bold, flavour-packed sandwich with vibrant textures and a satisfying protein-rich profile.', protein: 32, calories: 450, price: 319, image: '/club_sandwich.png', category: 'Club Sandwiches' },

  // WRAPS
  { id: '5', name: 'PEANUT PANEER POWER WRAP', description: 'A wholesome, filling wrap delivering bold flavours and a strong, clean protein hit.', protein: 34, calories: 480, price: 299, image: '/protein_wrap.png', category: 'Wraps' },
  { id: '6', name: 'TOFU MULTIGRAIN BURRITO', description: 'A hearty, nutritious burrito offering balanced flavours and over 40 grams of protein.', protein: 42, calories: 520, price: 329, image: '/protein_wrap.png', category: 'Wraps' },
  { id: '7', name: 'SOUTHWEST AVOCADO WRAP', description: 'A flavourful wrap with a refreshing, protein-forward profile perfect for everyday eating.', protein: 28, calories: 430, price: 319, image: '/protein_wrap.png', category: 'Wraps' },
  { id: '8', name: 'AUSTIN SMOKED JACKFRUIT WRAP', description: 'A smoky, fusion-style wrap bringing deep flavours and a satisfying high-protein meal.', protein: 26, calories: 440, price: 329, image: '/protein_wrap.png', category: 'Wraps' },

  // OPEN SANDWICHES
  { id: '9', name: 'AVOCADO PROTEIN TOAST', description: 'A light, nutritious open toast designed for clean eating and high-protein snacking.', protein: 22, calories: 320, price: 249, image: '/open_sandwich.png', category: 'Open Sandwiches' },
  { id: '10', name: 'TUSCAN SHROOM BRUSCHETTA', description: 'A savoury, comforting open toast with earthy flavours and a balanced protein profile.', protein: 20, calories: 300, price: 249, image: '/open_sandwich.png', category: 'Open Sandwiches' },

  // PRO BOWLS
  { id: '11', name: 'ALPINO MASALA OATS', description: 'A warm, spiced bowl of protein-rich oats perfect for a wholesome start to your day.', protein: 24, calories: 380, price: 249, image: '/pro_bowl.png', category: 'Pro Bowls' },
  { id: '12', name: 'PANEER TIKKA MILLET BOWL', description: 'A wholesome bowl combining balanced nutrition, hearty textures, and a strong protein boost.', protein: 35, calories: 450, price: 329, image: '/pro_bowl.png', category: 'Pro Bowls' },
  { id: '13', name: 'KOREAN GOCHUJANG NUTRELA SOBA BOWL', description: 'A spicy, flavour-forward bowl created for clean energy and high-protein nourishment.', protein: 38, calories: 460, price: 349, image: '/pro_bowl.png', category: 'Pro Bowls' },
  { id: '14', name: 'WHOLE WHEAT PASTA BOWL', description: 'A comforting, high-protein pasta bowl offering satisfying flavours with a wholesome twist.', protein: 30, calories: 480, price: 299, image: '/pro_bowl.png', category: 'Pro Bowls' },
  { id: '15', name: 'PANEER & SPINACH LASAGNE', description: 'A hearty, protein-packed lasagne made for guilt-free indulgence and balanced nutrition.', protein: 32, calories: 490, price: 349, image: '/pro_bowl.png', category: 'Pro Bowls' },
  { id: '16', name: 'DAL MILLET DHOKLIS', description: 'A warm, nourishing bowl crafted for comfort, wellness, and a steady protein supply.', protein: 26, calories: 400, price: 279, image: '/pro_bowl.png', category: 'Pro Bowls' },
  { id: '17', name: 'MOROCCAN SPICY BEAN BOWL', description: 'A vibrant, global-inspired bowl delivering bold flavours and reliable high-protein energy.', protein: 28, calories: 420, price: 299, image: '/pro_bowl.png', category: 'Pro Bowls' },
  { id: '18', name: 'PUNJABI MAKHANI PROTEIN BOWL', description: 'A rich, comforting protein bowl offering familiar flavours with a healthier, balanced approach.', protein: 30, calories: 460, price: 319, image: '/pro_bowl.png', category: 'Pro Bowls' },
  { id: '19', name: 'MEDITERRANEAN PROTEIN BOWL', description: 'A refreshing, flavourful bowl highlighting classic Mediterranean notes with clean, high-protein nourishment.', protein: 32, calories: 430, price: 329, image: '/pro_bowl.png', category: 'Pro Bowls' },

  // SMOOTHIES & BOWLS
  { id: '20', name: 'JAMAICAN JAMMER', description: 'A creamy, energizing smoothie designed for a refreshing boost and sustained wellness.', protein: 24, calories: 280, price: 229, image: '/smoothie_bowl.png', category: 'Smoothies & Bowls' },
  { id: '21', name: 'NEWTON BOWL', description: 'A nutrient-dense smoothie bowl created for balanced energy and wholesome satisfaction.', protein: 28, calories: 320, price: 249, image: '/smoothie_bowl.png', category: 'Smoothies & Bowls' },
  { id: '22', name: 'ESPRESSO BANANA KICK', description: 'A power-packed smoothie delivering instant energy with a bold, high-protein kick.', protein: 26, calories: 300, price: 229, image: '/smoothie_bowl.png', category: 'Smoothies & Bowls' },
  { id: '23', name: 'MATCHA BASIL AVOCADO SMOOTHIE', description: 'A refreshing, antioxidant-rich smoothie crafted for vitality and clean nourishment.', protein: 22, calories: 260, price: 249, image: '/smoothie_bowl.png', category: 'Smoothies & Bowls' },
  { id: '24', name: 'PROTEIN BOBA TEA', description: 'A fun, creamy beverage delivering flavour, energy, and an extra boost of protein.', protein: 20, calories: 240, price: 219, image: '/boba_tea.png', category: 'Smoothies & Bowls' },

  // COOLERS
  { id: '25', name: 'WATERMELON BERRY COOLER', description: 'A refreshing, hydrating cooler offering light sweetness and instant revitalising freshness.', protein: 2, calories: 90, price: 169, image: '/cooler_drink.png', category: 'Coolers' },
  { id: '26', name: 'FRUIT MINGLE COOLER', description: 'A tropical-style cooler with bright, uplifting flavours and naturally vibrant refreshment.', protein: 2, calories: 100, price: 169, image: '/cooler_drink.png', category: 'Coolers' },
  { id: '27', name: 'MINT COFFEE JULEP', description: 'A crisp, energising cooler combining cool freshness with a lively caffeine lift.', protein: 3, calories: 120, price: 189, image: '/cooler_drink.png', category: 'Coolers' },
  { id: '28', name: 'MATCHA ICED TEA', description: 'A calming, revitalising iced tea crafted for clean hydration and gentle daily energy.', protein: 2, calories: 80, price: 179, image: '/cooler_drink.png', category: 'Coolers' },
  { id: '29', name: 'DETOX COOLERS', description: 'Light, cleansing coolers perfect for everyday rejuvenation and mindful hydration.', protein: 1, calories: 60, price: 149, image: '/cooler_drink.png', category: 'Coolers' },
  { id: '30', name: 'COLD BREW TEA', description: 'A smooth, chilled tea offering subtle flavours and refreshing all-day sipping.', protein: 1, calories: 50, price: 159, image: '/cooler_drink.png', category: 'Coolers' },

  // SIDES & DIPS
  { id: '31', name: 'AVOCADO GREEK YOGURT DIP', description: 'A creamy, light dip offering balanced richness with a healthy protein touch.', protein: 8, calories: 120, price: 129, image: '/sides_dips.png', category: 'Sides & Dips' },
  { id: '32', name: 'GARLIC HUMMUS', description: 'A smooth, flavourful dip created for clean snacking and everyday nourishment.', protein: 7, calories: 130, price: 119, image: '/sides_dips.png', category: 'Sides & Dips' },
  { id: '33', name: 'TOMATO PEANUT DIP', description: 'A bold, smoky dip perfect for adding depth to any meal or snack.', protein: 6, calories: 110, price: 119, image: '/sides_dips.png', category: 'Sides & Dips' },
  { id: '34', name: 'SPICY CHIPOTLE DIP', description: 'A fiery, creamy dip delivering bold flavours with a satisfying finish.', protein: 5, calories: 100, price: 119, image: '/sides_dips.png', category: 'Sides & Dips' },
  { id: '35', name: 'ROASTED TOMATO SALSA', description: 'A bright, refreshing salsa offering zesty notes and a crunchy, uplifting bite.', protein: 3, calories: 60, price: 99, image: '/sides_dips.png', category: 'Sides & Dips' },
  { id: '36', name: 'FRESH SALSA', description: 'A crisp, vibrant salsa made for fresh snacking and light, everyday eating.', protein: 2, calories: 45, price: 99, image: '/sides_dips.png', category: 'Sides & Dips' },
  { id: '37', name: 'ROASTED MAKHANAS', description: 'A crunchy, wholesome snack crafted for guilt-free munching and light protein intake.', protein: 9, calories: 150, price: 149, image: '/sides_dips.png', category: 'Sides & Dips' },
  { id: '38', name: 'ROASTED CASHEWS', description: 'A classic, flavourful nut snack offering rich taste and wholesome satisfaction.', protein: 10, calories: 180, price: 149, image: '/sides_dips.png', category: 'Sides & Dips' },
  { id: '39', name: 'AVOCADO CHIPS', description: 'A crisp, clean snack designed for light eating and mindful snacking.', protein: 4, calories: 140, price: 129, image: '/sides_dips.png', category: 'Sides & Dips' },

  // DESSERTS
  { id: '40', name: 'DULCE MUESLI CHEESECAKE', description: 'A creamy, indulgent dessert with a delightful crunch for a balanced sweet bite.', protein: 18, calories: 380, price: 279, image: '/dessert_plate.png', category: 'Desserts' },
  { id: '41', name: 'OVERNIGHT OAT JAR', description: 'A wholesome layered dessert offering refreshing sweetness and steady nourishment.', protein: 20, calories: 320, price: 229, image: '/dessert_plate.png', category: 'Desserts' },
  { id: '42', name: 'PROTEIN WAFFLES & PANCAKES', description: 'A soft, satisfying dessert perfect for a high-protein, feel-good sweet craving.', protein: 25, calories: 400, price: 249, image: '/dessert_plate.png', category: 'Desserts' },
  { id: '43', name: 'PEANUT BUTTER TOAST', description: 'A simple, comforting toast delivering rich flavour and a wholesome, high-energy bite.', protein: 16, calories: 340, price: 199, image: '/dessert_plate.png', category: 'Desserts' },
];

// Toast component
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'info'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] px-6 py-4 rounded-lg flex items-center gap-3 animate-bounce-in ${
      type === 'success' ? 'bg-green-500' : 'bg-[#0B0B0D]'
    }`}>
      {type === 'success' ? <Check className="w-5 h-5 text-white" /> : <Info className="w-5 h-5 text-white" />}
      <span className="text-white font-medium">{message}</span>
    </div>
  );
}

// Info icon component
function Info({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

// Modal component
function Modal({ isOpen, onClose, title, children, size = 'md' }: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white w-full ${sizeClasses[size]} max-h-[90vh] overflow-auto rounded-lg shadow-2xl animate-in zoom-in-95 duration-300`}>
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <h3 className="font-display text-xl text-[#0B0B0D]">{title}</h3>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

// Menu Modal
function MenuModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem, setIsCartOpen } = useCart();
  const [toast, setToast] = useState<string | null>(null);
  
  const categories = ['ALL', 'Club Sandwiches', 'Wraps', 'Open Sandwiches', 'Pro Bowls', 'Smoothies & Bowls', 'Coolers', 'Sides & Dips', 'Desserts'];
  
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ('description' in item && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (item: typeof menuItems[0]) => {
    addItem(item);
    setToast(`${item.name} added to cart!`);
    setTimeout(() => {
      setToast(null);
      onClose();
      setIsCartOpen(true);
    }, 800);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="FUEL MENU" size="xl">
        <p className="text-gray-600 mb-6">Every item macro-counted. Every bite optimized.</p>
        
        {/* Search and Category filters */}
        <div className="flex flex-col gap-4 mb-8">
          <input 
            type="text" 
            placeholder="Search menu items..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#E31B23]"
          />
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-[#E31B23] text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-gray-50 rounded-lg overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img src={item.image} loading="lazy" alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4 flex flex-col h-full">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-bold text-[#0B0B0D] line-clamp-2">{item.name}</h4>
                  <div className="w-4 h-4 shrink-0 rounded-sm border border-green-600 flex items-center justify-center mt-1" title="100% Vegetarian">
                    <div className="w-2 h-2 rounded-full bg-green-600"></div>
                  </div>
                </div>
                {'description' in item && <p className="text-xs text-gray-500 mb-2 line-clamp-2 flex-grow">{item.description}</p>}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3 mt-auto">
                  <span className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-[#E31B23]" />
                    {item.protein}g Protein
                  </span>
                  <span>{item.calories} Cal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl text-[#E31B23]">₹{item.price}</span>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="px-4 py-2 bg-[#FFD900] text-[#0B0B0D] font-semibold text-sm rounded hover:bg-yellow-400 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    ADD
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-6 text-center">
          * Menu varies by location. Nutrition info approximate.
        </p>
      </Modal>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 bg-green-500 text-white rounded-lg flex items-center gap-2 animate-bounce-in">
          <Check className="w-5 h-5" />
          <span className="font-medium">{toast}</span>
        </div>
      )}
    </>
  );
}

// Franchise Modal
function FranchiseModal({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    investment: '20-30L',
    experience: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="FRANCHISE APPLICATION" size="lg">
      <div className="mb-6 p-4 bg-[#F5F5F5] rounded-lg">
        <h4 className="font-semibold text-[#0B0B0D] mb-2">Why Franchise with Alpino?</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Growing health & fitness market</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Strong brand recognition</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Full support: training, marketing, supply chain</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> FOCO model — we run the playbook</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#E31B23]"
              placeholder="John Doe"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#E31B23]"
              placeholder="john@example.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              type="tel" 
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#E31B23]"
              placeholder="+91 XXXXX XXXXX"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#E31B23]"
              placeholder="Mumbai"
              value={formData.city}
              onChange={e => setFormData({...formData, city: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Investment Capacity</label>
          <select 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#E31B23]"
            value={formData.investment}
            onChange={e => setFormData({...formData, investment: e.target.value})}
          >
            <option value="20-30L">₹20-30 Lakhs</option>
            <option value="30-50L">₹30-50 Lakhs</option>
            <option value="50L+">₹50 Lakhs+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Previous Experience</label>
          <textarea 
            rows={3}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#E31B23]"
            placeholder="Tell us about your background..."
            value={formData.experience}
            onChange={e => setFormData({...formData, experience: e.target.value})}
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-4 bg-[#E31B23] text-white font-bold text-lg rounded-lg hover:bg-[#c41820] transition-colors flex items-center justify-center gap-2"
        >
          SUBMIT APPLICATION <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </Modal>
  );
}

// Loyalty Modal
function LoyaltyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="ALPINO CLUB" size="md">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-[#FFD900] rounded-full flex items-center justify-center mx-auto mb-4">
          <Gift className="w-10 h-10 text-[#0B0B0D]" />
        </div>
        <h4 className="font-display text-2xl text-[#0B0B0D] mb-2">Eat Smart. Get Rewarded.</h4>
        <p className="text-gray-600">Join the Alpino Club and start earning today.</p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 bg-[#E31B23] rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
          <div>
            <h5 className="font-semibold text-[#0B0B0D]">Order</h5>
            <p className="text-sm text-gray-600">Order via app or in-store</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 bg-[#E31B23] rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
          <div>
            <h5 className="font-semibold text-[#0B0B0D]">Earn</h5>
            <p className="text-sm text-gray-600">Earn 1 point per ₹10 spent</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 bg-[#E31B23] rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
          <div>
            <h5 className="font-semibold text-[#0B0B0D]">Redeem</h5>
            <p className="text-sm text-gray-600">Get discounts, free items & perks</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-[#FFD900]/20 rounded-lg mb-6">
        <p className="text-sm text-center text-[#0B0B0D]">
          <span className="font-semibold">Powered by FUDR</span> — India's leading loyalty platform
        </p>
      </div>

      <button 
        onClick={onClose}
        className="w-full py-4 bg-[#FFD900] text-[#0B0B0D] font-bold text-lg rounded-lg hover:bg-yellow-400 transition-colors"
      >
        GET THE APP (COMING SOON)
      </button>
    </Modal>
  );
}

// Coming Soon Modal
function ComingSoonModal({ isOpen, onClose, feature }: { isOpen: boolean; onClose: () => void; feature: string }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="COMING SOON" size="sm">
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-[#FFD900] rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8 text-[#0B0B0D]" />
        </div>
        <h4 className="font-display text-xl text-[#0B0B0D] mb-2">{feature}</h4>
        <p className="text-gray-600 mb-6">We're working on something awesome. Stay tuned!</p>
        <button 
          onClick={onClose}
          className="px-8 py-3 bg-[#E31B23] text-white font-semibold rounded-lg hover:bg-[#c41820] transition-colors"
        >
          GOT IT
        </button>
      </div>
    </Modal>
  );
}

// Locations Modal
function LocationsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const locations = [
    { name: 'Andheri West, Mumbai', status: 'Open Now', type: 'Flagship', address: '123 Main Street, Andheri West' },
    { name: 'Surat', status: 'Coming Soon', type: 'New', address: 'Opening Q2 2026' },
    { name: 'Ahmedabad', status: 'Coming Soon', type: 'New', address: 'Opening Q2 2026' },
    { name: 'Bangalore', status: 'Coming Soon', type: 'New', address: 'Opening Q3 2026' },
    { name: 'Pune', status: 'Coming Soon', type: 'New', address: 'Opening Q3 2026' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="FIND YOUR FUEL" size="md">
      <div className="space-y-4">
        {locations.map((loc, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-[#0B0B0D]">{loc.name}</h4>
              <p className="text-sm text-gray-500">{loc.address}</p>
            </div>
            <div className="text-right">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                loc.status === 'Open Now' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {loc.status}
              </span>
              {loc.type === 'Flagship' && (
                <span className="block text-xs text-[#E31B23] mt-1 font-semibold">FLAGSHIP</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

// Navigation with Cart
function Navigation({ 
  onMenuClick, 
  onLocationsClick, 
  onFranchiseClick, 
  onLoyaltyClick, 
  onOrderClick 
}: { 
  onMenuClick: () => void;
  onLocationsClick: () => void;
  onFranchiseClick: () => void;
  onLoyaltyClick: () => void;
  onOrderClick: () => void;
}) {
  const { totalItems, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
      <div 
        className="font-display text-2xl text-white mix-blend-difference cursor-pointer" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ALPINO
      </div>
      
      <div className="hidden md:flex items-center gap-8">
        <button onClick={onMenuClick} className="font-mono text-xs text-white mix-blend-difference tracking-widest hover:opacity-70 transition-opacity">MENU</button>
        <button onClick={onLocationsClick} className="font-mono text-xs text-white mix-blend-difference tracking-widest hover:opacity-70 transition-opacity">LOCATIONS</button>
        <button onClick={onFranchiseClick} className="font-mono text-xs text-white mix-blend-difference tracking-widest hover:opacity-70 transition-opacity">FRANCHISE</button>
        <button onClick={onLoyaltyClick} className="font-mono text-xs text-white mix-blend-difference tracking-widest hover:opacity-70 transition-opacity">LOYALTY</button>
      </div>

      <div className="flex items-center gap-4">
        {/* Cart Button */}
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all"
        >
          <ShoppingBag className="w-5 h-5 text-white" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#FFD900] text-[#0B0B0D] text-xs font-bold rounded-full flex items-center justify-center animate-bounce-in">
              {totalItems}
            </span>
          )}
        </button>

        <button 
          onClick={onOrderClick}
          className="cta-yellow text-sm py-3 px-6 hidden md:block hover:bg-yellow-400 active:scale-95 transition-all"
        >
          ORDER NOW
        </button>
        
        {/* Mobile Hamburger Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden w-12 h-12 bg-[#E31B23] rounded-full flex items-center justify-center text-white"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[96px] bg-[#0B0B0D] flex flex-col items-center justify-center gap-8 md:hidden animate-in fade-in duration-300">
          <button onClick={() => { onMenuClick(); setIsMobileMenuOpen(false); }} className="font-display text-2xl text-white tracking-widest hover:text-[#E31B23] transition-colors">MENU</button>
          <button onClick={() => { onLocationsClick(); setIsMobileMenuOpen(false); }} className="font-display text-2xl text-white tracking-widest hover:text-[#E31B23] transition-colors">LOCATIONS</button>
          <button onClick={() => { onFranchiseClick(); setIsMobileMenuOpen(false); }} className="font-display text-2xl text-white tracking-widest hover:text-[#E31B23] transition-colors">FRANCHISE</button>
          <button onClick={() => { onLoyaltyClick(); setIsMobileMenuOpen(false); }} className="font-display text-2xl text-white tracking-widest hover:text-[#E31B23] transition-colors">LOYALTY</button>
          <button onClick={() => { onOrderClick(); setIsMobileMenuOpen(false); }} className="font-display text-2xl text-[#FFD900] tracking-widest">ORDER NOW</button>
        </div>
      )}
    </nav>
  );
}

// Main App Content
function AppContent() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  
  // Modal states
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [franchiseModalOpen, setFranchiseModalOpen] = useState(false);
  const [loyaltyModalOpen, setLoyaltyModalOpen] = useState(false);
  const [locationsModalOpen, setLocationsModalOpen] = useState(false);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState('');
  
  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const showComingSoon = (feature: string) => {
    setComingSoonFeature(feature);
    setComingSoonOpen(true);
  };

  // Hero load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ delay: 0.2 });
      
      heroTl
        .fromTo('.hero-headline', 
          { y: 40, scale: 0.98, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' }
        )
        .fromTo('.hero-subheadline',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo('.hero-cta',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo('.hero-image',
          { x: '18vw', opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo('.hero-dot',
          { scale: 0 },
          { scale: 1, duration: 0.35, ease: 'back.out(2)' },
          '-=0.3'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven section animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroScrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.section-1',
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set('.hero-headline, .hero-subheadline, .hero-cta', { x: 0, opacity: 1 });
            gsap.set('.hero-image', { x: 0, opacity: 1 });
          }
        }
      });

      heroScrollTl
        .fromTo('.hero-headline, .hero-subheadline, .hero-cta',
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo('.hero-image',
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        );

      if (heroScrollTl.scrollTrigger) triggersRef.current.push(heroScrollTl.scrollTrigger);

      const sections = [
        { selector: '.section-2', textFrom: '-60vw', imageFrom: '60vw', textSide: 'left' },
        { selector: '.section-3', textFrom: '60vw', imageFrom: '-60vw', textSide: 'right' },
        { selector: '.section-4', textFrom: '-60vw', imageFrom: '60vw', textSide: 'left' },
        { selector: '.section-5', textFrom: '60vw', imageFrom: '-60vw', textSide: 'right' },
        { selector: '.section-6', textFrom: '-60vw', imageFrom: '60vw', textSide: 'left' },
        { selector: '.section-7', textFrom: '-60vw', imageFrom: '60vw', textSide: 'left' },
        { selector: '.section-8', textFrom: '60vw', imageFrom: '-60vw', textSide: 'right' },
        { selector: '.section-9', textFrom: '-60vw', imageFrom: '60vw', textSide: 'left' },
        { selector: '.section-10', textFrom: '60vw', imageFrom: '-60vw', textSide: 'right' },
        { selector: '.section-11', textFrom: '-60vw', imageFrom: '60vw', textSide: 'left' },
        { selector: '.section-12', textFrom: '-60vw', imageFrom: '60vw', textSide: 'left' },
      ];

      sections.forEach((section) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section.selector,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            fastScrollEnd: true,
            preventOverlaps: true,
            invalidateOnRefresh: true,
          }
        });

        const textEl = `${section.selector} .section-text`;
        const imageEl = `${section.selector} .section-image`;
        const ctaEl = `${section.selector} .section-cta`;

        tl.fromTo(textEl,
          { x: section.textFrom, opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(imageEl,
          { x: section.imageFrom, opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(ctaEl,
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        );

        const exitX = section.textSide === 'left' ? '-18vw' : '18vw';
        tl.fromTo(textEl,
          { x: 0, opacity: 1 },
          { x: exitX, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(imageEl,
          { x: 0, opacity: 1 },
          { x: section.textSide === 'left' ? '18vw' : '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(ctaEl,
          { y: 0, opacity: 1 },
          { y: '6vh', opacity: 0, ease: 'power2.in' },
          0.7
        );

        if (tl.scrollTrigger) triggersRef.current.push(tl.scrollTrigger);
      });

      const footerTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.section-footer',
          start: 'top 80%',
          end: 'top 55%',
          scrub: 0.5,
        }
      });

      footerTl.fromTo('.footer-content',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' }
      );

      if (footerTl.scrollTrigger) triggersRef.current.push(footerTl.scrollTrigger);

      const allTriggers = ScrollTrigger.getAll();
      const pinnedTriggers = allTriggers.filter(st => st.vars.pin).sort((a, b) => a.start - b.start);
      
      if (pinnedTriggers.length > 0) {
        const maxScroll = ScrollTrigger.maxScroll(window);
        if (maxScroll > 0) {
          const pinnedRanges = pinnedTriggers.map(st => ({
            start: st.start / maxScroll,
            end: (st.end ?? st.start) / maxScroll,
            center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
          }));

          ScrollTrigger.create({
            snap: {
              snapTo: (value: number) => {
                const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
                if (!inPinned) return value;
                
                const target = pinnedRanges.reduce((closest, r) =>
                  Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
                  pinnedRanges[0]?.center ?? 0
                );
                return target;
              },
              duration: { min: 0.15, max: 0.35 },
              delay: 0,
              ease: 'power2.out',
            }
          });
        }
      }
    }, mainRef);

    return () => {
      triggersRef.current.forEach(st => st.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  return (
    <div ref={mainRef} className="relative">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Toast */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Modals */}
      <MenuModal isOpen={menuModalOpen} onClose={() => setMenuModalOpen(false)} />
      <FranchiseModal 
        isOpen={franchiseModalOpen} 
        onClose={() => setFranchiseModalOpen(false)} 
        onSubmit={() => showToast('Application submitted successfully!', 'success')}
      />
      <LoyaltyModal isOpen={loyaltyModalOpen} onClose={() => setLoyaltyModalOpen(false)} />
      <LocationsModal isOpen={locationsModalOpen} onClose={() => setLocationsModalOpen(false)} />
      <ComingSoonModal 
        isOpen={comingSoonOpen} 
        onClose={() => setComingSoonOpen(false)} 
        feature={comingSoonFeature} 
      />

      {/* Navigation */}
      <Navigation 
        onMenuClick={() => setMenuModalOpen(true)}
        onLocationsClick={() => setLocationsModalOpen(true)}
        onFranchiseClick={() => setFranchiseModalOpen(true)}
        onLoyaltyClick={() => setLoyaltyModalOpen(true)}
        onOrderClick={() => showComingSoon('Online Ordering')}
      />

      {/* Section 1: Hero */}
      <section ref={heroRef} className="section-1 section-pinned z-10" style={{ backgroundColor: COLORS.red }}>
        <div className="absolute inset-0 bg-hash-pattern vignette" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="absolute left-[8vw] top-1/2 -translate-y-1/2 max-w-[40vw]">
            <h1 className="hero-headline font-display text-white text-[clamp(48px,6.5vw,96px)] leading-[0.95] mb-6">
              FUEL YOUR<br />DAY
            </h1>
            <p className="hero-subheadline text-white/80 text-lg md:text-xl mb-8 max-w-md">
              High-protein meals. No guesswork.
            </p>
            <button 
              onClick={() => setMenuModalOpen(true)}
              className="hero-cta cta-white"
            >
              ORDER NOW
            </button>
          </div>

          <div className="hero-image image-panel" style={{ right: '6vw', top: '18vh' }}>
            <img src="/pro_bowl.png" alt="Protein Bowl" />
          </div>
        </div>

        <div className="absolute bottom-8 left-8 font-mono text-xs text-white/60 tracking-widest">
          Fuel your day.
        </div>
        <div className="absolute bottom-8 right-8 flex items-center gap-2">
          <span className="font-mono text-xs text-white/60 tracking-widest">Scroll</span>
          <div className="hero-dot w-4 h-4 rounded-full bg-white red-dot-pulse" />
        </div>
      </section>

      {/* Section 2: Fuel Menu */}
      <section id="menu" className="section-2 section-pinned z-20" style={{ backgroundColor: COLORS.black }}>
        <div className="absolute inset-0 bg-hash-pattern vignette" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="section-text absolute left-[8vw] top-1/2 -translate-y-1/2 max-w-[40vw]">
            <h2 className="font-display text-white text-[clamp(44px,6vw,88px)] leading-[0.95] mb-6">
              FUEL<br />MENU
            </h2>
            <p className="text-white/70 text-lg md:text-xl mb-8">
              Sandwiches · Wraps · Bowls · Smoothies · Desserts
            </p>
            <button 
              onClick={() => setMenuModalOpen(true)}
              className="section-cta cta-yellow"
            >
              VIEW MENU
            </button>
          </div>

          <div className="section-image image-panel" style={{ right: '6vw', top: '18vh' }}>
            <img src="/menu_wrap.jpg" alt="Grilled Chicken Wrap" />
          </div>
        </div>

        <div className="absolute bottom-8 left-8 font-mono text-xs text-white/60 tracking-widest">
          Fuel your day.
        </div>
        <div className="absolute bottom-8 right-8 flex items-center gap-2">
          <span className="font-mono text-xs text-white/60 tracking-widest">Scroll</span>
          <div className="w-4 h-4 rounded-full bg-[#E31B23] red-dot-pulse" />
        </div>
      </section>

      {/* Section 3: Clean Nutrition */}
      <section className="section-3 section-pinned z-30" style={{ backgroundColor: COLORS.white }}>
        <div className="absolute inset-0 bg-hash-pattern-dark" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="section-image image-panel" style={{ left: '6vw', top: '18vh' }}>
            <img src="/clean_salad.jpg" alt="Clean Salad" />
          </div>

          <div className="section-text absolute right-[8vw] top-1/2 -translate-y-1/2 max-w-[40vw]">
            <h2 className="font-display text-[#0B0B0D] text-[clamp(44px,6vw,88px)] leading-[0.95] mb-6">
              CLEAN<br />NUTRITION
            </h2>
            <p className="text-[#0B0B0D]/70 text-lg md:text-xl mb-8 max-w-md">
              Real ingredients. No artificial fillers. Every item is built to fit your macros without the junk.
            </p>
            <button 
              onClick={() => showToast('Our ingredients are 100% natural and sourced from trusted suppliers.', 'info')}
              className="section-cta cta-red"
            >
              SEE INGREDIENTS
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-8 font-mono text-xs text-[#0B0B0D]/60 tracking-widest">
          Fuel your day.
        </div>
        <div className="absolute bottom-8 right-8 flex items-center gap-2">
          <span className="font-mono text-xs text-[#0B0B0D]/60 tracking-widest">Scroll</span>
          <div className="w-4 h-4 rounded-full bg-[#E31B23] red-dot-pulse" />
        </div>
      </section>

      {/* Section 4: Macro-Counted Meals */}
      <section className="section-4 section-pinned z-40" style={{ backgroundColor: COLORS.red }}>
        <div className="absolute inset-0 bg-hash-pattern vignette" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="section-text absolute left-[8vw] top-1/2 -translate-y-1/2 max-w-[40vw]">
            <h2 className="font-display text-white text-[clamp(40px,5.5vw,80px)] leading-[0.95] mb-6">
              MACRO-<br />COUNTED<br />MEALS
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-md">
              Protein, carbs, fats, calories—listed clearly. Track without the math.
            </p>
            <button 
              onClick={() => setMenuModalOpen(true)}
              className="section-cta cta-yellow"
            >
              VIEW NUTRITION
            </button>
          </div>

          <div className="section-image image-panel" style={{ right: '6vw', top: '18vh' }}>
            <img src="/open_sandwich.png" alt="Macro Bowl" />
          </div>
        </div>

        <div className="absolute bottom-8 left-8 font-mono text-xs text-white/60 tracking-widest">
          Fuel your day.
        </div>
        <div className="absolute bottom-8 right-8 flex items-center gap-2">
          <span className="font-mono text-xs text-white/60 tracking-widest">Scroll</span>
          <div className="w-4 h-4 rounded-full bg-white red-dot-pulse" />
        </div>
      </section>

      {/* Section 5: High Protein */}
      <section className="section-5 section-pinned z-50" style={{ backgroundColor: COLORS.white }}>
        <div className="absolute inset-0 bg-hash-pattern-dark" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="section-image image-panel" style={{ left: '6vw', top: '18vh' }}>
            <img src="/dessert_plate.png" alt="Protein Pancakes" />
          </div>

          <div className="section-text absolute right-[8vw] top-1/2 -translate-y-1/2 max-w-[40vw]">
            <h2 className="font-display text-[#0B0B0D] text-[clamp(44px,6vw,88px)] leading-[0.95] mb-6">
              HIGH<br />PROTEIN
            </h2>
            <p className="text-[#0B0B0D]/70 text-lg md:text-xl mb-8 max-w-md">
              Designed for gym-goers, athletes, and busy humans who refuse to compromise on nutrition.
            </p>
            <button 
              onClick={() => setMenuModalOpen(true)}
              className="section-cta cta-red"
            >
              EXPLORE MEALS
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-8 font-mono text-xs text-[#0B0B0D]/60 tracking-widest">
          Fuel your day.
        </div>
        <div className="absolute bottom-8 right-8 flex items-center gap-2">
          <span className="font-mono text-xs text-[#0B0B0D]/60 tracking-widest">Scroll</span>
          <div className="w-4 h-4 rounded-full bg-[#E31B23] red-dot-pulse" />
        </div>
      </section>

      {/* Section 6: No Junk */}
      <section className="section-6 section-pinned z-[60]" style={{ backgroundColor: COLORS.red }}>
        <div className="absolute inset-0 bg-hash-pattern vignette" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="section-text absolute left-[8vw] top-1/2 -translate-y-1/2 max-w-[40vw]">
            <h2 className="font-display text-white text-[clamp(44px,6vw,88px)] leading-[0.95] mb-6">
              NO<br />JUNK
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-md">
              No artificial preservatives. No hidden sugars. Just food that performs as hard as you do.
            </p>
            <button 
              onClick={() => showToast('We never use artificial preservatives, colors, or flavors.', 'info')}
              className="section-cta cta-yellow"
            >
              READ OUR STANDARD
            </button>
          </div>

          <div className="section-image image-panel" style={{ right: '6vw', top: '18vh' }}>
            <img src="/smoothie_bowl.png" alt="Clean Smoothie" />
          </div>
        </div>

        <div className="absolute bottom-8 left-8 font-mono text-xs text-white/60 tracking-widest">
          Fuel your day.
        </div>
        <div className="absolute bottom-8 right-8 flex items-center gap-2">
          <span className="font-mono text-xs text-white/60 tracking-widest">Scroll</span>
          <div className="w-4 h-4 rounded-full bg-white red-dot-pulse" />
        </div>
      </section>

      {/* Section 7: Alpino Club */}
      <section id="loyalty" className="section-7 section-pinned z-[70]" style={{ backgroundColor: COLORS.black }}>
        <div className="absolute inset-0 bg-hash-pattern vignette" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="section-text absolute left-[8vw] top-1/2 -translate-y-1/2 max-w-[40vw]">
            <h2 className="font-display text-white text-[clamp(44px,6vw,88px)] leading-[0.95] mb-6">
              ALPINO<br />CLUB
            </h2>
            <p className="text-white/70 text-lg md:text-xl mb-8 max-w-md">
              Earn on every order. Unlock perks, early drops, and members-only fuel.
            </p>
            <button 
              onClick={() => setLoyaltyModalOpen(true)}
              className="section-cta cta-yellow"
            >
              JOIN THE CLUB
            </button>
          </div>

          <div className="section-image image-panel" style={{ right: '6vw', top: '18vh' }}>
            <img src="/club_shake.png" alt="Protein Shake" />
          </div>
        </div>

        <div className="absolute bottom-8 left-8 font-mono text-xs text-white/60 tracking-widest">
          Fuel your day.
        </div>
        <div className="absolute bottom-8 right-8 flex items-center gap-2">
          <span className="font-mono text-xs text-white/60 tracking-widest">Scroll</span>
          <div className="w-4 h-4 rounded-full bg-[#E31B23] red-dot-pulse" />
        </div>
      </section>

      {/* Section 8: Franchise */}
      <section id="franchise" className="section-8 section-pinned z-[80]" style={{ backgroundColor: COLORS.white }}>
        <div className="absolute inset-0 bg-hash-pattern-dark" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="section-image image-panel" style={{ left: '6vw', top: '18vh' }}>
            <img src="/franchise_team.png" alt="Franchise Team" />
          </div>

          <div className="section-text absolute right-[8vw] top-1/2 -translate-y-1/2 max-w-[40vw]">
            <h2 className="font-display text-[#0B0B0D] text-[clamp(44px,6vw,88px)] leading-[0.95] mb-6">
              FRANCHISE
            </h2>
            <p className="text-[#0B0B0D]/70 text-lg md:text-xl mb-8 max-w-md">
              Bring Alpino to your city. Both COCO and FOCO franchise models available with proven systems & high support.
            </p>
            <button 
              onClick={() => setFranchiseModalOpen(true)}
              className="section-cta cta-red"
            >
              APPLY NOW
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-8 font-mono text-xs text-[#0B0B0D]/60 tracking-widest">
          Fuel your day.
        </div>
        <div className="absolute bottom-8 right-8 flex items-center gap-2">
          <span className="font-mono text-xs text-[#0B0B0D]/60 tracking-widest">Scroll</span>
          <div className="w-4 h-4 rounded-full bg-[#E31B23] red-dot-pulse" />
        </div>
      </section>

      {/* Section 9: Find Your Fuel */}
      <section id="locations" className="section-9 section-pinned z-[90]" style={{ backgroundColor: COLORS.red }}>
        <div className="absolute inset-0 bg-hash-pattern vignette" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="section-text absolute left-[8vw] top-1/2 -translate-y-1/2 max-w-[40vw]">
            <h2 className="font-display text-white text-[clamp(44px,6vw,88px)] leading-[0.95] mb-6">
              FIND YOUR<br />FUEL
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-md">
              Flagship open in Andheri West. More cities launching soon.
            </p>
            <button 
              onClick={() => setLocationsModalOpen(true)}
              className="section-cta cta-yellow"
            >
              GET DIRECTIONS
            </button>
          </div>

          <div className="section-image image-panel" style={{ right: '6vw', top: '18vh' }}>
            <img src="/locations_map.png" alt="Locations Map" />
            <div className="absolute bottom-4 left-4 right-4 bg-black/80 p-4">
              <p className="font-mono text-xs text-white/60 mb-2">LOCATIONS</p>
              <ul className="text-white text-sm space-y-1">
                <li>Andheri West (Flagship)</li>
                <li className="text-white/50">Surat — Coming Soon</li>
                <li className="text-white/50">Ahmedabad — Coming Soon</li>
                <li className="text-white/50">Bangalore — Coming Soon</li>
                <li className="text-white/50">Pune — Coming Soon</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-8 font-mono text-xs text-white/60 tracking-widest">
          Fuel your day.
        </div>
        <div className="absolute bottom-8 right-8 flex items-center gap-2">
          <span className="font-mono text-xs text-white/60 tracking-widest">Scroll</span>
          <div className="w-4 h-4 rounded-full bg-white red-dot-pulse" />
        </div>
      </section>

      {/* Section 10: Our Story */}
      <section className="section-10 section-pinned z-[100]" style={{ backgroundColor: COLORS.white }}>
        <div className="absolute inset-0 bg-hash-pattern-dark" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="section-image image-panel" style={{ left: '6vw', top: '18vh' }}>
            <img src="/story_kitchen.png" alt="Our Kitchen" />
          </div>

          <div className="section-text absolute right-[8vw] top-1/2 -translate-y-1/2 max-w-[40vw]">
            <h2 className="font-display text-[#0B0B0D] text-[clamp(44px,6vw,88px)] leading-[0.95] mb-6">
              OUR<br />STORY
            </h2>
            <p className="text-[#0B0B0D]/70 text-lg md:text-xl mb-8 max-w-md">
              Founded 2016 in Surat. Featured on Shark Tank India S1, endorsed by Shilpa Shetty, and building high-protein habits in 15+ countries.
            </p>
            <button 
              onClick={() => showToast('Full story coming to our blog soon!', 'info')}
              className="section-cta cta-red"
            >
              READ MORE
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-8 font-mono text-xs text-[#0B0B0D]/60 tracking-widest">
          Fuel your day.
        </div>
        <div className="absolute bottom-8 right-8 flex items-center gap-2">
          <span className="font-mono text-xs text-[#0B0B0D]/60 tracking-widest">Scroll</span>
          <div className="w-4 h-4 rounded-full bg-[#E31B23] red-dot-pulse" />
        </div>
      </section>

      {/* Section 11: Careers */}
      <section className="section-11 section-pinned z-[110]" style={{ backgroundColor: COLORS.black }}>
        <div className="absolute inset-0 bg-hash-pattern vignette" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="section-text absolute left-[8vw] top-1/2 -translate-y-1/2 max-w-[40vw]">
            <h2 className="font-display text-white text-[clamp(44px,6vw,88px)] leading-[0.95] mb-6">
              CAREERS
            </h2>
            <p className="text-white/70 text-lg md:text-xl mb-8 max-w-md">
              Join a team that moves fast, thinks clear, and builds the future of high-protein food.
            </p>
            <button 
              onClick={() => showComingSoon('Careers Portal')}
              className="section-cta cta-yellow"
            >
              SEE ROLES
            </button>
          </div>

          <div className="section-image image-panel" style={{ right: '6vw', top: '18vh' }}>
            <img src="/careers_team.png" alt="Our Team" />
          </div>
        </div>

        <div className="absolute bottom-8 left-8 font-mono text-xs text-white/60 tracking-widest">
          Fuel your day.
        </div>
        <div className="absolute bottom-8 right-8 flex items-center gap-2">
          <span className="font-mono text-xs text-white/60 tracking-widest">Scroll</span>
          <div className="w-4 h-4 rounded-full bg-[#E31B23] red-dot-pulse" />
        </div>
      </section>

      {/* Section 12: Order Now */}
      <section className="section-12 section-pinned z-[120]" style={{ backgroundColor: COLORS.red }}>
        <div className="absolute inset-0 bg-hash-pattern vignette" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="section-text absolute left-[8vw] top-1/2 -translate-y-1/2 max-w-[40vw]">
            <h2 className="font-display text-white text-[clamp(44px,6vw,88px)] leading-[0.95] mb-6">
              ORDER<br />NOW
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-md">
              Pickup or dine-in. Fresh, fast, and built for your goals.
            </p>
            <button 
              onClick={() => setMenuModalOpen(true)}
              className="section-cta cta-yellow"
            >
              START ORDER
            </button>
          </div>

          <div className="section-image image-panel" style={{ right: '6vw', top: '18vh' }}>
            <img src="/club_sandwich.png" alt="Order Bowl" />
          </div>
        </div>

        <div className="absolute bottom-8 left-8 font-mono text-xs text-white/60 tracking-widest">
          Fuel your day.
        </div>
        <div className="absolute bottom-8 right-8 flex items-center gap-2">
          <span className="font-mono text-xs text-white/60 tracking-widest">Scroll</span>
          <div className="w-4 h-4 rounded-full bg-white red-dot-pulse" />
        </div>
      </section>

      {/* Section 13: Footer */}
      <footer className="section-footer relative z-[130] min-h-[60vh]" style={{ backgroundColor: COLORS.white }}>
        <div className="footer-content px-[6vw] py-16">
          <div className="w-full h-px bg-[#0B0B0D]/20 mb-16" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="font-display text-3xl text-[#0B0B0D] mb-4">ALPINO</h3>
              <p className="text-[#0B0B0D]/60 text-sm mb-6">
                High-protein, macro-friendly fast food for people who refuse to compromise on nutrition.
              </p>
              <div className="flex gap-4">
                <button onClick={() => showComingSoon('Instagram')} className="w-10 h-10 rounded-full bg-[#0B0B0D] flex items-center justify-center hover:bg-[#E31B23] transition-colors">
                  <Instagram className="w-5 h-5 text-white" />
                </button>
                <button onClick={() => showComingSoon('LinkedIn')} className="w-10 h-10 rounded-full bg-[#0B0B0D] flex items-center justify-center hover:bg-[#E31B23] transition-colors">
                  <Linkedin className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-mono text-xs text-[#0B0B0D]/50 tracking-widest mb-4">QUICK LINKS</h4>
              <ul className="space-y-3">
                <li><button onClick={() => setMenuModalOpen(true)} className="text-[#0B0B0D] hover:text-[#E31B23] transition-colors flex items-center gap-2"><Menu className="w-4 h-4" /> Menu</button></li>
                <li><button onClick={() => setLocationsModalOpen(true)} className="text-[#0B0B0D] hover:text-[#E31B23] transition-colors flex items-center gap-2"><MapPin className="w-4 h-4" /> Locations</button></li>
                <li><button onClick={() => setFranchiseModalOpen(true)} className="text-[#0B0B0D] hover:text-[#E31B23] transition-colors flex items-center gap-2"><Users className="w-4 h-4" /> Franchise</button></li>
                <li><button onClick={() => setLoyaltyModalOpen(true)} className="text-[#0B0B0D] hover:text-[#E31B23] transition-colors flex items-center gap-2"><Coffee className="w-4 h-4" /> Loyalty</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs text-[#0B0B0D]/50 tracking-widest mb-4">CONTACT</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-[#0B0B0D]">
                  <Mail className="w-4 h-4 text-[#E31B23]" />
                  hello@alpinoproteincafe.com
                </li>
                <li className="flex items-center gap-2 text-[#0B0B0D]">
                  <Phone className="w-4 h-4 text-[#E31B23]" />
                  +91 XXXXX XXXXX
                </li>
                <li className="text-[#0B0B0D]/60 text-sm mt-4">
                  Mon–Sun: 8am–11pm
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs text-[#0B0B0D]/50 tracking-widest mb-4">STAY UPDATED</h4>
              <p className="text-[#0B0B0D]/60 text-sm mb-4">Get the latest on new menu items and locations.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-4 py-3 bg-[#F5F5F5] text-[#0B0B0D] text-sm outline-none"
                />
                <button 
                  onClick={() => showToast('Thanks for subscribing!', 'success')}
                  className="px-4 py-3 bg-[#E31B23] text-white hover:bg-[#c41820] transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-[#0B0B0D]/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#0B0B0D]/50 text-sm">
              © 2026 Alpino Protein Cafe. All rights reserved.
            </p>
            <p className="font-mono text-xs text-[#0B0B0D]/40 tracking-widest">
              POWERED BY PETPOOJA & FUDR
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// App with CartProvider
function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
