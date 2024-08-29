import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {
  Input,
  Select,
  Option,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export function ModalFormBudgetingEdit({ budgeting, setBudgeting }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    category: "",
    account: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (budgeting) {
      setFormData({
        date: budgeting.date || "",
        amount: budgeting.amount || "",
        category: budgeting.category || "",
        account: budgeting.account || "",
      });
    }
  }, [budgeting]);

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.amount) newErrors.amount = "Amount is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.account) newErrors.account = "Account is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const updatedData = { ...formData };
      const response = await axios.put(`http://localhost:3000/budgeting/${budgeting.id}`, updatedData);

      // Update the budgeting state with the new data
      setBudgeting((prevBudgeting) =>
        prevBudgeting.map((item) =>
          item.id === budgeting.id ? response.data : item
        )
      );

      Swal.fire("Success", "Budgeting updated successfully", "success");
      handleOpen();
    } catch (error) {
      console.error("Error updating budgeting:", error);
      Swal.fire("Error", "An error occurred while updating your budgeting", "error");
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="bg-[#4a83eb] p-2 px-6 text-white font-normal rounded-lg hover:bg-[#3772df] hover:shadow- transition-all duration-200 ease-in-out"
      >
        Edit
      </button>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Edit Budgeting
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Update your budgeting details.
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
          <form onSubmit={handleEdit}>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                Date
              </Typography>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="placeholder:opacity-100 focus:!border-t-gray-900"
              />
              {errors.date && <Typography color="red">{errors.date}</Typography>}
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                Amount
              </Typography>
              <Input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="placeholder:opacity-100 focus:!border-t-gray-900"
              />
              {errors.amount && <Typography color="red">{errors.amount}</Typography>}
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                Category
              </Typography>
              <Select
                value={formData.category}
                onChange={(value) => handleSelectChange(value)}
                className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
              >
                <Option value="Food">Food</Option>
                <Option value="Salary">Salary</Option>
                <Option value="Business">Business</Option>
                <Option value="Beauty">Beauty</Option>
                <Option value="Rent">Rent</Option>
                <Option value="Transport">Transport</Option>
                <Option value="Health">Health</Option>
              </Select>
              {errors.category && <Typography color="red">{errors.category}</Typography>}
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                Account
              </Typography>
              <Input
                type="text"
                name="account"
                value={formData.account}
                onChange={handleChange}
                className="placeholder:opacity-100 focus:!border-t-gray-900"
              />
              {errors.account && <Typography color="red">{errors.account}</Typography>}
            </div>
            <DialogFooter>
              <Button
                type="submit"
                variant="gradient"
                className="bg-[#4a83eb] hover:bg-[#3772df]"
              >
                Update
              </Button>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}