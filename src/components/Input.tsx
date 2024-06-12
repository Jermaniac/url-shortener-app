import { useState } from "preact/hooks";
import type { JSX } from "preact";
import InfoComponent from "./InfoComponent.tsx";

const Input = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string>("");

  const onInput = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    setValue(e.currentTarget.value);
    setError("");
  };

  const validateURL = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      if (error instanceof TypeError) {
        console.error("Error:", error.message);
      }
      return false;
    }
  };

  const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    if (!validateURL(value)) {
      setError("Please enter a valid URL.");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.PUBLIC_VITE_BACKEND_URI}/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ long_url: value }),
        }
      );

      if (response.ok) {
        console.log("Request successful");
      } else {
        console.error("Request failed:", response.status);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div>
      <form
        id="form"
        onSubmit={handleSubmit}
        className="grid md:grid-cols-3 mb-10"
      >
        <input
          className="text-base text-black md:col-span-2"
          placeholder="Paste here your URL"
          type="text"
          value={value}
          onInput={onInput}
        />
        <button
          className="bg-gradient-to-br from-purple-900 to-pink-700 text-base font-bold py-2 px-4 rounded md:col-span-1 transform transition-all duration-100 hover:scale-105"
          type="submit"
          id="upload-url"
        >
          Shorten this URL!
        </button>
        {error && <p className="text-red-500 font-bold mt-2">{error}</p>}
      </form>
      <InfoComponent
        message={
          "Hey there! ✨<br/>Tired of having super long URLs for your pages? <br/>Paste your link into the box above ⬆️ and get your new short link!"
        }
      />
    </div>
  );
};

export default Input;
