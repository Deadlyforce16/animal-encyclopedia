'use client';

import { useState, useEffect } from 'react';
import { Animal } from '@/types';
import Image from 'next/image';

interface AnimalFormProps {
  animal?: Animal;
  onSubmit: (data: Partial<Animal>) => Promise<void>;
}

export default function AnimalForm({ animal, onSubmit }: AnimalFormProps) {
  const [formData, setFormData] = useState<{
    name: string;
    scientificName: string;
    taxonomy: string;
    location: string;
    characteristics: string;
    description: string;
    imageUrl: string;
  }>({
    name: animal?.name || '',
    scientificName: animal?.scientificName || '',
    taxonomy: animal?.taxonomy || '',
    location: animal?.location || '',
    characteristics: animal?.characteristics || '',
    description: animal?.description || '',
    imageUrl: animal?.imageUrl || '',
  });

  const [imageInputType, setImageInputType] = useState<'url' | 'file'>('url');

  useEffect(() => {
    if (animal?.imageUrl) {
      setImageInputType(animal.imageUrl.startsWith('data:') ? 'file' : 'url');
    }
  }, [animal]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Convert file to base64
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });

        setFormData(prev => ({
          ...prev,
          imageUrl: base64
        }));
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  };

  const handleImageInputTypeChange = (type: 'url' | 'file') => {
    setImageInputType(type);
    if (type === 'url' && formData.imageUrl.startsWith('data:')) {
      setFormData(prev => ({ ...prev, imageUrl: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="animal-form">
      <div className="form-group">
        <label htmlFor="name">Common Name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="scientificName">Scientific Name</label>
        <input
          type="text"
          id="scientificName"
          value={formData.scientificName}
          onChange={(e) => setFormData({ ...formData, scientificName: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="taxonomy">Taxonomy</label>
        <input
          type="text"
          id="taxonomy"
          value={formData.taxonomy}
          onChange={(e) => setFormData({ ...formData, taxonomy: e.target.value })}
          required
          placeholder="e.g., Mammal, Reptile, Bird"
        />
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
          placeholder="Natural habitat or geographical location"
        />
      </div>

      <div className="form-group">
        <label htmlFor="characteristics">Characteristics</label>
        <textarea
          id="characteristics"
          value={formData.characteristics}
          onChange={(e) => setFormData({ ...formData, characteristics: e.target.value })}
          required
          rows={3}
          placeholder="Special abilities, physical features, etc."
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          rows={4}
          placeholder="General description about the animal"
        />
      </div>

      <div className="form-group">
        <label>Image Input Type</label>
        <div className="image-input-toggle">
          <button
            type="button"
            className={`toggle-button ${imageInputType === 'url' ? 'active' : ''}`}
            onClick={() => handleImageInputTypeChange('url')}
          >
            URL
          </button>
          <button
            type="button"
            className={`toggle-button ${imageInputType === 'file' ? 'active' : ''}`}
            onClick={() => handleImageInputTypeChange('file')}
          >
            Upload File
          </button>
        </div>
      </div>

      <div className="form-group">
        {imageInputType === 'url' ? (
          <>
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="text"
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) => {
                const value = e.target.value;
                setFormData(prev => ({ ...prev, imageUrl: value }));
              }}
              onPaste={(e) => {
                e.preventDefault();
                const value = e.clipboardData.getData('text');
                setFormData(prev => ({ ...prev, imageUrl: value }));
              }}
              placeholder="Enter image URL"
            />
          </>
        ) : (
          <>
            <label htmlFor="imageFile">Upload Image</label>
            <input
              type="file"
              id="imageFile"
              accept="image/*"
              onChange={handleFileChange}
              key={imageInputType}
            />
          </>
        )}
      </div>

      {formData.imageUrl && (
        formData.imageUrl.startsWith('data:') || isValidUrl(formData.imageUrl)
      ) && (
        <div className="image-preview">
          <Image
            src={formData.imageUrl}
            alt="Preview"
            width={200}
            height={200}
            objectFit="cover"
          />
        </div>
      )}

      <button type="submit" className="submit-button">
        {animal ? 'Update Animal' : 'Add Animal'}
      </button>
    </form>
  );
} 