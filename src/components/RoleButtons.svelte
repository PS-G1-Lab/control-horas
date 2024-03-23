<script>
	import { ROLE_STATUS, appStatus, setAppStatusStudent, setAppStatusTeacher } from "@/store.ts"

	if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
		const localAppStatus = localStorage?.getItem("role")
		if (localAppStatus) {
			if (+localAppStatus === ROLE_STATUS.STUDENT) {
				setAppStatusStudent()
			} else {
				setAppStatusTeacher()
			}
		}
	}

	const classButtons = {
		active: "py-2 px-3 border-b-2 border-l-2 border-primary",
		inactive:
			"py-2 px-3 border-b-2 border-l-2 border-black opacity-50 hover:opacity-100 hover:border-primary",
	}

	let classStudent, classTeacher

	if ($appStatus === ROLE_STATUS.STUDENT) {
		classStudent = classButtons.active
		classTeacher = classButtons.inactive
	} else {
		classStudent = classButtons.inactive
		classTeacher = classButtons.active
	}

	function handleRoleChange(role) {
		if (role === 0) {
			return () => {
				setAppStatusStudent()
				classStudent = classButtons.active
				classTeacher = classButtons.inactive
				localStorage.setItem("role", ROLE_STATUS.STUDENT)
			}
		} else {
			return () => {
				setAppStatusTeacher()
				classStudent = classButtons.inactive
				classTeacher = classButtons.active
				localStorage.setItem("role", ROLE_STATUS.TEACHER)
			}
		}
	}
</script>

<div class="flex gap-4 lg:gap-8 justify-center text-3xl lg:text-4xl">
	<button type="button" class={classStudent} data-role="STUDENT" on:click={handleRoleChange(0)}
		>Estudiante</button
	>
	<button type="button" class={classTeacher} data-role="TEACHER" on:click={handleRoleChange(1)}
		>Profesor</button
	>
</div>
