
import prisma from "../db.server";

export async function ensureShopRecords(shopDomain, admin) {

    const existingShop = await prisma.shop.findUnique({
        where: { shopDomain },
    })


    if (existingShop) {
        if (!existingShop.isActive) {
            await prisma.shop.update({
                where: { shopDomain },
                data: { isActive: true },
            })
        }
        return existingShop
    }

}