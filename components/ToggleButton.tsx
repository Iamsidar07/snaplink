"use client"
interface Props {
    isAutoPaste: boolean;
    setIsAutoPaste: (isAutoPaste: boolean) => void;
}
const ToggleButton = ({ isAutoPaste, setIsAutoPaste }: Props) => {

    const toggleOption = () => {
        setIsAutoPaste(!isAutoPaste)
    };

    return (
        <button
            onClick={toggleOption}
            className={`bg-secondary ring-1 ring-secondary shadow-lg w-12 h-5 rounded-full relative transition-colors duration-300 focus:outline-none`}
        >
            <div
                className={`${isAutoPaste ? 'translate-x-7' : 'translate-x-0'
                    } absolute left-0 top-0 w-5 h-5 bg-primary rounded-full shadow-md transform transition-transform duration-300`}
            ></div>

        </button>
    );
};

export default ToggleButton;