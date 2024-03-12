<script>
  import { setAppStatusStudent, setAppStatusTeacher } from "@/store.ts";

  const classButtons = {
    active:
      "py-2 px-3 border-b-2 border-l-2 border-primary hover:opacity-100 hover:border-primary",
    inactive:
      "py-2 px-3 border-b-2 border-l-2 border-black opacity-50 hover:opacity-100 hover:border-primary",
  };

  let classStudent = classButtons.active;
  let classTeacher = classButtons.inactive;

  function handleRoleChangeToStudent(e) {
    setAppStatusStudent();
    classStudent = classButtons.active;
    classTeacher = classButtons.inactive;
  }

  function handleRoleChangeToTeacher(e) {
    setAppStatusTeacher();
    classStudent = classButtons.inactive;
    classTeacher = classButtons.active;
  }
</script>

<div class="flex gap-4 lg:gap-8 justify-center text-3xl lg:text-4xl">
  <button
    type="button"
    class={classStudent}
    data-role="STUDENT"
    on:click={handleRoleChangeToStudent}>Estudiante</button
  >
  <button
    type="button"
    class={classTeacher}
    data-role="TEACHER"
    on:click={handleRoleChangeToTeacher}>Profesor</button
  >
</div>
