import Alpine from "alpinejs";

// Declarar Alpine en Window
declare global {
    interface Window {
        Alpine: typeof Alpine;
    }
}

// Hacer Alpine disponible globalmente para mejor DX
window.Alpine = Alpine;

// Tipos para Alpine data
interface AppData {
    message: string;
    users: Array<{ id: number; name: string }>;
    loadUsers(): Promise<void>;
}

// Alpine components
Alpine.data(
    "app",
    (): AppData => ({
        message: "Hello from Alpine + TypeScript!",
        users: [],

        async loadUsers() {
            try {
                const response = await fetch("/app/users");
                const data = await response.json();
                this.users = data.users;
            } catch (error) {
                console.error("Error loading users:", error);
            }
        },
    }),
);

// Inicializar Alpine
Alpine.start();
