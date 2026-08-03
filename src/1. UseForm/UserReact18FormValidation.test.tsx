import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import UserReact18FromValidation from "./UserReact18FormValidation";

describe("Component UserReact18FormValidation", () => {
    test("it must allow to type in input", async () => {
        const user = userEvent.setup(); 
        render(<UserReact18FromValidation />);

        const usernameInput = screen.getByRole("textbox", {name: "Username:"});
        const emailInput = screen.getByRole("textbox", {name: "Email:"});

        await user.type(usernameInput, "John");
        await user.type(emailInput, "john-test@mail.dot");

        expect(usernameInput).toHaveValue("John");
        expect(emailInput).toHaveValue("john-test@mail.dot");
    });

    test("it must show errors on screen when empty fields", async () => {
        const user = userEvent.setup();
        render(<UserReact18FromValidation />);

        const submitButton = screen.getByRole("button", {name: "Save"});

        await user.click(submitButton);

        expect(screen.getByText("Username is required.")).toBeInTheDocument();
        expect(screen.getByText("Email is required.")).toBeInTheDocument();
    });
    
 test("it must block form elements during submit and show success", async () => {
        // Мы ВООБЩЕ НЕ ВКЛЮЧАЕМ vi.useFakeTimers(). Время идет реально.
        
        render(<UserReact18FromValidation />);
        
        const usernameInput = screen.getByRole("textbox", {name: "Username:"});
        const emailInput = screen.getByRole("textbox", {name: "Email:"});
        
        fireEvent.change(usernameInput, { target: { value: "John" } });
        fireEvent.change(emailInput, { target: { value: "john-test@mail.dot" } });
        
        const form = screen.getByRole("textbox", {name: "Username:"}).closest("form");
        if (!form) throw new Error("Форма не найдена");
        
        fireEvent.submit(form);

        // Проверяем блокировку UI (это происходит мгновенно)
        expect(screen.getByRole("button", {name: "Saving..."})).toBeInTheDocument();
        const submitButton = screen.getByRole("button", {name: "Saving..."});
        
        expect(submitButton).toBeDisabled();
        expect(usernameInput).toBeDisabled();
        expect(emailInput).toBeDisabled();

        // Главное оружие: waitFor. 
        // Он будет смиренно и мягко перепроверять код внутри колбэка, 
        // пока тот не перестанет выдавать ошибку (в нашем случае — подождет 1 секунду)
        // Чтобы тест не упал по дефолтному таймауту в 1000мс, увеличим время ожидания до 1500мс
        await waitFor(() => {
            expect(screen.getByText("Profile saved successfully!")).toBeInTheDocument();
        }, { timeout: 1500 });

        // Находим кнопку заново, так как её текст вернулся на "Save"
        const finalSubmitButton = screen.getByRole("button", {name: "Save"});

        expect(finalSubmitButton).not.toBeDisabled();
        expect(usernameInput).toHaveValue("");
        expect(emailInput).toHaveValue("");
    });
})