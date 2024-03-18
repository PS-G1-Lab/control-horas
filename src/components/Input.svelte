<script>
	export let { type, id, content, placeholder, value, required } = {
		type: "text",
		id: "input",
		content: "",
		placeholder: " ",
		value: "",
		required: "false",
	}
</script>

<div class="relative">
	<input
		{type}
		{id}
		{value}
		class="border-b-2 border-solid border-black"
		{placeholder}
		{required}
	/>
	{#if content !== ""}
		<label for={id}>{content}</label>
	{/if}
</div>

<style>
	input {
		width: 100%;
		background-color: none;
		padding-top: 0.6em;
		padding-bottom: 0.6em;
		outline: none;
	}

	label {
		color: #4c4c4c;
		cursor: pointer;
		position: absolute;
		top: 0;
		transform: translateY(10px);
		transition:
			transform 0.5s,
			color 0.3s;
	}

	input:first-child {
		margin-right: 10em;
	}

	input:focus + label,
	input:not(:placeholder-shown) + label {
		transform: translateY(-12px) scale(1);
		transform-origin: left top;
		color: #e6622e;
	}
</style>
