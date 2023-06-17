import UnDraw from "../assets/images/undraw.png";

// eslint-disable-next-line react/prop-types
export default function ComingSoon({ title }) {
  return (
    <div className="">
      <h2 className="text-lg font-semibold dark:text-dark-text-fill">
        {title} Page is coming soon
      </h2>
      <img src={UnDraw} width={300} alt="construction" className="pt-4" />
    </div>
  );
}
