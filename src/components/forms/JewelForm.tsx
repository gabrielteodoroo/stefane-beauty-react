import  { useEffect } from 'react';
import { useEffect as useEffectReact } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jewelSchema } from '../../schemas/jewel.schema';
import type { JewelData } from '../../schemas/jewel.schema';
import { useCreateJewel, useUpdateJewel, useJewel } from '../../hooks/useJewels';
import { useParams, useNavigate } from 'react-router-dom';
import { categories } from '../../utils/categorias';
import { useState } from 'react';
import { useRef } from 'react';

interface JewelFormProps {
  id?: string;
  onClose?: () => void;
}

export default function JewelForm({ id, onClose }: JewelFormProps) {
  const { id: urlId } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id || urlId);
  const { data: jewel } = useJewel(id || urlId || '');
  const createJewel = useCreateJewel();
  const updateJewel = useUpdateJewel();

  const { register, handleSubmit, setValue} = useForm<JewelData>({
    resolver: zodResolver(jewelSchema),
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (isEdit && jewel) {
      Object.entries(jewel).forEach(([key, value]) => {
        setValue(key as keyof JewelData, value);
      });
    }
  }, [isEdit, jewel, setValue]);
  const availableCategories = categories.filter(cat => cat.id !== 'todas');

  const onSubmit = async (data: JewelData) => {
    setImageError('');
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', String(data.price));
    formData.append('stock', String(data.stock));
    formData.append('category', data.category);
    formData.append('material', data.material);
    formData.append('description', data.description);
    if (selectedImage) {
      formData.append('image', selectedImage);
    }
    if (isEdit && id) {
      if (!selectedImage && !data.imageUrl && jewel?.imageUrl) {
        formData.append('imageUrl', jewel.imageUrl);
      } else if (!selectedImage && data.imageUrl) {
        formData.append('imageUrl', data.imageUrl);
      }
      try {
        await updateJewel.mutateAsync({ id, data: formData });
      } catch (err) {
        console.error('Erro ao atualizar joia:', err);
        setImageError('Erro ao salvar. Veja o console.');
        return;
      }
    } else {
      if (!selectedImage) {
        setImageError('A imagem é obrigatória no cadastro.');
        return;
      }
      try {
        await createJewel.mutateAsync(formData);
      } catch (err) {
        console.error('Erro ao cadastrar joia:', err);
        setImageError('Erro ao salvar. Veja o console.');
        return;
      }
    }
    if (onClose) onClose();
    else navigate('/jewels');
  };

  useEffectReact(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{isEdit ? 'Editar Joia' : 'Cadastrar Joia'}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Joia</label>
            <input type="text" {...register('name')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preço (R$)</label>
              <input type="number" step="0.01" {...register('price', { valueAsNumber: true })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estoque</label>
              <input type="number" {...register('stock', { valueAsNumber: true })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
              <select {...register('category')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                <option value="">Selecione uma categoria</option>
                {availableCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
              <input type="text" {...register('material')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="Ex: Titânio, Aço Cirúrgico" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Imagem</label>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-500 mb-1">
                {isEdit ? 'Imagem atual abaixo. Selecione um novo arquivo para trocar a imagem.' : 'Selecione uma imagem para cadastrar a joia.'}
              </span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Selecionar arquivo
                </button>
                <span className="text-sm text-gray-700">
                  {imageName || 'Nenhum arquivo escolhido'}
                </span>
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={e => {
                  const file = e.target.files?.[0];
                  setSelectedImage(file || null);
                  setImageName(file ? file.name : '');
                  setImageError('');
                }}
                required={!isEdit}
              />
              <div className="flex gap-4 mt-2 items-center">
                {selectedImage && (
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-500 mb-1">Preview novo arquivo:</span>
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Preview novo arquivo"
                      className="w-20 h-20 object-contain border rounded"
                    />
                  </div>
                )}
                {isEdit && jewel?.imageUrl && !selectedImage && (
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-500 mb-1">Imagem atual:</span>
                    <img
                      src={`${import.meta.env.VITE_BUCKET}${jewel.imageUrl.startsWith('/') ? jewel.imageUrl : '/' + jewel.imageUrl}`}
                      alt="Imagem atual"
                      className="w-20 h-20 object-contain border rounded"
                    />
                  </div>
                )}
              </div>
              {imageError && (
                <div className="mt-1 text-sm text-red-600">{imageError}</div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
            <textarea {...register('description')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 h-20" placeholder="Descrição breve da joia" />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors cursor-pointer mt-4"
          >
            {isEdit ? 'Salvar Alterações' : 'Adicionar Joia'}
          </button>
          {onClose && (
            <button type="button" onClick={onClose} className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg font-semibold transition-colors cursor-pointer mt-2">
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
} 