import { Logo } from "@/components/Logo";
import { useRdStationLoader } from "@/lib/rdStation";

const AdsEmpreendeBrasil = () => {
  useRdStationLoader();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Logo />
    </div>
  );
};

export default AdsEmpreendeBrasil;
