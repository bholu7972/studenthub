import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface CustomButtonProps {
  title: string;
  loadingTitle: string;
  variant?: "default" | "destructive";
  isLoading: boolean;
}

export default function CustomButton({
  title,
  loadingTitle,
  variant = "default",
  isLoading,
}: CustomButtonProps) {
  return (
    <Button
      className="flex w-full items-center gap-1"
      type="submit"
      variant={variant}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" />
          {loadingTitle}
        </>
      ) : (
        title
      )}
    </Button>
  );
}