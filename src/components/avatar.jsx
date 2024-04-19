import { GiMuscleFat } from "react-icons/gi";
import { GiMuscleUp } from "react-icons/gi";
import { GiBowman } from "react-icons/gi";
import { GiBullyMinion } from "react-icons/gi";

import { GiCardJoker } from "react-icons/gi";
import { GiDwarfFace } from "react-icons/gi";
import { GiEnrage } from "react-icons/gi";
import { GiFireDash } from "react-icons/gi";

import { GiFluffyCloud } from "react-icons/gi";
import { GiGiant } from "react-icons/gi";
import { GiGolemHead } from "react-icons/gi";
import { GiHeadshot } from "react-icons/gi";

import { GiPolarBear } from "react-icons/gi";
import { GiSickle } from "react-icons/gi";
import { GiHoodedAssassin } from "react-icons/gi";
import { GiUnicorn } from "react-icons/gi";

import { GiBatteredAxe } from "react-icons/gi";
import { GiWeightLiftingUp } from "react-icons/gi";
import { GiTornado } from "react-icons/gi";
import { GiAncientSword } from "react-icons/gi";

// import { GiLightningSaber } from "react-icons/gi";
// import { GiCardJoker } from "react-icons/gi";
// import { GiTigerHead } from "react-icons/gi";
// import { GiBearFace } from "react-icons/gi";

// import { GiAncientSword } from "react-icons/gi";
// import { GiHypersonicBolt } from "react-icons/gi";
// import { GiFirePunch } from "react-icons/gi";
// import { GiArmorPunch } from "react-icons/gi";

// import { GiTigerHead } from "react-icons/gi";
// import { GiAbstract042 } from "react-icons/gi";
// import { GiAbstract046 } from "react-icons/gi";
// import { GiAbstract047 } from "react-icons/gi";
// import { GiAbstract048 } from "react-icons/gi";
// import { GiAbstract049 } from "react-icons/gi";
// import { GiAce } from "react-icons/gi";
// import { GiAchillesHeel } from "react-icons/gi";
// import { GiAmericanFootballPlayer } from "react-icons/gi";
// import { GiAndroidMask } from "react-icons/gi";
// import { GiAnimalSkull } from "react-icons/gi";
// import { GiAntarctica } from "react-icons/gi";
// import { GiBatteredAxe } from "react-icons/gi";
// import { GiBattleAxe } from "react-icons/gi";
// import { GiBearFace } from "react-icons/gi";
// import { GiBiceps } from "react-icons/gi";
// import { GiBison } from "react-icons/gi";
// import { GiBrute } from "react-icons/gi";
// import { GiDoubleDragon } from "react-icons/gi";
// import { GiAmericanFootballHelmet } from "react-icons/gi";
// import { GiAmericanFootballBall } from "react-icons/gi";
// import { GiBaseballBat } from "react-icons/gi";
// import { GiBaseballGlove } from "react-icons/gi";
// import { GiBasketballBasket } from "react-icons/gi";
// import { GiDeerHead } from "react-icons/gi";
// import { GiGymBag } from "react-icons/gi";

export default function AvatarIcon({ avatar, fontSize, className }) {

    const getIcon = () => {
        switch (avatar) {
            case "GiMuscleFat":
                return <GiMuscleFat fontSize={fontSize} className={className} />;
            case "GiMuscleUp":
                return <GiMuscleUp fontSize={fontSize} className={className} />;
            case "GiBowman":
                return <GiBowman fontSize={fontSize} className={className} />;
            case "GiBullyMinion":
                return <GiBullyMinion fontSize={fontSize} className={className} />;

            case "GiCardJoker":
                return <GiCardJoker fontSize={fontSize} className={className} />;
            case "GiDwarfFace":
                return <GiDwarfFace fontSize={fontSize} className={className} />;
            case "GiEnrage":
                return <GiEnrage fontSize={fontSize} className={className} />;
            case "GiFireDash":
                return <GiFireDash fontSize={fontSize} className={className} />;

            case "GiFluffyCloud":
                return <GiFluffyCloud fontSize={fontSize} className={className} />;
            case "GiGiant":
                return <GiGiant fontSize={fontSize} className={className} />;
            case "GiGolemHead":
                return <GiGolemHead fontSize={fontSize} className={className} />;
            case "GiHeadshot":
                return <GiHeadshot fontSize={fontSize} className={className} />;

            case "GiPolarBear":
                return <GiPolarBear fontSize={fontSize} className={className} />;
            case "GiSickle":
                return <GiSickle fontSize={fontSize} className={className} />;
            case "GiHoodedAssassin":
                return <GiHoodedAssassin fontSize={fontSize} className={className} />;
            case "GiUnicorn":
                return <GiUnicorn fontSize={fontSize} className={className} />;

            case "GiBatteredAxe":
                return <GiBatteredAxe fontSize={fontSize} className={className} />;
            case "GiWeightLiftingUp":
                return <GiWeightLiftingUp fontSize={fontSize} className={className} />;
            case "GiTornado":
                return <GiTornado fontSize={fontSize} className={className} />;
            case "GiAncientSword":
                return <GiAncientSword fontSize={fontSize} className={className} />;


            default:
                return null;
        }
    };

    return (
        <>
            {getIcon()}
        </>
    );
}