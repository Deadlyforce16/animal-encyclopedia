'use client';

import { useEffect, useState } from 'react';
import { Comment, User, Animal } from '@/types';
import { commentApi, userApi, animalApi } from '@/utils/api';
import CommentForm from '@/components/CommentForm';
import Image from 'next/image';

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [users, setUsers] = useState<{ [key: string]: User }>({});
  const [animals, setAnimals] = useState<{ [key: string]: Animal }>({});
  const [showForm, setShowForm] = useState(false);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [commentsData, usersData, animalsData] = await Promise.all([
      commentApi.getAll(),
      userApi.getAll(),
      animalApi.getAll(),
    ]);

    setComments(commentsData);
    setUsers(Object.fromEntries(usersData.map((user: User) => [user.id, user])));
    setAnimals(Object.fromEntries(animalsData.map((animal: Animal) => [animal.id, animal])));
  };

  const handleCreate = async (data: Partial<Comment>) => {
    await commentApi.create(data as Omit<Comment, 'id'>);
    setShowForm(false);
    loadData();
  };

  const handleUpdate = async (data: Partial<Comment>) => {
    if (editingComment) {
      await commentApi.update(editingComment.id, data);
      setEditingComment(null);
      loadData();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this comment?')) {
      await commentApi.delete(id);
      loadData();
    }
  };

  return (
    <div className="comments-container">
      <h1>Comments</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => setShowForm(true)} className="add-button">
          Add New Comment
        </button>
      </div>

      {(showForm || editingComment) && (
        <div className="modal-overlay">
          <div className="form-modal">
            <button 
              className="modal-close" 
              onClick={() => {
                setShowForm(false);
                setEditingComment(null);
              }}
            >
              ×
            </button>
            <CommentForm
              comment={editingComment || undefined}
              onSubmit={editingComment ? handleUpdate : handleCreate}
            />
          </div>
        </div>
      )}

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <div className="comment-header">
              <div className="comment-user-info">
                <Image
                  src={users[comment.userId]?.profilePic || '/default-user.svg'}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="comment-profile-pic"
                />
                <span className="username">{users[comment.userId]?.username || 'Unknown User'}</span>
                <span className="commented-on">commented on:</span>
                <div className="animal-info-comment">
                  <Image
                    src={animals[comment.animalId]?.imageUrl || '/default-animal.svg'}
                    alt="Animal"
                    width={40}
                    height={40}
                    className="animal-thumbnail-pic"
                  />
                  <span className="animal-name">{animals[comment.animalId]?.name || 'Unknown Animal'}</span>
                </div>
                <span className="comment-date">{new Date(comment.createdAt).toLocaleString()}</span>
              </div>
              <div className="comment-actions">
                <button onClick={() => setEditingComment(comment)}>Edit</button>
                <button onClick={() => handleDelete(comment.id)}>Delete</button>
              </div>
            </div>
            <p className="comment-text">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}