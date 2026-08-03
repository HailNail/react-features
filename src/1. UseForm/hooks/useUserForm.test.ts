import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import useUserForm from "./useUserForm";

describe("Hook useUserForm", () => {
    beforeEach(() => {
        localStorage.clear();
    })

    test("it must return empty initial values and no errors", () => {
        const { result } = renderHook(() => useUserForm());

        expect(result.current.values).toEqual({username: "", email: ""});
        expect(result.current.errors).toEqual({});
        expect(result.current.isSubmitting).toBe(false);
        expect(result.current.serverError).toBeNull();
        expect(result.current.successMessage).toBe("");
    });

    test("it must show errors when user sends empty form", async () => {
        const { result } = renderHook(() => useUserForm());

        const mockEvent = {preventDefault: vi.fn()} as unknown as React.SubmitEvent<HTMLFormElement>;

        await act(async () => {
            result.current.handleSubmit(mockEvent);
        });

        expect(result.current.errors.username).toBe("Username is required.");
        expect(result.current.errors.email).toBe("Email is required.");
    });

    test("it must deny submitting and show errors that specified in validation", async () => {
        const { result } = renderHook(() => useUserForm());

        const mockEvent = {preventDefault: vi.fn()} as unknown as React.SubmitEvent<HTMLFormElement>;
        
        act(() => {
            result.current.handleInputChange({
                target: {name: "username", value: "ab"}
            } as React.ChangeEvent<HTMLInputElement>) 
        });

        act(() => {
            result.current.handleInputChange({
                target: {name: "email", value: "abra-test.com"}
            } as React.ChangeEvent<HTMLInputElement>) 
        });

        await act(async () => {
            result.current.handleSubmit(mockEvent);
        })

        expect(result.current.errors.username).toBe("Username must contain at least 3 characters.");
        expect(result.current.errors.email).toBe("Please provide a valid email.");
    });

    test("it must submit form successfully and clean up fields in 1 sec", async () => {
        vi.useFakeTimers();

        const { result } = renderHook(() => useUserForm());
        const mockEvent = {preventDefault: vi.fn()} as unknown as React.SubmitEvent<HTMLFormElement>;

        act(() => {
            result.current.handleInputChange({
                target: {name: "username", value: "John"}
            } as React.ChangeEvent<HTMLInputElement>);

            result.current.handleInputChange({
                target: {name: "email", value: "john@mail.dot"}
            } as React.ChangeEvent<HTMLInputElement>);
        });

        let submitPromise : Promise<void>;
        act(() => {
            submitPromise = result.current.handleSubmit(mockEvent);
        });
        expect(result.current.isSubmitting).toBe(true);

        await act(async () => {
            vi.advanceTimersByTime(1000);
            await submitPromise;
        });

        expect(result.current.values).toEqual({username: "", email: ""});
        expect(result.current.isSubmitting).toBe(false);
        expect(result.current.successMessage).toBe("Profile saved successfully!");

        vi.useRealTimers();
    });

    test('it must throw an error if name is "admin"', async () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useUserForm())
    const mockEvent = { preventDefault: vi.fn() } as unknown as React.SubmitEvent<HTMLFormElement>

    act(() => {
      result.current.handleInputChange({
        target: { name: 'username', value: 'admin' }
      } as React.ChangeEvent<HTMLInputElement>)
      
      result.current.handleInputChange({
        target: { name: 'email', value: 'admin@example.com' }
      } as React.ChangeEvent<HTMLInputElement>)
    })

    let submitPromise : Promise<void>;
    act(() => {
      submitPromise = result.current.handleSubmit(mockEvent)
    })

    await act(async () => {
      vi.advanceTimersByTime(1000)
      await submitPromise
    })

    expect(result.current.isSubmitting).toBe(false)
    expect(result.current.serverError).toBe('Username "admin" is already taken!')
    expect(result.current.successMessage).toBe('') 

    vi.useRealTimers()
  })
})