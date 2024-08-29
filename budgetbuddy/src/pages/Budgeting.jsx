import React, { useState, useEffect } from "react";
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

const Budgeting = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    date: "",
    amount: "",
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
        await axios.post("http://localhost:3000/budgeting", form);
        Swal.fire("Success", "Transaction added successfully", "success");
      } else if (formMethod === "edit") {
        await axios.put(`http://localhost:3000/budgeting/${currentId}`, form);
        Swal.fire("Success", "Transaction updated successfully", "success");
      }
      fetchBudgetingData();
      handleOpen();
      setForm({
        date: "",
        amount: "",
        category: "",
        account: ""
      });
      setFormMethod("add");
    } catch (error) {
      console.error("Error handling form:", error);
      Swal.fire("Error", "An error occurred while processing your request", "error");
    }
  };

  const handleEdit = (id) => {
    const item = data.find((entry) => entry.id === id);
    setForm({
      date: item.date,
      amount: item.amount,
      category: item.category,
      account: item.account
    });
    setCurrentId(id);
    setFormMethod("edit");
    handleOpen();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/budgeting/${id}`);
      Swal.fire("Success", "Transaction deleted successfully", "success");
      fetchBudgetingData();
    } catch (error) {
      console.error("Error deleting transaction:", error);
      Swal.fire("Error", "An error occurred while deleting the transaction", "error");
    }
  };

  const fetchBudgetingData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/budgeting");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchBudgetingData();
  }, []);

  return (
    <div className="p-6">
      <Button onClick={handleOpen} variant="gradient">
        Add Transaction
      </Button>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            {formMethod === "add" ? "Add Transaction" : "Edit Transaction"}
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
              onChange={(value) => handleSelectChange(value)}
              className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
            >
              <Option value="">Select a category</Option>
              <Option value="Clothing">Clothing</Option>
              <Option value="Fashion">Fashion</Option>
              <Option value="Watches">Watches</Option>
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
      <div className="mt-6">
        <Typography variant="h6" color="blue-gray">
          Transactions
        </Typography>
        <table className="min-w-full mt-4 border border-gray-200">
          <thead>
            <tr>
              <th className="border-b border-gray-200 px-4 py-2 text-left">Date</th>
              <th className="border-b border-gray-200 px-4 py-2 text-left">Amount</th>
              <th className="border-b border-gray-200 px-4 py-2 text-left">Category</th>
              <th className="border-b border-gray-200 px-4 py-2 text-left">Account</th>
              <th className="border-b border-gray-200 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="border-b border-gray-200 px-4 py-2">{item.date}</td>
                <td className="border-b border-gray-200 px-4 py-2">{item.amount}</td>
                <td className="border-b border-gray-200 px-4 py-2">{item.category}</td>
                <td className="border-b border-gray-200 px-4 py-2">{item.account}</td>
                <td className="border-b border-gray-200 px-4 py-2">
                  <Button
                    size="sm"
                    color="blue"
                    onClick={() => handleEdit(item.id)}
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    color="red"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Budgeting;