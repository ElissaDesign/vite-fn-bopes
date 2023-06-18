/* eslint-disable react/prop-types */
import ComingSoon from "../../components/coming-soom";

export default function RestaurantAccountant({ department }) {
  console.log("Restaurant:", department);

  return (
    <div className="px-[25px] pt-[72px]">
      <div className="flex justify-center items-center">
        <ComingSoon title="Restaurent coming soon" />
      </div>
    </div>
  );
}
