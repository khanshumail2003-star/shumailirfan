export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt?: any;
}

export interface Message {
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt?: any;
}

export interface Education {
  title: string;
  institution: string;
  period: string;
  description: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
}
