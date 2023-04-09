<script lang="ts">
	import ImgPreview from "./ImgPreview.svelte";

	export let files = [];
	const ACCEPTED_TYPES = new Set(["image/jpeg", "image/png", "image/svg+xml"]);

	function dropHandler(e: DragEvent & { currentTarget: HTMLLabelElement & EventTarget }) {
		e.currentTarget.classList.remove("drag-over");
		if (e.dataTransfer.items) {
			const processed_files = [];
			for (const item of e.dataTransfer.items) {
				if (item.kind === "file" && ACCEPTED_TYPES.has(item.type)) {
					processed_files.push(item.getAsFile());
				}
			}
			updateFileList(processed_files);
		}
	}

	function changeHandler(e: Event & { currentTarget: HTMLInputElement & EventTarget }) {
		const processed_files = [];
		for (const file of e.currentTarget.files) {
			if (ACCEPTED_TYPES.has(file.type)) {
				processed_files.push(file);
			}
		}
		updateFileList(processed_files);
	}

	function updateFileList(new_files: File[]) {
		const result = [];
		let add = true;
		for (const file of files) {
			for (const new_file of new_files) {
				if (file.name === new_file.name) {
					add = false;
					break;
				}
			}
			if (add) result.push(file);
			add = true;
		}
		for (const new_file of new_files) {
			result.push(new_file);
		}
		files = result;
	}
</script>

<input
	type="file"
	name="upload"
	id="upload"
	multiple
	on:change={changeHandler}
	accept={[...ACCEPTED_TYPES].join(", ")}
/>
<label
	for="upload"
	on:dragover|preventDefault={function () {
		this.classList.add("drag-over");
	}}
	on:dragleave={function () {
		this.classList.remove("drag-over");
	}}
	on:drop|preventDefault={dropHandler}
>
	<h3>Upload Images</h3>
	<svg width="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
		<mask id="jpg-text">
			<rect x="21" y="105" width="214" height="105" fill="#fff" />
			<text y="183" x="63" fill="#000">JPG</text>
		</mask>
		<path d="M167 8l60 60v160c0 15-5 20-20 20h-158c-15 0-20-5-20-20v-200c0-15 5-20 20-20z" />
		<rect x="21" y="105" width="214" height="105" fill="#2D98F0" mask="url(#jpg-text)" />
	</svg>

	<svg width="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
		<mask id="svg-text">
			<rect x="21" y="105" width="214" height="105" fill="#fff" />
			<text y="183" x="60" fill="#000">SVG</text>
		</mask>
		<path d="M167 8l60 60v160c0 15-5 20-20 20h-158c-15 0-20-5-20-20v-200c0-15 5-20 20-20z" />
		<rect x="21" y="105" width="214" height="105" fill="#FFB13B" mask="url(#svg-text)" />
	</svg>

	<svg width="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
		<mask id="png-text">
			<rect x="21" y="105" width="214" height="105" fill="#fff" />
			<text y="183" x="57" fill="#000">PNG</text>
		</mask>
		<path d="M167 8l60 60v160c0 15-5 20-20 20h-158c-15 0-20-5-20-20v-200c0-15 5-20 20-20z" />
		<rect x="21" y="105" width="214" height="105" fill="#00C562" mask="url(#png-text)" />
	</svg>
	<div>Click here or drop files to upload them</div>
</label>
<div class="files">
	{#each files as file}
		<ImgPreview {file} />
	{/each}
</div>

<style lang="scss">
	input {
		display: none;
	}
	label {
		box-shadow: 0 0 0.5rem 0 inset #00000040;
		border: dashed #d8d8d8 0.25rem;
		padding-block: 1rem;
		padding-inline: 5rem;
		display: block;
		cursor: pointer;
		border-radius: 1rem;
		text-align: center;
		width: fit-content;
		position: relative;
		overflow: hidden;
		h3 {
			margin-top: 0;
		}
		&::after {
			content: "";
			position: absolute;
			background-color: #5096ff;
			z-index: -1;
			inset: 0;
			opacity: 0;
			transition: opacity 0.1s ease-in-out;
		}
		&:hover,
		&:global(.drag-over) {
			path {
				stroke: white;
			}
			&::after {
				opacity: 25%;
			}
		}
	}
	svg {
		width: 7rem;
	}
	text {
		font-family: "Roboto", sans-serif;
		font-size: 70px;
		font-weight: bold;
	}
	path {
		transition: stroke 0.1s ease-in-out;
		stroke: #d8d8d8;
		stroke-width: 16;
	}
	.files {
		display: grid;
		gap: 1rem;
	}
</style>
