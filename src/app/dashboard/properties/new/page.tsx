"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

// تعریف تایپ برای Property مطابق مدل Prisma
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

export default function NewPropertyPage() {
    const router = useRouter();

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
        status: "active",
        location: "",
        images: [],
        ownerId: 1 // در حالت واقعی از context یا auth استفاده می‌شود
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNumberChange = (field: keyof PropertyForm, value: string) => {
        handleChange(field, value === "" ? null : parseFloat(value));
    };

    const handleIntChange = (field: keyof PropertyForm, value: string) => {
        handleChange(field, value === "" ? null : parseInt(value));
    };

    const handleArrayChange = (value: string) => {
        // تبدیل رشته به آرایه (فرض بر این که تصاویر با کاما جدا شده‌اند)
        const imagesArray = value.split(',').map(img => img.trim()).filter(img => img !== '');
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

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 space-y-6">
                {/* اطلاعات اصلی */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 text-gray-700">عنوان ملک *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-700">موقعیت *</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => handleChange("location", e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="border rounded-lg px-3 py-2 w-full min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* نوع ملک و معامله */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 text-gray-700">نوع ملک *</label>
                        <select
                            value={formData.propertyType}
                            onChange={(e) => handleChange("propertyType", e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">انتخاب کنید</option>
                            <option value="apartment">آپارتمان</option>
                            <option value="villa">ویلا</option>
                            <option value="office">دفتر کار</option>
                            <option value="shop">مغازه</option>
                            <option value="land">زمین</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-700">نوع معامله *</label>
                        <select
                            value={formData.dealType}
                            onChange={(e) => handleChange("dealType", e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">انتخاب کنید</option>
                            <option value="sale">فروش</option>
                            <option value="rent">اجاره</option>
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
                            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="قیمت فروش"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-700">ودیعه (تومان)</label>
                        <input
                            type="number"
                            value={formData.depositPrice || ""}
                            onChange={(e) => handleNumberChange("depositPrice", e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="مبلغ ودیعه"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-700">اجاره (تومان)</label>
                        <input
                            type="number"
                            value={formData.rentPrice || ""}
                            onChange={(e) => handleNumberChange("rentPrice", e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="مبلغ اجاره"
                        />
                    </div>
                </div>

                {/* مشخصات فنی */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block mb-2 text-gray-700">مساحت (متر مربع) *</label>
                        <input
                            type="number"
                            step="0.1"
                            value={formData.area}
                            onChange={(e) => handleNumberChange("area", e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-700">تعداد اتاق</label>
                        <input
                            type="number"
                            value={formData.roomCount || ""}
                            onChange={(e) => handleIntChange("roomCount", e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-700">تعداد حمام</label>
                        <input
                            type="number"
                            value={formData.bathroomCount || ""}
                            onChange={(e) => handleIntChange("bathroomCount", e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-700">طبقه</label>
                        <input
                            type="number"
                            value={formData.floor || ""}
                            onChange={(e) => handleIntChange("floor", e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0"
                        />
                    </div>
                </div>

                {/* اطلاعات ساختمان */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block mb-2 text-gray-700">تعداد کل طبقات</label>
                        <input
                            type="number"
                            value={formData.totalFloors || ""}
                            onChange={(e) => handleIntChange("totalFloors", e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-700">سال ساخت</label>
                        <input
                            type="number"
                            min="1300"
                            max="1403"
                            value={formData.yearBuilt || ""}
                            onChange={(e) => handleIntChange("yearBuilt", e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="1400"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-700">وضعیت *</label>
                        <select
                            value={formData.status}
                            onChange={(e) => handleChange("status", e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="active">فعال</option>
                            <option value="inactive">غیرفعال</option>
                            <option value="sold">فروخته شده</option>
                            <option value="rented">اجاره داده شده</option>
                        </select>
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
                                className="w-4 h-4"
                            />
                            پارکینگ
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.elevator}
                                onChange={(e) => handleChange("elevator", e.target.checked)}
                                className="w-4 h-4"
                            />
                            آسانسور
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.storage}
                                onChange={(e) => handleChange("storage", e.target.checked)}
                                className="w-4 h-4"
                            />
                            انباری
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.furnished}
                                onChange={(e) => handleChange("furnished", e.target.checked)}
                                className="w-4 h-4"
                            />
                            مبله
                        </label>
                    </div>
                </div>

                {/* تصاویر */}
                <div>
                    <label className="block mb-2 text-gray-700">آدرس تصاویر (با کاما جدا کنید)</label>
                    <textarea
                        value={formData.images.join(', ')}
                        onChange={(e) => handleArrayChange(e.target.value)}
                        className="border rounded-lg px-3 py-2 w-full min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    />
                    <p className="text-sm text-gray-500 mt-1">آدرس تصاویر را با کاما از هم جدا کنید</p>
                </div>

                {/* دکمه‌ها */}
                <div className="flex gap-3 pt-6 border-t">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 flex-1"
                    >
                        {loading ? "در حال ایجاد..." : "ایجاد ملک جدید"}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push("/dashboard/properties")}
                        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition flex-1"
                    >
                        انصراف
                    </button>
                </div>
            </form>
        </div>
    );
}