export interface Lecture {
  courseName: string;
  sections: SectionDto[];
  currentLecture: number;
}

export interface SectionDto {
  sectionName: string;
  lectures: LectureDto[];
}

export interface LectureDto {
  id: number;
  title: string;
  url: string;
}
