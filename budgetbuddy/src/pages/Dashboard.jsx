import React from "react";
import logo from "../assets/logo.png";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
} from "@headlessui/react";
import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {
    ChevronDownIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

import Cards from "../components/CardsDashboard";
import TableDashboard from "../components/TableDashboard";
import CardsDashboard from "../components/CardsDashboard";
import LineChart from "@/components/LineChart";

const navigation = [
    { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
    {
        name: "Budgeting",
        href: "#",
        icon: DocumentDuplicateIcon,
        current: false,
    },
    { name: "Transaction", href: "#", icon: FolderIcon, current: false },
    { name: "Bills & payment", href: "#", icon: CalendarIcon, current: false },
    { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];
const teams = [
    { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
    { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
    { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];
const userNavigation = [
    { name: "Your profile", href: "#" },
    { name: "Sign out", href: "#" },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}



export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getTransactions() {
            try {
                setLoading(true);
                const response = await axios.get(
                    "http://localhost:3000/transaction"
                );
                setTransactions(response.data);
                console.log(response,"<< response");

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        getTransactions();
    }, []);

    return (
        <>
            <div>
                <Dialog
                    open={sidebarOpen}
                    onClose={setSidebarOpen}
                    className="relative z-50 lg:hidden"
                >
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 flex">
                        <DialogPanel
                            transition
                            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                        >
                            <TransitionChild>
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                    <button
                                        type="button"
                                        onClick={() => setSidebarOpen(false)}
                                        className="-m-2.5 p-2.5"
                                    >
                                        <span className="sr-only">
                                            Close sidebar
                                        </span>
                                        <XMarkIcon
                                            aria-hidden="true"
                                            className="h-6 w-6 text-white"
                                        />
                                    </button>
                                </div>
                            </TransitionChild>
                            {/* Sidebar component, swap this element with another sidebar if you like */}
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                <div className="flex h-16 shrink-0 items-center">
                                    <img
                                        alt="BudgetBuddy"
                                        src={logo}
                                        className="h-8 w-auto"
                                    />
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    <ul
                                        role="list"
                                        className="flex flex-1 flex-col gap-y-7"
                                    >
                                        <li>
                                            <ul
                                                role="list"
                                                className="-mx-2 space-y-1"
                                            >
                                                {navigation.map((item) => (
                                                    <li key={item.name}>
                                                        <a
                                                            href={item.href}
                                                            className={classNames(
                                                                item.current
                                                                    ? "bg-gray-50 text-indigo-600"
                                                                    : "text-gray-700 hover:bg-[#EEECFB] hover:text-[#4C3BCF]",
                                                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                                            )}
                                                        >
                                                            <item.icon
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    item.current
                                                                        ? "text-indigo-600"
                                                                        : "text-gray-400 group-hover:text-indigo-600",
                                                                    "h-6 w-6 shrink-0"
                                                                )}
                                                            />
                                                            {item.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li className="mt-auto">
                                            <a
                                                href="#"
                                                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-[#EEECFB] hover:text-[#4C3BCF]"
                                            >
                                                <Cog6ToothIcon
                                                    aria-hidden="true"
                                                    className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                                                />
                                                Settings
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                        <div className="flex h-16 shrink-0 items-center gap-3">
                            <img
                                alt="Your Company"
                                src={logo}
                                className="h-8 w-auto"
                            />
                            <p className="logo font-semibold text-lg">
                                BudgetBuddy
                            </p>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul
                                role="list"
                                className="flex flex-1 flex-col gap-y-7"
                            >
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? "bg-[#EEECFB] text-indigo-600 border border-[#CDC8F2]"
                                                            : "text-gray-600 hover:bg-[#EEECFB] hover:text-[#4C3BCF]",
                                                        "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                                    )}
                                                >
                                                    <item.icon
                                                        aria-hidden="true"
                                                        className={classNames(
                                                            item.current
                                                                ? "text-indigo-600"
                                                                : "text-gray-400 group-hover:text-indigo-600",
                                                            "h-6 w-6 shrink-0"
                                                        )}
                                                    />
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="mt-auto">
                                    <a
                                        href="#"
                                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-[#EEECFB] hover:text-[#4C3BCF]"
                                    >
                                        <Cog6ToothIcon
                                            aria-hidden="true"
                                            className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                                        />
                                        Settings
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="lg:pl-72">
                    <div className="sticky top-0 z-40 flex flex-1 self-stretch items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:gap-x-6 lg:px-8">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                        </button>

                        {/* Separator */}
                        <div
                            aria-hidden="true"
                            className="h-6 w-px bg-gray-200 lg:hidden"
                        />

                        <div
                            className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 items-center"
                            style={{ height: "80px" }}
                        >
                            <div className="relative flex flex-1 flex-col">
                                <h3 className="text-base font-semibold">
                                    Dashboard
                                </h3>
                                <p className="text-sm font-normal text-[#AEAEAE]">
                                    Take a look at your latest transactions and
                                    financial trends.
                                </p>
                            </div>
                            <div className="flex items-center gap-x-4 lg:gap-x-6">
                                <button
                                    type="button"
                                    className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                                >
                                    <span className="sr-only">
                                        View notifications
                                    </span>
                                    <BellIcon
                                        aria-hidden="true"
                                        className="h-6 w-6"
                                    />
                                </button>

                                {/* Separator */}
                                <div
                                    aria-hidden="true"
                                    className="hidden lg:block lg:h-6 lg:w-px lg:bg-[#EEECFB]"
                                />

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative">
                                    <MenuButton className="-m-1.5 flex items-center p-1.5">
                                        <span className="sr-only">
                                            Open user menu
                                        </span>
                                        <img
                                            alt=""
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            className="h-8 w-8 rounded-full bg-[#EEECFB]"
                                        />
                                        <span className="hidden lg:flex lg:items-center">
                                            <span
                                                aria-hidden="true"
                                                className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                                            >
                                                Tom Cook
                                            </span>
                                            <ChevronDownIcon
                                                aria-hidden="true"
                                                className="ml-2 h-5 w-5 text-gray-400"
                                            />
                                        </span>
                                    </MenuButton>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        {userNavigation.map((item) => (
                                            <MenuItem key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-[#EEECFB]"
                                                >
                                                    {item.name}
                                                </a>
                                            </MenuItem>
                                        ))}
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                    </div>
                    {/* ====== main content ====== */}
                    <main className="py-10 bg-[#F5F7FA]">
                        <div className="px-4 sm:px-6 lg:px-8">
                            {error && (
                                <div className="mt-8">
                                    <div className="rounded-md bg-red-50 p-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <XMarkIcon
                                                    className="h-5 w-5 text-red-400"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-red-800">
                                                    {error}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <CardsDashboard transactions={transactions} />
                            <LineChart />

                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <TableDashboard transactions={transactions} setTransactions={setTransactions} />

                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
