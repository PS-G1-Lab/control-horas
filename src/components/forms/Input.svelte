<script>
	export let { type, id, content, placeholder, value, required } = {
		type: "text",
		id: "input",
		content: "",
		placeholder: "",
		value: "",
		required: "false",
	}
</script>

<div class="relative w-72">
	<input
		{type}
		{id}
		{value}
		class="border-b-2 border-solid border-black w-full bg-transparent py-3 outline-none"
		{placeholder}
		{required}
	/>
	{#if content !== ""}
		<label for={id}>{content}</label>
	{/if}
</div>

<style>
	label {
		color: #4c4c4c;
		cursor: pointer;
		position: absolute;
		top: 0;
		transform: translateY(10px);
		transition:
			transform 0.5s,
			color 0.3s;
		left: 0;
	}

	input:focus + label,
	input:not(:placeholder-shown) + label {
		transform: translateY(-12px) scale(1);
		transform-origin: left top;
		color: #e6622e;
	}
</style>
