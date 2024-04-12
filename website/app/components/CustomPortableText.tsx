import urlBuilder from "@sanity/image-url";
import { client } from "~/sanity/client";
import { cn } from "~/lib/utils";
import { PortableText } from "@portabletext/react";
import { getImageDimensions } from "@sanity/asset-utils";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type Props = {
  content: any;
};

export default function CustomPortableText({ content }: Props) {
  const SampleImageComponent = ({
    value,
    isInline,
  }: {
    value: SanityImageSource;
    isInline: boolean;
  }) => {
    const { width, height } = getImageDimensions(value);
    return (
      <img
        src={urlBuilder(client)
          .image(value)
          .width(isInline ? 100 : 800)
          .fit("max")
          .auto("format")
          .url()}
        alt={value.alt || " "}
        loading='lazy'
        className={cn([
          {
            "inline-block": isInline,
            block: !isInline,
          },
        ])}
        style={{
          aspectRatio: width / height,
        }}
      />
    );
  };
  const components = {
    types: {
      image: SampleImageComponent,
    },
  };
  return <PortableText value={content} components={components} />;
}
