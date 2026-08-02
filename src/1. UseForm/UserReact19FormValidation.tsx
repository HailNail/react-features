import { startTransition, useActionState, useEffect, useState } from "react"
import useUserForm19v, { type FormState } from "../hooks/useUserForm19v";
import useLocalStorage from "../hooks/useLocalStorage";

const UserReact19FormValidation = () => {
    const [draft, setDraft] = useLocalStorage("form_draft", {
        username: "",
        email: ""
    }, 300);
    const [inputValue, setInputValue] = useState(draft);

    const initialValues : FormState = {
        errors: {},
        serverError: null,
        successMessage: "",
        values: draft
    }
    const [state, formAction, isPending] = useActionState(useUserForm19v, initialValues);

    useEffect(() => {
        if (state.successMessage) {
            setDraft({username: "", email: ""})
        }
    }, [state.successMessage, setDraft]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
           const nextState = { ...inputValue, [name]: value };
            setInputValue(nextState);
        startTransition(() => {
            setDraft(nextState);
        })
    }

    return (
        <form action={formAction}>
              {state.serverError && <div className="error">Server Error: {state.serverError}</div>}
                {state.successMessage && <div className="success">{state.successMessage}</div>}
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" value={inputValue.username} onChange={handleChange}  placeholder="Username" disabled={isPending} />
                    {state.errors.username && <span className="error">{state.errors.username}</span>}
                </div>
                 <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" id="email" value={inputValue.email} onChange={handleChange}  placeholder="Email" disabled={isPending} />
                    {state.errors.email && <span className="error">{state.errors.email}</span>}
                </div>
                <button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Save"}</button>
        </form>
    )
}

export default UserReact19FormValidation;