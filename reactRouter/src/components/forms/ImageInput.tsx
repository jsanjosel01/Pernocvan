import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ImageInput({ name, onFileSelect, defaultImageUrl = null, maxSizeMB = 1 }: {
  name: string;
  onFileSelect: (file: File) => void;
  defaultImageUrl?: string | null;
  maxSizeMB?: number;
}) {
  const [preview, setPreview] = useState(defaultImageUrl);

  // Limpiamos la URL local de la memoria cuando el componente se desmonta o la imagen cambia
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
  
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`La imagen supera ${maxSizeMB}MB`);
      e.target.value = "";
      return;
    }
    setPreview(URL.createObjectURL(file));
    onFileSelect(file);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={preview ?? ""}
        alt=""
        className="w-48 h-48 object-cover rounded bg-gray-100"
      />
      <label className="cursor-pointer text-blue-600">
        Seleccionar imagen
        <input type="file" id={name} accept="image/*" onChange={handleChange} hidden />
      </label>
    </div>
  );
}