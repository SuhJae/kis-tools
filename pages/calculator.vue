<template>
  <div class="flex flex-col items-center justify-center p-2 pt-8 md:p-16">
    <UiCard class="w-full max-w-3xl">
      <template #content>
        <UiCardContent>
          <div class="flex justify-between pb-4">
            <div class="flex flex-col">
              <p class="mb-2 text-xl font-bold">GPA Calculator</p>
              <p class="text-sm text-muted-foreground">Calculate your GPA based on your grades.</p>
            </div>

            <div class="z flex justify-end space-x-2 pb-2 align-middle">
              <UiAlertDialog v-model:open="model">
                <UiAlertDialogTrigger as-child>
                  <UiButton variant="destructive" size="icon"
                    ><Icon class="h-4 w-4" name="lucide:trash"
                  /></UiButton>
                </UiAlertDialogTrigger>
                <UiAlertDialogContent>
                  <UiAlertDialogHeader>
                    <UiAlertDialogTitle>Are you absolutely sure?</UiAlertDialogTitle>
                    <UiAlertDialogDescription>
                      This will reset all the entries in the table.
                    </UiAlertDialogDescription>
                  </UiAlertDialogHeader>
                  <UiAlertDialogFooter>
                    <UiAlertDialogCancel />
                    <UiAlertDialogAction @click="resetTable" variant="destructive" />
                  </UiAlertDialogFooter>
                </UiAlertDialogContent>
              </UiAlertDialog>

              <UiButton variant="outline" size="icon" @click="gpaStore.addCourse()"
                ><Icon class="h-4 w-4" name="lucide:plus"
              /></UiButton>
            </div>
          </div>

          <div class="overflow-x-auto rounded-md">
            <UiTable>
              <UiTableHeader>
                <UiTableRow>
                  <UiTableHead>Subject</UiTableHead>
                  <UiTableHead class="w-36">Percent Grade</UiTableHead>
                  <UiTableHead>Credits</UiTableHead>
                  <UiTableHead>AP Course</UiTableHead>
                  <UiTableHead class="text-right">GPA</UiTableHead>
                  <UiTableHead class="text-right"></UiTableHead>
                </UiTableRow>
              </UiTableHeader>
              <UiTableBody class="last:border-b">
                <template v-for="(grade, i) in grades" :key="grades.id">
                  <UiTableRow>
                    <UiTableCell>
                      <UiInput v-model="grade.subject" class="w-50" placeholder="Subject Name" />
                    </UiTableCell>
                    <UiTableCell class="flex items-center space-x-2">
                      <UiInput
                        type="number"
                        v-model="grade.percentGrade"
                        class="w-14 text-center"
                        @blur="grade.percentGrade = checkPercentGrade(grade.percentGrade)"
                      />
                      <span class="text-muted-foreground">
                        ({{ getLetterGrade(grade.percentGrade) }})
                      </span>
                    </UiTableCell>
                    <UiTableCell>
                      <UiInput
                        type="number"
                        v-model="grade.credits"
                        class="w-14 text-center"
                        @blur="grade.credits = grade.credits < 0 ? 0 : grade.credits"
                      />
                    </UiTableCell>
                    <UiTableCell>
                      <UiSwitch :checked="grade.isAP" @update:checked="grade.isAP = $event" />
                    </UiTableCell>
                    <UiTableCell class="w-16 text-right">
                      {{ getGPA(grade.percentGrade, grade.isAP) }}
                    </UiTableCell>
                    <UiTableCell>
                      <UiButton variant="ghost" size="icon" @click="dropRow(i)"
                        ><Icon class="h-4 w-4" name="lucide:x"
                      /></UiButton>
                    </UiTableCell>
                  </UiTableRow>
                </template>
              </UiTableBody>
            </UiTable>
          </div>
        </UiCardContent>

        <div class="flex justify-center p-4 pt-0">
          <div class="flex flex-col items-center">
            <p class="text-muted-foreground">
              Weighted GPA: <span class="font-bold text-primary"> {{ weightedGPA }}</span>
            </p>
            <p class="text-muted-foreground">
              Unweighted GPA: <span class="font-bold text-primary"> {{ unweightedGPA }}</span>
            </p>
          </div>
        </div>
      </template>
    </UiCard>
  </div>
</template>

<style>
  /* Removes arrows from number input */
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>

<script lang="ts" setup>
  import { useGpaStoreWithPersistence } from "@/stores/gpa";

  const gpaStore = useGpaStoreWithPersistence();
  const grades = gpaStore.grades;

  let gradesBackup: { subject: string; percentGrade: number; credits: number; isAP: boolean }[] =
    [];
  const model = ref(false);

  const weightedGPA = computed(() => {
    return computeGPA(true);
  });

  const unweightedGPA = computed(() => {
    return computeGPA(false);
  });

  const computeGPA = (isWeighted: boolean) => {
    let totalGPA = 0;
    let totalCredits = 0;

    // Ensure that grades is defined and is an array
    if (Array.isArray(grades) && grades.length > 0) {
      grades.forEach((grade) => {
        let gpa = Number(getGPA(grade.percentGrade, isWeighted && grade.isAP));

        totalGPA = Number(totalGPA) + gpa * grade.credits;
        totalCredits += grade.credits;
      });

      return totalCredits > 0 ? gpaRounding(totalGPA / totalCredits) : 0;
    } else {
      // Handle case where grades is not an array
      return 0;
    }
  };

  const gradeThresholds = [
    { threshold: 97, letterGrade: "A+", gpa: 4.0 },
    { threshold: 93, letterGrade: "A", gpa: 4.0 },
    { threshold: 90, letterGrade: "A-", gpa: 3.7 },
    { threshold: 87, letterGrade: "B+", gpa: 3.3 },
    { threshold: 83, letterGrade: "B", gpa: 3.0 },
    { threshold: 80, letterGrade: "B-", gpa: 2.7 },
    { threshold: 77, letterGrade: "C+", gpa: 2.3 },
    { threshold: 73, letterGrade: "C", gpa: 2.0 },
    { threshold: 70, letterGrade: "C-", gpa: 1.7 },
    { threshold: 67, letterGrade: "D+", gpa: 1.3 },
    { threshold: 63, letterGrade: "D", gpa: 1.0 },
    { threshold: 60, letterGrade: "D-", gpa: 0.7 },
    { threshold: 50, letterGrade: "F", gpa: 0.0 },
  ];

  const resetTable = () => {
    console.log("reset");
    gradesBackup = gpaStore.clear();

    useSonner("", {
      description: "Table cleared",
      duration: 6000,
      action: {
        label: "undo",
        onClick() {
          gpaStore.restore(gradesBackup);
          useSonner.success("", {
            description: "Table restored",
            duration: 1500,
          });
        },
      },
    });
  };

  const dropRow = (index: number) => {
    let dropeedRow = gpaStore.removeCourse(index);

    useSonner("", {
      description: "Row deleted",
      duration: 4000,
      action: {
        label: "undo",
        onClick() {
          gpaStore.restoreCourse(dropeedRow);
          useSonner.success("", {
            description: "Row restored",
            duration: 1500,
          });
        },
      },
    });
  };

  const checkPercentGrade = (percentGrade: number) => {
    if (percentGrade > 100) {
      return 100;
    } else if (percentGrade < 0) {
      return 0;
    } else {
      return percentGrade;
    }
  };

  const getLetterGrade = (percentGrade: number) => {
    for (let i = 0; i < gradeThresholds.length; i++) {
      if (percentGrade >= gradeThresholds[i].threshold) {
        return gradeThresholds[i].letterGrade;
      }
    }
    return "NG";
  };

  const getGPA = (percentGrade: number, isAP: boolean) => {
    for (let i = 0; i < gradeThresholds.length; i++) {
      if (percentGrade >= gradeThresholds[i].threshold) {
        if (isAP) {
          return gpaRounding(gradeThresholds[i].gpa + 1);
        } else {
          return gpaRounding(gradeThresholds[i].gpa);
        }
      }
    }
    return "0";
  };

  const gpaRounding = (gpa: number, decimalPlaces: number = 2) => {
    if (gpa % 1 === 0) {
      return gpa.toFixed(decimalPlaces);
    } else {
      return gpa.toFixed(decimalPlaces);
    }
  };
</script>
