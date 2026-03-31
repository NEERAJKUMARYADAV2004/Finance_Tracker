import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Card } from '../../components/UI/Card';
import { Input } from '../../components/UI/Input';

export function SmartInput({ onParsed }) {
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsProcessing(true);
    
    // Simulate AI parsing local delay
    setTimeout(() => {
      setIsProcessing(false);
      // Smart extraction using Unicode currency symbols
      const priceRegex = /(?:\p{Sc}\s*)?(\d+(?:\.\d+)?)(?:\s*\p{Sc})?/u;
      const match = text.match(priceRegex);
      
      let amount = 0;
      let remainingText = text;
      
      if (match) {
        amount = parseFloat(match[1]);
        remainingText = text.replace(match[0], '').trim();
      }
      
      let category = 'Other';
      
      const categoryMap = {
        "Housing": ["rent", "house", "mortgage", "property tax", "maintenance", "brokerage", "painting", "plumbing", "repairs", "furniture", "no-broker", "magicbricks", "urban company", "electrician", "flooring", "renovation", "insulation", "gardening", "cleaning", "pest control", "locksmith"],
        "Utilities": ["electricity", "water bill", "wifi", "broadband", "jio fiber", "airtel", "gas bill", "cylinder", "electricity", "sewer", "trash", "mobile recharge", "postpaid", "prepaid", "trash collection", "solar", "inverter", "heating", "cooling", "utility bill"],
        "Food": ["grocery", "milk", "vegetables", "bigbasket", "blinkit", "zepto", "reliance fresh", "supermarket", "eggs", "meat", "fruits", "bread", "snacks", "spices", "cooking oil", "flour", "rice", "organic", "bakery", "dairy"],
        "Transportation": ["uber", "ola", "auto", "metro", "petrol", "diesel", "cng", "parking", "toll", "fastag", "bus fare", "train ticket", "irctc", "rapido", "mechanic", "car wash", "tyre", "oil change", "flight", "alignment"],
        "Healthcare": ["doctor", "medicine", "pharmacy", "dentist", "hospital", "clinic", "therapy", "gym", "protein", "supplements", "1mg", "apollo", "blood test", "surgery", "eyewear", "lenskart", "insurance premium", "first aid", "physiotherapy", "vaccination"],
        "Debt Payments": ["loan", "emi", "credit card bill", "interest", "personal loan", "car loan", "student loan", "overdraft", "hdfc bank", "icici bank", "sbi loan", "collection", "repayment", "principal", "late fee", "settlement", "bank charge", "pay later", "slice", "cred"],
        "Childcare": ["school fee", "diapers", "baby food", "toys", "nanny", "daycare", "tution", "stationery", "uniform", "babysitting", "pampers", "kindergarten", "books", "firstcry", "play school", "summer camp", "pediatrician", "stroller", "formula", "kid activity"],
        "Entertainment": ["fun", "movie", "pvr", "inox", "netflix", "hotstar", "gaming", "party", "club", "concert", "theatre", "museum", "bowling", "arcade", "bookmyshow", "ps5", "steam", "spotify", "youtube premium", "festival"],
        "Dining Out": ["zomato", "swiggy", "starbucks", "cafe", "restaurant", "dinner", "lunch", "breakfast", "takeout", "delivery", "mcdonalds", "kfc", "pizza", "dominos", "street food", "fine dining", "pub", "bar", "tip", "brunch"],
        "Personal Care": ["salon", "haircut", "spa", "skincare", "makeup", "shampoo", "perfume", "grooming", "massage", "barber", "facials", "deodorant", "sunscreen", "cosmetics", "manicure", "pedicure", "waxing", "body wash", "trimmer"],
        "Clothing & Accessories": ["clothes", "shirt", "jeans", "shoes", "sneakers", "watch", "jewelry","shoe", "bag", "belt", "sunglasses", "jacket", "outfit", "brand", "boutique"],
        "Hobbies & Activities": ["painting", "photography", "camera", "guitar", "piano", "sports", "badminton", "cricket", "football", "collectible", "knitting", "pottery", "workshop", "course", "udemy", "coursera", "membership", "hiking", "trekking", "fishing"],
        "Travel & Vacations": ["hotel", "airbnb", "resort", "booking.com", "makemytrip", "expedia", "passport", "visa", "sightseeing", "souvenir", "luggage", "rental car", "homestay", "cruise", "adventure", "safari", "trip", "weekend getaway", "staycation", "travel insurance"],
        "Shopping": ["amazon", "flipkart","walmart","meesho","myntra","ajio","nykaa","zara","h&m","nike", "adidas", "mall", "electronics", "online"]
      };

      for (const [catName, keywords] of Object.entries(categoryMap)) {
        if (keywords.some(keyword => new RegExp(`\\b${keyword}\\b`, 'i').test(remainingText))) {
          category = catName;
          break;
        }
      }

      const words = remainingText.split(' ');

      onParsed({
        amount: amount || 0,
        category,
        merchant: words.find(w => w && w[0] === w[0].toUpperCase()) || '',
        notes: text,
        date: new Date().toISOString().split('T')[0]
      });
      setText('');
    }, 600); // 600ms fake delay, but no visual animation, just instant state swap
  };

  return (
    <Card className="p-1 mb-4 border-gold/40 shadow-[0_0_15px_rgba(212,175,55,0.05)]">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 ml-3 text-gold" />
        <input
          type="text"
          placeholder='e.g., "$12 for coffee at Starbucks"'
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isProcessing}
          className="flex-1 bg-transparent border-none text-primary dark:text-white placeholder:text-secondary/50 dark:placeholder-zinc-500 focus:outline-none py-3"
        />
        <button 
          type="submit" 
          disabled={!text.trim() || isProcessing}
          className="w-10 h-10 mr-1 rounded-xl bg-gold text-black flex items-center justify-center hover:bg-gold/90 disabled:opacity-50"
        >
          <ArrowRight className="w-5 h-5 stroke-[2px]" />
        </button>
      </form>
    </Card>
  );
}
