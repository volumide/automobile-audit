<template>
	<div class="bg flex items-center h-screen  py-6 flex-col" v-if="complaint">
		<p class=" p-3 font-bold text-white my-6 text-3xl">Audit Review Card</p>
		<!-- card design for outputing form result -->
		<div class="w-96  py-10 px-10 rounded-xl bg-gray-100 shadow-lg ">
			<div class="p-2">
				<small class="font-bold text-blue-500">Name</small>
				<p class="py-1 font-semibold text-lg">{{truncate(complaint.name)}}</p>
			</div>
			<div class="p-2">
				<small class="font-bold text-blue-500">Reference code</small>
				<p class="py-1 font-semibold text-lg">{{complaint.refCode}}</p>
			</div>
			<div class="p-2">
				<small class="font-bold text-blue-500">Email</small>
				<p class="py-1 font-semibold text-lg">{{complaint.email}}</p>
			</div>
			<div class="p-2">
				<small class="font-bold text-blue-500">Auto maker</small>
				<p class="py-1 font-semibold text-lg">{{complaint.maker}}</p>
			</div>
			<div class="p-2">
				<small class="font-bold text-blue-500">Model</small>
				<p class="py-1 font-semibold text-lg">{{complaint.model}}</p>
			</div>
			<div class="p-2">
				<small class="font-bold text-blue-500">Complaints</small>
				<ul class="flex flex-wrap py-1">
					<li v-for="(condition, index) in complaint.conditions" :key="index" class="p-2 mr-2 rounded bg-blue-100 font-semibold">
						{{condition}}
					</li>
				</ul>
			</div>
			<div class="p-2">
				<button class="block w-full bg-blue-600 rounded p-4 font-semibold text-white" @click="logJson">Submit</button>
			</div>
		</div>
	</div>
</template>

<script>
import {onMounted, ref} from 'vue'
export default {
	// all functions use in this setup are in modern javascript es6
	setup() {
		// initialize complaint card value
		const complaint = ref([])
		// function to truncate name greater than 30 characeter 
		const truncate = (word) =>(word && word.length > 30 )? `${word.substring(0,29)}...` : word

		// function logs the displayed result to console in json format
		const logJson = () => console.log(JSON.stringify(complaint.value))
		// store audit report from local storage into complaint variable to bind to html
		onMounted(() => {
			complaint.value = JSON.parse(localStorage.getItem('accepted'))['_value']
		})
		return {
			// return all ref and functions for dom manipulation
			complaint,
			truncate,
			logJson
		}
	}
}
</script>