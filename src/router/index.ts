import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/authStore";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ProfileView from "../views/ProfileView.vue";
import RegisterView from "../views/RegisterView.vue";
import EditSnippetView from "../views/EditSnippetView.vue";
import ShowSnippetView from "../views/ShowSnippetView.vue";
import CreateSnippetView from "../views/CreateSnippetView.vue";
import PersonnalSnippetsView from "../views/PersonalSnippetsView.vue";

// import TestLayout from "../views/TestLayout.vue";

const routes = [
	{ path: "/", component: HomeView },
	{ path: "/login", component: LoginView, meta: { requiresAuth: false } },
	{ path: "/register", component: RegisterView, meta: { requiresAuth: false } },
	{
		path: "/snippet/:id",
		component: ShowSnippetView,
		meta: { requiresAuth: false },
	},
	{
		path: "/edit/:id",
		component: EditSnippetView,
		meta: { requiresAuth: true },
	},
	{
		path: "/create-snippet",
		component: CreateSnippetView,
		meta: { requiresAuth: true },
	},
	{
		path: "/profile",
		component: ProfileView,
		meta: { requiresAuth: true },
	},
	{
		path: "/personal-snippets",
		component: PersonnalSnippetsView,
		meta: { requiresAuth: true },
	},
	{
		path: "/settings",
		component: ProfileView,
		meta: { requiresAuth: true },
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, _, next) => {
	const authStore = useAuthStore();
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

	if (requiresAuth && !authStore.isLoggedIn) {
		next({ path: "/login" });
	} else {
		next();
	}
});

export default router;
