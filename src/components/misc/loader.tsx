import { FC } from "react";
import clsx from "clsx";

interface LoaderProps {
  className?: string;
}
const Loader: FC<LoaderProps> = ({ className }) => {
  return (
    <div
      className={clsx("flex justify-center items-center h-[300px]", className)}
    >
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white" />
    </div>
  );
};
export default Loader;
