"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { GrSpotify } from "react-icons/gr";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types";

interface Sideprops {
  children: React.ReactNode;
  songs: Song[];
}

const Sidebar: React.FC<Sideprops> = ({ children, songs }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: GrSpotify,
        label: "Spotify",
        href: "/",
        active: pathname === "/",
      },
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        href: "/search",
        active: pathname === "/search",
      },
    ],
    [pathname]
  );

  return (
    <div className="flex  h-full">
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

//   return (
//     <ResizablePanelGroup
//       direction="horizontal"
//       className=" w-full h-full rounded-lg border-0 "
//     >
//       <ResizablePanel defaultSize={15} minSize={25}>
//         <ResizablePanelGroup
//           direction="vertical"
//           className="hidden md:flex flex-col gap-y-1 bg-black h-full w-[300px] "
//         >
//           <ResizablePanel defaultSize={14} minSize={15}>
//             <div className="flex h-full items-center justify-center px-1.5 mt-2">
//               <Box>
//                 <div className="flex flex-col gap-y-2 px-5 py-4 ">
//                   {routes.map((item) => (
//                     <SidebarItem key={item.label} {...item} />
//                   ))}
//                 </div>
//               </Box>
//             </div>
//           </ResizablePanel>
//           <ResizableHandle className="bg-transparent" />
//           <ResizablePanel defaultSize={75}>
//             <div className="flex h-full items-center justify-center px-1.5 py-0">
//               <Box className="overflow-y-auto h-full">
//                 <Library />
//               </Box>
//             </div>
//           </ResizablePanel>
//         </ResizablePanelGroup>
//       </ResizablePanel>
//       <ResizableHandle className="bg-transparent" />
//       <ResizablePanel defaultSize={50}>
//         <main className="h-full flex-1 w-full fixed py-2">{children}</main>
//       </ResizablePanel>
//     </ResizablePanelGroup>
//   );
// };

export default Sidebar;
