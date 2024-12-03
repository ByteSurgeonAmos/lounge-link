"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  BsTypeBold,
  BsTypeItalic,
  BsLink45Deg,
  BsEye,
  BsCode,
} from "react-icons/bs";
import ReactMarkdown from "react-markdown";

type Props = {
  onPostCreated?: () => void;
};

function insertFormatting(
  text: string,
  selectionStart: number,
  selectionEnd: number,
  format: string
) {
  const before = text.substring(0, selectionStart);
  const selected = text.substring(selectionStart, selectionEnd);
  const after = text.substring(selectionEnd);

  switch (format) {
    case "bold":
      return `${before}**${selected}**${after}`;
    case "italic":
      return `${before}*${selected}*${after}`;
    case "link":
      return `${before}[${selected}](url)${after}`;
    default:
      return text;
  }
}

export default function CreatePost({ onPostCreated }: Props) {
  const { data: session } = useSession();
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImage(""); // Clear URL input if file is selected
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      let uploadedImageUrl = image;

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadResponse = await fetch("/api/image/upload", {
          method: "POST",
          body: formData,
        });

        if (uploadResponse.ok) {
          const { secure_url } = await uploadResponse.json();
          uploadedImageUrl = secure_url;
        }
      }

      const response = await fetch("/api/feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, image: uploadedImageUrl }),
      });

      if (response.ok) {
        setTitle("");
        setContent("");
        setImage("");
        setImageFile(null);
        setImagePreview(null);
        setIsExpanded(false);
        onPostCreated?.();
      }
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormat = (
    format: "bold" | "italic" | "link",
    inputRef: HTMLTextAreaElement | null
  ) => {
    if (!inputRef) return;

    const start = inputRef.selectionStart;
    const end = inputRef.selectionEnd;

    if (format === "link" && start === end) {
      const newText = insertFormatting(
        inputRef.value,
        start,
        end,
        format
      ).replace("url", "https://");
      inputRef.value = newText;
      inputRef.focus();
      inputRef.setSelectionRange(start + 1, start + 1);
      setContent(newText);
      return;
    }

    if (start !== undefined && end !== undefined) {
      const newText = insertFormatting(inputRef.value, start, end, format);
      inputRef.value = newText;
      inputRef.focus();
      const newPosition = format === "link" ? start + 1 : start + 2;
      inputRef.setSelectionRange(newPosition, newPosition + (end - start));
      setContent(newText);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-4 mb-4">
          <Image
            src={session?.user?.image || "https://via.placeholder.com/40"}
            alt="Profile"
            width={10}
            height={10}
            className="rounded-full w-10 h-10  "
          />
          <input
            type="text"
            placeholder="What's on your mind? Just start typing. Post title"
            className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!isExpanded && e.target.value) setIsExpanded(true);
            }}
          />
        </div>

        {isExpanded && (
          <>
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  const textarea = document.querySelector("textarea");
                  handleFormat("bold", textarea);
                }}
                className="p-2 rounded hover:bg-gray-100"
                title="Bold"
              >
                <BsTypeBold />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  const textarea = document.querySelector("textarea");
                  handleFormat("italic", textarea);
                }}
                className="p-2 rounded hover:bg-gray-100"
                title="Italic"
              >
                <BsTypeItalic />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  const textarea = document.querySelector("textarea");
                  handleFormat("link", textarea);
                }}
                className="p-2 rounded hover:bg-gray-100"
                title="Insert Link"
              >
                <BsLink45Deg />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsPreview(!isPreview);
                }}
                className={`p-2 rounded hover:bg-gray-100 ${
                  isPreview ? "bg-gray-200" : ""
                }`}
                title="Preview"
              >
                <BsEye />
              </button>
            </div>

            {isPreview ? (
              <div className="w-full p-2 rounded-lg border border-gray-200 min-h-[100px] mb-4 prose prose-sm max-w-none">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            ) : (
              <textarea
                placeholder="Write your post content... Use ** for bold and * for italic"
                className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 min-h-[100px] mb-4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            )}

            <div className="mb-4">
              <input
                type="url"
                placeholder="Image URL (optional)"
                className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 mb-2"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                  setImageFile(null);
                  setImagePreview(null);
                }}
              />
              <div className="flex items-center gap-2">
                <span>Or</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>
              {imagePreview && (
                <div className="mt-2 relative w-full h-48">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !title.trim() || !content.trim()}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:bg-gray-300"
              >
                {isSubmitting ? "Posting..." : "Post"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
