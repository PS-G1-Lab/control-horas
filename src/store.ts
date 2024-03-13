import { writable } from "svelte/store"

export const ROLE_STATUS = {
	STUDENT: 0,
	TEACHER: 1,
}

export const appStatus = writable(ROLE_STATUS.STUDENT)

export const setAppStatusStudent = () => {
	appStatus.set(ROLE_STATUS.STUDENT)
}

export const setAppStatusTeacher = () => {
	appStatus.set(ROLE_STATUS.TEACHER)
}
