import React from "react";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import {
    Input,
    Option,
    Select,
    Button,
    Dialog,
    Textarea,
    IconButton,
    Typography,
    DialogBody,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export function ModalForm({ transactions, setTransactions }) {
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState("");
    const [category, setCategory] = React.useState("");
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        date: "",
        amount: "",
        account: "",
        note: "",
    });

    const handleOpen = () => setOpen(!open);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    function handleChangestatus(val) {
        setStatus(val);
    }

    function handleChangecategory(val) {
        setCategory(val);
    }

    function handleAddTransaction(e) {
        e.preventDefault();

        const dataSelect = {
            ...formData,
            status: status,
            category: category,
        };

        async function addTransaction() {
            try {
                const response = await axios.post(
                    "http://localhost:3000/transaction",
                    dataSelect
                );
                console.log("Transaction added successfully:", response.data);
                setTransactions([...transactions, response.data]);

                setFormData({
                    date: "",
                    amount: "",
                    category: "",
                    account: "",
                    note: "",
                    status: "",
                });

                setStatus(""); 
                setCategory(""); 
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  });

                navigate("/");
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                  });
            }
        }
        addTransaction();
    }

    return (
        <>
            <Button
                onClick={handleOpen}
                className="bg-gradient-to-r from-[#4C3BCF] via-[#5C50E7] to-[#705FF3] text-white font-semibold py-3"
            >
                Add New Transaction
            </Button>
            <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
                <DialogHeader className="relative m-0 block">
                    <Typography variant="h4" color="blue-gray">
                        Add your new transaction!
                    </Typography>
                    <Typography className="mt-1 font-normal text-gray-600">
                        Keep your records up-to-date and organized.
                    </Typography>
                    <IconButton
                        size="sm"
                        variant="text"
                        className="!absolute right-3.5 top-3.5"
                        onClick={handleOpen}
                    >
                        <XMarkIcon className="h-4 w-4 stroke-2" />
                    </IconButton>
                </DialogHeader>
                <DialogBody className="space-y-4 pb-6">
                    <form onSubmit={handleAddTransaction}>
                        <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 text-left font-medium"
                            >
                                Date
                            </Typography>
                            <Input
                                color="gray"
                                type="date"
                                size="lg"
                                placeholder="eg. White Shoes"
                                name="date"
                                onChange={handleChange}
                                className="placeholder:opacity-100 focus:!border-t-gray-900"
                                containerProps={{
                                    className: "!min-w-full",
                                }}
                                labelProps={{
                                    className: "hidden",
                                }}
                                style={{borderTop: "1px solid"}}
                            />
                        </div>
                        <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 text-left font-medium"
                            >
                                Category
                            </Typography>
                            <Select
                                className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                                placeholder="Select Category"
                                onChange={(val) => setCategory(val)}
                                name="category"
                                labelProps={{
                                    className: "hidden",
                                }}
                            >
                                <Option value="Food">Food</Option>
                                <Option value="Social Life">Salary</Option>
                                <Option value="Social Life">Business</Option>
                                <Option value="Beauty">Beauty</Option>
                                <Option value="Apparel">Apparel</Option>
                                <Option value="Transport">Transport</Option>
                                <Option value="Health">Health</Option>
                            </Select>
                        </div>
                        <div className="flex gap-4 mt-4">
                            <div className="w-full">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-2 text-left font-medium"
                                >
                                    Amount
                                </Typography>
                                <Input
                                    color="gray"
                                    size="lg"
                                    placeholder="Rp00"
                                    name="amount"
                                    onChange={handleChange}
                                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                                    containerProps={{
                                        className: "!min-w-full",
                                    }}
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                />
                            </div>
                            <div className="w-full">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-2 text-left font-medium"
                                >
                                    Account
                                </Typography>
                                <Input
                                    color="gray"
                                    size="lg"
                                    placeholder="Card"
                                    name="account"
                                    onChange={handleChange}
                                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                                    containerProps={{
                                        className: "!min-w-full",
                                    }}
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 text-left font-medium"
                            >
                                Status
                            </Typography>
                            <Select
                                className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                                placeholder="Select Status"
                                onChange={(val) => setStatus(val)}
                                name="status"
                                labelProps={{
                                    className: "hidden",
                                }}
                            >
                                <Option value="Income">Income</Option>
                                <Option value="Expenses">Expenses</Option>
                            </Select>
                        </div>

                        <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 text-left font-medium"
                            >
                                Notes (Optional)
                            </Typography>
                            <Input
                                onChange={handleChange}
                                name="note"
                                placeholder="eg. This is a white shoes with a comfortable sole."
                                className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                                labelProps={{
                                    className: "hidden",
                                }}
                            />
                        </div>
                        <Button
                            type="submit"
                            onClick={handleOpen}
                            className="ml-auto bg-gradient-to-r from-[#4C3BCF] via-[#5C50E7] to-[#705FF3] text-white font-semibold py-3"
                        >
                            Add Product
                        </Button>
                    </form>
                </DialogBody>
                {/* <DialogFooter>
                    </DialogFooter> */}
            </Dialog>
        </>
    );
}
