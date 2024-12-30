'use client';

import { useState } from 'react';
import { User } from '@/types';
import Image from 'next/image';

interface UserFormProps {
  user?: User;
  onSubmit: (data: Partial<User>) => Promise<void>;
}

export default function UserForm({ user, onSubmit }: UserFormProps) {
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    profilePic: user?.profilePic || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Convert to base64
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });

        setFormData(prev => ({
          ...prev,
          profilePic: base64
        }));
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="profilePic">Profile Picture</label>
        <input
          type="file"
          id="profilePic"
          accept="image/*"
          onChange={handleImageChange}
        />
        {formData.profilePic && (
          <Image
            src={formData.profilePic}
            alt="Profile Preview"
            width={100}
            height={100}
            className="profile-image-preview"
          />
        )}
      </div>

      <button type="submit" className="submit-button">
        {user ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
} 