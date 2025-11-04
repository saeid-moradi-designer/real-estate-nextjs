"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

function EmblaSlider() {
  const [emblaRef] = useEmblaCarousel({ loop: true, direction: "rtl" }, [
    Autoplay({ delay: 4000 }),
  ]);

  const slides = [
    {
      src: "/images/slide1.jpg",
      title: "با «خان» خانه رؤیایی‌ات را پیدا کن",
      subtitle: "پست‌ها و راهنمایی‌های تخصصی برای خریداران و فروشندگان",
    },
    {
      src: "/images/slide2.jpg",
      title: "پست‌های آموزشی و تحلیلی بازار ملک",
      subtitle: "تازه‌ترین تحلیل‌ها از بازار مسکن ایران",
    },
    {
      src: "/images/slide3.jpg",
      title: "ویدیوهای آموزشی و مصاحبه‌های اختصاصی",
      subtitle: "از کارشناسان املاک یاد بگیر",
    },
  ];
  return (
    <section
      className="relative w-full overflow-hidden border-b"
      ref={emblaRef}
    >
      <div className="embla__container flex" dir="rtl">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="embla__slide flex-[0_0_100%] relative h-[500px]"
            style={{ minWidth: "100%" }}
          >
            <Image
              src={slide.src}
              alt={slide.title}
              fill
              className="object-cover brightness-75"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white p-4">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                {slide.title}
              </h2>
              <p className="text-lg sm:text-xl opacity-90">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EmblaSlider;
