<template>
  <div class="flex flex-col items-center justify-center p-2 pt-8 md:p-16">
    <UiCard
      class="w-full max-w-3xl"
      title="GPA Calculator"
      description="Calculate your GPA based on your grades."
    >
      <template #content>
        <UiCardContent class="-mt-14">
          <div class="flex justify-end pb-2 align-middle">
            <UiButton variant="outline" size="icon"
              ><Icon class="h-4 w-4" name="lucide:plus" @click="addSubject"
            /></UiButton>
          </div>

          <div class="overflow-x-auto rounded-md pb-4">
            <UiTable>
              <UiTableHeader>
                <UiTableRow>
                  <UiTableHead>Subject</UiTableHead>
                  <UiTableHead class="w-36">Percent Grade</UiTableHead>
                  <UiTableHead>Credits</UiTableHead>
                  <UiTableHead>AP Course</UiTableHead>
                  <UiTableHead class="text-right">GPA</UiTableHead>
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
                      <UiSwitch
                        :checked="grade.isAP"
                        @update:checked="grade.isAP = $event"
                        id="`ap-${i}`"
                      />
                    </UiTableCell>
                    <UiTableCell class="w-16 text-right">
                      {{ getGPA(grade.percentGrade, grade.isAP) }}
                    </UiTableCell>
                  </UiTableRow>
                </template>
              </UiTableBody>
            </UiTable>
          </div>
        </UiCardContent>
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
  const grades = ref([
    {
      subject: "",
      percentGrade: 100,
      credits: 1,
      isAP: false,
    },
  ]);

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

  const addSubject = () => {
    grades.value.push({
      subject: "",
      percentGrade: 100,
      credits: 1,
      isAP: false,
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
    return 0;
  };

  const gpaRounding = (gpa: number, decimalPlaces: number = 2) => {
    if (gpa % 1 === 0) {
      return gpa.toFixed(decimalPlaces);
    } else {
      return gpa.toFixed(decimalPlaces);
    }
  };
</script>
