
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  trendScore?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface GroundingSource {
  web?: {
    uri: string;
    title: string;
  };
}

export interface AIResponse {
  text: string;
  sources: GroundingSource[];
}
