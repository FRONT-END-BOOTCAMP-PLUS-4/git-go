import { Value } from "@udecode/plate";

export type Tags = {
    id: number;
    name: string;
};

export type EditorFormHandle = {
    getContent: () => Value;
};
