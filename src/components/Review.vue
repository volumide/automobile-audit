<template>
	<div class="flex justify-center items-center h-screen  py-8 flex-col" v-if="complaint">
		<p class=" p-3 font-bold text-blue-600 my-10 text-3xl">Automobile Audit Review Card</p>
		<div class="w-80  py-10 px-8 rounded-xl bg-gray-100 shadow-lg ">
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
				<button class="block w-full bg-blue-600 rounded p-4 font-semibold text-white">Submit</button>
			</div>
		</div>
	</div>
</template>

<script>
import {onMounted, ref} from 'vue'
export default {
	setup() {
		const complaint = ref([])
		const truncate = (word) =>(word&& word.length > 30 )? `${word.substring(0,29)}...` :word
		onMounted(() => {
			complaint.value = JSON.parse(localStorage.getItem('accepted'))['_value']
		})
		return {
			complaint,
			truncate
		}
	}
}
</script>