
export interface Article {
  ref: string;
  designation: string;
  quantity: number;
  unit: string;
  pu?: number;
}

export interface ArticleControl {
  refError: boolean;
  designationError: boolean;
  quantityError: boolean;
  expectedQuantity?: number;
}

export interface DocumentData {
  id: string;
  date: string;
  orderRef?: string;
  orderDate?: string;
  vendor: {
    name: string;
    address: string;
    details: string;
  };
  buyer: {
    name: string;
    address: string;
  };
  items: Article[];
  conditions: string;
  parcelCount?: number;
}

export interface PhysicalBox {
  id: number;
  label: string;
  isOpen: boolean;
  content: {
    ref: string;
    designation: string;
    quantity: number;
  }[];
}

export interface Exercise {
  id: number;
  title: string;
  description: string;
  purchaseOrder: DocumentData;
  deliveryNote: DocumentData;
  physicalDelivery: PhysicalBox[];
}

export type AppStep = 'intro' | 'inspection' | 'verification' | 'decision' | 'summary';
