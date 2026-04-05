// ─── Medicines ────────────────────────────────────────────────────────────────
export const medicines = [
  { id: 1,  name: 'Vitamin C 1000mg',       category: 'vitamins',  price: 12.99, rating: 4.8, reviews: 342, image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&q=80', desc: 'Immune support & antioxidant protection',     inStock: true  },
  { id: 2,  name: 'Vitamin D3 5000 IU',     category: 'vitamins',  price: 15.49, rating: 4.9, reviews: 518, image: 'https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?w=400&q=80', desc: 'Bone health & immune system support',          inStock: true  },
  { id: 3,  name: 'Omega-3 Fish Oil',       category: 'vitamins',  price: 24.99, rating: 4.7, reviews: 289, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80', desc: 'Heart & brain health support',                inStock: true  },
  { id: 4,  name: 'Ibuprofen 400mg',        category: 'pain',      price: 8.99,  rating: 4.6, reviews: 721, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=80', desc: 'Fast-acting pain & fever relief',             inStock: true  },
  { id: 5,  name: 'Paracetamol 500mg',      category: 'pain',      price: 6.49,  rating: 4.5, reviews: 934, image: 'https://images.unsplash.com/photo-1558483861-6e4ded5394ce?w=400&q=80', desc: 'Gentle pain relief & fever reducer',          inStock: true  },
  { id: 6,  name: 'Nasal Spray',            category: 'cold',      price: 11.29, rating: 4.4, reviews: 203, image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&q=80', desc: 'Instant nasal congestion relief',             inStock: true  },
  { id: 7,  name: 'Cold & Flu Relief',      category: 'cold',      price: 14.99, rating: 4.6, reviews: 445, image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&q=80', desc: 'Multi-symptom cold & flu formula',            inStock: false },
  { id: 8,  name: 'Probiotic 50 Billion',   category: 'digestive', price: 32.99, rating: 4.8, reviews: 267, image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&q=80', desc: 'Gut health & digestive balance',              inStock: true  },
  { id: 9,  name: 'Antacid Tablets',        category: 'digestive', price: 9.99,  rating: 4.3, reviews: 189, image: 'https://images.unsplash.com/photo-1550572017-37b3ef6c527e?w=400&q=80', desc: 'Fast heartburn & acid relief',                inStock: true  },
  { id: 10, name: 'Aspirin 100mg',          category: 'heart',     price: 7.99,  rating: 4.7, reviews: 612, image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80', desc: 'Daily heart health maintenance',              inStock: true  },
  { id: 11, name: 'CoQ10 200mg',            category: 'heart',     price: 28.99, rating: 4.8, reviews: 198, image: 'https://images.unsplash.com/photo-1616671276441-2f2c277b8bf6?w=400&q=80', desc: 'Cellular energy & heart support',             inStock: true  },
  { id: 12, name: 'Hydrocortisone Cream',   category: 'skin',      price: 13.49, rating: 4.5, reviews: 334, image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80', desc: 'Soothes redness, itching & irritation',       inStock: true  },
]

// ─── Doctors ──────────────────────────────────────────────────────────────────
export const doctors = [
  { id: 1, name: 'Dr. Sarah Chen',       specialty: 'general',   experience: 12, rating: 4.9, reviews: 847, available: true,  price: 45, languages: ['en', 'ru'],          image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80' },
  { id: 2, name: 'Dr. Amir Karimov',     specialty: 'cardio',    experience: 18, rating: 4.8, reviews: 623, available: true,  price: 75, languages: ['uz', 'ru', 'en'],    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80' },
  { id: 3, name: 'Dr. Elena Petrova',    specialty: 'neuro',     experience: 15, rating: 4.9, reviews: 412, available: false, price: 80, languages: ['ru', 'en'],          image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80' },
  { id: 4, name: 'Dr. James Wilson',     specialty: 'pediatric', experience: 10, rating: 4.7, reviews: 529, available: true,  price: 55, languages: ['en'],               image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80' },
  { id: 5, name: 'Dr. Nilufar Yusupova', specialty: 'derma',     experience: 8,  rating: 4.8, reviews: 381, available: true,  price: 60, languages: ['uz', 'ru'],          image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&q=80' },
  { id: 6, name: 'Dr. Timur Rashidov',   specialty: 'ortho',     experience: 20, rating: 4.9, reviews: 714, available: false, price: 70, languages: ['uz', 'ru', 'en'],    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80' },
]

// ─── Pharmacies ───────────────────────────────────────────────────────────────
export const pharmacies = [
  { id: 1, name: 'MediCore Pharmacy', address: 'Amir Temur sq. 1',       phone: '+998 71 123-45-67', open: true,  hours: '08:00 - 22:00', lat: 41.2995, lng: 69.2401, distance: 0.3 },
  { id: 2, name: 'HealthPlus',        address: 'Mustaqillik Ave. 54',     phone: '+998 71 234-56-78', open: true,  hours: '24/7',          lat: 41.3085, lng: 69.2795, distance: 0.8 },
  { id: 3, name: 'PharmaCare',        address: 'Chilonzor, 7th block',    phone: '+998 71 345-67-89', open: false, hours: '09:00 - 21:00', lat: 41.2776, lng: 69.2107, distance: 1.4 },
  { id: 4, name: 'VitaPharm',         address: 'Yunusabad, 19th block',   phone: '+998 71 456-78-90', open: true,  hours: '08:00 - 23:00', lat: 41.3372, lng: 69.3124, distance: 2.1 },
  { id: 5, name: 'MedExpress',        address: 'Sergeli dist., Central',  phone: '+998 71 567-89-01', open: true,  hours: '07:00 - 22:00', lat: 41.2344, lng: 69.2580, distance: 3.5 },
]

// ─── AI Q&A Mock Responses ────────────────────────────────────────────────────
export const mockAIResponses = {
  default: (q) => `Based on your question about **"${q}"**, here is what medical research suggests:\n\n**Key Information:**\nThis is a common health concern. The symptoms you describe could be related to several conditions — it is important to consider your age, medical history, and lifestyle.\n\n**General Recommendations:**\n• Stay well-hydrated (8+ glasses of water daily)\n• Maintain a balanced diet rich in fruits and vegetables\n• Get regular physical activity (150 min/week moderate exercise)\n• Ensure adequate sleep (7–9 hours for adults)\n• Monitor your symptoms and note any changes\n\n**When to See a Doctor:**\nIf symptoms persist for more than 3–5 days, worsen significantly, or are accompanied by fever above 39°C, please consult a healthcare professional immediately.\n\n⚠️ *This information is for educational purposes only and does not replace professional medical advice.*`,
  flu: `**Influenza (Flu) — Common Symptoms:**\n\n**Primary Symptoms:**\n• High fever (38–41°C) with chills\n• Severe muscle aches and body pain\n• Intense headache & extreme fatigue\n• Dry, persistent cough\n\n**Secondary Symptoms:**\n• Sore throat and nasal congestion\n• Runny nose\n• Nausea/vomiting (more common in children)\n\n**Treatment:**\n• Rest and stay home\n• Drink plenty of fluids\n• Paracetamol/ibuprofen for fever\n• Antiviral medications if started within 48 hours\n\n*See a doctor if symptoms are severe or you are in a high-risk group.*`,
}
