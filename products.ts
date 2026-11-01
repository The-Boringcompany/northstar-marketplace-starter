export type Product = {
  id: string; name: string; category: string; price: number; oldPrice?: number;
  rating: number; reviews: number; badge?: string; emoji: string; color: string; description: string;
};

export const products: Product[] = [
  { id:"p1", name:"Studio Wireless Headphones", category:"Electronics", price:79.99, oldPrice:109.99, rating:4.7, reviews:1284, badge:"Best seller", emoji:"🎧", color:"#dce8ef", description:"Comfortable over-ear headphones with rich sound and all-day battery life." },
  { id:"p2", name:"Everyday Smart Watch", category:"Electronics", price:119.00, rating:4.5, reviews:862, badge:"Popular", emoji:"⌚", color:"#e5e4f3", description:"Track your activity, notifications and daily routines from your wrist." },
  { id:"p3", name:"Minimal Desk Lamp", category:"Home", price:34.50, oldPrice:45.00, rating:4.6, reviews:403, emoji:"💡", color:"#f8ead4", description:"A clean, adjustable lamp for reading, studying or working from home." },
  { id:"p4", name:"Everyday Running Shoes", category:"Fashion", price:64.90, rating:4.4, reviews:576, emoji:"👟", color:"#dce9d9", description:"Lightweight everyday trainers with a cushioned sole and breathable upper." },
  { id:"p5", name:"Insulated Travel Bottle", category:"Sports", price:22.95, rating:4.8, reviews:2106, badge:"Top rated", emoji:"🥤", color:"#d7e8e7", description:"Reusable insulated bottle designed to keep drinks at the right temperature." },
  { id:"p6", name:"Compact Mechanical Keyboard", category:"Electronics", price:89.00, oldPrice:99.00, rating:4.6, reviews:721, emoji:"⌨️", color:"#e4e6e9", description:"A compact keyboard with tactile keys and a sturdy, minimalist design." },
  { id:"p7", name:"Ceramic Coffee Set", category:"Home", price:28.00, rating:4.3, reviews:194, emoji:"☕", color:"#f0dfd4", description:"A simple ceramic set for slow mornings and everyday coffee breaks." },
  { id:"p8", name:"Weekend Backpack", category:"Fashion", price:54.99, rating:4.5, reviews:344, badge:"Great value", emoji:"🎒", color:"#e8e2d6", description:"A versatile backpack with organised storage for commuting and short trips." },
];

export const categories = ["All", "Electronics", "Home", "Fashion", "Sports"];
