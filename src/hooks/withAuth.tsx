import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../redux/store";

interface WithRoleProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const WithAuth = ({ allowedRoles, children }: WithRoleProps) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    if (
      !user?._id ||
      !user?.name ||
      !user?.email ||
      !user?.role ||
      !allowedRoles.includes(user.role)
    ) {
      router.push("/");
    }
  }, [user, allowedRoles, router]);

  if (
    user?._id &&
    user?.name &&
    user?.email &&
    user?.role &&
    allowedRoles.includes(user.role)
  ) {
    return <>{children}</>;
  }

  return null;
};

export default WithAuth;
