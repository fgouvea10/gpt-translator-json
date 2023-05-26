import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from 'axios'
import toast from 'react-hot-toast';

type LanguageType = "portuguese" | "english" | "spanish" | "french";

export default function Home() {
  const [inputLanguage, setInputLanguage] = useState<null | string>('portuguese');
  const [outputLanguage, setOutputLanguage] = useState<null | string>('english');
  const [inputValue, setInputValue] = useState('')
  const [outputValue, setOutputValue] = useState('')

  const { register, handleSubmit } = useForm()

  console.log(inputValue)

  const handleSelectInputLanguage = (language: LanguageType) => {
    if (language !== outputLanguage) {
      setInputLanguage(language);
      return
    }

    return
  };

  const handleSelectOutputLanguage = (language: LanguageType) => {
    if (language !== inputLanguage) {
      setOutputLanguage(language);
      return
    }

    return
  };

  const handleTranslateText = async (data: any) => {
    const gptInputText = `Translate only the values and not the keys of the JSON below in ${outputLanguage}: ${data.inputValue}`

    const payload = {
      promt: gptInputText,
      temperature: 0.5,
      n: 1,
      model: 'text-davinci-003'
    }

    try {
      const { data: response } = await axios.post('https://api.openai.com/v1/completions', payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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"
      }
    })

    setOutputValue(response)
    } catch (error) {
      console.log('catch')
      toast.error("An error ocurred. Please try again later.")
    }
  }

  return (
    <div className="flex bg-zinc-900 min-h-screen overflow-y-auto lg:overflow-y-hidden">
      <header className="w-full relative">
        <div className="flex w-full max-w-7xl my-0 mx-auto items-center p-4">
          <Link href="/" className="text-lg font-regular text-zinc-200">
            GPT Translator JSON
          </Link>
        </div>

        <main className="w-full relative">
          <div className="flex flex-col w-full max-w-7xl my-12 mx-auto items-start p-4">
            <div className="flex flex-col gap-1">
              <h1 className="font-regular text-white text-3xl">
                Create beautiful translations using AI.
              </h1>
              <p className="font-light text-zinc-400">
                To get started, paste your JSON.
              </p>
            </div>

            <form className="w-full flex gap-12 items-start mt-12" onSubmit={handleSubmit(handleTranslateText)}>
              <div className="w-1/2 flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <small className="text-zinc-400 font-light">From</small>
                  <div className="flex items-center gap-4">
                  <button
                      type="button"
                      className={`w-auto py-1 px-2 font-light text-zinc-300 hover:bg-zinc-800 transition-all rounded ${
                        inputLanguage === "portuguese" ? "bg-zinc-800" : ""
                      }`}
                      onClick={() => handleSelectInputLanguage("portuguese")}
                    >
                      Portuguese
                    </button>
                    <button
                      type="button"
                      className={`w-auto py-1 px-2 font-light text-zinc-300 hover:bg-zinc-800 transition-all rounded ${
                        inputLanguage === "english" ? "bg-zinc-800" : ""
                      }`}
                      onClick={() => handleSelectInputLanguage("english")}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      className={`w-auto py-1 px-2 font-light text-zinc-300 hover:bg-zinc-800 transition-all rounded ${
                        inputLanguage === "spanish" ? "bg-zinc-800" : ""
                      }`}
                      onClick={() => handleSelectInputLanguage("spanish")}
                    >
                      Spanish
                    </button>
                    <button
                      type="button"
                      className={`w-auto py-1 px-2 font-light text-zinc-300 hover:bg-zinc-800 transition-all rounded ${
                        inputLanguage === "french" ? "bg-zinc-800" : ""
                      }`}
                      onClick={() => handleSelectInputLanguage("french")}
                    >
                      French
                    </button>
                  </div>
                </div>
                <textarea
                  className="p-4 bg-zinc-800 w-full h-96 rounded-lg border border-zinc-700 placeholder:text-zinc-500 placeholder:font-light text-zinc-300 font-light"
                  placeholder="Paste here your json"
                  {...register('inputValue')}
                />
                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    className="bg-indigo-600 py-3 px-2 rounded cursor-pointer hover:bg-indigo-700 transition-colors text-white text-sm min-w-[120px]"
                  >
                    Translate
                  </button>
                  <button
                    type="button"
                    className="bg-zinc-700 py-3 px-2 rounded cursor-pointer hover:bg-zinc-600 transition-colors text-white text-sm min-w-[120px]"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="w-1/2 flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <small className="text-zinc-400 font-light">To</small>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      className={`w-auto py-1 px-2 font-light text-zinc-300 hover:bg-zinc-800 transition-all rounded ${
                        outputLanguage === "portuguese" ? "bg-zinc-800" : ""
                      }`}
                      onClick={() => handleSelectOutputLanguage("portuguese")}
                    >
                      Portuguese
                    </button>
                    <button
                      type="button"
                      className={`w-auto py-1 px-2 font-light text-zinc-300 hover:bg-zinc-800 transition-all rounded ${
                        outputLanguage === "english" ? "bg-zinc-800" : ""
                      }`}
                      onClick={() => handleSelectOutputLanguage("english")}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      className={`w-auto py-1 px-2 font-light text-zinc-300 hover:bg-zinc-800 transition-all rounded ${
                        outputLanguage === "spanish" ? "bg-zinc-800" : ""
                      }`}
                      onClick={() => handleSelectOutputLanguage("spanish")}
                    >
                      Spanish
                    </button>
                    <button
                      type="button"
                      className={`w-auto py-1 px-2 font-light text-zinc-300 hover:bg-zinc-800 transition-all rounded ${
                        outputLanguage === "french" ? "bg-zinc-800" : ""
                      }`}
                      onClick={() => handleSelectOutputLanguage("french")}
                    >
                      French
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-zinc-800 w-full h-96 rounded-lg border border-zinc-700 text-zinc-300 font-light" />
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    className="bg-indigo-600 py-3 px-2 rounded cursor-pointer hover:bg-indigo-700 transition-colors text-white text-sm min-w-[120px]"
                  >
                    Copy to clickboard
                  </button>
                  <button
                    type="button"
                    className="bg-zinc-700 py-3 px-2 rounded cursor-pointer hover:bg-zinc-600 transition-colors text-white text-sm min-w-[120px]"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </header>
    </div>
  );
}
