import { format } from "date-fns";

const formatDate = (isoString) => {
  return format(new Date(isoString), "iii MMM dd yyyy");
};

export default formatDate;
