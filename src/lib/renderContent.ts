import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

export function renderContent(json: any) {
  if (!json) return "";

  if (typeof json === "string") return json;

  if (json && typeof json === "object" && json.html) return json.html;

  try {
    return generateHTML(json, [
      StarterKit,
      Image,
      Link.configure({
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
    ]);
  } catch (error) {
    console.error("Error rendering Tiptap content:", error);
    return "";
  }
}
