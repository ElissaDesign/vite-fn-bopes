export default function Final() {
  return (
    <div className="container md:mt-8">
      <div className="flex flex-col items-center">
        <div className="mt-3 text-xl font-regular uppercase text-blue">
          <p className="text-center text-4xl mb-6 mt-[-40px]"> 🎉</p>
          Congratulations!
        </div>
        <div className="text-base font-regular text-gray-300 my-6">
          Your account has been created.
        </div>
        <a className="mt-10" href="dashboard">
          <button className="h-10 px-5 text-primary transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-primary hover:text-white hover:border-none">
            Start
          </button>
        </a>
      </div>
    </div>
  );
}
