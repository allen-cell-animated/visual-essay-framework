import * as React from "react";
import Button from "../uiLibrary/Button";

const styles = require("./style.css");
interface PlayBackProps {
    playHandler: () => void;
    time: number;
    pauseHandler: () => void;
    prevHandler: () => void;
    nextHandler: () => void;
    totalTime: number;
    isPlaying: boolean;
    onTimeChange: (time: number) => void;
}

const PlayBackControls = ({
    time,
    playHandler,
    pauseHandler,
    prevHandler,
    isPlaying,
    nextHandler,
    totalTime,
    onTimeChange,
}: PlayBackProps) => {
    const sliderMax = totalTime / 1000;

    const convertSliderValueToNs = (sliderValue: number): number => {
        return (sliderValue / sliderMax) * totalTime;
    };

    const convertTimeToSliderValue = (): number => {
        return (time / totalTime) * sliderMax;
    };

    const handleTimeChange = (sliderValue: number | [number, number]): void => {
        const time = convertSliderValueToNs(sliderValue as number);
        onTimeChange(time);
    };

    const tipFormatter = (sliderValue: number): string => {
        return `${sliderValue}k ns`;
    };

    return (
        <div className={styles.container}>
            <Button classes={[styles.item, "disabled" ? time === 0 : ""]} onClick={prevHandler}>
                Step back
            </Button>

            {/* <Slider
                value={convertTimeToSliderValue()}
                onChange={handleTimeChange}
                tipFormatter={tipFormatter}
                classes={[styles.slider, styles.item]}
                max={sliderMax}
            /> */}
            <Button classes={[styles.item]} onClick={isPlaying ? pauseHandler : playHandler}>
                {isPlaying ? "pause" : "play"}
            </Button>
            <Button classes={[styles.item]} onClick={nextHandler}>
                {" "}
                Step forward{" "}
            </Button>
        </div>
    );
};
export default PlayBackControls;
