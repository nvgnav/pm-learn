import { durationSections } from "./part1Duration";
import { costSections } from "./part2Cost";
import { timeCostSections } from "./part3TimeCost";

export const documentDownload = {
  title: "Учёт случайности при управлении проектами_Аудиторная_доп.doc",
  href: "/practice/Учет_случайности_при_управлении_проектами_Аудиторная_доп.doc",
};

export const costPracticeSections = [
  ...durationSections,
  ...costSections,
  ...timeCostSections,
];