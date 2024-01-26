import { defineStore } from "pinia";
import { watch } from "vue";

export const useGpaStore = defineStore("gpa", {
  state: () => {
    // Initialize state with empty default grades
    return {
      grades: [
        {
          subject: "",
          percentGrade: 100,
          credits: 1,
          isAP: false,
        },
      ],
    };
  },
  getters: {
    getGrades() {
      return this.grades;
    },
  },
  actions: {
    addCourse() {
      this.grades.push({ subject: "", percentGrade: 100, credits: 1, isAP: false });
    },
    removeCourse(index) {
      let deleted = this.grades[index];
      this.grades.splice(index, 1);
      return deleted;
    },
    restoreCourse(course) {
      // add the course back to the array
      this.grades.push(course);
    },
    clear() {
      let temp = [];
      while (this.grades.length > 0) {
        temp.push(this.grades[this.grades.length - 1]);
        this.grades.pop();
      }
      return temp;
    },
    restore(grades) {
      for (let i = 0; i < grades.length; i++) {
        this.grades.push(grades[i]);
      }
    },
  },
});

export function useGpaStoreWithPersistence() {
  const store = useGpaStore();
  const defaultGrade = [
    {
      subject: "",
      percentGrade: 100,
      credits: 1,
      isAP: false,
    },
  ];

  const savedGrades = localStorage.getItem("userGrades");
  store.grades = savedGrades && savedGrades.length > 0 ? JSON.parse(savedGrades) : defaultGrade;

  if (!Array.isArray(store.grades)) {
    store.grades = defaultGrade;
  }

  // Watch for changes and update localStorage
  watch(
    () => store.grades,
    (newGrades) => {
      localStorage.setItem("userGrades", JSON.stringify(newGrades));
    },
    { deep: true }
  );

  return store;
}
