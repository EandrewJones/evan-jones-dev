import { cn } from "app/lib/utils";
import { Terminal } from "lucide-react";
import { Link } from "@remix-run/react";
import { Separator } from "~/components/ui/separator";
import Headshot from "~/images/evan-headshot.jpg";
import Coco from "~/images/coco-headshot.jpg";
import Bryce from "~/images/bryce-headshot.jpg";

export default function ProfileInset() {
  return (
    <div className='border border-primary-outline bg-card/40 flex-col'>
      <div className='grid gap-4 px-4 sm:px-6 py-8'>
        {/* Personal Profile */}
        <img
          className='block rounded-full border-2 border-ring/60 h-16 w-16 m-0 mx-auto'
          src={Headshot}
          alt='Evan Jones'
          width='60'
          height='60'
          loading='lazy'
          decoding='async'
        />

        {/* About */}
        <div>
          <h5
            className={cn([
              "mb-0.5 leading-6",
              "text-base text-center text-primary",
              "font-serif font-semibold uppercase",
            ])}
          >
            Evan Jones
          </h5>
          <p className='m-0 my-2 text-sm text-center text-foreground'>
            Full-Stack Software Engineer & PI{" "}
            <span className='font-bold'>@</span>{" "}
            <a
              href='https://www.arlis.umd.edu'
              className={cn([
                "text-accent-foreground/70 hover:text-accent-foreground",
                "focus:text-accent-foreground font-bold",
              ])}
              target='_blank'
              rel='noopener noreferrer'
            >
              ARLIS
            </a>
          </p>
          <p className='my-3 text-xs text-center text-muted-foreground'>
            Former cofounder at{" "}
            <a
              href='https://queststudio.io'
              className={cn([
                "text-accent-foreground/70 hover:text-accent-foreground",
                "focus:text-accent-foreground font-bold",
              ])}
              target='_blank'
              rel='noopener noreferrer'
            >
              QuestStudio
            </a>
            , animal dad, bonafide political science nerd.
          </p>
        </div>

        <Separator className='w-3/4 my-2 mx-auto' />

        {/* Family photos */}
        <div className='flex flex-row justify-items-center'>
          <img
            className='block rounded-full border-2 border-ring/60 h-16 w-16 m-0 mx-auto'
            src={Coco}
            alt='Coco'
            width='60'
            height='60'
            loading='lazy'
            decoding='async'
          />
          <img
            className='block rounded-full border-2 border-ring/60 h-16 w-16 m-0 mx-auto'
            src={Bryce}
            alt='Bryce'
            width='60'
            height='60'
            loading='lazy'
            decoding='async'
          />
        </div>
      </div>
    </div>
  );
}
