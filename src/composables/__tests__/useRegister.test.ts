/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";

vi.mock("firebase/auth", async () => {
	const actual = await vi.importActual("firebase/auth");
	return {
		...actual,
		//get: vi.fn().mockResolvedValue({ user: { uid: "123" } }),
	};
});

import { useRegister } from "../useRegister";

describe("useRegister", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it("registerWithEmailAndPassword - success", async () => {
		const { registerWithEmailAndPassword } = useRegister();
		const userCredential = await registerWithEmailAndPassword({
			email: "teste@test.com",
			username: "teest",
			password: "paessword",
		});
		expect(userCredential?.user).toBeTruthy();
		expect(userCredential?.user?.displayName).toBe("teest");
		expect(userCredential?.user?.email).toBe("teste@test.com");
	});

	it("registerWithEmailAndPassword - failure", async () => {
		const { registerWithEmailAndPassword, error } = useRegister();
		await registerWithEmailAndPassword({
			email: "test@test.com",
			username: "test",
			password: "password",
		});
		//still working on this part
		expect(error.value).toBe(null);
	});
});
