import Image from "next/image";
import Link from "next/link"; // Import Link from next/link
import { LayoutGrid, PiggyBank, ReceiptText } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
  ];

  return (
    <div className="h-screen p-5 border shadow-sm">
      <Image src={"/logo.svg"} width={180} height={100} />

      <div className="mt-5">
        {menuList.map((menu) => (
          <Link href={menu.path} key={menu.id}>
            <h2
              className={
                "flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-primary hover:bg-green-100"
              }
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>

      <div className="fixed bottom-10 p-5 flex gap-2 items-center">
        <UserButton />
        <h1 className="flex gap-2 items-center text-gray-500 font-medium p-3 cursor-pointer rounded-md">
          Profile
        </h1>
      </div>
    </div>
  );
}

export default SideNav;
