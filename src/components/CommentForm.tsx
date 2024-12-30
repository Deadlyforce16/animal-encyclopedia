'use client';

import { useState, useEffect } from 'react';
import { Comment, User, Animal } from '@/types';
import { userApi, animalApi } from '@/utils/api';

interface CommentFormProps {
  comment?: Comment;
  onSubmit: (data: Partial<Comment>) => Promise<void>;
}

export default function CommentForm({ comment, onSubmit }: CommentFormProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [formData, setFormData] = useState({
    text: comment?.text || '',
    userId: comment?.userId || '',
    animalId: comment?.animalId || '',
  });

  useEffect(() => {
    const loadData = async () => {
      const [usersData, animalsData] = await Promise.all([
        userApi.getAll(),
        animalApi.getAll(),
      ]);
      setUsers(usersData);
      setAnimals(animalsData);
    };
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      ...formData,
      userId: String(formData.userId),
      animalId: String(formData.animalId),
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <div className="form-group">
        <label htmlFor="userId">User</label>
        <select
          id="userId"
          value={formData.userId}
          onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
          required
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="animalId">Animal</label>
        <select
          id="animalId"
          value={formData.animalId}
          onChange={(e) => setFormData({ ...formData, animalId: e.target.value })}
          required
        >
          <option value="">Select an animal</option>
          {animals.map((animal) => (
            <option key={animal.id} value={animal.id}>
              {animal.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="text">Comment</label>
        <textarea
          id="text"
          value={formData.text}
          onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          required
          rows={4}
          placeholder="Write your comment here..."
        />
      </div>

      <button type="submit" className="submit-button">
        {comment ? 'Update Comment' : 'Add Comment'}
      </button>
    </form>
  );
} 