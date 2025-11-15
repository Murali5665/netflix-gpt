import React, { useEffect, useRef, useState } from "react";
import useGptMovies from "../hooks/useGptMovies";
import { openAI } from "../utils/openai";




const GptSearch = () => {
    const searchText = useRef(null);
    const [gptMovies, setGptMovies] = useState([]);
    useGptMovies(gptMovies);


    const handleGptSearchClick = async () => {
        const userQuery = `You are a movie recommendation assistant, recommend movies based on user query: ${searchText.current.value}.
    Given the user's input, suggest 5 movie names that best match the description.
    Return only a JSON array of movie titles, like ["Air", "Pagal", "Hit", "Hit 2"].
    // Do not include any other text or explanation.`

        const completion = await openAI.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'user', content: userQuery },
            ],
        });

        // changed: parse safely and update hook
        const content = completion?.choices?.[0]?.message?.content ?? "";
        try {
            const titles = content;
            if (!Array.isArray(titles)) throw new Error("Parsed value is not an array");
            setGptMovies(titles);
        } catch (err) {
            console.error("Failed to parse GPT response as JSON array:", err, content);
            // handle error UI/state as needed
        }
    }

    return (
        <div className='flex justify-center items-center bg-black p-4 rounded-md w-[50%] mx-auto h-20x '>
            <form className="flex w-full" onSubmit={(e) => e.preventDefault()}>
                <input ref={searchText} type="text" className="p-2 rounded-md w-[90%] text-black bg-white" placeholder="Ask me anything about movies or TV shows..." />
                <button onClick={handleGptSearchClick} className="ml-4 p-2 bg-red-600 text-white w-25 rounded-md hover:cursor-pointer">Search</button>
            </form>
        </div>
    );
};

export default GptSearch;