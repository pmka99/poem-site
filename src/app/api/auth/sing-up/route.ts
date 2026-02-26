
// sign-up api route
export const POST=(req: Request) => {
    
    return new Response(JSON.stringify({ message: "Sign up successful" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}