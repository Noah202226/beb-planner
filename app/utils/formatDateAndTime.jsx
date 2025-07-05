import { format } from "date-fns";

const formatDateAndTime = (isoString) => {
  return format(new Date(isoString), "MMM dd, yyyy hh:mm a");
};

export default formatDateAndTime;
