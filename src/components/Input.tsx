import { useState } from "preact/hooks";
import type { JSX } from "preact";
import InfoComponent from "./InfoComponent.tsx";

const Input = () => {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState({ error: "", success: "" });

  const onInput = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    setValue(e.currentTarget.value);
    setMessage({ error: "", success: "" });
  };

  const validateURL = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      if (error instanceof TypeError) {
        console.error("Error invalid URL type:", error.message);
      }
      return false;
    }
  };

  const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    if (!validateURL(value)) {
      setMessage({ error: "Please enter a valid URL.", success: "" });
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
        const data = await response.json();
        setMessage({
          error: "",
          success: `New URL uploaded. The new short url is: ${
            import.meta.env.PUBLIC_VITE_BACKEND_URI
          }/${data.short_url}`,
        });
      } else {
        if (response.status === 409)
          setMessage({ error: "This URL is already registered.", success: "" });
        else {
          setMessage({ error: "Request Failed.", success: "" });
        }
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
      </form>
      {message.success && (
        <InfoComponent
          message={message.success}
          colorClass="bg-gradient-to-r from-green-600 to-green-700"
        />
      )}
      {message.error && (
        <InfoComponent
          message={message.error}
          colorClass="bg-gradient-to-r from-red-600 to-red-700"
        />
      )}
    </div>
  );
};

export default Input;
