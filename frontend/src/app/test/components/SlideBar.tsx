"use client";

import { Dispatch, SetStateAction } from "react";
import styles from "./sliderbar.module.css";

export default function SlideBar({
  setValue,
  leftText = "그렇지 않다",
  rightText = "그렇다",
}: {
  setValue: Dispatch<SetStateAction<number>>;
  leftText?: string;
  rightText?: string;
}) {
  const handlingSlider = (
    slider: EventTarget & HTMLInputElement,
    sliderValue: number
  ) => {
    /**
     * 오차범위
     */
    const rangeError = -((sliderValue - 50) * 0.04);
    slider.style.background = `linear-gradient(to right, #28282870 0%, #28282870 ${
      sliderValue + rangeError
    }%, rgb(236, 236, 236) ${
      sliderValue + rangeError
    }%, rgb(236, 236, 236) 100%)`;
    setValue(sliderValue);
  };

  return (
    <>
      <input
        type="range"
        className={styles.range}
        max={100}
        onChange={(e) => {
          handlingSlider(e.target, Number(e.target.value));
        }}
      />
      <div className={styles.div}>
        <span>{leftText}</span>
        <span>{rightText}</span>
      </div>
    </>
  );
}
