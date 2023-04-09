<script lang="ts">
	import { format_size } from "../utils";

	export let file: ImageFile;

	async function getDimensions(file: ImageFile): Promise<[string, string]> {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => {
				let width = img.width.toString();
				let height = img.height.toString();
				if (file.type === "image/svg+xml") {
					width = width === "0" ? "∞" : width;
					height = height === "0" ? "∞" : height;
				}
				resolve([width, height]);
				URL.revokeObjectURL(img.src);
			};
			img.onerror = reject;
			img.src = URL.createObjectURL(file);
		});
	}

	function close() {}
</script>

<div class="file">
	<img height="32" src={URL.createObjectURL(file)} alt={file.name} />
	<span class="name">{file.name}</span>
	{#await getDimensions(file)}
		<span>...</span>
	{:then dimensions}
		<span>{dimensions[0]} × {dimensions[1]}</span>
	{/await}
	<span>{format_size(file.size)}</span>
	<span class="close" on:click={close} on:keydown={close}>
		<svg width="16" viewBox="0 0 32 32" stroke="black" stroke-width="8" stroke-linecap="round">
			<path d="M4 4L28 28M28 4L4 28" />
		</svg>
	</span>
</div>

<style>
	.file {
		display: grid;
		grid-template-columns: 3.2rem 3fr 3fr 1fr 3rem;
		gap: 2rem;
		background-color: #00c562;
		border-radius: 0.5rem;
		padding: 1rem;
		align-items: center;
		position: relative;
	}
	.name {
		font-weight: bold;
	}
	.close {
		width: 3rem;
		height: 3rem;
		display: grid;
		place-items: center;
		cursor: pointer;
	}
</style>
