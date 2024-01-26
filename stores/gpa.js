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
      this.grades.push({ subject: '', percentGrade: 100, credits: 1, isAP: false });
    },
    removeCourse(index) {
      return this.grades.splice(index, 1);
    },
    restoreCourse(index, course) {
      return this.grades.splice(index, 0, course);
    },
    clear() {
      this.grades = [];
    },
  },
});

export function useGpaStoreWithPersistence() {
  const store = useGpaStore();

  const savedGrades = localStorage.getItem("userGrades");
  if (savedGrades) {
    store.grades = JSON.parse(savedGrades);
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
