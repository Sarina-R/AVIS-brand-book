import { serialize } from "next-mdx-remote/serialize";
import {
  ColorItems,
  Palette,
  PaletteColors,
  ColorWithShades,
  ColorShade,
  HarmonySection,
  PaletteUsage,
  UsageGuidelines,
  UsageGuidelineItem,
  MainStructureItem,
} from "@/app/type";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

type MDXFields = "title" | "description" | "desc";

export type Serialized<T> = {
  [K in keyof T]: K extends MDXFields
    ? T[K] extends string
      ? MDXRemoteSerializeResult
      : T[K]
    : T[K] extends Array<infer U>
    ? Array<Serialized<U>>
    : T[K] extends object
    ? Serialized<T[K]>
    : T[K];
};

const shouldSerialize = (key: string, value: unknown): value is string =>
  (key === "title" || key === "description" || key === "desc") &&
  typeof value === "string";

type SerializableObject =
  | ColorItems
  | Palette
  | PaletteColors
  | ColorWithShades
  | ColorShade
  | HarmonySection
  | PaletteUsage
  | UsageGuidelines
  | UsageGuidelineItem
  | MainStructureItem;

export const serializeTextFields = async <T extends SerializableObject>(
  obj: T
): Promise<Serialized<T>> => {
  if (typeof obj !== "object" || obj === null) {
    return obj as Serialized<T>;
  }

  const entries = await Promise.all(
    Object.entries(obj).map(async ([key, value]) => {
      if (shouldSerialize(key, value)) {
        const serialized = await serialize(value);
        return [key, serialized];
      } else if (Array.isArray(value)) {
        const newArray = await Promise.all(
          value.map((item) => serializeTextFields(item as SerializableObject))
        );
        return [key, newArray];
      } else if (typeof value === "object" && value !== null) {
        const newObj = await serializeTextFields(value as SerializableObject);
        return [key, newObj];
      }
      return [key, value];
    })
  );

  return Object.fromEntries(entries) as Serialized<T>;
};
