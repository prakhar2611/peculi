"use client"
import { getGeminiContent } from "../util/gemini/Gemini"

export default function Gem() {
    getGeminiContent()
    return (
        <>This is Gem Page </>
    )
}