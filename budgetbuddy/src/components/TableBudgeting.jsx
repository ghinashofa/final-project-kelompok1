import React from "react";
import { Button } from "@headlessui/react";
import axios from "axios";
import Swal from "sweetalert2";
import ModalFormBudgeting from "./ModalFormBudgeting";
import { ModalFormBudgetingEdit } from "./ModalFormBudgetingEdit";


export default function TableBudgeting({ Budgeting, setBudgeting }) {

    function handleDelete(id) {
        console.log(id, "<< id");
        async function deleteBudgeting(id) {
            try {
                const response = await axios.delete(
                    `http://localhost:3000/budgeting/${id}`
                );
                console.log(response, "<< Apa yang di delete?");
                setBudgeting(Budgeting.filter((item) => item.id !== id));
            } catch (error) {
                console.log(error, "<< error");
            }
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteBudgeting(id);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                });
            }
        });
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 mt-2 bg-white rounded-2xl shadow-custom-combined p-6">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto justify-between">
                    <h1 className="text-lg font-semibold leading-6 text-gray-900">
                        Budgeting
                    </h1>
                    <p className="mt-2 text-sm text-[#AEAEAE]">
                        A summary of all transactions in your account, including
                        date, amount, and status.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <ModalFormBudgeting Budgeting={Budgeting} setBudgeting={setBudgeting} />
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                                    >
                                        Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Amount
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Category
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Account
                                    </th>
                                    <th
                                        scope="col"
                                        className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8"
                                    >
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {Budgeting.length > 0 ? (
                                    Budgeting.slice(0, 5).map((Budgeting) => (
                                        <tr key={Budgeting.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                                                {Budgeting.date}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {Budgeting.amount}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {Budgeting.category}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {Budgeting.account}
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 text-right text-sm space-x-3 font-medium sm:pr-4 lg:pr-6">
                                                <ModalFormBudgetingEdit Budgeting={Budgeting} setBudgeting={setBudgeting}  />
                                                <Button
                                                    onClick={() => handleDelete(Budgeting.id)}
                                                    className="text-white bg-red-500 p-2 px-6 hover:bg-red-600 rounded-lg hover:shadow-lg transition-all duration-200 ease-in-out"
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-sm text-gray-500">
                                            No transactions found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
