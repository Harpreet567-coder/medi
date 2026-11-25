import React from "react";
import { getStatusBadgeVariant } from "../../utils/helpers";

export const Badge = ({ children, variant, status }) => {
  const badgeVariant = variant || getStatusBadgeVariant(status || children);

  return (
    <span className={`badge badge-${badgeVariant}`}>
      {status || children}
    </span>
  );
};
