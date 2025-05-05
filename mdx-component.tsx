import type { MDXComponents } from "mdx/types";
import Image from "next/image";

interface MDXComponentProps {
  primaryColor?: string;
}

export function useMDXComponents1(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children, style }) => <h1 className={style}>{children}</h1>,
    img: (props) => (
      <img sizes="100vw" style={{ width: "100%", height: "auto" }} {...props} />
    ),
    p: ({ children }) => <p className="">{children}</p>,
    ...components,
  };
}

export function useMDXComponents({
  primaryColor = "#1a1a1a",
}: MDXComponentProps): MDXComponents {
  return {
    // Headings (h1 - h6)
    h1: ({ children }) => (
      <h1
        style={{ color: primaryColor }}
        className="text-4xl font-bold tracking-tight dark:text-white"
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        style={{ color: primaryColor }}
        className="text-3xl font-semibold mt-6 mb-3 "
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-medium mt-5 mb-2">{children}</h3>
    ),

    // Paragraph
    p: ({ children }) => <span className="leading-6 mb-4">{children}</span>,

    // Image
    img: (props) => (
      <Image
        src={props.src}
        alt={props.alt || ""}
        width={parseInt(props.width) || 500}
        height={parseInt(props.height) || 500}
        style={{ objectFit: "cover" }}
      />
    ),

    Image: Image,

    // Code (inline)
    code: ({ children }) => (
      <code className="text-sm px-2 py-1 rounded-md font-mono text-purple-600 dark:text-purple-400">
        {children}
      </code>
    ),

    // Preformatted Code Block
    pre: ({ children }) => (
      <pre className="bg-neutral-900 dark:bg-neutral-800 text-white p-4 rounded-lg overflow-x-auto my-4">
        {children}
      </pre>
    ),

    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-neutral-300 dark:border-neutral-600 pl-4 italic text-neutral-600 dark:text-neutral-400 my-4">
        {children}
      </blockquote>
    ),

    // Lists (with nested list support)
    ul: ({ children }) => (
      <ul className="list-disc pl-6 my-4 text-neutral-700 dark:text-neutral-300">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 my-4 text-neutral-700 dark:text-neutral-300">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="mb-2 pl-1 [&_ul]:pl-4 [&_ol]:pl-4 [&_ul]:list-circle [&_ol]:list-[lower-roman] dark:[&_ul]:text-neutral-300 dark:[&_ol]:text-neutral-300">
        {children}
      </li>
    ),

    // Table (Full Support with Dark Mode)
    table: ({ children }) => (
      <table className="w-full border-collapse my-6 border border-neutral-300 dark:border-neutral-700">
        {children}
      </table>
    ),
    thead: ({ children }) => (
      <thead className="bg-neutral-100 dark:bg-neutral-800">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="dark:text-neutral-300">{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr className="border-b border-neutral-200 dark:border-neutral-600">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-2 text-left font-semibold text-neutral-700 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2 text-neutral-600 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700">
        {children}
      </td>
    ),

    // Strong (bold) and Emphasis (italic)
    strong: ({ children }) => (
      <strong className="font-bold dark:text-neutral-200">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic dark:text-neutral-300">{children}</em>
    ),

    // Horizontal Rule
    hr: () => (
      <hr className="my-6 border-neutral-300 dark:border-neutral-600" />
    ),
  };
}
