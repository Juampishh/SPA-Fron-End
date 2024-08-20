import React from "react";
import { ClipLoader } from "react-spinners";

interface LoaderProps {
  loading: boolean;
  color?: string;
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({
  loading,
  color = "#3498db",
  size = 50,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ClipLoader color={color} loading={loading} size={size} />
    </div>
  );
};

export default Loader;
