"use client";

import { useState, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";

// تایپ فرم ملک مطابق مدل Prisma
interface PropertyForm {
    title: string;
    description: string;
    propertyType: string;
    dealType: string;
    price: number | null;
    rentPrice: number | null;
    depositPrice: number | null;
    area: number;
    roomCount: number | null;
    bathroomCount: number | null;
    floor: number | null;
    totalFloors: number | null;
    yearBuilt: number | null;
    parking: boolean;
    elevator: boolean;
    storage: boolean;
    furnished: boolean;
    status: string;
    location: string;
    images: string[];
    ownerId: number;
}

interface UploadedFile {
    fileName: string;
    originalName: string;
    url: string;
}

export default function NewPropertyPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<PropertyForm>({
        title: "",
        description: "",
        propertyType: "",
        dealType: "",
        price: null,
        rentPrice: null,
        depositPrice: null,
        area: 0,
        roomCount: null,
        bathroomCount: null,
        floor: null,
        totalFloors: null,
        yearBuilt: null,
        parking: false,
        elevator: false,
        storage: false,
        furnished: false,
        status: "فعال",
        location: "",
        images: [],
        ownerId: 1,
    });

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

    // آپلود فایل‌ها
    const handleFileUpload = async (files: FileList) => {
        setUploading(true);
        setError(null);

        try {
            const uploadPromises = Array.from(files).map(async (file) => {
                // بررسی نوع فایل
                if (!file.type.startsWith('image/')) {
                    throw new Error(`فایل ${file.name} باید یک تصویر باشد`);
                }

                // بررسی حجم فایل (حداکثر 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    throw new Error(`حجم فایل ${file.name} نباید بیشتر از 5MB باشد`);
                }

                const formData = new FormData();
                formData.append('file', file);

                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error || `خطا در آپلود ${file.name}`);
                }

                const data = await res.json();

                // فقط نام فایل را دریافت می‌کنیم
                return {
                    fileName: data.fileName,
                    originalName: file.name,
                    url: `/images/${data.fileName}` // برای پیش‌نمایش
                };
            });

            const results = await Promise.all(uploadPromises);
            const newFileNames = results.map(result => result.fileName);

            // فقط نام فایل‌ها را به فرم اضافه می‌کنیم
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, ...newFileNames]
            }));

            // برای پیش‌نمایش
            setUploadedFiles(prev => [...prev, ...results]);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setUploading(false);
        }
    };

    // حذف عکس آپلود شده
    const removeImage = (index: number) => {
        const newImages = [...formData.images];
        const newUploadedFiles = [...uploadedFiles];

        newImages.splice(index, 1);
        newUploadedFiles.splice(index, 1);

        setFormData(prev => ({ ...prev, images: newImages }));
        setUploadedFiles(newUploadedFiles);
    };

    // ذخیره ملک جدید
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/properties", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "خطا در ایجاد ملک جدید");
            }

            router.push("/dashboard/properties");
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field: keyof PropertyForm, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleNumberChange = (field: keyof PropertyForm, value: string) => {
        handleChange(field, value === "" ? null : parseFloat(value));
    };

    const handleIntChange = (field: keyof PropertyForm, value: string) => {
        handleChange(field, value === "" ? null : parseInt(value));
    };

    const handleArrayChange = (value: string) => {
        const imagesArray = value
            .split(",")
            .map((img) => img.trim())
            .filter((img) => img !== "");
        handleChange("images", imagesArray);
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">ایجاد ملک جدید</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-xl p-6 space-y-6"
            >
                {/* اطلاعات اصلی */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 text-gray-700">عنوان ملک *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-700">موقعیت *</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => handleChange("location", e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                {/* توضیحات */}
                <div>
                    <label className="block mb-2 text-gray-700">توضیحات *</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        className="border rounded-lg px-3 py-2 w-full min-h-[100px] focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* نوع ملک و نوع معامله */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 text-gray-700">نوع ملک *</label>
                        <select
                            value={formData.propertyType}
                            onChange={(e) => handleChange("propertyType", e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">انتخاب کنید</option>
                            <option value="آپارتمان">آپارتمان</option>
                            <option value="ویلا">ویلا</option>
                            <option value="دفتر کار">دفتر کار</option>
                            <option value="مغازه">مغازه</option>
                            <option value="زمین">زمین</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-700">نوع معامله *</label>
                        <select
                            value={formData.dealType}
                            onChange={(e) => handleChange("dealType", e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">انتخاب کنید</option>
                            <option value="فروش">فروش</option>
                            <option value="اجاره">اجاره</option>
                        </select>
                    </div>
                </div>

                {/* قیمت‌ها */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block mb-2 text-gray-700">قیمت (تومان)</label>
                        <input
                            type="number"
                            value={formData.price || ""}
                            onChange={(e) => handleNumberChange("price", e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                            placeholder="قیمت فروش"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-700">ودیعه (تومان)</label>
                        <input
                            type="number"
                            value={formData.depositPrice || ""}
                            onChange={(e) => handleNumberChange("depositPrice", e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                            placeholder="مبلغ ودیعه"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-700">اجاره (تومان)</label>
                        <input
                            type="number"
                            value={formData.rentPrice || ""}
                            onChange={(e) => handleNumberChange("rentPrice", e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                            placeholder="مبلغ اجاره"
                        />
                    </div>
                </div>

                {/* سایر مشخصات */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block mb-2 text-gray-700">مساحت (متر)</label>
                        <input
                            type="number"
                            value={formData.area}
                            onChange={(e) => handleNumberChange("area", e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-700">تعداد اتاق</label>
                        <input
                            type="number"
                            value={formData.roomCount || ""}
                            onChange={(e) => handleIntChange("roomCount", e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-700">تعداد حمام</label>
                        <input
                            type="number"
                            value={formData.bathroomCount || ""}
                            onChange={(e) => handleIntChange("bathroomCount", e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-700">سال ساخت</label>
                        <input
                            type="number"
                            value={formData.yearBuilt || ""}
                            onChange={(e) => handleIntChange("yearBuilt", e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* امکانات */}
                <div>
                    <label className="block mb-3 text-gray-700">امکانات</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.parking}
                                onChange={(e) => handleChange("parking", e.target.checked)}
                            />
                            پارکینگ
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.elevator}
                                onChange={(e) => handleChange("elevator", e.target.checked)}
                            />
                            آسانسور
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.storage}
                                onChange={(e) => handleChange("storage", e.target.checked)}
                            />
                            انباری
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.furnished}
                                onChange={(e) => handleChange("furnished", e.target.checked)}
                            />
                            مبله
                        </label>
                    </div>
                </div>

                {/* آپلود تصاویر */}
                <div>
                    <label className="block mb-3 text-gray-700">آپلود تصاویر</label>

                    {/* دکمه آپلود */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center mb-4">
                        <input
                            type="file"
                            ref={fileInputRef}
                            multiple
                            accept="image/*"
                            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                            className="hidden"
                        />

                        <div className="flex flex-col items-center justify-center gap-3">
                            <Upload className="w-12 h-12 text-gray-400" />
                            <div>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {uploading ? "در حال آپلود..." : "انتخاب فایل‌ها"}
                                </button>
                                <p className="text-sm text-gray-500 mt-2">
                                    فرمت‌های مجاز: JPG, PNG, GIF (حداکثر 5MB)
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* پیش‌نمایش تصاویر آپلود شده */}
                    {uploadedFiles.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {uploadedFiles.map((file, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={file.url}
                                        alt={file.originalName}
                                        className="w-full h-24 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    <p className="text-xs text-gray-600 truncate mt-1">
                                        {file.originalName}
                                    </p>
                                    <p className="text-xs text-gray-400 truncate">
                                        {file.fileName}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* فیلد متنی برای نام فایل‌های دستی */}
                    <div className="mt-4">
                        <label className="block mb-2 text-gray-700">
                            یا نام فایل‌ها را وارد کنید (با کاما جدا کنید)
                        </label>
                        <textarea
                            value={formData.images.join(", ")}
                            onChange={(e) => {
                                const fileNamesArray = e.target.value
                                    .split(",")
                                    .map((name) => name.trim())
                                    .filter((name) => name !== "");
                                handleChange("images", fileNamesArray);
                            }}
                            className="border rounded-lg px-3 py-2 w-full min-h-[80px] focus:ring-2 focus:ring-blue-500"
                            placeholder="1700000000000-abc123.jpg, 1700000000001-def456.png"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            نام فایل‌هایی که قبلاً آپلود کرده‌اید (فقط نام فایل، نه آدرس کامل)
                        </p>
                    </div>
                </div>

                {/* دکمه‌ها */}
                <div className="flex gap-3 pt-6 border-t">
                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex-1 disabled:opacity-50"
                    >
                        {loading ? "در حال ایجاد..." : "ایجاد ملک جدید"}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push("/dashboard/properties")}
                        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex-1"
                    >
                        انصراف
                    </button>
                </div>
            </form>
        </div>
    );
}