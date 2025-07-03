import { format } from "date-fns";

const formatDate = (isoString) => {
  return format(new Date(isoString), "MMM dd, yyyy hh:mm a");
};

export default formatDate;
