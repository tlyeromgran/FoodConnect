"use client";

import { useState } from "react";

import { signIn } from "@/lib/actions/auth.actions";

function SignInForm() {
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    const { ok } = await signIn(formData);
    if (ok) {
      // Full page load: the home page lives under a different root layout than /sign-in.
      window.location.assign("/");
      return;
    }
    setError(true);
    setPending(false);
  }

  return (
    <form
      action={handleSubmit}
      className='flex w-full max-w-sm flex-col gap-4 rounded-lg bg-dark-2 p-8'
    >
      <h1 className='text-heading3-bold text-light-1'>Sign in to FoodConnect</h1>

      {error && (
        <p className='text-small-regular text-red-500'>
          Incorrect username or password.
        </p>
      )}

      <label className='flex flex-col gap-2 text-base-semibold text-light-2'>
        Username
        <input
          name='username'
          autoComplete='username'
          required
          className='rounded-md bg-dark-3 px-3 py-2 text-light-1'
        />
      </label>

      <label className='flex flex-col gap-2 text-base-semibold text-light-2'>
        Password
        <input
          name='password'
          type='password'
          autoComplete='current-password'
          required
          className='rounded-md bg-dark-3 px-3 py-2 text-light-1'
        />
      </label>

      <button
        type='submit'
        disabled={pending}
        className='mt-2 rounded-md bg-primary-500 px-4 py-2 text-base-semibold text-light-1 disabled:opacity-60'
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

export default SignInForm;
