export interface ServiceData {
  pricing: {
    starter: {
      name: string;
      description: string;
      price: number;
      _id: string;
    };
    standard: {
      name: string;
      description: string;
      price: number;
      _id: string;
    };
    advance?: {
      name: string;
      description: string;
      price: number;
      _id: string;
    };
  };
  _id: string;
  artist_id: string;
  title: string;
  category: string;
  subcategory: string;
  searchTags: string[];
  description: string;
  media: {
    photos: string[];
    videos: string[];
    _id: string;
  };
  status: "active" | "inactive"; // assuming possible values
  orders: string[];
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Review {
  rating: number;
  comment: string;
  userId: string;
}

