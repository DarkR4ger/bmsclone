"use client";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/reduxhook";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { logout } from "@/lib/logout";
import { delUser } from "@/redux/userSlice";

const HeaderComp = () => {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    await logout();
    dispatch(delUser());
    router.push("/login");
  };

  const pathname = usePathname();
  return (
    <nav className="container shadow-xl py-4 flex items-center justify-between">
      <div>
        <Link href="/">
          <h1 className="text-md md:text-xl lg:text-2xl font-semibold">
            Book<span className="text-primary">My</span>ShowC
          </h1>
        </Link>
      </div>
      <div>
        {pathname === "/" ||
        pathname === "/profile" ||
        pathname === "/admin" ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar
                className={`${buttonVariants({ variant: "outline" })} cursor-pointer rounded-full`}
              >
                <AvatarFallback>{user.username[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link
                    href={`${user.isAdmin ? "/admin" : "/profile"}`}
                    className="flex items-center"
                  >
                    <User className="size-4 mr-2" />
                    <p>Profile</p>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogOut}>
                  <LogOut className="size-4 mr-2 stroke-primary" />
                  <span className="text-primary">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : pathname === "/login" ? (
          <Link
            href="/register"
            className={buttonVariants({
              size: "sm",
              className: "text-sm md:text-md lg:text-lg md:p-3 lg:p-6",
            })}
          >
            Sign up
          </Link>
        ) : (
          <Link
            href="/login"
            className={buttonVariants({
              size: "sm",
              className: "text-sm md:text-md lg:text-lg md:p-3 lg:p-6",
            })}
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
};

export default HeaderComp;
