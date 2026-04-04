import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Menu, X, ArrowRight, Check,
  ShoppingBag, Gift
} from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import HeroSection from './components/HeroSection';
import MenuSection from './components/MenuSection';
import BentoSection from './components/BentoSection';
import DividerSection from './components/DividerSection';
import StatsSection from './components/StatsSection';
import StorySection from './components/StorySection';
import LocationSection from './components/LocationSection';
import FranchiseSection from './components/FranchiseSection';
import LoyaltySection from './components/LoyaltySection';
import TestimonialsSection from './components/TestimonialsSection';
import FinalCtaSection from './components/FinalCtaSection';
import FooterSection from './components/FooterSection';

gsap.registerPlugin(ScrollTrigger);

// ═══ Menu Data ═══
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

// ═══ Toast ═══
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'info'; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] px-6 py-4 rounded-full flex items-center gap-3 animate-bounce-in ${type === 'success' ? 'bg-green-500' : 'bg-[#1A1612]'}`}>
      <Check className="w-5 h-5 text-white" />
      <span className="text-white font-medium font-body">{message}</span>
    </div>
  );
}

// ═══ Modal ═══
function Modal({ isOpen, onClose, title, children, size = 'md' }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  if (!isOpen) return null;
  const s = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${s[size]} max-h-[90vh] overflow-auto rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300`} style={{ background: 'var(--earth)' }}>
        <div className="sticky top-0 border-b px-6 py-4 flex items-center justify-between z-10" style={{ background: 'var(--earth)', borderColor: 'var(--mist)' }}>
          <h3 className="font-display text-xl" style={{ color: 'var(--cream)' }}>{title}</h3>
          <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer" style={{ background: 'var(--mist)' }}>
            <X className="w-5 h-5" style={{ color: 'var(--cream)' }} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ═══ Menu Modal ═══
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
        <p className="font-body text-sm mb-6" style={{ color: 'rgba(245,237,216,0.5)' }}>Every item macro-counted. Every bite optimized.</p>
        <div className="flex flex-col gap-4 mb-8">
          <input type="text" placeholder="Search menu items..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full md:w-1/2 px-4 py-3 rounded-xl focus:outline-none font-body text-sm" style={{ background: 'var(--mist)', border: '1px solid var(--mist)', color: 'var(--cream)' }} />
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer font-mono tracking-wider ${activeCategory === cat ? 'text-[#0A0908]' : 'hover:opacity-80'}`} style={{ background: activeCategory === cat ? 'var(--gold)' : 'var(--mist)', color: activeCategory === cat ? 'var(--void)' : 'rgba(245,237,216,0.5)' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="menu-card group flex flex-col">
              <div className="h-44 overflow-hidden relative">
                <img src={item.image} loading="lazy" alt={item.name} className="menu-card-image w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612] via-transparent to-transparent" />
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full" style={{ background: 'var(--ember)' }}>
                  <span className="font-mono text-[9px] text-white font-bold">{item.protein}g</span>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h4 className="font-display text-sm mb-1" style={{ color: 'var(--cream)' }}>{item.name}</h4>
                <p className="text-xs mb-3 line-clamp-2 flex-grow font-body" style={{ color: 'rgba(245,237,216,0.4)' }}>{item.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-body font-bold text-lg" style={{ color: 'var(--gold)' }}>₹{item.price}</span>
                  <button onClick={() => handleAddToCart(item)} className="px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold cursor-pointer transition-all duration-300 hover:scale-105" style={{ background: 'var(--gold)', color: 'var(--void)' }}>
                    <ShoppingBag className="w-3 h-3" />Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="font-mono text-[10px] mt-6 text-center" style={{ color: 'rgba(245,237,216,0.3)' }}>* Menu varies by location. Nutrition info approximate.</p>
      </Modal>
      {toast && <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 bg-green-500 text-white rounded-full flex items-center gap-2 animate-bounce-in"><Check className="w-5 h-5" /><span className="font-medium font-body">{toast}</span></div>}
    </>
  );
}

// ═══ Franchise Modal ═══
function FranchiseModal({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: () => void }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', city: '', investment: '20-30L', experience: '' });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSubmit(); onClose(); };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Franchise Application" size="lg">
      <div className="mb-6 p-4 rounded-2xl" style={{ background: 'var(--mist)' }}>
        <h4 className="font-body font-semibold mb-2" style={{ color: 'var(--cream)' }}>Why Franchise with Alpino?</h4>
        <ul className="text-sm space-y-1">
          {['Growing health & fitness market', 'Strong brand recognition', 'Full support: training, marketing, supply chain', 'COCO model — we run the playbook'].map(t => (
            <li key={t} className="flex items-center gap-2 font-body" style={{ color: 'rgba(245,237,216,0.6)' }}><Check className="w-4 h-4" style={{ color: 'var(--sage)' }} />{t}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-xs font-mono mb-1" style={{ color: 'rgba(245,237,216,0.4)' }}>FULL NAME</label><input type="text" required className="w-full px-4 py-3 rounded-xl focus:outline-none font-body" style={{ background: 'var(--mist)', border: '1px solid var(--mist)', color: 'var(--cream)' }} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
          <div><label className="block text-xs font-mono mb-1" style={{ color: 'rgba(245,237,216,0.4)' }}>EMAIL</label><input type="email" required className="w-full px-4 py-3 rounded-xl focus:outline-none font-body" style={{ background: 'var(--mist)', border: '1px solid var(--mist)', color: 'var(--cream)' }} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-xs font-mono mb-1" style={{ color: 'rgba(245,237,216,0.4)' }}>PHONE</label><input type="tel" required className="w-full px-4 py-3 rounded-xl focus:outline-none font-body" style={{ background: 'var(--mist)', border: '1px solid var(--mist)', color: 'var(--cream)' }} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} /></div>
          <div><label className="block text-xs font-mono mb-1" style={{ color: 'rgba(245,237,216,0.4)' }}>CITY</label><input type="text" required className="w-full px-4 py-3 rounded-xl focus:outline-none font-body" style={{ background: 'var(--mist)', border: '1px solid var(--mist)', color: 'var(--cream)' }} value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} /></div>
        </div>
        <div><label className="block text-xs font-mono mb-1" style={{ color: 'rgba(245,237,216,0.4)' }}>INVESTMENT CAPACITY</label>
          <select className="w-full px-4 py-3 rounded-xl focus:outline-none font-body" style={{ background: 'var(--mist)', border: '1px solid var(--mist)', color: 'var(--cream)' }} value={formData.investment} onChange={e => setFormData({ ...formData, investment: e.target.value })}>
            <option value="20-30L">₹20-30 Lakhs</option><option value="30-50L">₹30-50 Lakhs</option><option value="50L+">₹50 Lakhs+</option>
          </select>
        </div>
        <div><label className="block text-xs font-mono mb-1" style={{ color: 'rgba(245,237,216,0.4)' }}>EXPERIENCE</label><textarea rows={3} className="w-full px-4 py-3 rounded-xl focus:outline-none font-body" style={{ background: 'var(--mist)', border: '1px solid var(--mist)', color: 'var(--cream)' }} value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} /></div>
        <button type="submit" className="w-full py-4 cta-gold text-lg flex items-center justify-center gap-2 cursor-pointer">Submit Application <ArrowRight className="w-5 h-5" /></button>
      </form>
    </Modal>
  );
}

// ═══ Loyalty Modal ═══
function LoyaltyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Alpino Club" size="md">
      <div className="text-center mb-6">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ background: 'linear-gradient(135deg, var(--gold), var(--peanut))', boxShadow: '0 15px 30px rgba(232,184,75,0.3)' }}><Gift className="w-10 h-10" style={{ color: 'var(--void)' }} /></div>
        <h4 className="font-display text-2xl mb-2" style={{ color: 'var(--cream)' }}>Eat Smart. Get Rewarded.</h4>
        <p className="font-body" style={{ color: 'rgba(245,237,216,0.6)' }}>Join the Alpino Club and start earning today.</p>
      </div>
      <div className="space-y-4 mb-6">
        {[{ n: '1', t: 'Order', d: 'Order via app or in-store' }, { n: '2', t: 'Earn', d: 'Earn 1 point per ₹10 spent' }, { n: '3', t: 'Redeem', d: 'Get discounts, free items & perks' }].map(s => (
          <div key={s.n} className="flex items-start gap-4 p-4 rounded-2xl" style={{ background: 'var(--mist)' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ background: 'var(--peanut)', color: 'white' }}>{s.n}</div>
            <div><h5 className="font-semibold font-body" style={{ color: 'var(--cream)' }}>{s.t}</h5><p className="text-sm font-body" style={{ color: 'rgba(245,237,216,0.5)' }}>{s.d}</p></div>
          </div>
        ))}
      </div>
      <div className="p-4 rounded-2xl mb-6" style={{ background: 'var(--mist)' }}><p className="text-sm text-center font-body" style={{ color: 'rgba(245,237,216,0.6)' }}><span className="font-semibold">Powered by FUDR</span> — India's leading loyalty platform</p></div>
      <button onClick={onClose} className="w-full py-4 cta-gold text-lg cursor-pointer">Get The App (Coming Soon)</button>
    </Modal>
  );
}

// ═══ Locations Modal ═══
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
          <div key={i} className="p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all duration-300 hover:translate-x-1" style={{ background: 'var(--mist)' }}>
            <div><h4 className="font-body font-semibold" style={{ color: 'var(--cream)' }}>{loc.name}</h4><p className="text-sm font-body" style={{ color: 'rgba(245,237,216,0.4)' }}>{loc.address}</p></div>
            <div className="text-right">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold font-mono ${loc.status === 'Open Now' ? '' : ''}`} style={{ background: loc.status === 'Open Now' ? 'rgba(139,175,124,0.2)' : 'var(--mist)', color: loc.status === 'Open Now' ? 'var(--sage)' : 'rgba(245,237,216,0.5)' }}>{loc.status}</span>
              {loc.type === 'Flagship' && <span className="block text-xs mt-1 font-semibold font-mono" style={{ color: 'var(--gold)' }}>FLAGSHIP</span>}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

// ═══ Coming Soon Modal ═══
function ComingSoonModal({ isOpen, onClose, feature }: { isOpen: boolean; onClose: () => void; feature: string }) {
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Coming Soon" size="sm">
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ background: 'linear-gradient(135deg, var(--gold), var(--peanut))' }}><ShoppingBag className="w-8 h-8" style={{ color: 'var(--void)' }} /></div>
        <h4 className="font-display text-xl mb-2" style={{ color: 'var(--cream)' }}>{feature}</h4>
        <p className="font-body mb-6" style={{ color: 'rgba(245,237,216,0.6)' }}>We're working on something awesome. Stay tuned!</p>
        <button onClick={onClose} className="px-8 py-3 cta-gold cursor-pointer">Got It</button>
      </div>
    </Modal>
  );
}

// ═══ Marquee Strip ═══
function MarqueeStrip() {
  return (
    <section style={{ background: 'var(--earth)', borderTop: '1px solid var(--mist)', borderBottom: '1px solid var(--mist)' }} className="py-5 overflow-hidden">
      <div className="animate-marquee flex items-center gap-16 whitespace-nowrap">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-16">
            {['43+ Menu Items', '30g+ Avg Protein', '100% Vegetarian', 'Shark Tank Featured', 'Macro-Counted', 'No Artificial Junk', '15+ Countries'].map((s, j) => (
              <span key={j} className="flex items-center gap-3 font-body font-semibold text-sm tracking-wide" style={{ color: 'rgba(245,237,216,0.4)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)' }} />{s}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══ Navigation ═══
function Navigation({ onMenuClick, onLocationsClick, onFranchiseClick, onLoyaltyClick, onOrderClick }: { onMenuClick: () => void; onLocationsClick: () => void; onFranchiseClick: () => void; onLoyaltyClick: () => void; onOrderClick: () => void }) {
  const { totalItems, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const navLinks = [
    { l: 'Menu', f: onMenuClick },
    { l: 'Locations', f: onLocationsClick },
    { l: 'Franchise', f: onFranchiseClick },
    { l: 'Loyalty', f: onLoyaltyClick },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center justify-between px-6 md:px-8 transition-all duration-400" style={{ background: scrolled ? 'rgba(26,22,18,0.9)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid var(--mist)' : '1px solid transparent' }}>
      {/* Logo */}
      <div className="font-display text-2xl cursor-pointer" style={{ color: 'var(--cream)' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        Alpino
      </div>

      {/* Center links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map(n => (
          <button key={n.l} onClick={n.f} className="nav-link font-body text-xs uppercase tracking-[3px] cursor-pointer transition-colors duration-300 hover:text-[#E8B84B]" style={{ color: 'rgba(245,237,216,0.7)' }}>
            {n.l.split('').map((char, ci) => (
              <span key={ci} className="nav-link-letter" style={{ animationDelay: `${ci * 30}ms` }}>{char}</span>
            ))}
          </button>
        ))}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button onClick={() => setIsCartOpen(true)} className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer" style={{ background: 'var(--mist)' }}>
          <ShoppingBag className="w-4 h-4" style={{ color: 'var(--cream)' }} />
          {totalItems > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 text-xs font-bold rounded-full flex items-center justify-center animate-bounce-in" style={{ background: 'var(--ember)', color: 'white' }}>{totalItems}</span>}
        </button>
        <button onClick={onOrderClick} className="cta-nav-pill hidden md:block cursor-pointer">Order Now</button>
        {/* Mobile hamburger */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden w-10 h-10 rounded-full flex items-center justify-center cursor-pointer" style={{ background: 'var(--gold)', color: 'var(--void)' }}>
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu-panel fixed inset-0 top-[60px] flex flex-col items-center justify-center gap-8 md:hidden ${isMobileMenuOpen ? 'open' : ''}`} style={{ background: 'rgba(10,9,8,0.98)' }}>
        {navLinks.map((n, i) => (
          <button key={n.l} onClick={() => { n.f(); setIsMobileMenuOpen(false); }} className="font-display text-3xl cursor-pointer transition-colors hover:text-[#E8B84B]" style={{ color: 'var(--cream)', animationDelay: `${i * 60}ms` }}>
            {n.l}
          </button>
        ))}
        <button onClick={() => { onOrderClick(); setIsMobileMenuOpen(false); }} className="font-display text-3xl shimmer-text cursor-pointer">Order Now</button>
      </div>
    </nav>
  );
}

// ═══ Main AppContent ═══
function AppContent() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [franchiseModalOpen, setFranchiseModalOpen] = useState(false);
  const [loyaltyModalOpen, setLoyaltyModalOpen] = useState(false);
  const [locationsModalOpen, setLocationsModalOpen] = useState(false);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [loaded, setLoaded] = useState(false);
  const { addItem, setIsCartOpen } = useCart();

  const showToast = useCallback((message: string, type: 'success' | 'info' = 'info') => { setToast({ message, type }); setTimeout(() => setToast(null), 3000); }, []);
  const showComingSoon = (feature: string) => { setComingSoonFeature(feature); setComingSoonOpen(true); };

  const handleOrderItem = (item: typeof menuItems[0]) => {
    addItem(item);
    showToast(`${item.name} added!`, 'success');
    setTimeout(() => setIsCartOpen(true), 500);
  };

  // GSAP animations
  useEffect(() => {
    if (!loaded) return;
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

      // Section reveals
      gsap.utils.toArray<HTMLElement>('.reveal-item').forEach((item) => {
        gsap.fromTo(item, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 80%', once: true }
        });
      });

      // Parallax images
      gsap.utils.toArray<HTMLElement>('.parallax-img').forEach(img => {
        gsap.fromTo(img, { y: -50 }, { y: 50, scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: 1 } });
      });

      // Bento card stagger
      ScrollTrigger.create({
        trigger: '.bento-section', start: 'top 70%', once: true,
        onEnter: () => { gsap.fromTo('.bento-card', { y: 80, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' }); }
      });
    }, mainRef);
    return () => ctx.revert();
  }, [loaded]);

  return (
    <div ref={mainRef} className="relative">
      {!loaded && <PageLoader onComplete={() => setLoaded(true)} />}
      <CustomCursor />
      <div className="grain-overlay" />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <CartDrawer />
      <MenuModal isOpen={menuModalOpen} onClose={() => setMenuModalOpen(false)} />
      <FranchiseModal isOpen={franchiseModalOpen} onClose={() => setFranchiseModalOpen(false)} onSubmit={() => showToast('Application submitted!', 'success')} />
      <LoyaltyModal isOpen={loyaltyModalOpen} onClose={() => setLoyaltyModalOpen(false)} />
      <LocationsModal isOpen={locationsModalOpen} onClose={() => setLocationsModalOpen(false)} />
      <ComingSoonModal isOpen={comingSoonOpen} onClose={() => setComingSoonOpen(false)} feature={comingSoonFeature} />
      <Navigation onMenuClick={() => setMenuModalOpen(true)} onLocationsClick={() => setLocationsModalOpen(true)} onFranchiseClick={() => setFranchiseModalOpen(true)} onLoyaltyClick={() => setLoyaltyModalOpen(true)} onOrderClick={() => setMenuModalOpen(true)} />

      <HeroSection onMenuClick={() => setMenuModalOpen(true)} onLocationsClick={() => setLocationsModalOpen(true)} />
      <MarqueeStrip />
      <MenuSection items={featuredItems} onMenuClick={() => setMenuModalOpen(true)} onOrderItem={handleOrderItem} />
      <BentoSection />
      <DividerSection onMenuClick={() => setMenuModalOpen(true)} />
      <StatsSection />
      <StorySection />
      <LocationSection onLocationsClick={() => setLocationsModalOpen(true)} />
      <FranchiseSection onFranchiseClick={() => setFranchiseModalOpen(true)} />
      <LoyaltySection onLoyaltyClick={() => setLoyaltyModalOpen(true)} />
      <TestimonialsSection />
      <FinalCtaSection onMenuClick={() => setMenuModalOpen(true)} />
      <FooterSection
        onMenuClick={() => setMenuModalOpen(true)}
        onLocationsClick={() => setLocationsModalOpen(true)}
        onFranchiseClick={() => setFranchiseModalOpen(true)}
        onLoyaltyClick={() => setLoyaltyModalOpen(true)}
        onSubscribe={() => showToast('Thanks for subscribing!', 'success')}
        showComingSoon={showComingSoon}
      />
    </div>
  );
}

function App() {
  return (<CartProvider><AppContent /></CartProvider>);
}

export default App;
