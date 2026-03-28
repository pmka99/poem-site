import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import PoemModel from "@/server/models/poem";
import HemistichModel from "@/server/models/hemistich";
import "@server/models";
import { connectDB } from "@/server/utils/db";
import { array } from "zod";

const hasEnglishNumber = (str: string): boolean => {
    return /\d/.test(str);
}
const isInArray = (text: string, array: string[]) => {
    let result = false;
    array.forEach(item => {
        if (item.replaceAll(" ", "") === text.replaceAll(" ", ""))
            result = true
    })
    return result;
}

export async function GET() {
    const filePath = path.join(process.cwd(), "public", "data2.txt");

    const text = fs.readFileSync(filePath, "utf8");
    const cleaned = text.replaceAll(/[\r\n\t\\]+/g, "/");

    const array = cleaned.split("/");

    const filteredArray1 = array
        .filter((item) => !item.includes("دیوان اشعار"))
        .map(item => item.trim())
        .filter(item => item != "")
        .filter(item => item.length !== 1)
        .filter(item => Number.isNaN(Number(item)))

    const poemsTitleText = `
ستایش نامه
پرستش	
مناجات	
فریب خوردن آدم 	
مقام زن 	
صدق عشق 	
تفرجگاه دنیا 	
عیب دزد 	
هابیل و قابیل 	
زن دوم 	
دختر دنیا 	
کلاغ و آدمیزاد 	
روباه و آدمیزاد 	
قصه ی بستن شیر 	
قوانین حاکم 	
وصیت روباه 	
چرخ گردون 	
نماز	
ادیان 	
قصرخُوَرنَق 	
تردید	
مناظره انسان با دنیا	
دزد و لویی	
مرد نماز گذار و مجنون 	 
نقش والدین درتربیت فرزندان 	
داستان افسون	
فقیر و غنی	
دفاع از عید نوروز	
دوستی	
فرمانروایی خزان 	
پادشاه چهار همسری	
واعظ اندرزگو 	
خواب و رویا 	
دیدار فرماندار 	
مرز بندی جامعه	
گاو مقدّس 	
ناسپاسی	
کوی مستان	
تعبیر یک رویا	
ناشکری	
انسانیت	
خاطره ای از یک دوست	
غرور	
خود شناسی	
دزد و باغبان	
خواستگاری پسر پادشاه از دختر گاوچران	
وسایل خانه	
شکرآب	
رنج نامه	
اشتر و ساربان	
سیبک	
عبادت	
فتح بابل	
آغاز سخن	
ضرورت درس تاریخ	
شهر بابل	
دین و مذهب مردم بابل	
حکومت بابل	
آمدن کوروش به بابل قبل از حمله به صورت ناشناس	
حمله سپاه کوروش به بابل 	
نبرد اوپیس	
قصر نبونید شاه و زندان خدایان	
نبرد سیپار	
فرمان کوروش در شهر سیپار	
حرکت سپاه کوروش به سوی بابل	
زدن کانل انحرافی بر رودخانه فرات	
دروازه ی نامرئی و فتح بابل	
ورود کوروش به بابل	
جشن ماه نیسان (سال نو)	
سخن پایانی	
در ستایش محبت	
ستایش اهورا	
محبت	
ملت	
اقامت گاه	
خاطراتی از دوران خدمت	
مهمان نوازی	
سخن پایانی
دنیای رفاقت
پایان`;

    const titles = poemsTitleText
        .replaceAll("\t", "")
        .split("\n")
        .map(item => item.trim())
        .filter(item => item != "");

    type Poem = {
        title: string;
        hemistichs: string[];
    }

    const poems: Poem[] = [];
    let poem: Poem | null = null;
    let hemistichs = []
    let totalH = 0;
    let lastTitle = ""
    let isNextTitle = false;
    connectDB()
    for (let i = 0; i < filteredArray1.length; i++) {
        const isInArrayStatus = isInArray(filteredArray1[i], titles)
        if (isNextTitle) {
            lastTitle = filteredArray1[i];
            isNextTitle = false;
        } else if (filteredArray1[i] === "***") {
            isNextTitle = true;
            if (!!lastTitle && lastTitle !== "***") {
                poems.push({
                    title: lastTitle,
                    hemistichs
                })
                totalH += hemistichs.length;
            }
            hemistichs = [];
        } else if (isInArrayStatus) {
            poems.push({
                title: lastTitle,
                hemistichs
            })
            totalH += hemistichs.length;
            isNextTitle = false;
            lastTitle = filteredArray1[i];
            hemistichs = [];

        } else {
            if (!hasEnglishNumber(filteredArray1[i])) {
                hemistichs.push(filteredArray1[i]);
            }
            isNextTitle = false;
        }


    }

    console.log(poems.length, totalH);


    // poems.forEach(poemItem => {
    //     (async () => {

    //         let newPoem = await PoemModel.create({
    //             show: true,
    //             title: poemItem.title,
    //             author: "69c39dbd7ce149154d976bc9",
    //             story: [],
    //             poemType: "69c39e84af79188f6cdfc5d2",
    //             category: "69c5ed5ad3b6f841ea3eb51b",
    //             order: 100000
    //         })
    //         poemItem.hemistichs.forEach((hemistichText, index) => {
    //             (async () => {
    //                 HemistichModel.create({
    //                     show: true,
    //                     text: hemistichText,
    //                     order: (index + 1) * 1000,
    //                     poem: newPoem._id,
    //                 })
    //             })()
    //         })


    //     })()
    // })

    return NextResponse.json({ poems });
}
