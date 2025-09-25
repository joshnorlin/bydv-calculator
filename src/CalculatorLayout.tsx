import { Outlet } from "react-router-dom";
import { CalculateSubHeader } from "./components/CalculateSubHeader";
const CalculatorLayout = () => {
  return (
    <>
      <CalculateSubHeader />
      <Outlet /> {/* renders the nested route components */}
    </>
  );
};

export default CalculatorLayout;
