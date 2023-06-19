/* eslint-disable react/prop-types */
import ComingSoon from "../../components/coming-soom";

export default function RestaurantEmployee({ department }) {
  console.log("Restaurant:", department);

  return (
    <div className="px-[25px] pt-[72px]">
      <div className="flex justify-center items-center">
        <ComingSoon title="Employee Restaurent coming soon" />
      </div>
    </div>
  );
}
