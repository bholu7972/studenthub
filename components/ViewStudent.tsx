import { Label } from "@/components/ui/label";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Student, User } from "@/types/props";

interface UserField {
  label: string;
  value: string | number | boolean | undefined;
}

// Define props for ViewStudent
interface StudentProps {
  user: Student;
  loginInfo: User | undefined | null;
}

export default function ViewStudent({ user, loginInfo }: StudentProps) {
  const userFields: UserField[] = [
    { label: "Scholar No", value: user.schlor_no },
    {
      label: "Name",
      value: user.name + (user.withdrawl ? " (Withdrawl)" : ""),
    },
    { label: "Father Name", value: user.f_name },
    { label: "Mother Name", value: user.m_name },
    { label: "DOB", value: user.dob },
    { label: "Gender", value: user.sex === "M" ? "Male" : "Female" },
    { label: "Category", value: user.category },
    { label: "Religion", value: user.religion },
    {
      label: "10th",
      value: user.year_10th + ", " + user.board_10th + ", " + user.per_10th,
    },
    {
      label: "12th",
      value:
        user.year_12th +
        ", " +
        user.board_12th +
        ", " +
        user.sub_12th +
        ", " +
        user.per_12th,
    },
    loginInfo?.role === "admin" || loginInfo?.email === user.email_id
      ? { label: "Mobile No(self)", value: user.mobile_no_self }
      : { label: "Mobile No(self)", value: "********" },
    loginInfo?.role === "admin" || loginInfo?.email === user.email_id
      ? { label: "Mobile No(Alt)", value: user.mobile_no_alt }
      : { label: "Mobile No(Alt)", value: "********" },
    { label: "Email", value: user.email_id },
    loginInfo?.role === "admin" || loginInfo?.email === user.email_id
      ? { label: "Address", value: user.address }
      : { label: "Address", value: "********" },
    {
      label: "BCA 1,2,3rd",
      value:
        user.bca_1st_y_per +
        ", " +
        user.bca_2nd_y_per +
        ", " +
        user.bca_3rd_y_per,
    },
  ];

  return (
    <>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Student Details</DialogTitle>
          <DialogDescription>View student information here.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          {userFields.map((item: UserField, index: number) => (
            <div className="flex gap-4" key={index}>
              <Label className="text-left whitespace-nowrap w-34">
                {item.label}
              </Label>
              <div className="border-b border-slate-100 text-left text-sm md:text-base w-full max-w-xs overflow-hidden text-ellipsis">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </>
  );
}
