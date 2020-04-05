import Splash from "./Splash";
import SectionOne from "./Section_1";
import SectionTwo from "./Section_2";
import SectionThree from "./Section_3";
import SectionFour from "./Section_4";
import Conclusion from "./Conclusion";

const initArray: number[] = [];

export const sectionBreaks = [
    Splash,
    SectionOne,
    SectionTwo,
    SectionThree,
    SectionFour,
    Conclusion,
].reduce((acc, cur, index: number) => {
    if (index == 0) {
        acc.push(cur.length);
    } else {
        acc[index] = cur.length + acc[index - 1];
    }
    return acc;
}, initArray);

export default [
    ...Splash,
    ...SectionOne,
    ...SectionTwo,
    ...SectionThree,
    ...SectionFour,
    ...Conclusion,
];
