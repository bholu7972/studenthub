import { Label } from "@/components/ui/label";
import { User } from "@/types/props";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Define props for ViewAdmin
interface ViewAccountProps {
  user: User;
  loginInfo: User | undefined | null;
}

// Permission mapping
const permissionMap: Record<string, string> = {
  "---": "No Access",
  "r--": "Read Only",
  "-w-": "Write Only",
  "--x": "Execute Only",
  "rw-": "Read and Write",
  "r-x": "Read and Execute",
  "-wx": "Write and Execute",
  rwx: "Read, Write, and Execute",
};

export default function ViewAccount({ user, loginInfo }: ViewAccountProps) {
  const convertDate = (dateFormat: string): string => {
    try {
      const date = new Date(dateFormat);
      if (isNaN(date.getTime())) {
        toast.error(`Invalid date format for ${dateFormat}`);
        return "Invalid Date";
      }
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      return date.toLocaleString("en-US", options);
    } catch (error) {
      console.error("Date conversion error:", error);
      toast.error(`Failed to parse date: ${dateFormat}`);
      return "Invalid Date";
    }
  };

  const fields = [
    { label: "Name", value: user.name },
    { label: "Email", value: user.email },
    { label: "Role", value: user.role },
    { label: "Permission", value: permissionMap[user.permission] || "Unknown" },
    loginInfo?.role === "admin"
      ? { label: "Password", value: user.password }
      : loginInfo?.email === user.email
      ? { label: "Password", value: user.password }
      : { label: "Password", value: "********" },
    { label: "Created At", value: convertDate(user.createdAt) },
    { label: "Updated At", value: convertDate(user.updatedAt) },
  ];

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Account Details</DialogTitle>
        <DialogDescription>View account information here.</DialogDescription>
      </DialogHeader>
      <div
        className="grid gap-2 py-4"
        role="definition"
        aria-label="Admin details"
      >
        {fields.map((item) => (
          <div className="flex gap-4 items-center" key={item.label}>
            <Label
              className="text-left whitespace-nowrap w-32 font-medium"
              htmlFor={item.label}
            >
              {item.label}
            </Label>
            <div
              id={item.label}
              className="border-b border-gray-300 text-left text-sm md:text-base w-full max-w-xs overflow-hidden text-ellipsis text-gray-600"
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </DialogContent>
  );
}
