"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signIn, signOut } from "@/auth/helpers";
import { useSession } from "next-auth/react";

export default function UserButton() {
  const { data: session } = useSession();

  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative w-8 h-8 rounded-full">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={
                  session.user.image ??
                  "https://source.boringavatars.com/marble/120"
                }
                alt={session.user.name ?? ""}
              />
              <AvatarFallback className="uppercase">
                {session.user.name[0]}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-lg font-medium leading-none">
                {session.user.name}
              </p>
              <p className="text-sm leading-none text-muted-foreground truncate">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <Button
              className="w-full"
              size="sm"
              onClick={async () => {
                await signOut();
                await signIn();
              }}
            >
              Sign Out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
