import { FormEvent, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Head from "next/head";

type LanguageType = "portuguese" | "english" | "spanish" | "french";

export default function Home() {
  const [inputLanguage, setInputLanguage] = useState<null | string>(
    "portuguese"
  );
  const [outputLanguage, setOutputLanguage] = useState<null | string>(
    "english"
  );
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const handleSelectInputLanguage = (language: LanguageType) => {
    if (language !== outputLanguage) {
      setInputLanguage(language);
    }
  };

  const handleSelectOutputLanguage = (language: LanguageType) => {
    if (language !== inputLanguage) {
      setOutputLanguage(language);
    }
  };

  const handleTranslateText = async (event: FormEvent) => {
    event.preventDefault();

    const gptInputText = `Translate only the values and not the keys of the JSON below in ${outputLanguage}: ${inputValue}`;
    const payload = {
      prompt: gptInputText,
      temperature: 0.5,
      n: 1,
      model: "text-davinci-003",
    };

    try {
      const { data: response } = await axios.post(
        "https://api.openai.com/v1/completions",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_SECRET_KEY}`,
          },
        }
      );

      setOutputValue(response);
    } catch (error) {
      toast.error(
        "Oops! An error occurred while processing your request. Please try again later."
      );
    }
  };

  return (
    <>
      <Head>
        <title>GPT JSON Translator</title>
        <meta
          name="description"
          content="Effortlessly translate JSON with our intuitive JSON Translator"
        />
      </Head>

      <main className="w-full relative">
        <div className="flex flex-col w-full max-w-7xl my-8 mx-auto items-start p-4">
          <div className="flex flex-col gap-1">
            <h1 className="font-regular text-white text-3xl">
              GPT now your JSON.
            </h1>
            <p className="font-light text-zinc-400">
              To get started, paste your JSON.
            </p>
          </div>

          <form
            className="w-full flex flex-col lg:flex-row gap-12 items-start mt-12"
            onSubmit={handleTranslateText}
          >
            <div className="w-full lg:w-1/2 flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <small className="text-zinc-400 font-light">From</small>
                <div className="flex items-center gap-4">
                  {["portuguese", "english", "spanish", "french"].map(
                    (language) => (
                      <button
                        key={language}
                        type="button"
                        className={`py-1 px-2 font-light text-zinc-300 hover:bg-zinc-800 transition-all rounded ${
                          inputLanguage === language ? "bg-zinc-800" : ""
                        }`}
                        onClick={() => handleSelectInputLanguage(language as any)}
                      >
                        {language}
                      </button>
                    )
                  )}
                </div>
              </div>
              <textarea
                className="p-4 bg-zinc-800 w-full h-96 rounded-lg border border-zinc-700 placeholder:text-zinc-500 placeholder:font-light text-zinc-300 font-light"
                placeholder="Paste here your json"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
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
            <div className="w-full lg:w-1/2 flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <small className="text-zinc-400 font-light">To</small>
                <div className="flex items-center gap-4">
                  {["portuguese", "english", "spanish", "french"].map(
                    (language) => (
                      <button
                        key={language}
                        type="button"
                        className={`py-1 px-2 font-light text-zinc-300 hover:bg-zinc-800 transition-all rounded ${
                          outputLanguage === language ? "bg-zinc-800" : ""
                        }`}
                        onClick={() => handleSelectOutputLanguage(language as any)}
                      >
                        {language}
                      </button>
                    )
                  )}
                </div>
              </div>
              <div className="p-4 bg-zinc-800 w-full h-96 rounded-lg border border-zinc-700 text-zinc-300 font-light">
                {outputValue}
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="bg-indigo-600 py-3 px-2 rounded cursor-pointer hover:bg-indigo-700 transition-colors text-white text-sm min-w-[120px]"
                >
                  Copy to clipboard
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
    </>
  );
}
