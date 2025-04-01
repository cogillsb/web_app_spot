"use client";

function NoAccess() {
    return (
        <>
            <div className="flex w-full   p-4 items-center justify-center">
                <div className="flex flex-col p-4 justify-center items-center space-y-4 border-black border-2 rounded-2xl">
                    <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                        No Access
                    </h2>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        This app is unable to access your Spotify Player. Please double check that you are connected to the internet, 
                        that you have Spotify Premium, and that you are signed into the correct account. If signing into a different
                        account, clear browser cache. Thanks!
                    </p>
                </div>
            </div>
        </>
    );
}

export default NoAccess;