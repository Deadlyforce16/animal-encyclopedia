import { Animal } from '@/types'

export default function AnimalCard({ animal }: { animal: Animal }) {
  return (
    <article className="animal-card">
      <h2>{animal.name}</h2>
      <div className="animal-info">
        <p><strong>Scientific Name:</strong> {animal.scientificName}</p>
        <p><strong>Taxonomy:</strong> {animal.taxonomy}</p>
        <p><strong>Location:</strong> {animal.location}</p>
        <p><strong>Characteristics:</strong> {animal.characteristics}</p>
        <p className="description">{animal.description}</p>
      </div>
    </article>
  )
} 