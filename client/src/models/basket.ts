export interface Basket {
  clientId: string;
  items: CourseItem[];
  paymentIntentId?: string;
  clientSecret?: string;
}

export interface CourseItem {
  courseId: string;
  title: string;
  instructor: string;
  image: string;
  price: number;
}
