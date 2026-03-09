import Image from "next/image";

const data = `
اَلا یا اَیُّهَا السّاقی اَدِرْ کَأسَاً و ناوِلْها
//
که عشق آسان نمود اوّل ولی افتاد مشکل‌ها
//
به بویِ نافه‌ای کآخِر صبا زان طُرّه بُگشاید
//
ز تابِ جَعدِ مشکینش چه خون افتاد در دل‌ها
//
مرا در منزلِ جانان چه امنِ عیش، چون هر دَم
//
جَرَس فریاد می‌دارد که بَربندید مَحمِل‌ها
//
به مِی سجّاده رنگین کُن گَرَت پیرِ مُغان گوید
//
که سالِک بی‌خبر نَبْوَد ز راه و رسمِ منزل‌ها
//
شبِ تاریک و بیمِ موج و گِردابی چنین هایل
//
کجا دانند حالِ ما سبک‌بارانِ ساحل‌ها؟
//
همهْ کارم ز خودکامی به بدنامی کشید آخر
//
نهان کِی مانَد آن رازی کَزو سازند مَحفل‌ها؟
//
حضوری گر همی خواهی از او غایب مشو حافظ
//
مَتیٰ ما تَلْقَ مَنْ تَهْویٰ دَعِ الدُّنْیا وَ اَهْمِلْها`

function Hemistich({ children }: { children: React.ReactNode }) {

  const hemistich = children?.toLocaleString() || "";

  const parts = hemistich.split(" ").filter(part => part.trim().length > 0);
  
  return (
    <div className="w-full">
      <p aria-hidden="true" className="lg:text-3xl text-2xl w-full flex justify-between text-justify">
        {parts.map((part, index) => (
          <span key={index} className="inline-block">
            {part}
          </span>
        ))}
      </p>
      <p className="sr-only">
        {hemistich}
      </p>
    </div>
  )
}


export default function Home() {

  const hemistiches = data.split("//").map(line => line.trim()).filter(line => line.length > 0);
  
  return (
    <div className="flex w-full p-4 justify-center font-sans ">
      <div className="
      lg:py-10
      grid lg:grid-cols-2 
      gap-y-12 lg:gap-x-36 lg:gap-y-16
      lg:w-10/12 select-none">
        {
          hemistiches.map((hemistich, index) => (
            <div
              key={index}
              className={`${index % 2 === 1 ? "mb-4 lg:mb-0" : ""}`}
            >
              <Hemistich key={index}>
                {hemistich}
              </Hemistich>
            </div>
          ))
        }
      </div>
    </div>
  );
}
