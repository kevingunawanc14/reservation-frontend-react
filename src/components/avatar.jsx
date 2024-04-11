import { GiAbstract042 } from "react-icons/gi";
import { GiAbstract046 } from "react-icons/gi";
import { GiAbstract047 } from "react-icons/gi";
import { GiAbstract048 } from "react-icons/gi";
import { GiAbstract049 } from "react-icons/gi";
import { GiAce } from "react-icons/gi";
import { GiAchillesHeel } from "react-icons/gi";
import { GiAmericanFootballPlayer } from "react-icons/gi";
import { GiAndroidMask } from "react-icons/gi";
import { GiAnimalSkull } from "react-icons/gi";
import { GiAntarctica } from "react-icons/gi";
import { GiBatteredAxe } from "react-icons/gi";
import { GiBattleAxe } from "react-icons/gi";
import { GiBearFace } from "react-icons/gi";
import { GiBiceps } from "react-icons/gi";
import { GiBison } from "react-icons/gi";
import { GiBrute } from "react-icons/gi";
import { GiDoubleDragon } from "react-icons/gi";
import { GiMuscleFat } from "react-icons/gi";
import { GiMuscleUp } from "react-icons/gi";
import { GiTigerHead } from "react-icons/gi";

export default function AvatarIcon({ avatar, fontSize, className }) {

    const getIcon = () => {
        switch (avatar) {
            case "muscle":
                return <GiBison fontSize={fontSize} className={className} />;
            case "cat":
                return <GiDoubleDragon fontSize={fontSize} className={className} />;
            case "oni":
                return <GiBison fontSize={fontSize} className={className} />;
            case "bear-face":
                return <GiBearFace fontSize={fontSize} className={className} />;
            case "bear-head":
                return <GiBattleAxe fontSize={fontSize} className={className} />;
            case "brute":
                return <GiBrute fontSize={fontSize} className={className} />;
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