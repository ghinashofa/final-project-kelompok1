import React, { useState } from "react";
import axios from "axios";
import {
  Input,
  Option,
  Select,
  Button,
  Dialog,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

export default function ModalFormBudgeting({ budgeting, setBudgeting }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    date: "",
    amount: "number",
    category: "",
    account: ""
  });
  const [errors, setErrors] = useState({});
  const [formMethod, setFormMethod] = useState("add");
  const [currentId, setCurrentId] = useState("");

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setForm((prevForm) => ({
      ...prevForm,
      category: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.date) newErrors.date = "Date is required";
    if (!form.amount) newErrors.amount = "Amount is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.account) newErrors.account = "Account is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (formMethod === "add") {
        const response = await axios.post("http://localhost:3000/budgeting", form);
        setBudgeting([response.data, ...budgeting]);
        Swal.fire("Success", "Budgeting added successfully", "success");
      } 
      setForm({
        date: "",
        amount: "number",
        category: "",
        account: ""
      });
      setFormMethod("add");
      handleOpen();
    } catch (error) {
      console.error("Error handling form:", error);
      Swal.fire("Error", "An error occurred while processing your request", "error");
    }
  };

  return (
    <>
      <Button onClick={handleOpen} className="bg-gradient-to-r from-[#4C3BCF] via-[#5C50E7] to-[#705FF3] text-white font-semibold py-3">
        Add Budgeting
      </Button>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            {formMethod === "add" ? "Add Budgeting" : "Edit Budgeting"}
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
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Date
            </Typography>
            <Input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="placeholder:opacity-100 focus:!border-t-gray-900"
            />
            {errors.date && <Typography color="red">{errors.date}</Typography>}
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Amount
            </Typography>
            <Input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="placeholder:opacity-100 focus:!border-t-gray-900"
            />
            {errors.amount && <Typography color="red">{errors.amount}</Typography>}
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
              value={form.category}
              onChange={handleSelectChange}
              className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
            >
              <Option value="Food">Food</Option>
              <Option value="Social Life">Salary</Option>
              <Option value="Social Life">Business</Option>
              <Option value="Beauty">Beauty</Option>
              <Option value="Apparel">Apparel</Option>
              <Option value="Transport">Transport</Option>
              <Option value="Health">Health</Option>
            </Select>
            {errors.category && <Typography color="red">{errors.category}</Typography>}
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Account
            </Typography>
            <Input
              type="text"
              name="account"
              value={form.account}
              onChange={handleChange}
              className="placeholder:opacity-100 focus:!border-t-gray-900"
            />
            {errors.account && <Typography color="red">{errors.account}</Typography>}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            onClick={handleSubmit}
            className="mr-1"
          >
            {formMethod === "add" ? "Submit" : "Update"}
          </Button>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
          >
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}