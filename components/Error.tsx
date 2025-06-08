
interface ErrorProps {
  error?: string;
}

export default function Error({ error }: ErrorProps) {
  return (
    <div className="flex justify-center items-center min-h-screen relative flex-col">
      {/* <Loader className="animate-spin" /> */}
      <h4>{error || "Something went wrong, Please try again."}</h4>
    </div>
  );
}
