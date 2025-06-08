"use client";

import { useState, useCallback } from "react";
import { useForm, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DialogContent,
  DialogDescription,
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
import CustomButton from "./CustomButton";

// Common validation schemas
const percentageSchema = z
  .string()
  .regex(/^(100(\.0{1,2})?|[0-9]?[0-9](\.[0-9]{1,2})?)$/, {
    message: "Enter a valid percentage (0-100, up to 2 decimal places).",
  });
const yearSchema = z
  .string()
  .regex(/^\d{4}$/, { message: "Enter a valid 4-digit year." });
const mobileSchema = z
  .string()
  .regex(/^\d{10}$/, { message: "Mobile number must be exactly 10 digits." });
const marksSchema = z
  .string()
  .regex(/^\d+(\.\d{1,2})?$/, {
    message: "Enter a valid mark (e.g., 450 or 450.50).",
  })
  .refine((val) => parseFloat(val) >= 0 && parseFloat(val) <= 600, {
    message: "Marks must be between 0 and 600.",
  });

// Main form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  f_name: z
    .string()
    .min(2, { message: "Father's name must be at least 2 characters." }),
  m_name: z
    .string()
    .min(2, { message: "Mother's name must be at least 2 characters." }),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Please select a valid date of birth.",
  }),
  sex: z.enum(["M", "F"], { message: "Please select a gender." }),
  category: z.enum(["OBC", "ST", "SC", "GEN", "EWS"], {
    message: "Please select a category.",
  }),
  religion: z.enum(["Hindu", "Muslim", "Sikh", "Other"], {
    message: "Please select a religion.",
  }),
  year_10th: yearSchema,
  board_10th: z.enum(["RBSE", "CBSE", "WBBSE"], {
    message: "Please select a 10th board.",
  }),
  per_10th: percentageSchema,
  year_12th: yearSchema,
  board_12th: z.enum(["RBSE", "CBSE", "WBBSE"], {
    message: "Please select a 12th board.",
  }),
  sub_12th: z.enum(["Arts", "Sci.", "Comm.", "Bio."], {
    message: "Please select a 12th subject.",
  }),
  per_12th: percentageSchema,
  mobile_no_self: mobileSchema,
  mobile_no_alt: mobileSchema.optional(),
  email_id: z.string().email({ message: "Enter a valid email address." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
  bca_1st_y_per: marksSchema.optional(),
  bca_2nd_y_per: marksSchema.optional(),
  bca_3rd_y_per: marksSchema.optional(),
});

// Type for form data
type FormData = z.infer<typeof formSchema>;

// Define the props type for AddStudent
interface StudentProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: () => void;
}

// Select field options
const selectOptions = {
  sex: [
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
  ],
  category: [
    { value: "OBC", label: "OBC" },
    { value: "ST", label: "ST" },
    { value: "SC", label: "SC" },
    { value: "GEN", label: "GEN" },
    { value: "EWS", label: "EWS" },
  ],
  religion: [
    { value: "Hindu", label: "Hindu" },
    { value: "Muslim", label: "Muslim" },
    { value: "Sikh", label: "Sikh" },
    { value: "Other", label: "Other" },
  ],
  board: [
    { value: "RBSE", label: "RBSE" },
    { value: "CBSE", label: "CBSE" },
    { value: "WBBSE", label: "WBBSE" },
  ],
  sub_12th: [
    { value: "Arts", label: "Arts" },
    { value: "Sci.", label: "Science" },
    { value: "Comm.", label: "Commerce" },
    { value: "Bio.", label: "Biology" },
  ],
};

// Reusable select field component
const SelectField = ({
  name,
  label,
  options,
  placeholder,
  control,
}: {
  name: keyof FormData;
  label: string;
  options: { value: string; label: string }[];
  placeholder: string;
  control: Control<FormData>;
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{label}</SelectLabel>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

// Reusable input field component
const InputField = ({
  name,
  label,
  type,
  placeholder,
  step,
  control,
}: {
  name: keyof FormData;
  label: string;
  type: string;
  placeholder: string;
  step?: string;
  control: Control<FormData>;
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input type={type} placeholder={placeholder} step={step} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default function AddStudent({ setIsOpen, mutate }: StudentProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      f_name: "",
      m_name: "",
      dob: "",
      sex: undefined,
      category: undefined,
      religion: undefined,
      year_10th: "",
      board_10th: undefined,
      per_10th: "",
      year_12th: "",
      board_12th: undefined,
      sub_12th: undefined,
      per_12th: "",
      mobile_no_self: "",
      mobile_no_alt: "",
      email_id: "",
      address: "",
      bca_1st_y_per: "",
      bca_2nd_y_per: "",
      bca_3rd_y_per: "",
    },
  });

  const onSubmit = useCallback(
    async (values: FormData) => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/settings/students`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to add student.");
        }

        toast.success(data.message || "Student registered successfully.");
        form.reset();
        mutate();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Network error. Please try again.");
      } finally {
        setIsLoading(false);
        setIsOpen(false);
      }
    },
    [form, mutate, setIsOpen]
  );

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogDescription>
          Enter details for the new student account. Click submit when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <InputField
              name="name"
              label="Name"
              type="text"
              placeholder="Enter name"
              control={form.control}
            />
            <InputField
              name="f_name"
              label="Father's Name"
              type="text"
              placeholder="Enter father's name"
              control={form.control}
            />
            <InputField
              name="m_name"
              label="Mother's Name"
              type="text"
              placeholder="Enter mother's name"
              control={form.control}
            />
            <InputField
              name="dob"
              label="Date of Birth"
              type="date"
              placeholder="Select date of birth"
              control={form.control}
            />
            <SelectField
              name="sex"
              label="Gender"
              options={selectOptions.sex}
              placeholder="Select gender"
              control={form.control}
            />
            <SelectField
              name="category"
              label="Category"
              options={selectOptions.category}
              placeholder="Select category"
              control={form.control}
            />
            <SelectField
              name="religion"
              label="Religion"
              options={selectOptions.religion}
              placeholder="Select religion"
              control={form.control}
            />
            <InputField
              name="year_10th"
              label="10th Year"
              type="number"
              placeholder="Enter 10th year"
              control={form.control}
            />
            <SelectField
              name="board_10th"
              label="10th Board"
              options={selectOptions.board}
              placeholder="Select board"
              control={form.control}
            />
            <InputField
              name="per_10th"
              label="10th Percentage"
              type="number"
              step="0.01"
              placeholder="Enter 10th percentage"
              control={form.control}
            />
            <InputField
              name="year_12th"
              label="12th Year"
              type="number"
              placeholder="Enter 12th year"
              control={form.control}
            />
            <SelectField
              name="board_12th"
              label="12th Board"
              options={selectOptions.board}
              placeholder="Select board"
              control={form.control}
            />
            <SelectField
              name="sub_12th"
              label="12th Subject"
              options={selectOptions.sub_12th}
              placeholder="Select subject"
              control={form.control}
            />
            <InputField
              name="per_12th"
              label="12th Percentage"
              type="number"
              step="0.01"
              placeholder="Enter 12th percentage"
              control={form.control}
            />
            <InputField
              name="mobile_no_self"
              label="Mobile Number (Self)"
              type="text"
              placeholder="Enter mobile number"
              control={form.control}
            />
            <InputField
              name="mobile_no_alt"
              label="Mobile Number (Alternate)"
              type="text"
              placeholder="Enter alternate mobile number (optional)"
              control={form.control}
            />
            <InputField
              name="email_id"
              label="Email"
              type="email"
              placeholder="Enter email address"
              control={form.control}
            />
            <InputField
              name="address"
              label="Address"
              type="text"
              placeholder="Enter address"
              control={form.control}
            />
            <InputField
              name="bca_1st_y_per"
              label="BCA 1st Year Marks"
              type="number"
              step="0.01"
              placeholder="Enter BCA 1st year marks (optional)"
              control={form.control}
            />
            <InputField
              name="bca_2nd_y_per"
              label="BCA 2nd Year Marks"
              type="number"
              step="0.01"
              placeholder="Enter BCA 2nd year marks (optional)"
              control={form.control}
            />
            <InputField
              name="bca_3rd_y_per"
              label="BCA 3rd Year Marks"
              type="number"
              step="0.01"
              placeholder="Enter BCA 3rd year marks (optional)"
              control={form.control}
            />
          </div>
          <CustomButton
            title="Submit"
            loadingTitle="Submitting..."
            variant="default"
            isLoading={isLoading}
          />
        </form>
      </Form>
    </DialogContent>
  );
}