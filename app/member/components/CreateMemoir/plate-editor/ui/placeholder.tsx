"use client";

import * as React from "react";

import { HEADING_KEYS } from "@udecode/plate-heading";
import {
  ParagraphPlugin,
  type PlaceholderProps,
  createNodeHOC,
  createNodesHOC,
  usePlaceholderState,
} from "@udecode/plate/react";

import { cn } from "@/lib/utils";

export const Placeholder = (props: PlaceholderProps) => {
  const { attributes, children, placeholder } = props;

  const { enabled } = usePlaceholderState(props);

  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      attributes: {
        ...attributes,
        className: cn(
          attributes.className,
          enabled &&
            "before:absolute before:cursor-text before:opacity-30 before:content-[attr(placeholder)]"
        ),
        placeholder,
      },
    });
  });
};

export const withPlaceholder = createNodeHOC(Placeholder);

export const withPlaceholdersPrimitive = createNodesHOC(Placeholder);

export const withPlaceholders = (components: any) =>
  withPlaceholdersPrimitive(components, [
    {
      key: ParagraphPlugin.key,
      hideOnBlur: true,
      placeholder: `"/" 를 입력해 명령어 사용`,
      query: {
        maxLevel: 1,
      },
    },
    {
      key: HEADING_KEYS.h1,
      hideOnBlur: false,
      placeholder: "Heading level 1",
    },
    {
      key: HEADING_KEYS.h2,
      hideOnBlur: false,
      placeholder: "Heading level 2",
    },
    {
      key: HEADING_KEYS.h3,
      hideOnBlur: false,
      placeholder: "Heading level 3",
    },
    {
      key: HEADING_KEYS.h4,
      hideOnBlur: false,
      placeholder: "Heading level 4",
    },
    {
      key: HEADING_KEYS.h5,
      hideOnBlur: false,
      placeholder: "Heading level 5",
    },
    {
      key: HEADING_KEYS.h6,
      hideOnBlur: false,
      placeholder: "Heading level 6",
    },
  ]);
