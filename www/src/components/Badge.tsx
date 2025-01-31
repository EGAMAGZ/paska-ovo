import { type ComponentChildren } from "preact";

interface Props {
  text: string;
  url: string;
  children: ComponentChildren;
}

export default function Badge({ text, url, children }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      class="flex flex-row bg-red-500 text-black font-bold py-2 px-4 border-2 border-black border-solid"
    >
      {children} <span>{text}</span>
    </a>
  );
}
