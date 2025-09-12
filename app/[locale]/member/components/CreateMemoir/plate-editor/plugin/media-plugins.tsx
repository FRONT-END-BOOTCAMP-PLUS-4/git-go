"use client";

import { CaptionPlugin } from "@udecode/plate-caption/react";
import { ImagePlugin, PlaceholderPlugin } from "@udecode/plate-media/react";
import { ImagePreview } from "../ui/image-preview";
import { MediaUploadToast } from "../ui/media-upload-toast";

export const mediaPlugins = [
    ImagePlugin.extend({
        options: { disableUploadInsert: true },
        render: { afterEditable: ImagePreview },
    }),

    CaptionPlugin.configure({
        options: {
            plugins: [ImagePlugin],
        },
    }),
    PlaceholderPlugin.configure({
        options: { disableEmptyPlaceholder: true },
        render: { afterEditable: MediaUploadToast },
    }),
] as const;
