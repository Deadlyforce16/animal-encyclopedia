export interface Animal {
  id: number
  name: string
  scientificName: string
  taxonomy: string
  location: string
  characteristics: string
  description: string
  imageUrl?: string
}

export interface User {
  id: number
  username: string
  email: string
  profilePic?: string
}

export interface Comment {
  id: string
  text: string
  userId: string
  animalId: string
  createdAt: string
} 