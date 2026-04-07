import re

data = """
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
  { id: '43', name: 'PEANUT BUTTER TOAST', description: 'A simple, comforting toast delivering rich flavour and a wholesome, high-energy bite.', protein: 16, calories: 340, price: 199, image: '/dessert_plate.png', category: 'Desserts' }
"""

pattern = r"name:\s*'([^']+)',\s*description:\s*'([^']+)'"
matches = re.findall(pattern, data)

out = "# Image Generation Prompts for Alpino Menu Items (Nano Banana)\\n\\n"

for i, (name, desc) in enumerate(matches, start=1):
    out += f"## {i}. {name}\\n"
    out += f"**Description:** {desc}\\n\\n"
    
    prompt = f"Food photography, {name}, {desc.lower()} Cafe lighting, high detail, masterpiece, 4k, appetizing, photorealistic --ar 1:1 --stylize 250 nano banana style"
    out += f"**Nano Banana Prompt:**\\n```\\n{prompt}\\n```\\n\\n---\\n\\n"

with open("c:/alpino/nano_banana_prompts.md", "w") as f:
    f.write(out)

print("Python script completed.")
