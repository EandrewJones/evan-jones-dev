import { Link } from "lucide-react";
import { CustomTag } from "~/components/DynamicComponent";
import { useToast } from "~/components/ui/use-toast";
import { HTTP_PROTOCOL } from "~/lib/const";
import { cn } from "~/lib/utils";
import { client } from "~/sanity/client";
import { PortableText, PortableTextBlockComponent } from "@portabletext/react";
import { useLocation } from "@remix-run/react";
import { getImageDimensions, SanityImageSource } from "@sanity/asset-utils";
import urlBuilder from "@sanity/image-url";

type Props = {
  content: any;
};

export default function CustomPortableText({ content }: Props) {
  const ImageComponent = ({
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
        alt={value?.alt || " "}
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

  const HeaderGenericComponent: PortableTextBlockComponent = (props) => {
    const { value, children } = props;
    const { _key, style: tag } = value;
    const headingId = `h${_key}`;
    const location = useLocation();
    const { toast } = useToast();
    const headerSize = Number(tag?.replace("h", ""));

    const headerSizeToIconSize: { [key: number]: number } = {
      1: 20,
      2: 20,
      3: 16,
      4: 14,
    };

    const copyLinkToClipboard = () => {
      const linkToHeading = `${HTTP_PROTOCOL}${window.location.host}${location.pathname}${location.search}#${headingId}`;
      navigator.clipboard.writeText(linkToHeading);

      toast({
        title: "Link copied to clipboard!",
        description: linkToHeading,
        duration: 1500,
      });
    };

    return (
      <CustomTag
        tag={tag as keyof JSX.IntrinsicElements}
        className='inline-flex items-center group hover:cursor-pointer'
        onClick={copyLinkToClipboard}
        aria-label='Copy link to section'
        id={headingId}
      >
        <span className='flex'>{children}</span>
        <a
          className={cn([
            "flex ml-2",
            "hidden group-hover:text-primary/80 group-hover:flex",
            "transition-all duration-300",
            "no-underline",
          ])}
          href={`#${headingId}`}
          aria-hidden='true'
          tabIndex={-1}
        >
          <Link size={headerSizeToIconSize[headerSize]} />
        </a>
      </CustomTag>
    );
  };
  const components = {
    types: {
      image: ImageComponent,
    },
    block: {
      h1: HeaderGenericComponent,
      h2: HeaderGenericComponent,
      h3: HeaderGenericComponent,
      h4: HeaderGenericComponent,
    },
  };
  return <PortableText value={content} components={components} />;
}
