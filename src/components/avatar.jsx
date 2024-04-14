import { GiMuscleFat } from "react-icons/gi";
import { GiMuscleUp } from "react-icons/gi";
import { GiTigerHead } from "react-icons/gi";
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

export default function AvatarIcon({ avatar, fontSize, className }) {

    const getIcon = () => {
        switch (avatar) {
            case "GiMuscleFat":
                return <GiMuscleFat fontSize={fontSize} className={className} />;
            case "GiMuscleUp":
                return <GiMuscleUp fontSize={fontSize} className={className} />;
            case "GiTigerHead":
                return <GiTigerHead fontSize={fontSize} className={className} />;
            case "GiAbstract042":
                return <GiAbstract042 fontSize={fontSize} className={className} />;
            case "GiAbstract046":
                return <GiAbstract046 fontSize={fontSize} className={className} />;
            case "GiAbstract047":
                return <GiAbstract047 fontSize={fontSize} className={className} />;
            case "GiAbstract048":
                return <GiAbstract048 fontSize={fontSize} className={className} />;
            case "GiAbstract049":
                return <GiAbstract049 fontSize={fontSize} className={className} />;
            case "GiAce":
                return <GiAce fontSize={fontSize} className={className} />;
            case "GiAchillesHeel":
                return <GiAchillesHeel fontSize={fontSize} className={className} />;
            case "GiAmericanFootballPlayer":
                return <GiAmericanFootballPlayer fontSize={fontSize} className={className} />;
            case "GiAndroidMask":
                return <GiAndroidMask fontSize={fontSize} className={className} />;
            case "GiAnimalSkull":
                return <GiAnimalSkull fontSize={fontSize} className={className} />;
            case "GiAntarctica":
                return <GiAntarctica fontSize={fontSize} className={className} />;
            case "GiBatteredAxe":
                return <GiBatteredAxe fontSize={fontSize} className={className} />;
            case "GiBattleAxe":
                return <GiBattleAxe fontSize={fontSize} className={className} />;
            case "GiBearFace":
                return <GiBearFace fontSize={fontSize} className={className} />;
            case "GiBiceps":
                return <GiBiceps fontSize={fontSize} className={className} />;
            case "GiBison":
                return <GiBison fontSize={fontSize} className={className} />;
            case "GiBrute":
                return <GiBrute fontSize={fontSize} className={className} />;
            case "GiDoubleDragon":
                return <GiDoubleDragon fontSize={fontSize} className={className} />;
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