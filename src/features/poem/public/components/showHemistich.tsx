"use client"

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

const excludes = ["ا", "و", "د", "ذ", "ر", "ز", "ؤ", "ژ", "آ", "أ", "إ", "ؤ", "ء", "" , "", "", "",]
const specials1 = ["َ", "ُ", "ِ", "ّ", "ۀ",]

export default function ShowHemistich({ hemistich }: { hemistich: string }) {


    const textRef = useRef<HTMLParagraphElement>(null)
    const mainRef = useRef<HTMLParagraphElement>(null)

    const [diffWidth, setDiffWidth] = useState<number>(0)

    useLayoutEffect(() => {
        if (textRef.current && mainRef.current) {
            const mainRect = mainRef.current.getBoundingClientRect();
            const textRect = textRef.current.getBoundingClientRect();
            const diff = mainRect.width - textRect.width;
            if (diff === 0) return
            setDiffWidth(diff);
        }

    }, [hemistich])

    const parts = hemistich.split(" ").filter(part => part.trim().length > 0);

    let count = Math.ceil(diffWidth / 30)
    console.log(hemistich, count);




    const shapeParts = parts.map((item, i) => {
        // اگر کلمه یک حرفی است یا کشیدگی تمام شده
        if (item.length < 2 || count === 0) return item

        const chars = item.split('')
        let newWord = ''
        let usedKashida = 0

        for (let j = 0; j < chars.length; j++) {
            const currentChar = chars[j]
            const nextChar = chars[j + 1] || ''

            // اضافه کردن حرف فعلی
            newWord += currentChar

            // اگر حرف آخر است، ادامه نده
            if (j === chars.length - 1) break

            // بررسی: آیا می‌توان بین currentChar و nextChar کشیدگی گذاشت؟
            let canKashida = true

            // شرط 1: اگر حرف فعلی در excludes باشد
            if (excludes.includes(currentChar)) {
                canKashida = false
            }

            // شرط 2: اگر حرف فعلی در specials1 باشد (اعراب‌دار)
            if (specials1.includes(currentChar)) {
                canKashida = false
            }

            // شرط 3: اگر حرف بعدی در excludes باشد
            if (excludes.includes(nextChar)) {
                canKashida = false
            }

            // شرط 4: اگر حرف بعدی در specials1 باشد
            if (specials1.includes(nextChar)) {
                canKashida = false
            }

            // اگر امکان کشیدگی وجود دارد و کشیدگی باقی مانده
            if (canKashida && count > 0) {
                newWord += 'ـــ'
                count--
                usedKashida++
            }
        }

        return newWord
    })
    console.log(hemistich, "remain", count);

    return (
        <>
            <p ref={mainRef} aria-hidden="true" className="w-full flex justify-between text-justify">
                {shapeParts.map((part, index) => (
                    <span key={index} className="inline-block">
                        {part}
                    </span>
                ))}
            </p>
            <p ref={textRef} className="invisible w-fit h-0">{hemistich}</p>
        </>
    )
}

