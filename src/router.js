import { createWebHistory, createRouter   } from "vue-router";
import Form from './components/Form'
import Review from './components/Review'
const routes = [
	{ path: '/', component: Form },
	{ path: '/review', component: Review }
]

const route = createRouter({
history: createWebHistory(),
routes,
});
  
export default route;
  