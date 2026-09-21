import petAsset from "@/assets/pet12.png";

export function PetSprite() {
  return (
    <div className="secondary-pet" aria-label="Pequeno pet descansando na cama">
      <div className="secondary-pet-sheet" style={{ backgroundImage: `url(${petAsset})` }} />
    </div>
  );
}