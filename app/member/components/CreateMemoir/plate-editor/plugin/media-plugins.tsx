"use client";

import { IMAGE_MAX_SIZE } from "@/constants/imageSize";
import { CaptionPlugin } from "@udecode/plate-caption/react";
import { ImagePlugin, PlaceholderPlugin } from "@udecode/plate-media/react";
import { ImagePreview } from "../ui/image-preview";
import { MediaUploadToast } from "../ui/media-upload-toast";

export const mediaPlugins = [
    ImagePlugin.extend({
        options: {
            // 업로드 시 이미지만 최대 5MB까지 허용
            uploadConfig: {
                image: {
                    maxFileSize: IMAGE_MAX_SIZE,
                },
            },
            disableUploadInsert: true,
        },
        render: {
            afterEditable: ImagePreview,
        },
    }),

    CaptionPlugin.configure({
        options: {
            plugins: [ImagePlugin],
        },
    }),

    PlaceholderPlugin.configure({
        options: {
            disableEmptyPlaceholder: true,
        },
        render: {
            afterEditable: MediaUploadToast,
        },
    }),
] as const;
