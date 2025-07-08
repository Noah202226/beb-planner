import { StyleSheet } from "react-native";
import CalendarWithAgenda from "../components/plans/CalendarWithAgenda";

import { format } from "date-fns";
import usePlanStore from "../store/usePlanStore";

const plans = () => {
  const planStore = usePlanStore((state) => state.plans);

  const newEVents = planStore.reduce((acc, plan) => {
    if (!acc[format(new Date(plan.planDate), "yyyy-MM-dd")]) {
      acc[format(new Date(plan.planDate), "yyyy-MM-dd")] = [];
    }
    acc[format(new Date(plan.planDate), "yyyy-MM-dd")].push({
      id: plan.$id,
      name: plan.planName,
      planDate: format(new Date(plan.planDate), "yyyy-MM-dd"),
      time: format(new Date(plan.planDate), "hh:mm a"),
      fullDateTime: new Date(plan.planDate).toISOString(),
    });
    return acc;
  }, {});

  return (
    <>
      <CalendarWithAgenda newEVents={newEVents} />
    </>
  );
};

export default plans;

const styles = StyleSheet.create({});
