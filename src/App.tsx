import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Menu, MapPin, Users, Coffee, ChevronRight, Instagram, Linkedin,
  Mail, Phone, X, ArrowRight, Check, Flame, ShoppingBag, Gift,
  Star, Zap, Shield, Leaf, Award, TrendingUp, ChevronDown
} from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import CartDrawer from './components/CartDrawer';

gsap.registerPlugin(ScrollTrigger);

// Menu items data
const menuItems = [
  { id: '1', name: 'COTTAGE CHEESE PROTEIN', description: 'A high-protein, wholesome sandwich offering a balanced, satisfying and flavourful meal experience.', protein: 30, calories: 420, price: 299, image: '/club_sandwich.png', category: 'Club Sandwiches' },
  { id: '2', name: 'HUMMUS & TOFU', description: 'A clean, plant-powered sandwich packed with rich flavours and a healthy protein punch.', protein: 28, calories: 390, price: 299, image: '/club_sandwich.png', category: 'Club Sandwiches' },
  { id: '3', name: 'CALIFORNIA PROTEIN', description: 'A fresh, creamy, high-protein sandwich created for a hearty and nutritious bite.', protein: 26, calories: 410, price: 319, image: '/club_sandwich.png', category: 'Club Sandwiches' },
  { id: '4', name: 'TEX-MEX POWER', description: 'A bold, flavour-packed sandwich with vibrant textures and a satisfying protein-rich profile.', protein: 32, calories: 450, price: 319, image: '/club_sandwich.png', category: 'Club Sandwiches' },
  { id: '5', name: 'PEANUT PANEER POWER WRAP', description: 'A wholesome, filling wrap delivering bold flavours and a strong, clean protein hit.', protein: 34, calories: 480, price: 299, image: '/protein_wrap.png', category: 'Wraps' },
  { id: '6', name: 'TOFU MULTIGRAIN BURRITO', description: 'A hearty, nutritious burrito offering balanced flavours and over 40 grams of protein.', protein: 42, calories: 520, price: 329, image: '/protein_wrap.png', category: 'Wraps' },
  { id: '7', name: 'SOUTHWEST AVOCADO WRAP', description: 'A flavourful wrap with a refreshing, protein-forward profile perfect for everyday eating.', protein: 28, calories: 430, price: 319, image: '/protein_wrap.png', category: 'Wraps' },
  { id: '8', name: 'AUSTIN SMOKED JACKFRUIT WRAP', description: 'A smoky, fusion-style wrap bringing deep flavours and a satisfying high-protein meal.', protein: 26, calories: 440, price: 329, image: '/protein_wrap.png', category: 'Wraps' },
  { id: '9', name: 'AVOCADO PROTEIN TOAST', description: 'A light, nutritious open toast designed for clean eating and high-protein snacking.', protein: 22, calories: 320, price: 249, image: '/open_sandwich.png', category: 'Open Sandwiches' },
  { id: '10', name: 'TUSCAN SHROOM BRUSCHETTA', description: 'A savoury, comforting open toast with earthy flavours and a balanced protein profile.', protein: 20, calories: 300, price: 249, image: '/open_sandwich.png', category: 'Open Sandwiches' },
  { id: '11', name: 'ALPINO MASALA OATS', description: 'A warm, spiced bowl of protein-rich oats perfect for a wholesome start to your day.', protein: 24, calories: 380, price: 249, image: '/pro_bowl.png', category: 'Pro Bowls' },
  { id: '12', name: 'PANEER TIKKA MILLET BOWL', description: 'A wholesome bowl combining balanced nutrition, hearty textures, and a strong protein boost.', protein: 35, calories: 450, price: 329, image: '/pro_bowl.png', category: 'Pro Bowls' },
  { id: '13', name: 'KOREAN GOCHUJANG NUTRELA SOBA BOWL', description: 'A spicy, flavour-forward bowl created for clean energy and high-protein nourishment.', protein: 38, calories: 460, price: 349, image: '/pro_bowl.png', category: 'Pro Bowls' },
  { id: '14', name: 'WHOLE WHEAT PASTA BOWL', description: 'A comforting, high-protein pasta bowl offering satisfying flavours with a wholesome twist.', protein: 30, calories: 480, price: 299, image: '/pro_bowl.png', category: 'Pro Bowls' },
  { id: '15', name: 'PANEER & SPINACH LASAGNE', description: 'A hearty, protein-packed lasagne made for guilt-free indulgence and balanced nutrition.', protein: 32, calories: 490, price: 349, image: '/pro_bowl.png', category: 'Pro Bowls' },
  { id: '16', name: 'DAL MILLET DHOKLIS', description: 'A warm, nourishing bowl crafted for comfort, wellness, and a steady protein supply.', protein: 26, calories: 400, price: 279, image: '/pro_bowl.png', category: 'Pro Bowls' },
  { id: '17', name: 'MOROCCAN SPICY BEAN BOWL', description: 'A vibrant, global-inspired bowl delivering bold flavours and reliable high-protein energy.', protein: 28, calories: 420, price: 299, image: '/pro_bowl.png', category: 'Pro Bowls' },
  { id: '18', name: 'PUNJABI MAKHANI PROTEIN BOWL', description: 'A rich, comforting protein bowl offering familiar flavours with a healthier, balanced approach.', protein: 30, calories: 460, price: 319, image: '/pro_bowl.png', category: 'Pro Bowls' },
  { id: '19', name: 'MEDITERRANEAN PROTEIN BOWL', description: 'A refreshing, flavourful bowl highlighting classic Mediterranean notes with clean, high-protein nourishment.', protein: 32, calories: 430, price: 329, image: '/pro_bowl.png', category: 'Pro Bowls' },
  { id: '20', name: 'JAMAICAN JAMMER', description: 'A creamy, energizing smoothie designed for a refreshing boost and sustained wellness.', protein: 24, calories: 280, price: 229, image: '/smoothie_bowl.png', category: 'Smoothies & Bowls' },
  { id: '21', name: 'NEWTON BOWL', description: 'A nutrient-dense smoothie bowl created for balanced energy and wholesome satisfaction.', protein: 28, calories: 320, price: 249, image: '/smoothie_bowl.png', category: 'Smoothies & Bowls' },
  { id: '22', name: 'ESPRESSO BANANA KICK', description: 'A power-packed smoothie delivering instant energy with a bold, high-protein kick.', protein: 26, calories: 300, price: 229, image: '/smoothie_bowl.png', category: 'Smoothies & Bowls' },
  { id: '23', name: 'MATCHA BASIL AVOCADO SMOOTHIE', description: 'A refreshing, antioxidant-rich smoothie crafted for vitality and clean nourishment.', protein: 22, calories: 260, price: 249, image: '/smoothie_bowl.png', category: 'Smoothies & Bowls' },
  { id: '24', name: 'PROTEIN BOBA TEA', description: 'A fun, creamy beverage delivering flavour, energy, and an extra boost of protein.', protein: 20, calories: 240, price: 219, image: '/boba_tea.png', category: 'Smoothies & Bowls' },
  { id: '25', name: 'WATERMELON BERRY COOLER', description: 'A refreshing, hydrating cooler offering light sweetness and instant revitalising freshness.', protein: 2, calories: 90, price: 169, image: '/cooler_drink.png', category: 'Coolers' },
  { id: '26', name: 'FRUIT MINGLE COOLER', description: 'A tropical-style cooler with bright, uplifting flavours and naturally vibrant refreshment.', protein: 2, calories: 100, price: 169, image: '/cooler_drink.png', category: 'Coolers' },
  { id: '27', name: 'MINT COFFEE JULEP', description: 'A crisp, energising cooler combining cool freshness with a lively caffeine lift.', protein: 3, calories: 120, price: 189, image: '/cooler_drink.png', category: 'Coolers' },
  { id: '28', name: 'MATCHA ICED TEA', description: 'A calming, revitalising iced tea crafted for clean hydration and gentle daily energy.', protein: 2, calories: 80, price: 179, image: '/cooler_drink.png', category: 'Coolers' },
  { id: '29', name: 'DETOX COOLERS', description: 'Light, cleansing coolers perfect for everyday rejuvenation and mindful hydration.', protein: 1, calories: 60, price: 149, image: '/cooler_drink.png', category: 'Coolers' },
  { id: '30', name: 'COLD BREW TEA', description: 'A smooth, chilled tea offering subtle flavours and refreshing all-day sipping.', protein: 1, calories: 50, price: 159, image: '/cooler_drink.png', category: 'Coolers' },
  { id: '31', name: 'AVOCADO GREEK YOGURT DIP', description: 'A creamy, light dip offering balanced richness with a healthy protein touch.', protein: 8, calories: 120, price: 129, image: '/sides_dips.png', category: 'Sides & Dips' },
  { id: '32', name: 'GARLIC HUMMUS', description: 'A smooth, flavourful dip created for clean snacking and everyday nourishment.', protein: 7, calories: 130, price: 119, image: '/sides_dips.png', category: 'Sides & Dips' },
  { id: '33', name: 'TOMATO PEANUT DIP', description: 'A bold, smoky dip perfect for adding depth to any meal or snack.', protein: 6, calories: 110, price: 119, image: '/sides_dips.png', category: 'Sides & Dips' },
  { id: '34', name: 'SPICY CHIPOTLE DIP', description: 'A fiery, creamy dip delivering bold flavours with a satisfying finish.', protein: 5, calories: 100, price: 119, image: '/sides_dips.png', category: 'Sides & Dips' },
  { id: '35', name: 'ROASTED TOMATO SALSA', description: 'A bright, refreshing salsa offering zesty notes and a crunchy, uplifting bite.', protein: 3, calories: 60, price: 99, image: '/sides_dips.png', category: 'Sides & Dips' },
  { id: '36', name: 'FRESH SALSA', description: 'A crisp, vibrant salsa made for fresh snacking and light, everyday eating.', protein: 2, calories: 45, price: 99, image: '/sides_dips.png', category: 'Sides & Dips' },
  { id: '37', name: 'ROASTED MAKHANAS', description: 'A crunchy, wholesome snack crafted for guilt-free munching and light protein intake.', protein: 9, calories: 150, price: 149, image: '/sides_dips.png', category: 'Sides & Dips' },
  { id: '38', name: 'ROASTED CASHEWS', description: 'A classic, flavourful nut snack offering rich taste and wholesome satisfaction.', protein: 10, calories: 180, price: 149, image: '/sides_dips.png', category: 'Sides & Dips' },
  { id: '39', name: 'AVOCADO CHIPS', description: 'A crisp, clean snack designed for light eating and mindful snacking.', protein: 4, calories: 140, price: 129, image: '/sides_dips.png', category: 'Sides & Dips' },
  { id: '40', name: 'DULCE MUESLI CHEESECAKE', description: 'A creamy, indulgent dessert with a delightful crunch for a balanced sweet bite.', protein: 18, calories: 380, price: 279, image: '/dessert_plate.png', category: 'Desserts' },
  { id: '41', name: 'OVERNIGHT OAT JAR', description: 'A wholesome layered dessert offering refreshing sweetness and steady nourishment.', protein: 20, calories: 320, price: 229, image: '/dessert_plate.png', category: 'Desserts' },
  { id: '42', name: 'PROTEIN WAFFLES & PANCAKES', description: 'A soft, satisfying dessert perfect for a high-protein, feel-good sweet craving.', protein: 25, calories: 400, price: 249, image: '/dessert_plate.png', category: 'Desserts' },
  { id: '43', name: 'PEANUT BUTTER TOAST', description: 'A simple, comforting toast delivering rich flavour and a wholesome, high-energy bite.', protein: 16, calories: 340, price: 199, image: '/dessert_plate.png', category: 'Desserts' },
];

const featuredItems = menuItems.filter(i => ['6', '12', '13', '20', '42'].includes(i.id));

const testimonials = [
  { name: 'Priya M.', role: 'Fitness Coach', text: 'Alpino changed my meal prep game. 35g protein in a wrap? No brainer.', rating: 5 },
  { name: 'Arjun K.', role: 'Software Engineer', text: 'Finally a cafe that gets macros. I eat here 4 times a week.', rating: 5 },
  { name: 'Simran T.', role: 'Yoga Instructor', text: 'Clean food that actually tastes incredible. The smoothie bowls are next level.', rating: 5 },
  { name: 'Rahul D.', role: 'College Athlete', text: 'Best protein food I have found. The Korean Soba Bowl is unreal.', rating: 5 },
];

const stats = [
  { label: 'Menu Items', value: '43+', icon: Coffee },
  { label: 'Avg Protein', value: '30g', icon: Flame },
  { label: 'Countries', value: '15+', icon: TrendingUp },
  { label: 'Pure Veg', value: '100%', icon: Leaf },
];

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Toast Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'info'; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] px-6 py-4 rounded-full flex items-center gap-3 animate-bounce-in ${type === 'success' ? 'bg-green-500' : 'bg-[#0B0B0D]'}`}>
      {type === 'success' ? <Check className="w-5 h-5 text-white" /> : <InfoIcon className="w-5 h-5 text-white" />}
      <span className="text-white font-medium">{message}</span>
    </div>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Modal Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function Modal({ isOpen, onClose, title, children, size = 'md' }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  if (!isOpen) return null;
  const s = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white w-full ${s[size]} max-h-[90vh] overflow-auto rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300`}>
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <h3 className="font-display text-xl text-[#0B0B0D]">{title}</h3>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Menu Modal Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function MenuModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem, setIsCartOpen } = useCart();
  const [toast, setToast] = useState<string | null>(null);
  const categories = ['ALL', 'Club Sandwiches', 'Wraps', 'Open Sandwiches', 'Pro Bowls', 'Smoothies & Bowls', 'Coolers', 'Sides & Dips', 'Desserts'];
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const handleAddToCart = (item: typeof menuItems[0]) => {
    addItem(item); setToast(`${item.name} added!`);
    setTimeout(() => { setToast(null); onClose(); setIsCartOpen(true); }, 800);
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Fuel Menu" size="xl">
        <p className="text-gray-500 mb-6 font-body">Every item macro-counted. Every bite optimized.</p>
        <div className="flex flex-col gap-4 mb-8">
          <input type="text" placeholder="Search menu items..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full md:w-1/2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#DC2626] transition-colors" />
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${activeCategory === cat ? 'bg-[#DC2626] text-white shadow-lg shadow-red-500/25' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{cat}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden group hover:shadow-2xl hover:border-red-100 transition-all duration-300 cursor-pointer flex flex-col">
              <div className="h-48 overflow-hidden"><img src={item.image} loading="lazy" alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /></div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-bold text-[#0B0B0D]">{item.name}</h4>
                  <div className="w-4 h-4 shrink-0 rounded-sm border border-green-600 flex items-center justify-center mt-1"><div className="w-2 h-2 rounded-full bg-green-600"></div></div>
                </div>
                <p className="text-xs text-gray-500 mb-2 line-clamp-2 flex-grow">{item.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3 mt-auto">
                  <span className="flex items-center gap-1"><Flame className="w-4 h-4 text-[#DC2626]" />{item.protein}g</span>
                  <span>{item.calories} Cal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body font-bold text-xl text-[#DC2626]">₹{item.price}</span>
                  <button onClick={() => handleAddToCart(item)} className="px-4 py-2 cta-gold text-sm !py-2 !px-4 !rounded-lg flex items-center gap-2"><ShoppingBag className="w-4 h-4" />Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-6 text-center">* Menu varies by location. Nutrition info approximate.</p>
      </Modal>
      {toast && <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 bg-green-500 text-white rounded-full flex items-center gap-2 animate-bounce-in"><Check className="w-5 h-5" /><span className="font-medium">{toast}</span></div>}
    </>
  );
}
// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Franchise Modal Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function FranchiseModal({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: () => void }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', city: '', investment: '20-30L', experience: '' });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSubmit(); onClose(); };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Franchise Application" size="lg">
      <div className="mb-6 p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl">
        <h4 className="font-semibold text-[#0B0B0D] mb-2">Why Franchise with Alpino?</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Growing health & fitness market</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Strong brand recognition</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Full support: training, marketing, supply chain</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> COCO model â€” we run the playbook</li>
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label><input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#DC2626]" placeholder="Your Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#DC2626]" placeholder="you@email.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="tel" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#DC2626]" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">City</label><input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#DC2626]" placeholder="Mumbai" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} /></div>
        </div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Investment Capacity</label>
          <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#DC2626]" value={formData.investment} onChange={e => setFormData({ ...formData, investment: e.target.value })}>
            <option value="20-30L">₹20-30 Lakhs</option><option value="30-50L">₹30-50 Lakhs</option><option value="50L+">₹50 Lakhs+</option>
          </select>
        </div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Experience</label><textarea rows={3} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#DC2626]" placeholder="Tell us about your background..." value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} /></div>
        <button type="submit" className="w-full py-4 cta-primary text-lg flex items-center justify-center gap-2">Submit Application <ArrowRight className="w-5 h-5" /></button>
      </form>
    </Modal>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Loyalty Modal Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function LoyaltyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Alpino Club" size="md">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/30"><Gift className="w-10 h-10 text-white" /></div>
        <h4 className="font-display text-2xl text-[#0B0B0D] mb-2">Eat Smart. Get Rewarded.</h4>
        <p className="text-gray-600">Join the Alpino Club and start earning today.</p>
      </div>
      <div className="space-y-4 mb-6">
        {[{ n: '1', t: 'Order', d: 'Order via app or in-store' }, { n: '2', t: 'Earn', d: 'Earn 1 point per ₹10 spent' }, { n: '3', t: 'Redeem', d: 'Get discounts, free items & perks' }].map(s => (
          <div key={s.n} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
            <div className="w-8 h-8 bg-[#DC2626] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">{s.n}</div>
            <div><h5 className="font-semibold text-[#0B0B0D]">{s.t}</h5><p className="text-sm text-gray-600">{s.d}</p></div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-amber-50 rounded-2xl mb-6"><p className="text-sm text-center text-[#0B0B0D]"><span className="font-semibold">Powered by FUDR</span> â€” India's leading loyalty platform</p></div>
      <button onClick={onClose} className="w-full py-4 cta-gold text-lg cursor-pointer">Get The App (Coming Soon)</button>
    </Modal>
  );
}

// â”€â”€â”€ Locations Modal â”€â”€â”€
function LocationsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const locations = [
    { name: 'Surat', status: 'Open Now', type: 'Flagship', address: 'Pragati Marg, inside Kratos Club, nr. BAGHBAN CIRCLE, Adajan Gam, Pal Gam, Surat, Gujarat 394510' },
    { name: 'Ahmedabad', status: 'Coming Soon', type: 'New', address: 'Opening Q2 2026' },
    { name: 'Andheri West, Mumbai', status: 'Coming Soon', type: 'New', address: 'Opening Q3 2026' },
    { name: 'Bangalore', status: 'Coming Soon', type: 'New', address: 'Opening Q3 2026' },
    { name: 'Pune', status: 'Coming Soon', type: 'New', address: 'Opening Q3 2026' },
  ];
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Find Your Fuel" size="md">
      <div className="space-y-4">
        {locations.map((loc, i) => (
          <div key={i} className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer">
            <div><h4 className="font-semibold text-[#0B0B0D]">{loc.name}</h4><p className="text-sm text-gray-500">{loc.address}</p></div>
            <div className="text-right">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${loc.status === 'Open Now' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>{loc.status}</span>
              {loc.type === 'Flagship' && <span className="block text-xs text-[#DC2626] mt-1 font-semibold">FLAGSHIP</span>}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Coming Soon Modal Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function ComingSoonModal({ isOpen, onClose, feature }: { isOpen: boolean; onClose: () => void; feature: string }) {
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Coming Soon" size="sm">
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"><ShoppingBag className="w-8 h-8 text-white" /></div>
        <h4 className="font-display text-xl text-[#0B0B0D] mb-2">{feature}</h4>
        <p className="text-gray-600 mb-6">We're working on something awesome. Stay tuned!</p>
        <button onClick={onClose} className="px-8 py-3 cta-primary cursor-pointer">Got It</button>
      </div>
    </Modal>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Animated Counter Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const num = parseInt(target.replace(/\D/g, '')) || 0;
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: el, start: 'top 80%',
        onEnter: () => { gsap.to(obj, { val: num, duration: 2, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; } }); },
        once: true,
      });
    });
    return () => ctx.revert();
  }, [num, suffix]);
  return <span ref={ref} className="tabular-nums">0{suffix}</span>;
}
// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Navigation Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function Navigation({ onMenuClick, onLocationsClick, onFranchiseClick, onLoyaltyClick, onOrderClick }: { onMenuClick: () => void; onLocationsClick: () => void; onFranchiseClick: () => void; onLoyaltyClick: () => void; onOrderClick: () => void }) {
  const { totalItems, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav className={`fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-6 md:px-8 py-3 rounded-2xl transition-all duration-500 ${scrolled ? 'bg-[#0B0B0D]/95 backdrop-blur-xl shadow-2xl shadow-black/20 border border-white/5' : 'bg-[#0B0B0D]/60 backdrop-blur-md border border-white/10'}`}>
      <div className="font-display text-2xl text-white cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Alpino</div>
      <div className="hidden md:flex items-center gap-8">
        {[{ l: 'Menu', f: onMenuClick }, { l: 'Locations', f: onLocationsClick }, { l: 'Franchise', f: onFranchiseClick }, { l: 'Loyalty', f: onLoyaltyClick }].map(n => (
          <button key={n.l} onClick={n.f} className="text-sm text-white/80 tracking-wide hover:text-white transition-colors cursor-pointer font-body font-semibold">{n.l}</button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => setIsCartOpen(true)} className="relative w-11 h-11 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
          <ShoppingBag className="w-5 h-5 text-white" />
          {totalItems > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#DC2626] text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce-in">{totalItems}</span>}
        </button>
        <button onClick={onOrderClick} className="cta-gold text-sm !py-2.5 !px-5 hidden md:block">Order Now</button>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden w-11 h-11 bg-[#DC2626] rounded-full flex items-center justify-center text-white cursor-pointer">
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[76px] bg-[#0B0B0D]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
          {[{ l: 'Menu', f: onMenuClick }, { l: 'Locations', f: onLocationsClick }, { l: 'Franchise', f: onFranchiseClick }, { l: 'Loyalty', f: onLoyaltyClick }].map(n => (
            <button key={n.l} onClick={() => { n.f(); setIsMobileMenuOpen(false); }} className="font-display text-3xl text-white hover:text-[#DC2626] transition-colors cursor-pointer">{n.l}</button>
          ))}
          <button onClick={() => { onOrderClick(); setIsMobileMenuOpen(false); }} className="font-display text-3xl shimmer-text cursor-pointer">Order Now</button>
        </div>
      )}
    </nav>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Main AppContent Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function AppContent() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [franchiseModalOpen, setFranchiseModalOpen] = useState(false);
  const [loyaltyModalOpen, setLoyaltyModalOpen] = useState(false);
  const [locationsModalOpen, setLocationsModalOpen] = useState(false);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const showToast = useCallback((message: string, type: 'success' | 'info' = 'info') => { setToast({ message, type }); setTimeout(() => setToast(null), 3000); }, []);
  const showComingSoon = (feature: string) => { setComingSoonFeature(feature); setComingSoonOpen(true); };

  // GSAP section reveals
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      const heroTl = gsap.timeline({ delay: 0.3 });
      heroTl
        .fromTo('.hero-title-line', { y: 80, opacity: 0, skewY: 4 }, { y: 0, opacity: 1, skewY: 0, duration: 1, stagger: 0.15, ease: 'power4.out' })
        .fromTo('.hero-subtitle', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .fromTo('.hero-cta-group', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .fromTo('.hero-image-main', { scale: 0.8, opacity: 0, rotation: -5 }, { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: 'power3.out' }, '-=0.8')
        .fromTo('.hero-image-float', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' }, '-=0.5')
        .fromTo('.hero-scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2');

      // Section reveals on scroll
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => {
        const items = section.querySelectorAll('.reveal-item');
        gsap.fromTo(items, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%', once: true }
        });
      });

      // Parallax images
      gsap.utils.toArray<HTMLElement>('.parallax-img').forEach(img => {
        gsap.fromTo(img, { y: -50 }, { y: 50, scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: 1 } });
      });

      // Bento card stagger
      ScrollTrigger.create({
        trigger: '.bento-section',
        start: 'top 70%',
        once: true,
        onEnter: () => {
          gsap.fromTo('.bento-card', { y: 80, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' });
        }
      });

      // Testimonial section
      ScrollTrigger.create({
        trigger: '.testimonial-section',
        start: 'top 70%',
        once: true,
        onEnter: () => {
          gsap.fromTo('.testimonial-card', { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' });
        }
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative">
      <div className="grain-overlay" />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <CartDrawer />
      <MenuModal isOpen={menuModalOpen} onClose={() => setMenuModalOpen(false)} />
      <FranchiseModal isOpen={franchiseModalOpen} onClose={() => setFranchiseModalOpen(false)} onSubmit={() => showToast('Application submitted!', 'success')} />
      <LoyaltyModal isOpen={loyaltyModalOpen} onClose={() => setLoyaltyModalOpen(false)} />
      <LocationsModal isOpen={locationsModalOpen} onClose={() => setLocationsModalOpen(false)} />
      <ComingSoonModal isOpen={comingSoonOpen} onClose={() => setComingSoonOpen(false)} feature={comingSoonFeature} />
      <Navigation onMenuClick={() => setMenuModalOpen(true)} onLocationsClick={() => setLocationsModalOpen(true)} onFranchiseClick={() => setFranchiseModalOpen(true)} onLoyaltyClick={() => setLoyaltyModalOpen(true)} onOrderClick={() => setMenuModalOpen(true)} />

      {/* ═══ SECTION 1: HERO ═══ */}
      <section className="snap-section min-h-screen bg-mesh-hero flex items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#DC2626] rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#CA8A04] rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="overflow-hidden mb-2"><p className="hero-title-line font-mono text-sm text-[#CA8A04] tracking-[0.3em] mb-4">INDIA'S HIGH-PROTEIN CAFE</p></div>
            <div className="overflow-hidden"><h1 className="hero-title-line font-display text-white text-[clamp(48px,8vw,110px)] leading-[0.9] mb-2">Fuel</h1></div>
            <div className="overflow-hidden"><h1 className="hero-title-line font-display text-white text-[clamp(48px,8vw,110px)] leading-[0.9] mb-2">Your</h1></div>
            <div className="overflow-hidden"><h1 className="hero-title-line font-display shimmer-text text-[clamp(48px,8vw,110px)] leading-[0.9] mb-8">Day</h1></div>
            <p className="hero-subtitle text-white/60 text-lg md:text-xl max-w-md mb-10 font-body leading-relaxed">
              Macro-counted, chef-crafted meals with 30g+ protein. No junk. No compromise. Just real food that performs.
            </p>
            <div className="hero-cta-group flex flex-wrap gap-4">
              <button onClick={() => setMenuModalOpen(true)} className="cta-primary text-lg cursor-pointer flex items-center gap-2">Explore Menu <ArrowRight className="w-5 h-5" /></button>
              <button onClick={() => setLocationsModalOpen(true)} className="cta-outline text-lg cursor-pointer flex items-center gap-2"><MapPin className="w-5 h-5" /> Find Us</button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="hero-image-main relative z-10">
              <div className="w-[420px] h-[420px] mx-auto rounded-full overflow-hidden border-4 border-white/10 shadow-2xl shadow-red-900/30">
                <img src="/pro_bowl.png" alt="Signature Protein Bowl" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="hero-image-float absolute -top-4 -right-4 w-32 h-32 rounded-2xl overflow-hidden shadow-xl border-2 border-white/10 animate-float">
              <img src="/smoothie_bowl.png" alt="Smoothie" className="w-full h-full object-cover" />
            </div>
            <div className="hero-image-float absolute -bottom-6 -left-6 w-36 h-36 rounded-2xl overflow-hidden shadow-xl border-2 border-white/10 animate-float-delayed">
              <img src="/protein_wrap.png" alt="Wrap" className="w-full h-full object-cover" />
            </div>
            <div className="hero-image-float absolute top-1/2 -right-10 w-28 h-28 rounded-2xl overflow-hidden shadow-xl border-2 border-white/10 animate-float" style={{ animationDelay: '1s' }}>
              <img src="/dessert_plate.png" alt="Dessert" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/40 text-xs tracking-widest font-body">SCROLL</span>
          <ChevronDown className="w-5 h-5 text-white/40 animate-bounce" />
        </div>
      </section>

      {/* ═══ SECTION 2: MARQUEE STATS ═══ */}
      <section className="bg-[#0B0B0D] border-y border-white/5 py-5 overflow-hidden">
        <div className="animate-marquee flex items-center gap-16 whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-16">
              {['43+ Menu Items', '30g+ Avg Protein', '100% Vegetarian', 'Shark Tank Featured', 'Macro-Counted', 'No Artificial Junk', '15+ Countries'].map((s, j) => (
                <span key={j} className="flex items-center gap-3 text-white/50 font-body font-semibold text-sm tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />{s}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 3: FEATURED MENU CAROUSEL ═══ */}
      <section className="snap-section bg-gradient-warm py-24 md:py-32 reveal-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="reveal-item text-center mb-16">
            <p className="font-mono text-sm text-[#DC2626] tracking-[0.3em] mb-4">SIGNATURE PICKS</p>
            <h2 className="font-display text-[#0B0B0D] text-[clamp(36px,5vw,72px)] leading-[0.95] mb-4">Chef's Favourites</h2>
            <p className="text-gray-500 text-lg max-w-lg mx-auto font-body">Our most-ordered, highest-rated protein-packed creations.</p>
          </div>
          <div className="horizontal-scroll-container gap-6 pb-4 reveal-item">
            {featuredItems.map((item) => (
              <div key={item.id} className="horizontal-scroll-item w-[340px] md:w-[380px] bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer border border-gray-100">
                <div className="h-56 overflow-hidden relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                    <Flame className="w-4 h-4 text-[#DC2626]" /><span className="text-sm font-bold text-[#0B0B0D]">{item.protein}g</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-[#0B0B0D] text-lg">{item.name}</h3>
                    <div className="w-4 h-4 shrink-0 rounded-sm border border-green-600 flex items-center justify-center mt-1"><div className="w-2 h-2 rounded-full bg-green-600"></div></div>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl text-[#DC2626]">₹{item.price}</span>
                    <button onClick={() => setMenuModalOpen(true)} className="px-5 py-2.5 cta-gold !text-sm !py-2 !rounded-xl flex items-center gap-2 cursor-pointer"><ShoppingBag className="w-4 h-4" /> Order</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 reveal-item">
            <button onClick={() => setMenuModalOpen(true)} className="cta-primary cursor-pointer flex items-center gap-2 mx-auto">View Full Menu <ArrowRight className="w-5 h-5" /></button>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: BENTO GRID ═══ */}
      <section className="snap-section bg-[#0B0B0D] py-24 md:py-32 bento-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="font-mono text-sm text-[#CA8A04] tracking-[0.3em] mb-4">THE ALPINO DIFFERENCE</p>
            <h2 className="font-display text-white text-[clamp(36px,5vw,72px)] leading-[0.95]">Why We're Different</h2>
          </div>
          <div className="bento-grid">
            <div className="bento-card bento-item bento-large bg-gradient-to-br from-[#DC2626] to-[#991B1B] text-white relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-700" />
              <Flame className="w-12 h-12 mb-6 text-white/80" />
              <h3 className="font-display text-3xl md:text-4xl mb-3">Macro Counted</h3>
              <p className="text-white/70 text-lg font-body leading-relaxed">Every item lists protein, carbs, fats, and calories. Track your goals without guesswork.</p>
            </div>
            <div className="bento-card bento-item bg-[#1a1a1f] text-white border border-white/5">
              <Shield className="w-10 h-10 mb-4 text-[#CA8A04]" />
              <h3 className="font-display text-xl mb-2">No Junk</h3>
              <p className="text-white/50 font-body">Zero artificial preservatives, colors, or flavors. Just real food.</p>
            </div>
            <div className="bento-card bento-item bg-[#1a1a1f] text-white border border-white/5">
              <Leaf className="w-10 h-10 mb-4 text-green-400" />
              <h3 className="font-display text-xl mb-2">100% Veg</h3>
              <p className="text-white/50 font-body">Every single item on our menu is purely vegetarian.</p>
            </div>
            <div className="bento-card bento-item bg-gradient-to-br from-[#CA8A04] to-[#A16207] text-white col-span-1 md:col-span-2">
              <Zap className="w-10 h-10 mb-4" />
              <h3 className="font-display text-2xl mb-2">High Protein</h3>
              <p className="text-white/70 font-body">30g+ average protein per meal. Designed for athletes, gym-goers, and health-conscious humans.</p>
            </div>
            <div className="bento-card bento-item bg-[#1a1a1f] text-white border border-white/5 col-span-1 md:col-span-2">
              <Award className="w-10 h-10 mb-4 text-[#F87171]" />
              <h3 className="font-display text-2xl mb-2">Shark Tank Featured</h3>
              <p className="text-white/50 font-body">Endorsed by Shilpa Shetty. Featured on Shark Tank India Season 1. Building protein habits in 15+ countries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: FULL-BLEED DIVIDER ═══ */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img src="/club_sandwich.png" alt="Fresh Food" className="parallax-img w-full h-[120%] object-cover absolute -top-[10%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 h-full flex items-center px-6 md:px-12 max-w-7xl mx-auto">
          <div className="max-w-lg">
            <h2 className="font-display text-white text-[clamp(36px,5vw,64px)] leading-[0.95] mb-4">Food That Works As Hard As You</h2>
            <p className="text-white/60 text-lg font-body mb-8">Crafted by chefs, approved by nutritionists, devoured by everyone.</p>
            <button onClick={() => setMenuModalOpen(true)} className="cta-gold cursor-pointer">See The Menu</button>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: STATS ═══ */}
      <section className="snap-section bg-gradient-warm py-24 md:py-32 reveal-section">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="reveal-item text-center group cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                  <s.icon className="w-7 h-7 text-[#DC2626]" />
                </div>
                <div className="font-display text-4xl md:text-5xl text-[#0B0B0D] mb-1">
                  <AnimatedCounter target={s.value} suffix={s.value.includes('+') ? '+' : s.value.includes('%') ? '%' : 'g'} />
                </div>
                <p className="text-gray-500 font-body font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7: OUR STORY ═══ */}
      <section className="snap-section bg-[#0B0B0D] py-24 md:py-32 reveal-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal-item relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-red-900/20 border border-white/5">
              <img src="/story_kitchen.png" alt="Alpino Kitchen" className="w-full h-[400px] md:h-[500px] object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#DC2626] rounded-2xl p-6 shadow-xl">
              <p className="font-display text-white text-3xl">2016</p>
              <p className="text-white/70 text-sm font-body">Founded in Surat</p>
            </div>
          </div>
          <div className="reveal-item">
            <p className="font-mono text-sm text-[#CA8A04] tracking-[0.3em] mb-4">OUR STORY</p>
            <h2 className="font-display text-white text-[clamp(36px,5vw,56px)] leading-[0.95] mb-6">From Surat To The World</h2>
            <p className="text-white/50 text-lg font-body leading-relaxed mb-8">
              Founded in 2016, Alpino started with a simple belief: high-protein food should taste amazing. Featured on Shark Tank India Season 1, endorsed by Shilpa Shetty, we're now building healthy protein habits in 15+ countries.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[{ v: '15+', l: 'Countries' }, { v: 'S1', l: 'Shark Tank' }, { v: '2016', l: 'Founded' }].map((s, i) => (
                <div key={i} className="glass-card p-4 text-center">
                  <p className="font-display text-2xl text-white mb-1">{s.v}</p>
                  <p className="text-white/40 text-sm font-body">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 8: LOCATIONS --- */}
      <section className="snap-section bg-gradient-warm py-24 md:py-32 reveal-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="reveal-item text-center mb-16">
            <p className="font-mono text-sm text-[#DC2626] tracking-[0.3em] mb-4">FIND US</p>
            <h2 className="font-display text-[#0B0B0D] text-[clamp(36px,5vw,72px)] leading-[0.95] mb-4">Find Your Fuel</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="reveal-item md:col-span-1 bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all cursor-pointer" onClick={() => setLocationsModalOpen(true)}>
              <div className="w-4 h-4 rounded-full bg-green-500 glow-dot mb-4 shadow-lg shadow-green-500/50" />
              <h3 className="font-display text-2xl text-[#0B0B0D] mb-2">Surat</h3>
              <p className="text-sm text-gray-500 font-body mb-1">Gujarat ” Flagship</p>
              <p className="text-sm font-semibold text-green-600">Open Now</p>
            </div>
            {['Mumbai', 'Ahmedabad', 'Bangalore', 'Pune'].map((c, i) => (
              <div key={c} className="reveal-item bg-white/60 rounded-3xl p-8 border border-gray-200 hover:bg-white hover:shadow-lg transition-all cursor-pointer" onClick={() => setLocationsModalOpen(true)}>
                <div className="w-3 h-3 rounded-full bg-gray-300 mb-4" />
                <h3 className="font-display text-xl text-[#0B0B0D] mb-2">{c}</h3>
                <p className="text-sm text-gray-400 font-body">Q{i < 2 ? 2 : 3} 2026</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 9: FRANCHISE --- */}
      <section className="snap-section bg-gradient-red py-24 md:py-32 relative overflow-hidden reveal-section">
        <div className="absolute inset-0 opacity-10"><div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[120px]" /></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="reveal-item">
            <p className="font-mono text-sm text-white/60 tracking-[0.3em] mb-4">FRANCHISE</p>
            <h2 className="font-display text-white text-[clamp(36px,5vw,64px)] leading-[0.95] mb-6">Bring Alpino To Your City</h2>
            <p className="text-white/60 text-lg font-body leading-relaxed mb-8">COCO franchise models with proven systems, full training, marketing, and supply chain support.</p>
            <button onClick={() => setFranchiseModalOpen(true)} className="cta-gold cursor-pointer flex items-center gap-2">Apply Now <ArrowRight className="w-5 h-5" /></button>
          </div>
          <div className="reveal-item grid grid-cols-2 gap-4">
            {[{ v: '₹20L+', l: 'Investment' }, { v: 'COCO', l: 'Model' }, { v: 'Full', l: 'Training' }, { v: '360°', l: 'Support' }].map((s, i) => (
              <div key={i} className="glass-card p-6 text-center hover:bg-white/15 transition-colors cursor-pointer">
                <p className="font-body font-bold text-2xl text-white mb-1">{s.v}</p>
                <p className="text-white/50 text-sm font-body">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 10: LOYALTY ═══ */}
      <section className="snap-section bg-[#0B0B0D] py-24 md:py-32 reveal-section">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <div className="reveal-item">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-500/30 animate-float"><Gift className="w-10 h-10 text-white" /></div>
            <p className="font-mono text-sm text-[#CA8A04] tracking-[0.3em] mb-4">ALPINO CLUB</p>
            <h2 className="font-display text-white text-[clamp(36px,5vw,64px)] leading-[0.95] mb-6">Eat Smart. Get Rewarded.</h2>
            <p className="text-white/50 text-lg font-body mb-12 max-w-lg mx-auto">Earn on every order. Unlock perks, early drops, and members-only fuel.</p>
          </div>
          <div className="reveal-item flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
            {[{ n: '1', t: 'Order', d: 'via app or in-store' }, { n: '2', t: 'Earn', d: '1 point per ₹10' }, { n: '3', t: 'Redeem', d: 'discounts & perks' }].map((step, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#DC2626] rounded-full flex items-center justify-center text-white font-display text-xl shadow-lg shadow-red-500/30">{step.n}</div>
                  <h4 className="text-white font-bold mt-3">{step.t}</h4>
                  <p className="text-white/40 text-sm font-body">{step.d}</p>
                </div>
                {i < 2 && <div className="hidden md:block w-16 h-px bg-gradient-to-r from-[#DC2626] to-[#CA8A04]" />}
              </div>
            ))}
          </div>
          <div className="reveal-item"><button onClick={() => setLoyaltyModalOpen(true)} className="cta-gold cursor-pointer">Learn More</button></div>
        </div>
      </section>

      {/* ═══ SECTION 11: TESTIMONIALS ═══ */}
      <section className="snap-section bg-gradient-warm py-24 md:py-32 testimonial-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="font-mono text-sm text-[#DC2626] tracking-[0.3em] mb-4">REVIEWS</p>
            <h2 className="font-display text-[#0B0B0D] text-[clamp(36px,5vw,64px)] leading-[0.95]">What People Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <div className="flex gap-1 mb-4">{Array(t.rating).fill(0).map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                <p className="text-gray-700 font-body mb-6 leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#DC2626] to-[#F87171] rounded-full flex items-center justify-center text-white font-bold text-sm">{t.name[0]}</div>
                  <div><p className="font-bold text-[#0B0B0D] text-sm">{t.name}</p><p className="text-gray-400 text-xs">{t.role}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 12: FINAL CTA ═══ */}
      <section className="snap-section bg-gradient-red relative overflow-hidden py-32 md:py-40 flex items-center justify-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#CA8A04] rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h2 className="font-display text-white text-[clamp(48px,10vw,120px)] leading-[0.9] mb-8">Fuel Your Day</h2>
          <p className="text-white/60 text-xl font-body mb-10 max-w-lg mx-auto">Pickup or dine-in. Fresh, fast, and built for your goals.</p>
          <button onClick={() => setMenuModalOpen(true)} className="cta-gold text-xl cursor-pointer !py-5 !px-10 flex items-center gap-3 mx-auto shadow-2xl shadow-amber-500/30">Start Your Order <ArrowRight className="w-6 h-6" /></button>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-[#0B0B0D] text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="section-divider mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <h3 className="font-display text-3xl mb-4">Alpino</h3>
              <p className="text-white/40 text-sm font-body mb-6 leading-relaxed">High-protein, macro-friendly fast food for people who refuse to compromise.</p>
              <div className="flex gap-3">
                <button onClick={() => showComingSoon('Instagram')} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#DC2626] transition-all cursor-pointer"><Instagram className="w-5 h-5" /></button>
                <button onClick={() => showComingSoon('LinkedIn')} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#DC2626] transition-all cursor-pointer"><Linkedin className="w-5 h-5" /></button>
              </div>
            </div>
            <div>
              <h4 className="font-mono text-xs text-white/30 tracking-widest mb-4">QUICK LINKS</h4>
              <ul className="space-y-3">
                <li><button onClick={() => setMenuModalOpen(true)} className="text-white/60 hover:text-white transition-colors flex items-center gap-2 cursor-pointer font-body"><Menu className="w-4 h-4" /> Menu</button></li>
                <li><button onClick={() => setLocationsModalOpen(true)} className="text-white/60 hover:text-white transition-colors flex items-center gap-2 cursor-pointer font-body"><MapPin className="w-4 h-4" /> Locations</button></li>
                <li><button onClick={() => setFranchiseModalOpen(true)} className="text-white/60 hover:text-white transition-colors flex items-center gap-2 cursor-pointer font-body"><Users className="w-4 h-4" /> Franchise</button></li>
                <li><button onClick={() => setLoyaltyModalOpen(true)} className="text-white/60 hover:text-white transition-colors flex items-center gap-2 cursor-pointer font-body"><Coffee className="w-4 h-4" /> Loyalty</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-xs text-white/30 tracking-widest mb-4">CONTACT</h4>
              <ul className="space-y-3 font-body">
                <li className="flex items-center gap-2 text-white/60"><Mail className="w-4 h-4 text-[#DC2626]" /> hello@alpinoproteincafe.com</li>
                <li className="flex items-center gap-2 text-white/60"><Phone className="w-4 h-4 text-[#DC2626]" /> +91 XXXXX XXXXX</li>
                <li className="text-white/30 text-sm mt-4">Mon-Sun: 8am-11pm</li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-xs text-white/30 tracking-widest mb-4">STAY UPDATED</h4>
              <p className="text-white/40 text-sm font-body mb-4">Get the latest on new menu items and locations.</p>
              <div className="flex rounded-xl overflow-hidden border border-white/10">
                <input type="email" placeholder="Your email" className="flex-1 px-4 py-3 bg-white/5 text-white text-sm outline-none placeholder-white/30 font-body" />
                <button onClick={() => showToast('Thanks for subscribing!', 'success')} className="px-4 py-3 bg-[#DC2626] hover:bg-[#991B1B] transition-colors cursor-pointer"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>
          </div>
          <div className="section-divider mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-sm font-body">© 2026 Alpino Protein Cafe. All rights reserved.</p>
            <p className="font-mono text-xs text-white/20 tracking-widest">Powered by Petpooja & FUDR</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (<CartProvider><AppContent /></CartProvider>);
}

export default App;
