import { BOOKS } from "./data";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : 'https://logbook-snowy-gamma.vercel.app/api');

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  price: string;
  details?: Record<string, string>;
  file_url?: string;
  cover_url?: string;
  created_at?: string;
}

const FALLBACK_BOOKS: Book[] = BOOKS.map(b => ({
  id: b.id,
  title: b.title,
  author: b.author,
  description: b.description,
  category: b.category,
  price: b.price,
  cover_url: b.image,
  file_url: "",
  details: b.details
}));

export async function getBooks(): Promise<Book[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/books`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Failed to fetch books: ${res.status}`);
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return FALLBACK_BOOKS;
    }
    const data = await res.json();
    return data && data.length > 0 ? data : FALLBACK_BOOKS;
  } catch (error) {
    console.error("getBooks error:", error);
    return FALLBACK_BOOKS;
  }
}

export async function getBook(id: string): Promise<Book | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/books/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) {
      return FALLBACK_BOOKS.find(b => b.id === id) || null;
    }
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return FALLBACK_BOOKS.find(b => b.id === id) || null;
    }
    const data = await res.json();
    return data || FALLBACK_BOOKS.find(b => b.id === id) || null;
  } catch (error) {
    console.error("getBook error:", error);
    return FALLBACK_BOOKS.find(b => b.id === id) || null;
  }
}
