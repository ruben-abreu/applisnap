import SignUpButton from '../components/SignUpButton';

function HomePage() {
  return (
    <div className="h-full min-h-[100vh] w-[100%] flex flex-col justify-center items-center">
      <h1 className="text-[#677f8b] text-[3rem] mb-[30px]">AppliSnap</h1>
      <h2 className="mb-[30px]">Job Application Tracker</h2>
      <SignUpButton />
    </div>
  );
}

export default HomePage;
