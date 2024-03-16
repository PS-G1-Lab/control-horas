<script>
	import StudentForm from "@/components/StudentForm.svelte"
	import TeacherForm from "@/components/TeacherForm.svelte"
	import { ROLE_STATUS, appStatus } from "@/store.ts"
</script>

<div class="flex justify-around">
	{#if $appStatus === ROLE_STATUS.STUDENT}
		<StudentForm />
	{:else if $appStatus === ROLE_STATUS.TEACHER}
		<TeacherForm />
	{/if}
</div>
