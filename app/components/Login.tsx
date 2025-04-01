"use client";

function Login() {
    return (
        <>
            <div className="flex w-full   p-4 items-center justify-center">
                <div className="flex flex-col p-4 justify-center items-center space-y-4 border-black border-2 rounded-2xl">
                    <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                        Login
                    </h2>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        Click the <b>Access</b> button above to grant permissions for the app to access your spotify account.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;