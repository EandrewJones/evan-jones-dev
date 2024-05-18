import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "@sanity/client";

import { projectId, dataset } from "~/sanity/projectDetails";
import CustomPortableText from "./CustomPortableText";
import { calendarDate } from "~/lib/utils";
import { PencilLine, Timer } from "lucide-react";

const builder = imageUrlBuilder({ projectId, dataset });

export default function Post({
  post,
  readingTime,
  wordCount,
}: {
  post: SanityDocument;
  readingTime?: number;
  wordCount?: number;
}) {
  const { title, publishedAt, mainImage, body } = post;

  return (
    <>
      {title ? <h1 className='font-serif mb-3'>{title}</h1> : null}
      <div className='text-sm mb-8'>
        {wordCount && readingTime && (
          <div className='inline-flex items-center gap-2'>
            <Timer className='text-primary' size={15} />
            <span className='font-bold text-primary'>Reading time: </span>
            <span>{`${wordCount} words, ${readingTime} min read`}</span>
          </div>
        )}
        {publishedAt && (
          <span className='flex flex-col sm:flex-row gap-2 sm:items-center'>
            <PencilLine className='text-primary' size={15} />
            <span className='font-bold text-primary'>Last edited: </span>
            <time>{calendarDate(post.publishedAt)}</time>
          </span>
        )}
      </div>
      {mainImage ? (
        <img
          className='float-left m-0 w-1/3 mr-4 rounded-lg'
          src={builder
            .image(mainImage)
            .width(300)
            .height(300)
            .quality(80)
            .url()}
          width={300}
          height={300}
          alt={title}
        />
      ) : null}
      {body ? <CustomPortableText content={body} /> : null}
    </>
  );
}
