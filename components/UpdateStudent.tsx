"use client";

import { useState, useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import CustomButton from "@/components/CustomButton";
import { User, Student } from "@/types/props";

interface StudentsProps {
  user: Student;
  loginInfo: User | undefined | null;
  setIsUpdateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: () => void;
}

export default function UpdateStudent({
  user,
  loginInfo,
  setIsUpdateDialogOpen,
  mutate,
}: StudentsProps) {
  const [formData, setFormData] = useState({
    schlor_no: user.schlor_no,
    name: user.name,
    f_name: user.f_name,
    m_name: user.m_name,
    dob: user.dob,
    sex: user.sex,
    category: user.category,
    religion: user.religion,
    year_10th: user.year_10th,
    board_10th: user.board_10th,
    per_10th: user.per_10th,
    year_12th: user.year_12th,
    board_12th: user.board_12th,
    sub_12th: user.sub_12th,
    per_12th: user.per_12th,
    mobile_no_self: user.mobile_no_self,
    mobile_no_alt: user.mobile_no_alt,
    email_id: user.email_id,
    address: user.address,
    bca_1st_y_per: user.bca_1st_y_per,
    bca_2nd_y_per: user.bca_2nd_y_per,
    bca_3rd_y_per: user.bca_3rd_y_per,
  });
  const [isLoading, setIsLoading] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const isAdmin = loginInfo?.role === "admin";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: [
        "year_10th",
        "per_10th",
        "year_12th",
        "per_12th",
        "mobile_no_self",
        "mobile_no_alt",
        "bca_1st_y_per",
        "bca_2nd_y_per",
        "bca_3rd_y_per",
      ].includes(id)
        ? Number(value) || 0
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.schlor_no ||
      !formData.name ||
      !formData.f_name ||
      !formData.m_name ||
      !formData.dob ||
      !formData.sex ||
      !formData.category ||
      !formData.religion ||
      !formData.year_10th ||
      !formData.board_10th ||
      !formData.per_10th ||
      !formData.year_12th ||
      !formData.board_12th ||
      !formData.sub_12th ||
      !formData.per_12th ||
      !formData.mobile_no_self ||
      !formData.email_id ||
      !formData.address
    ) {
      toast.error("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/settings/students/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Student updated successfully.");
        if (mutate) mutate();
      } else {
        toast.error(data.error || "Updating student failed. Please try again.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Network error. Please try again.");
      }
    } finally {
      setIsUpdateDialogOpen(false);
      setIsLoading(false);
    }
  };

  // Trap focus within the dialog
  useEffect(() => {
    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key === "Tab" && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleFocusTrap);
    return () => document.removeEventListener("keydown", handleFocusTrap);
  }, []);

  return (
    <DialogContent
      className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto"
      ref={dialogRef}
    >
      <DialogHeader>
        <DialogTitle>Update Student Details</DialogTitle>
        <DialogDescription>
          Make changes to student information here. Click save when you&apos;re
          done.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="schlor_no">Scholar No</Label>
            <Input
              id="schlor_no"
              value={formData.schlor_no}
              onChange={handleChange}
              placeholder="Enter scholar number"
              required
              disabled={!isAdmin}
              aria-describedby="schlor_no-error"
            />
            {!formData.schlor_no && (
              <p id="schlor_no-error" className="text-red-500 text-sm">
                Scholar number is required
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
              aria-describedby="name-error"
            />
            {!formData.name && (
              <p id="name-error" className="text-red-500 text-sm">
                Name is required
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="f_name">Father&apos;s Name</Label>
            <Input
              id="f_name"
              value={formData.f_name}
              onChange={handleChange}
              placeholder="Enter father's name"
              required
              aria-describedby="f_name-error"
            />
            {!formData.f_name && (
              <p id="f_name-error" className="text-red-500 text-sm">
                Father&apos;s name is required
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="m_name">Mother&apos;s Name</Label>
            <Input
              id="m_name"
              value={formData.m_name}
              onChange={handleChange}
              placeholder="Enter mother's name"
              required
              aria-describedby="m_name-error"
            />
            {!formData.m_name && (
              <p id="m_name-error" className="text-red-500 text-sm">
                Mother&apos;s name is required
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              required
              disabled={!isAdmin}
              aria-describedby="dob-error"
            />
            {!formData.dob && (
              <p id="dob-error" className="text-red-500 text-sm">
                Date of birth is required
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="sex">Gender</Label>
            <Select
              defaultValue={formData.sex}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, sex: value as "M" | "F" }))
              }
              disabled={!isAdmin}
              required
            >
              <SelectTrigger
                className="w-full"
                aria-controls="sex-select-content"
                aria-expanded={false}
              >
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent id="sex-select-content">
                <SelectGroup>
                  <SelectLabel>Select gender</SelectLabel>
                  <SelectItem value="M">Male</SelectItem>
                  <SelectItem value="F">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              defaultValue={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  category: value as "GEN" | "OBC" | "ST" | "SC" | "EWS",
                }))
              }
              required
            >
              <SelectTrigger
                className="w-full"
                aria-controls="category-select-content"
                aria-expanded={false}
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent id="category-select-content">
                <SelectGroup>
                  <SelectLabel>Select category</SelectLabel>
                  <SelectItem value="GEN">GEN</SelectItem>
                  <SelectItem value="OBC">OBC</SelectItem>
                  <SelectItem value="ST">ST</SelectItem>
                  <SelectItem value="SC">SC</SelectItem>
                  <SelectItem value="EWS">EWS</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="religion">Religion</Label>
            <Select
              defaultValue={formData.religion}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  religion: value as "Hindu" | "Muslim" | "SIKH",
                }))
              }
              disabled={!isAdmin}
              required
            >
              <SelectTrigger
                className="w-full"
                aria-controls="religion-select-content"
                aria-expanded={false}
              >
                <SelectValue placeholder="Select religion" />
              </SelectTrigger>
              <SelectContent id="religion-select-content">
                <SelectGroup>
                  <SelectLabel>Select religion</SelectLabel>
                  <SelectItem value="Hindu">Hindu</SelectItem>
                  <SelectItem value="Muslim">Muslim</SelectItem>
                  <SelectItem value="SIKH">Sikh</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="year_10th">10th Year</Label>
            <Input
              id="year_10th"
              type="number"
              value={formData.year_10th}
              onChange={handleChange}
              placeholder="Enter 10th year"
              required
              aria-describedby="year_10th-error"
            />
            {!formData.year_10th && (
              <p id="year_10th-error" className="text-red-500 text-sm">
                10th year is required
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="board_10th">10th Board</Label>
            <Select
              defaultValue={formData.board_10th}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  board_10th: value as "RBSE" | "CBSE" | "WBBSE",
                }))
              }
              required
            >
              <SelectTrigger
                className="w-full"
                aria-controls="board_10th-select-content"
                aria-expanded={false}
              >
                <SelectValue placeholder="Select board" />
              </SelectTrigger>
              <SelectContent id="board_10th-select-content">
                <SelectGroup>
                  <SelectLabel>Select board</SelectLabel>
                  <SelectItem value="RBSE">RBSE</SelectItem>
                  <SelectItem value="CBSE">CBSE</SelectItem>
                  <SelectItem value="WBBSE">WBBSE</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="per_10th">10th Percentage</Label>
            <Input
              id="per_10th"
              type="number"
              value={formData.per_10th}
              onChange={handleChange}
              placeholder="Enter 10th percentage"
              required
              aria-describedby="per_10th-error"
            />
            {!formData.per_10th && (
              <p id="per_10th-error" className="text-red-500 text-sm">
                10th percentage is required
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="year_12th">12th Year</Label>
            <Input
              id="year_12th"
              type="number"
              value={formData.year_12th}
              onChange={handleChange}
              placeholder="Enter 12th year"
              required
              aria-describedby="year_12th-error"
            />
            {!formData.year_12th && (
              <p id="year_12th-error" className="text-red-500 text-sm">
                12th year is required
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="board_12th">12th Board</Label>
            <Select
              defaultValue={formData.board_12th}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  board_12th: value as "RBSE" | "CBSE" | "WBBSE",
                }))
              }
              required
            >
              <SelectTrigger
                className="w-full"
                aria-controls="board_12th-select-content"
                aria-expanded={false}
              >
                <SelectValue placeholder="Select board" />
              </SelectTrigger>
              <SelectContent id="board_12th-select-content">
                <SelectGroup>
                  <SelectLabel>Select board</SelectLabel>
                  <SelectItem value="RBSE">RBSE</SelectItem>
                  <SelectItem value="CBSE">CBSE</SelectItem>
                  <SelectItem value="WBBSE">WBBSE</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sub_12th">12th Subjects</Label>
            <Input
              id="sub_12th"
              value={formData.sub_12th}
              onChange={handleChange}
              placeholder="Enter 12th subjects"
              required
              aria-describedby="sub_12th-error"
            />
            {!formData.sub_12th && (
              <p id="sub_12th-error" className="text-red-500 text-sm">
                12th subjects are required
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="per_12th">12th Percentage</Label>
            <Input
              id="per_12th"
              type="number"
              value={formData.per_12th}
              onChange={handleChange}
              placeholder="Enter 12th percentage"
              required
              aria-describedby="per_12th-error"
            />
            {!formData.per_12th && (
              <p id="per_12th-error" className="text-red-500 text-sm">
                12th percentage is required
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile_no_self">Mobile No (Self)</Label>
            <Input
              id="mobile_no_self"
              type="number"
              value={formData.mobile_no_self}
              onChange={handleChange}
              placeholder="Enter mobile number"
              required
              aria-describedby="mobile_no_self-error"
            />
            {!formData.mobile_no_self && (
              <p id="mobile_no_self-error" className="text-red-500 text-sm">
                Mobile number is required
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile_no_alt">Mobile No (Alt)</Label>
            <Input
              id="mobile_no_alt"
              type="number"
              value={formData.mobile_no_alt}
              onChange={handleChange}
              placeholder="Enter alternate mobile number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email_id">Email</Label>
            <Input
              id="email_id"
              type="email"
              value={formData.email_id}
              onChange={handleChange}
              placeholder="Enter email"
              required
              disabled={!isAdmin}
              aria-describedby="email_id-error"
            />
            {!formData.email_id && (
              <p id="email_id-error" className="text-red-500 text-sm">
                Email is required
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              required
              aria-describedby="address-error"
            />
            {!formData.address && (
              <p id="address-error" className="text-red-500 text-sm">
                Address is required
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="bca_1st_y_per">BCA 1st Year %</Label>
            <Input
              id="bca_1st_y_per"
              type="number"
              value={formData.bca_1st_y_per}
              onChange={handleChange}
              placeholder="Enter BCA 1st year percentage"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bca_2nd_y_per">BCA 2nd Year %</Label>
            <Input
              id="bca_2nd_y_per"
              type="number"
              value={formData.bca_2nd_y_per}
              onChange={handleChange}
              placeholder="Enter BCA 2nd year percentage"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bca_3rd_y_per">BCA 3rd Year %</Label>
            <Input
              id="bca_3rd_y_per"
              type="number"
              value={formData.bca_3rd_y_per}
              onChange={handleChange}
              placeholder="Enter BCA 3rd year percentage"
            />
          </div>
        </div>
        <DialogFooter>
          <CustomButton
            title="Save changes"
            loadingTitle="Updating..."
            variant="default"
            isLoading={isLoading}
          />
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
