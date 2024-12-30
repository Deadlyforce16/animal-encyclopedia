'use client';

import { useEffect, useState } from 'react';
import { User } from '@/types';
import { userApi } from '@/utils/api';
import UserForm from '@/components/UserForm';
import Image from 'next/image';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await userApi.getAll();
    setUsers(data);
  };

  const handleCreate = async (data: Partial<User>) => {
    await userApi.create(data as Omit<User, 'id'>);
    setShowForm(false);
    loadUsers();
  };

  const handleUpdate = async (data: Partial<User>) => {
    if (editingUser) {
      await userApi.update(editingUser.id, data);
      setEditingUser(null);
      loadUsers();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await userApi.delete(id);
      loadUsers();
    }
  };

  return (
    <div className="users-container">
      <h1>Users Directory</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => setShowForm(true)} className="add-button">
          Add New User
        </button>
      </div>

      {(showForm || editingUser) && (
        <div className="modal-overlay">
          <div className="form-modal">
            <button 
              className="modal-close" 
              onClick={() => {
                setShowForm(false);
                setEditingUser(null);
              }}
            >
              ×
            </button>
            <UserForm
              user={editingUser || undefined}
              onSubmit={editingUser ? handleUpdate : handleCreate}
            />
          </div>
        </div>
      )}

      <div className="users-grid">
        {users.map((user) => (
          <article key={user.id} className="user-card">
            <div className="user-info-container">
              <Image
                src={user.profilePic || '/default-user.svg'}
                alt={user.username}
                width={100}
                height={100}
                objectFit="cover"
                className="profile-image"
              />
              <div className="user-info">
                <h2>{user.username}</h2>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="card-actions">
              <button onClick={() => setEditingUser(user)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}