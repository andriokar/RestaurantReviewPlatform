import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Photo } from "@/domain/domain";

interface PhotosStepProps {
  uploadPhoto: (file: File, caption?: string) => Promise<Photo>;
}

export default function PhotosStep(props: PhotosStepProps) {
  const { uploadPhoto } = props;
  const { register, setValue } = useFormContext();
  const [previews, setPreviews] = useState<string[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);    
    const uploadedPhotos = await Promise.all(files.map(photo => uploadPhoto(photo)))
    setPhotos(uploadedPhotos)
    const photoIds = uploadedPhotos.map(photo => photo.id)
    setValue("photos", photoIds);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="photos">Upload Restaurant Photos</Label>
        <Input
          id="photos"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById("photos")?.click()}
        >
          Select Photos
        </Button>
      </div>
      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={preview || "/placeholder.svg"}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
