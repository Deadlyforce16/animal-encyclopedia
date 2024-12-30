export interface Animal {
    id: number;
    name: string;
    scientificName: string;
    taxonomy: string;
    location: string;
    characteristics: string;
    description: string;
  }
  
  export interface User {
    id: number;
    username: string;
    email: string;
  }
  
  export interface Comment {
    id: number;
    text: string;
    userId: number;
    animalId: number;
  }