"use client";

import { useState } from "react";
import {
  Button,
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  AuthModal,
} from "@/components";
import { useAuth } from "@/providers";
import { LogOut } from "lucide-react";

export function UserMenu() {
  const { user, signOut } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  if (!user) {
    return (
      <>
        <Button onClick={() => setAuthModalOpen(true)}>Sign In</Button>
        <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
      </>
    );
  }

  const userInitials = user.email?.charAt(0).toUpperCase() || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
