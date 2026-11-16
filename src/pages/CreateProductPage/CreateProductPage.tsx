import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
// @ts-expect-error - react-hook-form types resolution issue with allowArbitraryExtensions
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button, Input } from "shared/ui";
import { useAuth } from "entities/auth";
import { createProduct, getCategories } from "entities/product/api";
import type { Category } from "entities/product";

import "./CreateProductPage.css";

/** Схема валидации товара через zod */
const productSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  description: z.string().optional().default(""),
  price: z.coerce.number().positive("Цена должна быть больше 0"),
  images: z.string().url("Должен быть валидный URL").optional().default(""),
  discount: z.coerce.number().min(0).max(100).optional().default(0),
  stock: z.coerce.number().int().min(0).optional().default(0),
  wight: z.string().optional().default(""),
  tags: z.string().optional().default(""),
  isPublished: z.boolean().default(true),
  categoryId: z.coerce.number().int().positive("ID категории должен быть больше 0"),
});

/** Тип данных формы */
export type ProductFormData = z.infer<typeof productSchema>;

/** Страница создания нового товара */
const CreateProductPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setError("Не удалось загрузить категории"))
      .finally(() => setCategoriesLoading(false));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
      images: "",
      discount: 0,
      stock: 0,
      wight: "",
      tags: "",
      isPublished: true,
      categoryId: undefined,
    },
  });

  const onSubmit = handleSubmit(async (data: ProductFormData) => {
    setError(null);
    setIsSubmitting(true);

    try {
      const product = await createProduct({
        ...data,
        tags: data.tags
          ? data.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
          : [],
      });
      navigate(`/products/${product.id}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        const status = (err as any).statusCode;

        if (status === 401) {
          navigate("/");
        } else if (status === 404) {
          setError("Категория не найдена");
        } else if (status === 409) {
          setError("Товар с таким именем уже существует");
        } else if (status === 400) {
          const msg = err.message ?? "Ошибка валидации";
          setError(msg);
        } else {
          setError(err.message ?? "Неизвестная ошибка");
        }
      } else {
        setError("Неизвестная ошибка");
      }
    } finally {
      setIsSubmitting(false);
    }
  });

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="create-product-page">
      <h1>Создание товара</h1>
      <Link to="/" className="create-product-page__back">
        ← Вернуться в каталог
      </Link> 
      {error && (
        <div className="create-product-error">
          {error}
        </div>
      )}

      <form className="create-product-form" onSubmit={onSubmit}>
        {/* Название */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Название <span className="form-required">*</span>
          </label>
          <Input
            id="name"
            placeholder="Введите название товара"
            error={!!errors.name}
            hint={errors.name?.message}
            {...register("name")}
          />
        </div>

        {/* Описание */}
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Описание
          </label>
          <textarea
            id="description"
            className={`form-textarea ${errors.description ? "form-textarea--error" : ""}`}
            placeholder="Опишите товар"
            rows={3}
            {...register("description")}
          />
          {errors.description && (
            <span className="form-hint">{errors.description.message}</span>
          )}
        </div>

        {/* Цена */}
        <div className="form-group">
          <label htmlFor="price" className="form-label">
            Цена <span className="form-required">*</span>
          </label>
          <Input
            id="price"
            type="number"
            step="0.01"
            placeholder="0"
            error={!!errors.price}
            hint={errors.price?.message}
            {...register("price")}
          />
        </div>

        {/* URL изображения */}
        <div className="form-group">
          <label htmlFor="images" className="form-label">
            URL изображения
          </label>
          <Input
            id="images"
            placeholder="https://example.com/image.jpg"
            error={!!errors.images}
            hint={errors.images?.message}
            {...register("images")}
          />
        </div>

        {/* Скидка */}
        <div className="form-group">
          <label htmlFor="discount" className="form-label">
            Скидка (%)
          </label>
          <Input
            id="discount"
            type="number"
            min={0}
            max={100}
            placeholder="0"
            {...register("discount")}
          />
        </div>

        {/* Остаток на складе */}
        <div className="form-group">
          <label htmlFor="stock" className="form-label">
            Остаток на складе
          </label>
          <Input
            id="stock"
            type="number"
            min={0}
            placeholder="0"
            {...register("stock")}
          />
        </div>

        {/* Вес */}
        <div className="form-group">
          <label htmlFor="wight" className="form-label">
            Вес
          </label>
          <Input
            id="wight"
            placeholder="100 гр"
            {...register("wight")}
          />
        </div>

        {/* Теги */}
        <div className="form-group">
          <label htmlFor="tags" className="form-label">
            Теги
          </label>
          <Input
            id="tags"
            placeholder="тег1, тег2, тег3"
            hint="Через запятую"
            {...register("tags")}
          />
        </div>

        {/* Категория */}
        <div className="form-group">
          <label htmlFor="categoryId" className="form-label">
            Категория <span className="form-required">*</span>
          </label>
          <select
            id="categoryId"
            className={`form-select ${errors.categoryId ? "form-select--error" : ""}`}
            disabled={categoriesLoading}
            {...register("categoryId")}
          >
            <option value="">Выберите категорию</option>
            {categoriesLoading ? (
              <option value="">Загрузка...</option>
            ) : (
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))
            )}
          </select>
          {errors.categoryId && (
            <span className="form-hint">{errors.categoryId.message}</span>
          )}
        </div>

        {/* Опубликовать */}
        <div className="form-group form-group--checkbox">
          <label className="form-checkbox-label">
            <input
              type="checkbox"
              {...register("isPublished")}
            />
            <span>Опубликовать сразу</span>
          </label>
        </div>

        {/* Кнопка отправки */}
        <div className="form-actions">
          <Button
            type="submit"
            variant="primary"
            text="Создать товар"
            loading={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateProductPage;
