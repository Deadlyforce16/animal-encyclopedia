import { Animal, User, Comment } from '@/types';

const API_URL = 'http://localhost:3001';

// Animal CRUD operations
export const animalApi = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/animals`);
    if (!res.ok) throw new Error('Failed to fetch animals');
    return res.json();
  },

  getOne: async (id: number) => {
    const res = await fetch(`${API_URL}/animals/${id}`);
    if (!res.ok) throw new Error('Failed to fetch animal');
    return res.json();
  },

  create: async (data: Omit<Animal, 'id'>) => {
    const res = await fetch(`${API_URL}/animals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create animal');
    return res.json();
  },

  update: async (id: number, data: Partial<Animal>) => {
    const res = await fetch(`${API_URL}/animals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update animal');
    return res.json();
  },

  delete: async (id: number) => {
    // First delete all comments about this animal
    const comments = await commentApi.getAll();
    const animalComments = comments.filter((comment: Comment) => comment.animalId === String(id));
    await Promise.all(animalComments.map((comment: Comment) => 
      commentApi.delete(comment.id)
    ));

    // Then delete the animal
    const res = await fetch(`${API_URL}/animals/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete animal');
    return res.json();
  },
};

// Similar structure for users and comments
export const userApi = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/users`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  },

  getOne: async (id: number) => {
    const res = await fetch(`${API_URL}/users/${id}`);
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
  },

  create: async (data: Omit<User, 'id'>) => {
    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create user');
    return res.json();
  },

  update: async (id: number, data: Partial<User>) => {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update user');
    return res.json();
  },

  delete: async (id: number) => {
    // First delete all comments by this user
    const comments = await commentApi.getAll();
    const userComments = comments.filter((comment: Comment) => comment.userId === String(id));
    await Promise.all(userComments.map((comment: Comment) => 
      commentApi.delete(comment.id)
    ));

    // Then delete the user
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete user');
    return res.json();
  },
};

export const commentApi = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/comments`);
    if (!res.ok) throw new Error('Failed to fetch comments');
    return res.json();
  },

  create: async (data: Omit<Comment, 'id'>) => {
    const res = await fetch(`${API_URL}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create comment');
    return res.json();
  },

  update: async (id: string, data: Partial<Comment>) => {
    const res = await fetch(`${API_URL}/comments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update comment');
    return res.json();
  },

  delete: async (id: string) => {
    const res = await fetch(`${API_URL}/comments/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete comment');
    return res.json();
  },
}; 