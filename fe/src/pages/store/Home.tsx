import GameCard from "../../components/GameCard";
import { ImageSlider, ContainerWrap } from "../../components";
import { useGetVouchersQuery } from "../../redux/api/voucher";
import { useEffect, useState } from "react";
import TutorialPopup from "../../components/TutorialPopup";

import { useAppSelector } from "./../../redux/hook";
const Home = () => {
  const { data, isLoading, isError } = useGetVouchersQuery();

  const vouchers = data || [];

  const [showPopup, setShowPopup] = useState(false);
  const hasSeenTutorial = useAppSelector(
    (state) => state.tutorialPopup.hasSeenTutorial
  );

  useEffect(() => {
    if (!hasSeenTutorial) {
      setShowPopup(true);
    }
  }, [hasSeenTutorial]);
  return (
    <div>
      {showPopup && <TutorialPopup onClose={() => setShowPopup(false)} />}
      {/* slider */}
      <ImageSlider />

      {/* game */}
      <ContainerWrap>
        <h2 className="text-2xl font-bold mb-6 mt-16">Game Populer</h2>

        {isLoading && <p>Loading...</p>}
        {isError && <p>Gagal memuat data voucher.</p>}

        <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
          {vouchers.map((voucher: any) => (
            <GameCard
              key={voucher._id}
              name={voucher.game_name}
              image={voucher.image_url}
              link={`/voucher/${voucher.game_name}`}
            />
          ))}
        </div>
      </ContainerWrap>
    </div>
  );
};

export default Home;
