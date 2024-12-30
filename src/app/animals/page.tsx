'use client';

import { useEffect, useState } from 'react';
import { Animal } from '@/types';
import { animalApi } from '@/utils/api';
import AnimalForm from '@/components/AnimalForm';
import Image from 'next/image';

export default function AnimalsPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState<'name' | 'scientificName' | 'taxonomy' | 'location'>('name');
  const [sortField, setSortField] = useState<'name' | 'scientificName' | 'taxonomy' | 'location'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showForm, setShowForm] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  useEffect(() => {
    loadAnimals();
  }, []);

  const loadAnimals = async () => {
    const data = await animalApi.getAll();
    setAnimals(data);
  };

  const handleCreate = async (data: Partial<Animal>) => {
    await animalApi.create(data as Omit<Animal, 'id'>);
    setShowForm(false);
    loadAnimals();
  };

  const handleUpdate = async (data: Partial<Animal>) => {
    if (editingAnimal) {
      await animalApi.update(editingAnimal.id, data);
      setEditingAnimal(null);
      loadAnimals();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this animal?')) {
      await animalApi.delete(id);
      loadAnimals();
    }
  };

  const filteredAndSortedAnimals = animals
    .filter(animal => {
      const searchValue = animal[searchField]?.toLowerCase() || '';
      return searchValue.includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      const aValue = a[sortField]?.toLowerCase() || '';
      const bValue = b[sortField]?.toLowerCase() || '';
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

  return (
    <div className="animals-container">
      <h1>Animals Directory</h1>
      <div className="controls-container">
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search animals..."
            className="search-input"
          />
          <select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value as 'name' | 'scientificName' | 'taxonomy' | 'location')}
            className="search-select"
          >
            <option value="name">Name</option>
            <option value="scientificName">Scientific Name</option>
            <option value="taxonomy">Taxonomy</option>
            <option value="location">Location</option>
          </select>
        </div>

        <button onClick={() => setShowForm(true)} className="add-button">
          Add New Animal
        </button>

        <div className="sort-container">
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as 'name' | 'scientificName' | 'taxonomy' | 'location')}
            className="sort-select"
          >
            <option value="name">Name</option>
            <option value="scientificName">Scientific Name</option>
            <option value="taxonomy">Taxonomy</option>
            <option value="location">Location</option>
          </select>
          <button
            onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="sort-direction"
          >
            {sortDirection === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {(showForm || editingAnimal) && (
        <div className="modal-overlay">
          <div className="form-modal">
            <button 
              className="modal-close" 
              onClick={() => {
                setShowForm(false);
                setEditingAnimal(null);
              }}
            >
              ×
            </button>
            <AnimalForm
              animal={editingAnimal || undefined}
              onSubmit={editingAnimal ? handleUpdate : handleCreate}
            />
          </div>
        </div>
      )}

      <div className="animals-grid">
        {filteredAndSortedAnimals.map((animal) => (
          <article 
            key={animal.id} 
            className="animal-card"
            onClick={() => setSelectedAnimal(animal)}
          >
            <div className="animal-card-content">
              <div className="animal-info">
                <h2>{animal.name}</h2>
                <p><strong>Scientific Name:</strong> {animal.scientificName}</p>
                <p><strong>Taxonomy:</strong> {animal.taxonomy}</p>
                <p><strong>Location:</strong> {animal.location}</p>
                <div className="card-actions">
                  <button onClick={(e) => {
                    e.stopPropagation();
                    setEditingAnimal(animal);
                  }}>Edit</button>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(animal.id);
                  }}>Delete</button>
                </div>
              </div>
              <div className="animal-thumbnail">
                <Image
                  src={animal.imageUrl || '/default-animal.svg'}
                  alt={animal.name}
                  width={150}
                  height={150}
                  objectFit="cover"
                  className="animal-image"
                />
              </div>
            </div>
          </article>
        ))}
      </div>

      {selectedAnimal && (
        <div className="modal-overlay" onClick={() => setSelectedAnimal(null)}>
          <div className="detail-modal" onClick={e => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setSelectedAnimal(null)}
            >
              ×
            </button>
            <div className="detail-content">
              <div className="detail-image-container">
                <Image
                  src={selectedAnimal.imageUrl || '/default-animal.svg'}
                  alt={selectedAnimal.name}
                  width={600}
                  height={400}
                  objectFit="contain"
                  className="detail-image"
                />
              </div>
              <div className="detail-info">
                <h2>{selectedAnimal.name}</h2>
                <p><strong>Scientific Name:</strong> {selectedAnimal.scientificName}</p>
                <p><strong>Taxonomy:</strong> {selectedAnimal.taxonomy}</p>
                <p><strong>Location:</strong> {selectedAnimal.location}</p>
                <div className="characteristics-section">
                  <strong>Characteristics:</strong>
                  <p className="characteristics-text">{selectedAnimal.characteristics}</p>
                </div>
                <span className="description-label">Description:</span>
                <p className="description-text">{selectedAnimal.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}