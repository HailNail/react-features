import { startTransition, useActionState, useEffect } from "react"
import useUserForm19v, { type FormState } from "../hooks/useUserForm19v";
import useLocalStorage from "../hooks/useLocalStorage";

const UserReact19FormValidation = () => {
    const [draft, setDraft] = useLocalStorage("form_draft", {
        username: "",
        email: ""
    }, 300);

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

    const updateField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
            setDraft(prev => ({...prev, [name]: value}));
    }

    return (
        <form action={formAction}>
              {state.serverError && <div className="error">Server Error: {state.serverError}</div>}
                {state.successMessage && <div className="success">{state.successMessage}</div>}
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" value={draft.username} onChange={updateField}  placeholder="Username" disabled={isPending} />
                    {state.errors.username && <span className="error">{state.errors.username}</span>}
                </div>
                 <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" id="email" value={draft.email} onChange={updateField}  placeholder="Email" disabled={isPending} />
                    {state.errors.email && <span className="error">{state.errors.email}</span>}
                </div>
                <button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Save"}</button>
        </form>
    )
}

export default UserReact19FormValidation;