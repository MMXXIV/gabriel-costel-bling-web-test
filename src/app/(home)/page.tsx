import Navbar from '../../components/navbar/Navbar';
import HeroSection from './HeroSection';
import TablePage from './table/page';

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="w-screen bg-gray-200 flex items-start justify-between flex-col">
        <div className="w-full h-full flex flex-col items-start justify-center p-5 md:p-10">
          <HeroSection />
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center md:p-10 p-5">
          <TablePage />
        </div>
      </main>
    </>
  );
}
