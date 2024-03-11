import { cn } from "~/lib/utils";
import Navigation from "~/components/layout/Navigation";

export default function Sidebar() {
  return (
    <div
      id='sidebar'
      className={cn([
        "lg:block fixed inset-0 top-[72px] right-auto lg:left-[max(0px,calc(50%-45rem))] -left-[256px]",
        "w-[16rem] py-6 lg:py-10 pl-8 pr-6 z-20",
        "transition-all duration-300",
        "overflow-y-auto bg-primary-background",
      ])}
    >
      <Navigation />
    </div>
  );
}
