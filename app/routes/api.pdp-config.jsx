import { authenticate } from "../shopify.server";



export async function loader({ request }) {
    const { admin } = await authenticate.public.appProxy(request);


    const url = new URL(request.url);

    const shop = url.searchParams.get("shop")
    console.log(shop)
    return new Response(JSON.stringify({
        success: true,
        message: "backend endpoint hit",
    }), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}