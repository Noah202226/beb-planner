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
    });
    return acc;
  }, {});

  console.log("New Events", newEVents);

  return (
    <>
      <CalendarWithAgenda newEVents={newEVents} />
    </>
  );
};

export default plans;

const styles = StyleSheet.create({});
